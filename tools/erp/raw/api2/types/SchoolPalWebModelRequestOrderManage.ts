import SchoolPalWebModelRequest from './SchoolPalWebModelRequest'
import TranOrderDto = SchoolPalWebModelRequest.TranOrderDto
import AccountDetailDto = SchoolPalWebModelRequest.AccountDetailDto
import TranTagDto = SchoolPalWebModelRequest.TranTagDto
namespace SchoolPalWebModelRequestOrderManage {
  /** 编辑教材杂费订单request */
  export interface ItemAndMiscEditRequest {
    /** 学员Id */
    stuInfoId?: number
    /** 教材杂项包 */
    itemInfos: ItemInfoDto[]
    /** 新建订单对象 */
    tranOrderInfo: TranOrderDto
    /** 是否使用余额 */
    isUseStuRemain?: boolean
    /** 对内备注 */
    comment?: string
    /** 对外备注 */
    commentOuter?: string
    /** 收支明细信息 */
    accountDetailDto: AccountDetailDto[]
    /** 订单标签 */
    tags: TranTagDto[]
  }

  /** 教材杂项信息 */
  export interface ItemInfoDto {
    /** 教材杂项ID */
    itemId?: number
    /** 教材杂费名称 */
    itemName?: string
    /** 教材杂费交易Id */
    itemTranId?: number
    /** 教材/杂费；  服务端会根据中文转化为相应的枚举类型； */
    itemType?: string
    /** 单价 */
    unitPrice?: number
    /** 进价 */
    purchasePrice?: number
    /** 购买数量,默认0 */
    count?: number
    /** 教材是否领用,默认false */
    itemGot?: boolean
    /** 教材杂费欠费金额 */
    arrearage?: number
  }

  /** 学员账户存款Request */
  export interface AccountTranSaveRequest {
    /** 学员Id */
    stuInfoId?: number
    /** 应付金额 */
    shouldPay?: number
    /** 实付金额 */
    realPay?: number
    /** 余额交易类型  1. 预存余额  2. 学费转余额  3. 退余额  4. 使用余额 */
    type?: number
    /** 对内备注 */
    comment?: string
    /** 对外备注 */
    commentOuter?: string
    /** 校区Id */
    schoolId?: number
    /** 经办校区名称 */
    schoolName?: string
    /** 销售员Id */
    hrdocId?: number
    /** 销售员姓名 */
    hrdocName?: string
    /** 经办时间 */
    dealDate?: string
    /** 账户的收支明细 */
    accountInfo: AccountDetailDto[]
    /** 订单标签集合 */
    tags: TranTagDto[]
  }

  /** 编辑学员账户订单Request */
  export interface AccountTranEditRequest {
    /** 订单Id */
    tranOrderId?: number
    /** 学员Id */
    stuInfoId?: number
    /** 应付金额 */
    shouldPay?: number
    /** 实付金额 */
    realPay?: number
    /** 余额交易类型  1. 预存余额  2. 学费转余额  3. 退余额  4. 使用余额 */
    type?: number
    /** 对内备注 */
    comment?: string
    /** 对外备注 */
    commentOuter?: string
    /** 校区Id */
    schoolId?: number
    /** 经办校区名称 */
    schoolName?: string
    /** 销售员Id */
    hrdocId?: number
    /** 销售员姓名 */
    hrdocName?: string
    /** 经办时间 */
    dealDate?: string
    /** 账户的收支明细 */
    accountInfo: AccountDetailDto[]
    /** 订单标签集合 */
    tags: TranTagDto[]
  }

