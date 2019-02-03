import SchoolPalWebModelResponse from './SchoolPalWebModelResponse'
import AccountDetailDto = SchoolPalWebModelResponse.AccountDetailDto
import TranTagDto = SchoolPalWebModelResponse.TranTagDto
import FeeStandardDto = SchoolPalWebModelResponse.FeeStandardDto
import EditRetrunFeeTranDetailDto = SchoolPalWebModelResponse.EditRetrunFeeTranDetailDto
import FeeTranDto = SchoolPalWebModelResponse.FeeTranDto
import FeeTranExtrasDto = SchoolPalWebModelResponse.FeeTranExtrasDto
import TransferTranOrderDto = SchoolPalWebModelResponse.TransferTranOrderDto
import TranOrderMarketingDetailDto = SchoolPalWebModelResponse.TranOrderMarketingDetailDto
namespace SchoolPalWebModelResponseOrderManage {
  /** 新增教材杂费订单Response */
  export interface ItemOrderResponse {
    /** 教材杂费订单Id集合 */
    tranOrderIds?: number[]
  }

  /** 描述缺失 */
  export interface GetTranOrderObsoleteInfoResponse {
    /** 作废原因 */
    reason?: string
    /** 操作人 */
    operator?: string
    /** 添加时间 */
    addTime?: string
  }

  /** 获取学员账户编辑页面Response */
  export interface GetAccountTranEditResponse {
    /** 订单号 */
    orderNumber: number
    /** 学员Id */
    stuInfoId: number
    /** 学员姓名 */
    stuName?: string
    /** 充值余额 */
    remain: number
    /** 应付金额 */
    shouldPay: number
    /** 实付金额 */
    realPay: number
    /** 积分 */
    credit: number
    /**  订单交易类型   1：报名   2：账户余额变动   3：转课   4：停课   5：复课   6：结课  :7：退费  :8：教材杂费  :9：积分  :10：补费 */
    type: number
    /** 对内备注 */
    comment?: string
    /** 对外备注 */
    commentOuter?: string
    /** 校区Id */
    schoolId: number
    /** 经办校区名称 */
    schoolName?: string
    /** 销售员Id */
    hrdocId: number
    /** 销售员姓名 */
    hrdocName?: string
    /** 创建人 */
    creator?: string
    /** 经办时间 */
    dealDate?: string
    /** 创建日期 */
    createdTime?: string
    /** 订单状态  1.待支付  2.已完成   3.已作废  4.订单已经失效 */
    status: number
    /** 过期时间 */
    expiryDate?: string
    /** 是否使用收银宝 */
    isSchoolPalPay?: boolean
    /** 账户的收支明细 */
    accountInfo: AccountDetailDto[]
    /** 订单标签集合 */
    tags: TranTagDto[]
    /** 订单是否确认到款 */
    isTranOrderConfirm?: boolean
    /** 订单能否编辑 */
    isTranOrderEdit?: boolean
  }

  /** 交易列表 response */
  export interface SelectReportTranListResponse {
    /** id */
    id: number
    /** 机构id,默认为0 */
    orgId: number
    /** 订单Id,默认0 */
    tranOrderId: number
    /** 交易Id,默认0 */
    tranId: number
    /** 交易类型 Enum 枚举类型 */
    tranType: 101 | 104 | 105 | 201 | 203 | 301 | 401 | 701 | 801 | 803 | 1001 | 1002
    /** 单价 */
    unitPrice?: string
    /** 数量,默认0 */
    count: number
    /** 优惠json,默认空 */
    promotion?: string
    /** 优惠金额,默认0 */
    promotionAmount: number
    /** 原价格,默认0 */
    originAmount: number
    /** 实付价格,默认0 */
    realAmount: number
    /** 实收金额 */
    actualIncome: number
    /** 赠送课时 */
    presentClasstimes?: string
    /** 报名类型 Enum 枚举类型 */
    enrollType: 0 | 1 | 2 | 3 | 4
    /** 对内备注 */
    comment?: string
    /** 对外备注（校宝家交易详情页显示） */
    commentOuter?: string
    /** 校区id,默认为0 */
    stuInfoId: number
    /** 校区名称  乐高项目二期增加 */
    stuName?: string
    /** 课程id,默认为0 */
    lessonId: number
    /** 项目名称 */
    lessonName?: string
    /** 教材杂费id,默认为0 */
    itemId: number
    /** 班级id,默认为0 */
    classId: number
    /** 班级名称  乐高项目二期增加 */
    className?: string
    /** 收费模式(冗余)  乐高项目1.0增加 Enum 枚举类型 */
    feeMode: 1 | 2 | 3
    /** 营销活动Id */
    marketingSolutionId: number
    /** 营销活动 */
    marketingSolutionComment?: string
    /** 校区id,默认为0 */
    schoolId: number
    /** 校区名称  乐高项目二期增加 */
    schoolName?: string
    /** 余额 */
    remain: number
    /** 欠费 */
    arrearage: number
    /** 订单号 */
    orderNumber: number
    /** 订单类型 Enum 枚举类型 */
    tranOrderType: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
    /** 收款账户 */
    accountName?: string
    /** 经办校区名 */
    dealSchoolName?: string
    /** 经办日期 */
    dealDate?: string
    /** 经办人 */
    creator?: string
  }

