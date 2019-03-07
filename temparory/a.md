## GetNewActivityExmapleList
领取模板列表

```json
{
    "lableId": [],
    "pageIndex": 1,
    "pageSize": 10,
    "version": 3
}

```

```json
{
  "code": 200,
  "msg": "成功",
  "data": {
    "page": {
      "index": 1,
      "size": 10,
      "total": 12
    },
    "list": [
      {
        "name": "测试盖楼",
        "type": 2,
        "originType": "MPBuilding",
        "exampleType": 1,
        "templateCode": "MPBuilding",
        "marketMode": "-1",
        "sort": 47,
        "image": [
          {
            "url": ""
          }
        ],
        "targetId": 62091,
        "visitCount": 129,
        "attendCount": 62,
        "schoolPalOrgId": 244684,
        "id": 21
      }
    ]
  }
}
```

## GetMiniProgramConfig
小程序跳转信息
```json
{
  "version": 11,
  "clientInfo": {
    "errMsg": "getSystemInfo:ok",
    "model": "iPhone 6",
    "pixelRatio": 2,
    "windowWidth": 375,
    "windowHeight": 603,
    "system": "iOS 10.0.1",
    "language": "zh",
    "version": "6.6.3",
    "screenWidth": 375,
    "screenHeight": 667,
    "SDKVersion": "2.6.1",
    "brand": "devtools",
    "fontSizeSetting": 16,
    "batteryLevel": 100,
    "statusBarHeight": 20,
    "platform": "devtools"
  }
}
```

```json
{
  "code": 200,
  "msg": "成功",
  "data": {
    "toAsstance": {
      "appId": "wxd4e50994b21d4e32",
      "envVersion": "trial"
    },
    "toPintuan": {
      "appId": "wx9bc99e2c029b6c86",
      "envVersion": "trial"
    },
    "canUpdate": true,
    "isWebp": true,
    "disableMulti": true
  }
}
```

## GetCurrentUser
当前登录用户
```json
{
  "code": 200,
  "msg": "成功",
  "data": {
    "headImageUrl": "
    ",
    "userId": 1309,
    "nickName": "江雨",
    "phone": "18768105877",
    "signId": 889331,
    "orgId": 304099,
    "orgUserId": 805003,
    "state": 0
  }
}
```

## GetWeekStatisticsByOrgId
周统计信息
```json
{
  "code": 200,
  "msg": "成功",
  "data": {
    "Date": "2019-03-01T00:00:00",
    "VisitCount": 0,
    "VisitorCount": 0,
    "AttendCount": 0
  }
}
```

## GetTotalStatisticsByOrgId
总的统计信息
```json
{"orgId":304099}
```
```json
{
  "code": 200,
  "msg": "成功",
  "data": {
    "Date": "0001-01-01T00:00:00",
    "VisitCount": 74,
    "VisitorCount": 18,
    "AttendCount": 9
  }
}
```

## GetActivityData

groupBy等于1时，今日的活动详情，groupBy等于2时，近7日的
```json
{"orgId":304099,"groupBy":1,"__keyPath":{"orgId":true}}
```

```json
{
  "code": 200,
  "msg": "成功",
  "data": [
    {
      "Date": "11:00",
      "VisitCount": 0,
      "VisitorCount": 0,
      "AttendCount": 0
    }
  ]
}
```