  /** 获取交易列表 request */
  export interface GetReportTranListRequest {
    /** 每页条数，最大200条 */
    pageSize?: number
    /** 查询的页码，从1开始计数 */
    pageIndex?: number
    /** 是否升序 */
    asc?: boolean
    /** 排序字段 */
    orderKey?: string
    /** 订单号 */
    orderNumber?: string[]
    /** 交易类型 Enum 枚举类型 */
    tranType: Array<101 | 104 | 105 | 201 | 203 | 301 | 401 | 701 | 801 | 803 | 1001 | 1002>
    /** 学员姓名 */
    stuName?: string[]
    /** 课程Id */
    lessonId?: number[]
    /** 教材杂费Id */
    itemId?: number[]
    /** 收费模式 Enum 枚举类型 */
    feeMode: Array<1 | 2 | 3>
    /** 是否欠费 */
    isArrearage?: number[]
    /** 经办人 */
    creator?: string[]
    /** 经办校区 */
    dealSchoolId?: number[]
    /** 经办日期 */
    dealDate?: string[]
    /** 交易标签 Enum 枚举类型 */
    enrollType: Array<0 | 1 | 2 | 3 | 4>
    /** 上课校区Id */
    schoolId?: number[]
    /** 班级Id */
    classId?: number[]
    /** 收款账户Id */
    accountId?: number[]
    /** 营销活动 */
    marketingSolutionId?: number[]
  }

  /** 获取交易列表导出 request */
  export interface GetReportTranListExportRequest {
    /** 每页条数，最大5000条 */
    pageSize?: number
    /** 查询的页码，从1开始计数 */
    pageIndex?: number
    /** 是否升序 */
    asc?: boolean
    /** 排序字段 */
    orderKey?: string
    /** 订单号 */
    orderNumber?: string[]
    /** 交易类型 Enum 枚举类型 */
    tranType: Array<101 | 104 | 105 | 201 | 203 | 301 | 401 | 701 | 801 | 803 | 1001 | 1002>
    /** 学员姓名 */
    stuName?: string[]
    /** 课程Id */
    lessonId?: number[]
    /** 教材杂费Id */
    itemId?: number[]
    /** 收费模式 Enum 枚举类型 */
    feeMode: Array<1 | 2 | 3>
    /** 是否欠费 */
    isArrearage?: number[]
    /** 经办人 */
    creator?: string[]
    /** 经办校区 */
    dealSchoolId?: number[]
    /** 经办日期 */
    dealDate?: string[]
    /** 交易标签 Enum 枚举类型 */
    enrollType: Array<0 | 1 | 2 | 3 | 4>
    /** 上课校区Id */
    schoolId?: number[]
    /** 班级Id */
    classId?: number[]
    /** 收款账户Id */
    accountId?: number[]
    /** 营销活动 */
    marketingSolutionId?: number[]
  }

  /** 报名分班失败重新分班请求 */
  export interface AssignClassForEnrollFailedRequest {
    /** 学费账户id */
    stuFeeDocId?: number
    /** 交易Id */
    feeTranId?: number
    /** 班级id */
    classId?: number
    /** 订单id */
    tranOrderId?: number
  }

  /** 描述缺失 */
  export interface CreateStuDocSeatForEnrollFailedRequest {
    /** 订单Id */
    tranOrderId?: number
    /** 学员档案id */
    stuDocId?: number
    /** 班级Id */
    classId?: number
    /** 教室Id */
    classroomId?: number
    /** 座位排数 */
    row?: number
    /** 座位列数 */
    column?: number
  }

  /** 学费退费请求实体 */
  export interface ReturnFeeOrderRequest {
    /** 退费学员id */
    stuInfoId?: number
    /** 学员姓名 */
    stuInfoName?: string
    /** 退费交易类型  2：全额退费  3：部分退费 Enum 枚举类型 */
    type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
    /** 剩余可退金额 */
    shouldLeft?: number
    /** 剩余可退课时 */
    shouldLeftClassTimes?: number
    /** 本次退总课时 */
    classTimes?: number
    /** 应退金额 */
    realLeft?: number
    /** 对外备注 */
    comment?: string
    /** 对内备注 */
    commentOuter?: string
    /** 实退金额 */
    realReturn?: number
    /** 经办校区 */
    schoolId?: number
    /** 经办校区名称 */
    schoolName?: string
    /** 销售员Id */
    hrDocId?: number
    /** 销售员名称 */
    hrDocName?: string
    /** 经办日期 */
    dealDate?: string
    /** 学费账户id */
    stuFeeDocId?: number
    /** 退费交易； */
    returnOrderTransforTrans: FeeRefundDto[]
    /** 订单标签 */
    tags: TranTagDto[]
    /** 收支信息 */
    accountDetails: AccountDetailDto[]
  }