  /** 订单打印 */
  export interface GetPrintOrderDetailResponse {
    /** 学员信息 */
    printStuInfo: PrintStuInfoDto
    /** 订单信息 */
    printTranOrder: PrintTranOrderDto
    /** 账户信息 */
    printAccountDetails: PrintAccountDetailDto[]
    /** 学费交易 */
    printFeeTrans: PrintFeeTranDto[]
    /** 账户交易 */
    printAccountTrans: PrintAccountTranDto[]
    /** 积分交易 */
    printCreditTrans: PrintCreditTranDto[]
    /** 教材杂费交易 */
    printItemTrans: PrintItemTranDto[]
    /** 补费交易 */
    printRepairTrans: PrintRepairTranDto[]
    /** 描述缺失 */
    printTransforTrans: PrintTransforTranDto[]
    /** 打印时间 */
    printTime?: string
    /** 学校名称 */
    schoolName?: string
    /** 学校简称 */
    schoolShortName?: string
    /** 查库存的权限点。区分标准版和专业版的时候对库存不足提示的显示与否 */
    stockAuthority?: boolean
    /** 机构名称 */
    orgName?: string
    /** 票据备注 */
    comment?: string
    /** 是否有短信功能 */
    hasSMS?: boolean
    /** 退费是否显示短信信息 */
    hasSMSRefund?: string
    /** 报名转课是否显示短信信息 */
    smsWelcomeNewStu?: string
    /** 教监电话 */
    qcTel?: string
  }

  /** 学员信息 */
  export interface PrintStuInfoDto {
    /** 学员Id */
    stuInfoId: number
    /** 学员姓名 */
    stuInfoName?: string
    /** 余额 */
    remain: number
    /** 学号 */
    stuFileNumber?: string
    /** 是否显示学号 */
    isShowStuFileNumber?: boolean
  }

  /** 订单信息 */
  export interface PrintTranOrderDto {
    /** 订单Id */
    tranOrderId: number
    /** 学校Id */
    schoolId: number
    /** 订单号 */
    orderNumber: number
    /** 订单类型 Enum 枚举类型 */
    type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
    /** 经办日期 */
    dealDate?: string
    /** 学校名称 */
    schoolName?: string
    /** 经办人 */
    creator?: string
    /** 电话 */
    dealSchoolPhone?: string
    /** 地址 */
    dealSchoolAddress?: string
    /** 应付总额 */
    shouldPay: number
    /** 实付总额 */
    realPay: number
    /** 学员账户 */
    remain: number
    /** 欠费金额 */
    arrearage: number
    /** 订单状态 Enum 枚举类型 */
    status: 1 | 2 | 3 | 4
    /** 创建时间 */
    createdTime?: string
  }

  /** 账户信息 */
  export interface PrintAccountDetailDto {
    /** 账户Id */
    accountId: number
    /** 账户名称 */
    accountName?: string
    /** 金额 */
    amount: number
  }