## GetStepGroupProductDetail
阶梯拼团领取模板详情
```json
{
    "productId":"6875"
}
```
```json
{
  "code": 200,
  "msg": "成功",
  "data": {
    "orgInfo": {
      "id": 501,
      "orgId": 303645,
      "orgName": "测试绑定磁卡机构@#@%～11111111111111",
      "logo": "https://.jpg",
      "cover": "[{\"url\":\"https://.jpg\"}]",
      "introduce": "机构介绍",
      "orgImages": "[{\"url\":\"https://.jpg\"}]",
      "contact": "18503889372",
      "address": "浙江省 杭州市 下城区朝晖五区东方豪园5楼508室1111111111111111111",
      "licensePic": "[{\"url\":\"https://.jpg\"}]",
      "createdAt": "2018-06-20T15:31:05",
      "provinceCode": "330000",
      "cityCode": "330100",
      "districtCode": "410923",
      "longitude": 120.163,
      "latitude": 30.2891,
      "extConfig": "{\"category\":{\"name\":\"休闲娱乐 动物园/游乐园 海洋馆\",\"id\":2017011600219733}}",
      "shopImages": "{\"shopImg\":[{\"url\":\"https://.jpg\"}],\"indoorImg\":[{\"url\":\"https://.jpg\"}]}"
    },
    "product": {
      "id": 6875,
      "name": "阶梯拼团11",
      "price": 0.01,
      "originPrice": 500,
      "discountPrice": 0.01,
      "stock": 50,
      "introduce": "阶梯拼团商品介绍11",
      "introduceImg": "[]",
      "marketMode": 8,
      "marketNumber": 7,
      "marketDate": "2018/11/10 23:00:00",
      "onSaleDate": null,
      "isOpenReminder": false,
      "images": "[\"http://.png\"]",
      "productHeadImg": "http://.png",
      "isDelete": true,
      "qrCode": null,
      "orgId": 303645,
      "productState": 0,
      "productStatus": 3,
      "productClass": 3,
      "isOnSale": true,
      "config": "{\"sections\":[{\"title\":\"福利介绍\",\"description\":\"福利介绍\"},{\"title\":\"活动规则\",\"description\":\"活动规则\"}]}",
      "taskId": 0,
      "remainedCount": 50,
      "activityId": 64431,
      "finishCount": 0,
      "onCount": 0,
      "participateCount": 0
    },
    "priceList": []
  }
}
```


## GetProductDetail
```json
{"productId":"6875"}
```

```json
{
  "code": 200,
  "msg": "成功",
  "data": {
    "product": {
      "id": 6875,
      "name": "阶梯拼团11",
      "price": 0.01,
      "originPrice": 500,
      "discountPrice": 0.01,
      "stock": 50,
      "introduce": "阶梯拼团商品介绍11",
      "introduceImg": "[]",
      "marketMode": 8,
      "marketNumber": 7,
      "marketDate": "2018/11/10 23:00:00",
      "onSaleDate": null,
      "isOpenReminder": false,
      "images": "[\"http://.png\"]",
      "productHeadImg": "http://.png",
      "isDelete": true,
      "qrCode": null,
      "orgId": 303645,
      "productState": 0,
      "productStatus": 3,
      "productClass": 3,
      "isOnSale": true,
      "buyCount": 0,
      "visitCount": 0,
      "config": "{\"sections\":[{\"title\":\"福利介绍\",\"description\":\"福利介绍\"},{\"title\":\"活动规则\",\"description\":\"活动规则\"}]}",
      "steps": []
    }
  }
}
```

## GetCourceTypeList
```json
{
  "code": 200,
  "msg": "成功",
  "data": {
    "3": "文化课类",
    "7": "其他",
    "9": "音乐乐器",
    "10": "美术书法",
    "11": "语言培训",
    "13": "兴趣培养",
    "17": "脑力开发",
    "18": "舞蹈体育"
  }
}
```

## UploadImage
上传图片
```json
{
  "code": 200,
  "msg": "æå",
  "data": "https://.jpg"
}
```
## IsExistProductActivityUser
商品是否存在用户
```json
{"productId":"8419"}
```

```json
{
  "code": 200,
  "msg": "成功",
  "data": false
}
```

## saveMicroShopProduct
保存编辑活动
```json
{
  "id": 0,
  "name": "xxx",
  "price": 0.01,
  "originPrice": 500,
  "stock": 50,
  "introduce": "阶梯拼团商品介绍11",
  "images": "[{\"url\":\"http://.png\"},{\"url\":\"https://.jpg\"}]",
  "marketMode": 8,
  "marketNumber": 0,
  "marketDate": "2019-03-14 23:59",
  "productState": 1,
  "qrCode": "",
  "productTag": 0,
  "productIntroduceImg": "[{\"url\":\"https://.jpg\"}]",
  "onSaleDate": null,
  "isOpenReminder": 0,
  "productClass": 3,
  "activityexampleId": "55",
  "config": "{\"stepLeaderAward\":\"sdfd\",\"allowViewGroups\":true}",
  "steps": [
    {
      "id": 0,
      "count": 3,
      "price": 33,
      "notes": "",
      "countError": null,
      "priceError": null,
      "__keyPath": {
        "count": true,
        "price": true
      }
    }
  ]
}
```