  /** 学费退费转出实体 */
  export interface FeeRefundDto {
    /** 退费交易；  编辑时需要此参数；  新增时不需要此参数； */
    id?: number
    /** 转出课时/天数,用户手动转入 */
    classTimes?: number
    /** 转出金额,用户手转 */
    amount?: number
    /** 手续费课时,默认0 */
    procedureClassTimes?: number
    /** 手续费金额,默认0 */
    procedureAmount?: number
    /** 学费交易id,默认0； */
    feetranId?: number
  }

  /** 编辑学费退费请求实体 */
  export interface ReturnOrderEditRequest {
    /** 订单id */
    tranOrderId?: number
    /** 退费交易id; */
    transforTranId?: number
    /** 退费学员id */
    stuInfoId?: number
    /** 学员姓名 */
    stuInfoName?: string
    /** 退费交易类型  2：全额退费  3：部分退费 Enum 枚举类型 */
    type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
    /** 剩余可退金额 */
    shouldLeft?: number
    /** 剩余可退课时 */
    shouldLeftClassTimes?: number
    /** 本次退总课时 */
    classTimes?: number
    /** 应退金额 */
    realLeft?: number
    /** 对外备注 */
    comment?: string
    /** 对内备注 */
    commentOuter?: string
    /** 实退金额 */
    realReturn?: number
    /** 经办校区 */
    schoolId?: number
    /** 经办校区名称 */
    schoolName?: string
    /** 销售员Id */
    hrDocId?: number
    /** 销售员名称 */
    hrDocName?: string
    /** 经办日期 */
    dealDate?: string
    /** 学费账户id */
    stuFeeDocId?: number
    /** 退费交易； */
    returnOrderTransforTrans: FeeRefundDto[]
    /** 订单标签 */
    tags: TranTagDto[]
    /** 收支信息 */
    accountDetails: AccountDetailDto[]
  }

  /** 教材杂费退费请求实体 */
  export interface ItemTranPackageRequest {
    /** 教材杂项包 */
    itemInfos: ItemInfoRefundSaveDto[]
    /** 订单信息 */
    tranOrderInfo: RefundTranOrderInfo
    /** 对内备注 */
    comment?: string
    /** 对外备注 */
    commentOuter?: string
    /** 订单标签 */
    tags: TranTagDto[]
    /** 收支明细信息 */
    accountInfo: AccountDetailDto[]
  }

  /** 教材杂项退费保存入参 */
  export interface ItemInfoRefundSaveDto {
    /** 教材杂项ID */
    itemId?: number
    /** 退费单价 */
    unitPrice?: number
    /** 购买数量,默认0 */
    count?: number
    /** 是否归还,true:已归还 false:未归还 */
    itemGot?: boolean
    /** 归还时间；  此参数报名/复课时不需要； */
    itemGotTime?: string
    /** 购买教材杂费交易id；  当前交易为退教材杂费才需要此参数； */
    purchaseItemTranId?: number
  }

