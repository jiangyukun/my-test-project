/*
 * @Author: li.lv 
 * @Date: 2018-08-02 13:56:03 
 * @Last Modified by: li.lv
 * @Last Modified time: 2018-10-26 17:37:13
 * @Description: 砍价接口实现 
 */

const moment = require("moment");
const axios = require("../utils/request");
const context = require("../utils/context");
const configHelper = require("../utils/configHelper");
const wechatHelper = require("../utils/wechatHelper");
const cache = require("../cache/cache");
const _ = require("underscore");
const logUtil = require("../utils/log");
const wechat = require("../utils/wechatHelper");
const wechatService = require("../services/wechatService");
const upload = require("../utils/oss");
const {
    MicroshopProduct,
} = require("../models/microshopProduct");
const {
    OrgInfo
} = require("../models/org");
const {
    PushInfo,
    PushInfoType
} = require("../models/microshop");
const {
    BargainHelpUser,
    BargainActivityDetail
} = require("../models/bargainActivity")
const {
    bargainProductService,
    microshopProductService,
    microshopService,
    microshopOrderService,
    groupProductService
} = require("../services/baseService");

var controller = {
    /**
     * 获取砍价商品详情
     *
     * @param {*} ctx
     * @param {*} next
     */
    async getBargainProductDetail(ctx, next) {
        let {
            productId
        } = ctx.request.body;
        let productReuslt = await microshopProductService.getMicroShopProductById(productId),
            product = null,
            currentUser = await context.getCurrentUser(ctx);
        if (productReuslt.data.Success && productReuslt.data.Data) {
            product = new MicroshopProduct(productReuslt.data.Data);
        }
        if (!product) {
            ctx.rest(1000, "获取商品详情失败", null);
            return;
        }
        //获取机构详情
        let orgInfoResult = await microshopService.getOrgInfo(product.orgId),
            orgInfo = {};
        if (orgInfoResult.data.Success && orgInfoResult.data.Data) {
            orgInfo = new OrgInfo(orgInfoResult.data.Data);
        } else {
            ctx.rest(3001, "获取商品详情失败", null);
            logUtil.logHand(`getBargainProductDetail：获取机构信息失败，商品id：${productId}`);
            return;
        }
        let activityUserId = 0;
        if (currentUser.userId > 0) {
            var result = await bargainProductService.getActivityUserId(currentUser.userId, productId);
            if (result.data.Success) {
                activityUserId = result.data.Data;
            } else {
                ctx.rest(3002, "获取商品详情失败", null);
            }
        }
        ctx.rest(200, "", {
            product,
            orgInfo,
            activityUserId
        })

    },
    /**
     * 获取砍价助力列表
     *
     * @param {*} ctx
     * @param {*} next
     */
    async getHelpBargainUserList(ctx, next) {
        let {
            index,
            size,
            activityUserId
        } = ctx.request.body;
        let result = await bargainProductService.getHelpBargainUserList(activityUserId, index, size);
        if (result.data.Success && result.data.Data) {
            let list = [],
                resultData = result.data.Data,
                bizList = resultData.List,
                total = resultData.TotalCount;

            for (let i = 0, l = bizList.length; i < l; i++) {
                list.push(new BargainHelpUser(bizList[i]));
            }
            ctx.rest(200, "", {
                index,
                total,
                list
            });
        } else {
            ctx.rest(1000, "", null);
        }
    },

    /**
     * 砍价助力接口
     *
     * @param {*} ctx
     * @param {*} next
     */
    async helpBargain(ctx, next) {
        let {
            productId,
            activityUserId
        } = ctx.request.body,
            currentUser = await context.getCurrentUser(ctx);
        let addCache = await cache.add(`helpBargainLock_${activityUserId}_${currentUser.openId}`, moment().toString(), 5);
        if(!addCache){
            ctx.rest(3001, "操作过于频繁", null);
            return;
        }
        //是否已砍价
        let helpResult = await bargainProductService.getHelpCountByOpenId(activityUserId, currentUser.openId);
        if (helpResult.data.Success) {
            if (helpResult.data.Data > 0) {
                ctx.rest(3002, "其实，你已帮Ta砍过了哦~", null);
                return;
            }
        } else {
            ctx.rest(3003, "砍价失败", null);
            logUtil.logHand(`helpBargain：获取砍价次数失败--activityUserId:${activityUserId}，productId：${productId}`);
            return;
        }
        let result = await bargainProductService.helpBargain(activityUserId, currentUser.openId, currentUser.nickName, currentUser.headImageUrl);
        if (result.data.Success && result.data.Data) {
            let price = result.data.Data.Price;
            ctx.rest(200, "", price);
            cache.delete(`helpBargainLock_${activityUserId}_${currentUser.openId}`);
            if (result.data.Data.IsBargainToEnd) {
                logUtil.logHand(`砍价成功推送消息--activityUserId:${activityUserId}`)
                let getPushInfoResult = await microshopService.getPushInfo(activityUserId, PushInfoType.activityUser),
                    productReuslt = await microshopProductService.getMicroShopProductById(productId);
                if (getPushInfoResult.data.Success && productReuslt.data.Success && getPushInfoResult.data.Data && productReuslt.data.Data) {
                    let data = getPushInfoResult.data.Data,
                        product = new MicroshopProduct(productReuslt.data.Data);
                    var templateData = {
                        openId: data.OpenId,
                        formId: data.FormId,
                        activityUserId,
                        productId,
                        value: [
                            product.name,
                            product.price,
                            product.marketDate
                        ]
                    }
                    var result1 = await wechat.sendTemplate("bargainSuccess", templateData);
                } else {
                    logUtil.logHand(`砍价成功推送消息失败--activityUserId:${activityUserId}`)
                }
            }
        } else {
            ctx.rest(3004, "砍价失败", null);
        }
    },

    /**
     * 砍价下单接口
     *
     * @param {*} ctx
     * @param {*} next
     */
    async addBargainOrder(ctx, next) {
        let {
            productId,
            couponId,
            leaveWord = ''
        } = ctx.request.body,
            currentUser = await context.getCurrentUser(ctx);
        var result = await microshopOrderService.addBargainOrder(currentUser.userId, productId, couponId, leaveWord);
        if (result.data.Success && result.data.Data) {
            ctx.rest(200, "", result.data.Data);
        } else {
            ctx.rest(1000, "商品下单失败", null);
        }
    },
    /**
     * 砍价报名接口
     *
     * @param {*} ctx
     * @param {*} next
     * @returns
     */
    async addBargainUser(ctx, next) {
        let {
            activityId,
            userName,
            userPhone,
            formId
        } = ctx.request.body,
            currentUser = await context.getCurrentUser(ctx);
        // 添加活动用户
        let data = {
            activityId,
            userName,
            userPhone,
            userId: currentUser.userId,
            openId: currentUser.openId,
            nickName: currentUser.nickName,
            headImageUrl: currentUser.headImageUrl
        };
        let addActivityUserResult = await groupProductService.addActivityUser(data);
        if (!addActivityUserResult.data.Success || !addActivityUserResult.data.Data) {
            ctx.rest(3001, "报名失败", null);
            logUtil.logHand(`砍价报名失败：addActivityUser,data:${JSON.stringify(data)}`)
            return;
        }
        let addActivityUserResultData = addActivityUserResult.data.Data;
        let activityData = addActivityUserResultData.MicroActivityWithTemplateInfo;
        let userData = addActivityUserResultData.IntroduceUser;
        let orgId = activityData.SchoolPalOrgId;
        let title = activityData.Title || "";
        if (!title && activityData.ShareConfig) {
            let shareConfig = JSON.parse(activityData.ShareConfig);
            title = shareConfig.title ? shareConfig.title : "";
        }
        if (!title && activityData.TemplateShareConfig) {
            let templateShareConfig = JSON.parse(activityData.TemplateShareConfig);
            title = templateShareConfig.title ? templateShareConfig.title : "";
        }
        // 添加学员信息
        let stuInfo = {
            FollowUpState: 1,
            HeadImgUrl: currentUser.headImageUrl,
            SenceId: activityId,
            TemplateType: activityData.TemplateType,
            MotherTel: userData.Phone,
            StuName: userData.Name,
            WeChatId: null,
            IsActive: true,
            DistrictId: 0,
            RecentInteractiveAt: userData.CreatedAt,
            Salesway: title,
            AddStuInfoLocation: 3,
            OrgId: activityData.SchoolPalOrgId
        };
        let stuInfoData = {
                userId: activityData.SchoolPalOrgUserId,
                orgId,
                stuInfo
            },
            addStuInfoResult = await groupProductService.addStuInfo(stuInfoData);
        if (!addStuInfoResult.data.Success || !addStuInfoResult.data.Data) {
            ctx.rest(1002, "报名失败", null);
            logUtil.logHand(`砍价报名失败：请求接口：addStuInfo,请求参数:${JSON.stringify(stuInfoData)}`)
            return;
        }
        let addStuInfoResultData = addStuInfoResult.data.Data;
        // 添加报名本记录
        let record = {
            "SchoolPalOrgId": activityData.SchoolPalOrgId,
            "SchoolPalOrgUserId": activityData.SchoolPalOrgUserId, //机构用户Id
            "SchoolPalStuInfoId": addStuInfoResultData.Id,
            "SceneUserId": userData.Id, //活动用户Id
            "SceneId": activityId, //活动Id
            "RegBookTemplateType": activityData.TemplateType, //报名本模板类型；全部0,微活动2,微助力3,微投票 4,微传单5
            "SceneTitle": title, //活动标题
            "IntroducerName": userData.IntroducerName, //介绍人姓名
            "IntroducerPhone": userData.IntroducerPhone, //电话
            "ContentTemplateId": activityData.RegBookTemplateId //报名本互动记录模板Id
        };
        let addRegRecordResult = await groupProductService.addRegRecord(record);
        if (!addRegRecordResult.data.Success || !addRegRecordResult.data.Data) {
            ctx.rest(1003, "报名失败", null);
            return;
        }
        let activityUserId = userData.ActivityUserId;
        let helpBargainResult = await bargainProductService.helpBargain(activityUserId, currentUser.openId, currentUser.nickName, currentUser.headImageUrl);
        if (helpBargainResult.data.Success && helpBargainResult.data.Data) {
            let helpBargainData = {
                isBargainToEnd: helpBargainResult.data.Data,
                price: helpBargainResult.data.Price
            }
        } else {
            ctx.rest(1004, "", null);
        }
        let pushInfo = new PushInfo(formId, currentUser.openId, PushInfoType.activityUser, activityUserId, moment().format(), moment().format()),
            addPushInfoResult = await microshopService.addPushInfo(pushInfo);
        if (!addPushInfoResult.data.Success) {
            logUtil.logHand(`addPushInfo--添加小程序推送日志记录失败：${JSON.stringify(pushInfo)}`);
        }
        ctx.rest(200, "", activityUserId);
    },
    /**
     * 获取砍价活动详情
     *
     * @param {*} ctx
     * @param {*} next
     */
    async getBargainActivityDetail(ctx, next) {
        let {
            activityUserId
        } = ctx.request.body,
            currentUser = await context.getCurrentUser(ctx);
        let result = await bargainProductService.getBargainActivityDetail(activityUserId, currentUser.openId);
        if (result.data.Success && result.data.Data) {
            let model = new BargainActivityDetail(result.data.Data)
            model.isSelf = currentUser.userId == result.data.Data.UserId;
            ctx.rest(200, "", model);
        } else {
            ctx.rest(1000, "获取活动详情失败", null);
        }
    },

}


module.exports = controller;