```json
{
  "code": 200,
  "msg": "成功",
  "data": 8425
}
```

## GetActivityManagementData
活动管理列表
```json
{
  "orgId": 304099,
  "orgUserId": 805003,
  "pageArgument": {
    "pageIndex": 1,
    "pageSize": 10
  },
  "key": "goods"
}
```

```json
{
  "code": 200,
  "msg": "成功",
  "data": {
    "page": {
      "index": 1,
      "size": 10,
      "total": 7
    },
    "list": [
      {
        "id": 8425,
        "type": 2,
        "templateCode": "StepwiseGroupBooking",
        "name": "xxx",
        "image": "http://.png",
        "price": 0.01,
        "marketMode": 8,
        "marketModeText": "阶梯拼团",
        "marketNumber": 3,
        "activityState": "进行中",
        "endDate": "2019-03-14T23:59:00",
        "createAt": "2019-03-07T11:59:37",
        "formatEndDate": "2019年03月14日",
        "formatCreateAt": "2019年03月07日",
        "visitCount": 0,
        "visitorCount": 0,
        "attendCount": 0,
        "activityId": 68799,
        "productState": 1,
        "stock": 50,
        "isEnd": false,
        "poster": "",
        "isFreeze": false,
        "originPrice": 500,
        "qrCode": "",
        "isPublish": false
      }
    ]
  }
}
```

## GetActivityList
活动名单
```json
{
  "orgId": 304099,
  "orgUserId": 805003,
  "activityId": "68799",
  "pageArgument": {
    "PageIndex": 1,
    "PageSize": 10
  },
  "cityCode": 0,
  "state": -1
}
```

```json
{
  "code": 200,
  "msg": "成功",
  "data": {
    "TotalCount": 0,
    "CurrentIndex": 1,
    "ItemCount": 0,
    "List": []
  }
}
```

## UpdateActivityState
下架
```json
{
  "microProductId": 8425,
  "productState": 0
}
```

```json
{
  "code": 200,
  "msg": "成功",
  "data": true
}
```

## DeleteGoods
删除商品
```json
{"id":8425}
```

```json
{
  "code": 200,
  "msg": "成功",
  "data": true
}
```

## GetOrder
订单列表
```json
{"showType":0,"typeOrMode":0,"state":-1,"pageArgument":{"PageIndex":1,"PageSize":10}}
```

```json
{
  "code": 200,
  "msg": "成功",
  "data": {
    "TotalCount": 1,
    "CurrentIndex": 1,
    "ItemCount": 1,
    "List": [
      {
        "contact": null,
        "images": "https://.jpg",
        "orderCount": 0,
        "taskStatus": 0,
        "taskText": "未成团",
        "discountAmount": 0,
        "type": 0,
        "id": 7175,
        "productId": 5631,
        "productName": "课程分销示例活动",
        "productOriginPrice": 1,
        "productPrice": 0.01,
        "orderState": 3,
        "orderText": "已失效",
        "microShopUserId": 629,
        "userName": "的",
        "userPhone": "18768105877",
        "createAt": "2018-08-21T20:03:42",
        "formatCreateAt": "2018年08月21日",
        "orderNumber": "A2018082120034235378374",
        "activityUserId": 29449,
        "schoolPalCloudSignId": 889331,
        "schoolPalOrgId": 304099,
        "expireAt": "2018-08-21T20:18:42",
        "finishAt": "0001-01-01T00:00:00",
        "source": 0,
        "alipayTranNumber": null,
        "memo": null,
        "orderType": 0,
        "payAt": "0001-01-01T00:00:00",
        "payment": 0,
        "userSource": 0,
        "marketMode": 7,
        "marketText": "分销",
        "hasUrgedPay": false,
        "leaveWord": ""
      }
    ]
  }
}
```