  /** 学费交易 */
  export interface PrintFeeTranDto {
    /** 描述缺失 */
    feeTranId: number
    /** 交易类型 Enum 枚举类型 */
    tranType: 1 | 2 | 3 | 4 | 5
    /** 单价 */
    unitPrice: number
    /** 价格 */
    price: number
    /** 单位 Enum 枚举类型 */
    unit: 2 | 3 | 4 | 5 | 6 | 7
    /** 数量 */
    count: number
    /** 购买sku数量 */
    feeStandardCount: number
    /** 课程Id */
    lessonId: number
    /** 班级类型（班课，一对一） Enum 枚举类型 */
    lessonMode: 1 | 2
    /** 课程名称 */
    lessonName?: string
    /** 班级Id */
    classId: number
    /** 班级名称 */
    className?: string
    /** 开班日期 */
    openDate?: string
    /** 结班日期 */
    closeDate?: string
    /** 教师名字 */
    teacherName?: string
    /** 教室名称 */
    classroomName?: string
    /** 学校名称 */
    schoolName?: string
    /** 开始时间 */
    beginDate?: string
    /** 过期时间 */
    expirDate?: string
    /** 学费标准模式（按时间，按课时，按期） Enum 枚举类型 */
    feestandardMode: 1 | 2 | 3
    /** 优惠信息 */
    promotion?: string
    /** 方案内容 */
    marketingComment?: string
    /** 优惠金额 */
    promotionAmount: number
    /** 原价 */
    originAmount: number
    /** 实付价格 */
    realAmount: number
    /** 订单详情每笔交易中包含的营销活动优惠信息 */
    tranOrderMarketingDetail: PrintTranOrderMarketingDetailDto
    /** 日常模板 */
    classPeriodTemplates: PrintClassPeriodTemplateDto[]
    /** 教材杂费交易 */
    printItemTrans: PrintItemTranDto[]
    /** 是否开启排座 */
    hasEnrollSelectSeat?: boolean
    /** 是否有排座信息 */
    hasSeat?: boolean
    /** 座位行数 */
    row: number
    /** 座位列数 */
    column: number
    /** 对外备注 */
    commentOuter?: string
  }

  /** 账户交易 */
  export interface PrintAccountTranDto {
    /** Id */
    accountTranId: number
    /** 类型 Enum 枚举类型 */
    tranType: 1 | 2 | 3 | 4
    /** 金额 */
    amount: number
    /** 备注 */
    commentOuter?: string
  }

  /** 积分交易 */
  export interface PrintCreditTranDto {
    /** Id */
    creditTranId: number
    /** 交易类型 Enum 枚举类型 */
    tranType: 1 | 2 | 3
    /** 余额 */
    amount: number
    /** 备注 */
    commentOuter?: string
  }

  /** 教材杂费交易 */
  export interface PrintItemTranDto {
    /** 描述缺失 */
    itemId: number
    /** 教材杂费名称 */
    itemName?: string
    /** 交易类型 Enum 枚举类型 */
    tranType: 1 | 2 | 3 | 4
    /** 单价 */
    unitPrice: number
    /** 数量 */
    count: number
    /** 库存数量 */
    number: number
    /** 教材是否领用 */
    itemGot?: boolean
    /** 实收 */
    actualIncome: number
    /** 实付价格 */
    realAmount: number
    /** 备注 */
    commentOuter?: string
  }

  /** 补费交易 */
  export interface PrintRepairTranDto {
    /** 补费类型 Enum 枚举类型 */
    arrearageTranType: 1 | 2
    /** 补费项目名称 */
    name?: string
    /** 补费金额 */
    repairAmount: number
    /** 备注 */
    commentOuter?: string
  }

  /** 描述缺失 */
  export interface PrintTransforTranDto {
    /** 交易类型 Enum 枚举类型 */
    tranType: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
    /** 课时,默认0 */
    classTimes: number
    /** 金额,转出学费20为-20 */
    amount: number
    /** 学费交易id,默认0。  办理部分退费时才需要此参数 */
    feetranId: number
    /** 对外备注 */
    commentOuter?: string
    /** 校区id,默认为0 */
    schoolId: number
    /** 课程id,默认为0 */
    lessonId: number
    /** 班级id,默认为0 */
    classId: number
    /** 课程名称 */
    lessonName?: string
    /** 班级名称 */
    className?: string
    /** 班级类型（班课，一对一） Enum 枚举类型 */
    lessonMode: 1 | 2
    /** 开始时间 */
    openDate?: string
    /** 结束时间 */
    closeDate?: string
    /** 学费标准模式（按时间，按课时，按期） Enum 枚举类型 */
    feestandardMode: 1 | 2 | 3
    /** 教师名称 */
    teacherName?: string
    /** 上课校区 */
    schoolName?: string
    /** 教室名称 */
    classroomName?: string
  }