  /** 订单信息 */
  export interface RefundTranOrderInfo {
    /** 应付总额，默认为0；  批量升期/批量续费时，需要传此参数；  报名/复课编辑时，可以不传此参数，服务端会根据交易重新计算订单应收； */
    shouldPay?: number
    /** 实付总额，默认0；  批量升期/批量续费时，不需要传此参数； */
    realPay?: number
    /** 员工id,默认为0。销售员(业绩归属人)  批量升期/批量续费时，需要传此参数 */
    hrDocId?: number
    /** 经办校区id,默认为0 */
    schoolId?: number
    /** 经办日期 */
    dealDate?: string
    /** 学员Id,默认为0(教材杂费零售的订单可能会没有StuInfoId)；  所有订单新增时不需要此参数，服务端设置为当前学员id；  所有订单编辑时不需要此参数，此数据值不更新； */
    stuInfoId?: number
    /** 学员账户变动金额，  使用为-，  增加为+；  批量升期/批量续费时，需要传此参数；  新增补费时，使用账户余额时为+，预存增加- */
    remain?: number
  }

  /** 教材杂费退费编辑请求实体 */
  export interface ItemTranPackageEditRequest {
    /** 教材杂项包 */
    itemInfos: ItemInfoRefundEditDto[]
    /** 订单信息 */
    tranOrderInfo: RefundEditTranOrderInfo
    /** 对内备注 */
    comment?: string
    /** 对外备注 */
    commentOuter?: string
    /** 订单标签 */
    tags: TranTagDto[]
    /** 收支明细信息 */
    accountInfo: AccountDetailDto[]
  }

  /** 教材杂项退费编辑入参 */
  export interface ItemInfoRefundEditDto {
    /** 教材杂项交易；  此参数报名/复课新增时不需要；  报名/复课编辑时，需要此参数； */
    id?: number
    /** 教材杂项ID */
    itemId?: number
    /** 退费单价 */
    unitPrice?: number
    /** 退费数量,默认0 */
    count?: number
    /** 是否归还,true:归还 false:未归还 */
    itemGot?: boolean
    /** 归还时间；  此参数报名/复课时不需要； */
    itemGotTime?: string
    /** 购买教材杂费交易id；  当前交易为退教材杂费才需要此参数； */
    purchaseItemTranId?: number
  }

  /** 订单信息 */
  export interface RefundEditTranOrderInfo {
    /** Id；  订单新增时不需要此参数；  订单编辑时需要此参数； */
    id?: number
    /** 应付总额，默认为0；  批量升期/批量续费时，需要传此参数；  报名/复课编辑时，可以不传此参数，服务端会根据交易重新计算订单应收； */
    shouldPay?: number
    /** 实付总额，默认0；  批量升期/批量续费时，不需要传此参数； */
    realPay?: number
    /** 员工id,默认为0。销售员(业绩归属人)  批量升期/批量续费时，需要传此参数 */
    hrDocId?: number
    /** 校区id,默认为0 */
    schoolId?: number
    /** 经办日期 */
    dealDate?: string
    /** 学员Id,默认为0(教材杂费零售的订单可能会没有StuInfoId)；  所有订单新增时不需要此参数，服务端设置为当前学员id；  所有订单编辑时不需要此参数，此数据值不更新； */
    stuInfoId?: number
    /** 学员账户变动金额，  使用为-，  增加为+；  批量升期/批量续费时，需要传此参数；  新增补费时，使用账户余额时为+，预存增加- */
    remain?: number
  }

  /** 保存余额退费请求实体 */
  export interface SaveAccountTranRequest {
    /** 订单Id */
    tranOrderId?: number
    /** 学员ID */
    stuInfoId?: number
    /** 实退 */
    realPay?: number
    /** 对外备注 */
    comment?: string
    /** 对内备注 */
    commentOuter?: string
    /** 校区ID */
    schoolId?: number
    /** 校区名称 */
    schoolName?: string
    /** 员工id */
    hrDocId?: number
    /** 员工姓名 */
    hrDocName?: string
    /** 经办时间 */
    dealDate?: string
    /** 订单标签 */
    tags: TranTagDto[]
    /** 收支信息 */
    accountDetails: AccountDetailDto[]
  }
}
export default SchoolPalWebModelRequestOrderManage