## GetOrgInfo
获取机构信息
```json
{
  "code": 200,
  "msg": "成功",
  "data": {
    "id": 543,
    "orgId": 304099,
    "orgName": "你是",
    "logo": "",
    "cover": "[{\"url\":\"https://.jpg\"}]",
    "introduce": "",
    "orgImages": null,
    "contact": "10768105555",
    "address": "广东省 汕头市 血流量",
    "licensePic": "[]",
    "createdAt": "2018-07-12T20:09:15",
    "provinceCode": "410000",
    "cityCode": "410900",
    "districtCode": "410923",
    "longitude": 116.682,
    "latitude": 23.3541,
    "extConfig": "{\"category\":{\"name\":\"休闲娱乐 动物园/游乐园 海洋馆\",\"id\":2017011600219733}}",
    "shopImages": "{}"
  }
}
```

## GetOrderDetail
订单详情
```json
{
  "productId": "5631",
  "orderId": "7175"
}
```

```json
{
  "code": 200,
  "msg": "成功",
  "data": {
    "productDetail": {
      "productLabelName": "课程分销",
      "productStates": 7,
      "image": "https://.jpg"
    },
    "orderDetail": {
      "userName": "的",
      "userPhone": "18768105877",
      "orderNumber": "A2018082120034235378374",
      "createTime": "2018-08-21 20:03:42",
      "payTime": "",
      "note": "",
      "payment": 0,
      "payType": "微信支付",
      "statusTxt": "已失效",
      "price": 0.01,
      "productName": "课程分销示例活动"
    }
  }
}
```

#/Org/SaveOrgInfo
保存机构信息
```json
{
  "OrgId": 304099,
  "OrgName": "你是",
  "Introduce": "杀敌发斯蒂芬\nsdf\nsdf\n1\n324\n",
  "OrgImages": "[{\"url\":\"https://.jpg\"}]"
}
```

```json
{
  "code": 200,
  "msg": "成功",
  "data": true
}
```

#/Management/GetList
省市列表
```json
{
  "code": 200,
  "msg": "成功",
  "data": [
    {
      "citycode": [],
      "adcode": "100000",
      "name": "中华人民共和国",
      "center": "116.3683244,39.915085",
      "level": "country",
      "districts": [
        {
          "citycode": [],
          "adcode": "440000",
          "name": "广东省",
          "center": "113.280637,23.125178",
          "level": "province",
          "districts": [
            {
              "citycode": "0754",
              "adcode": "440500",
              "name": "汕头市",
              "center": "116.708463,23.37102",
              "level": "city",
              "districts": []
            }
          ]
        }
      ]
    }
  ]
}

```


## GetGeo
获取经纬度
```json
{"address":"广东省 佛山市广东省 汕头市 血流量"}
```
```json
{
  "code": 200,
  "msg": "成功",
  "data": "116.681972,23.354091"
}
```

## GetOrgs
erp机构账号列表
```json
{
  "code": 200,
  "msg": "成功",
  "data": [
    {
      "id": 304099,
      "name": "我的机构",
      "state": 1,
      "userId": 805003,
      "userName": "管理员",
      "roleName": "最高权限",
      "authoritys": null,
      "enable": true,
      "crmver": "个人版",
      "schoolName": "某某培训学校",
      "hrDocId": 0
    }
  ]
}
```

## LogOut
登出
```json
{
  "code": 200,
  "msg": "成功",
  "data": {
    "Data": true,
    "Success": true,
    "State": 0
  }
}
```

## Login
登录
```json
{"code":"0015jXIY1l0haT0zzVKY1SIgJY15jXIk"}
```
```json
{
  "code": 1001,
  "msg": "登录失败",
  "data": ""
}
```

## OperationLogsAdd
```json
{"pageId":209126000,"controlId":209126000,"eventId":6}
```
```json
{
  "code": 200,
  "msg": "成功",
  "data": ""
}
```