  /** 订单详情每笔交易中包含的营销活动优惠信息 */
  export interface PrintTranOrderMarketingDetailDto {
    /** 订单详情页活动优惠内容 */
    marketingComment?: string
    /** 订单回执页活动优惠内容 */
    shortMarketingComment?: string
    /** 营销活动优惠的金额 */
    marketingPromotionAmount: number
    /** 营销活动类型 0: 非赠送课时；1: 赠送课时类型 */
    promotionType: number
  }

  /** 班级日程模板 */
  export interface PrintClassPeriodTemplateDto {
    /** Id */
    id: number
    /** 起始日期 */
    startTime?: string
    /** 结束日期 */
    endTime?: string
    /** 起始时间,相对00：00的分钟数 */
    startTimeSpan: number
    /** 结束时间,相对00：00的分钟数 */
    endTimeSpan: number
    /** 周天 Enum 枚举类型 */
    weekDays: 1 | 2 | 4 | 8 | 16 | 32 | 64
    /** 重复类型 Enum 枚举类型 */
    repeatType: 1 | 2 | 3 | 4
    /** 重复间隔 */
    repeatSpan: number
    /** 教师 */
    classTeacherId: number
    /** 重复次数 */
    repeatCount: number
    /** 日程模板创建类型 Enum 枚举类型 */
    createType: 0 | 1 | 2
  }

  /** 获取报名结果对象 */
  export interface GetEnrollResultByTranOrderIdResponse {
    /** 报名结果失败信息集合 */
    enrollResultDtos: EnrollResultDto[]
  }

  /** 报名结果对象 */
  export interface EnrollResultDto {
    /** 失败课程id */
    lessonId: number
    /** 失败课程名称 */
    lessonName?: string
    /** 失败校区id */
    schoolId: number
    /** 失败班级id */
    classId: number
    /** 失败班级名称 */
    className?: string
    /** 失败教室id */
    classroomId: number
    /** 报名失败类型  1.分班失败  2.排座失败  3.两者都失败 */
    enrollFailedType: number
    /** 学员档案id */
    stuDocId: number
    /** 学费总账户id */
    stuFeeDocId: number
    /** 交易id */
    feeTranId: number
    /** 分班失败原因 */
    assignClassFailedReason?: string
    /** 排座失败原因 */
    createStuDocSeatFailedReason?: string
  }

  /** 描述缺失 */
  export interface GetNextLessonInfoByStuFeeDocIdResponse {
    /** 下期课程id */
    nextLessonId: number
    /** 校区id */
    schoolId: number
  }

  /** 根据学费账户id获取当前课程信息 */
  export interface GetCurrentLessonInfoByStuFeeDocIdResponse {
    /** 下期课程id */
    currentLessonId: number
    /** 校区id */
    schoolId: number
  }

  /** 根据选择课程以及校区id获取课程详情以及对应收费模式数据 */
  export interface GetLessonFeeInfoByLessonIdAndSchoolIdResponse {
    /** 课程id */
    lessonId: number
    /** 课程名称 */
    lessonName?: string
    /** 课程类型 Enum 枚举类型 */
    lessonMode: 1 | 2
    /** 课程下收费模式集合 */
    feeStandardDtos: FeeStandardDto[]
  }

  /** 订单对象（简化版） */
  export interface TranOrderResponse {
    /** 订单id */
    id: number
    /** 学员姓名 */
    stuName?: string
  }

  /** 转课编辑页面 */
  export interface EditTransforTranResponse {
    /** 转出学费交易信息 */
    retrunTransforTrans: EditRetrunFeeTranDetailDto[]
    /** 学费交易 */
    feeTran: FeeTranDto
    /** 交易扩展信息 */
    feeTranExtras: FeeTranExtrasDto
    /** 新建订单对象 */
    tranOrder: TransferTranOrderDto
    /** 订单标签 */
    tags: TranTagDto[]
    /** 收支信息 */
    accountDetails: AccountDetailDto[]
    /** 订单详情每笔交易中包含的营销活动优惠信息 */
    marketingDetail: TranOrderMarketingDetailDto
    /** 订单是否有补费 */
    hasRepairTran?: boolean
    /** 订单是否确认到款 */
    isConfirm?: boolean
    /** 是否使用收银宝 */
    isSchoolPalPay?: boolean
    /** 转出学费账户状态 Enum 枚举类型 */
    outStuFeeDocStauts: 1 | 2 | 3 | 4 | 5 | 6 | 7 | -1
    /** 转出课程名称 */
    outLessonName?: string
    /** 转出校区名称 */
    outSchoolName?: string
    /** 转出收费模式 Enum 枚举类型 */
    outFeeMode: 1 | 2 | 3
    /** 转入学费账户状态 Enum 枚举类型 */
    intoStuFeeDocStauts: 1 | 2 | 3 | 4 | 5 | 6 | 7 | -1
    /** 转入按时间且有转出/退费交易 */
    intoByTimeAndHasTransforTran?: boolean
  }

  /** 根据学员id获取课程信息 */
  export interface GetLessonByStuInfoIdResponse {
    /** 主键 */
    id: number
    /** 课程名称 */
    lessonName?: string
    /** 学费账户id */
    stuFeeDocId: number
    /** 校区名 */
    schoolName?: string
    /** 校区id,默认为0 */
    schoolId: number
    /** 1：在读；2：转出；3：退费；4停课；5结课；6复课；7停课（乐高项目）； Enum 枚举类型 */
    status: 1 | 2 | 3 | 4 | 5 | 6 | 7 | -1
  }

  /** 学员购买的教材杂项交易 */
  export interface GetStuItemTranResponse {
    /** 教材杂费交易Id(ItemTran - Id) */
    id: number
    /** 订单Id 系统内唯一(TranOrder - Id) */
    tranOrderId: number
    /** 订单编号 机构内唯一(TranOrder - OrderNumber) */
    orderNumber: number
    /** 教材杂费ID */
    itemId: number
    /** 教材杂项名称 */
    itemName?: string
    /** 关联课程名称 */
    lessonName?: string
    /** 是否领用 */
    itemGotState?: boolean
    /** 购买数量 */
    itemTotalCount: number
    /** 教材杂费购买时单价 */
    itemGotPrice: number
    /** 经办日期 */
    dealDate?: string
    /** 累计金额 */
    totalAmount: number
    /** 可退数量 */
    canReturnedItemCount: number
    /** 是否欠费 */
    isArrear?: boolean
    /** 教材/杂费 */
    itemType?: string
  }

  /** 获取学员可退学费信息 */
  export interface GetStuLeftFeeResponse {
    /** 课程收费模式 */
    feeMode: number
    /** 课程Id */
    lessonId: number
    /** 课程名称 */
    lessonName?: string
    /** 校区名称 */
    schoolName?: string
    /** 课程列表 */
    data: StuLeftFeeItem[]
  }

  /** 收费信息 */
  export interface StuLeftFeeItem {
    /** 报名交易id */
    feetranId: number
    /** 购买课时（总数） */
    count: number
    /** 数量 */
    feeStandardCount: number
    /** 原价（元）,默认0 */
    originAmount: number
    /** 优惠json,默认空;用于服务端计算； */
    promotion?: string
    /** 优惠金额,默认0 */
    promotionAmount: number
    /** 应收（元） */
    realAmount: number
    /** 实收金额（交易实收+补费） */
    actualIncome: number
    /** 单价,默认0 */
    unitPrice: number
    /** 真实的单价（每次记上课的单价） */
    realUnitPrice: number
    /** 剩余课时（剩余可用课时）。冗余字段。 */
    unUseClassTimes: number
    /** 已退学费 */
    returnedTuition: number
    /** 经办日期 */
    dealDate?: string
    /** 订单号(机构内自增、唯一) */
    orderNumber: number
    /** 课消金额 */
    cost: number
    /** 营销活动优惠内容 */
    marketingComment?: string
    /** 营销活动优惠金额 */
    tranMarketingPromotionAmount: number
    /** 最大可退金额（计算好后给前端） */
    maxReturnAmount: number
    /** 已退课时（计算好后给前端） */
    returnedClassTimes: number
    /** 欠费金额 */
    arrearage: number
    /** 开始时间 */
    beginDate?: string
    /** 失效时间 */
    expiryDate?: string
  }

  /** 学员账户信息 */
  export interface GetStuAccountInfoResponse {
    /** 学员id */
    stuInfoId: number
    /** 学员姓名 */
    stuName?: string
    /** 余额 */
    remain: number
  }
}
export default SchoolPalWebModelResponseOrderManage
