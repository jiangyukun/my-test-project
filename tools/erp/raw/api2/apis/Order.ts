import service from './../../api/net'
import { AxiosPromise } from 'axios'
import SchoolPalWebModelRequest from './../types/SchoolPalWebModelRequest'
import SchoolPalToolkitResponse from './../types/SchoolPalToolkitResponse'
import SchoolPalCloudServiceModel from './../types/SchoolPalCloudServiceModel'
import SchoolPalWebModelResponse from './../types/SchoolPalWebModelResponse'
import SchoolPalWebModelResponseOrderManage from './../types/SchoolPalWebModelResponseOrderManage'
import SchoolPalWebModelRequestOrderManage from './../types/SchoolPalWebModelRequestOrderManage'
import SchoolPalWebModel from './../types/SchoolPalWebModel'
import SchoolPalDomainSdk from './../types/SchoolPalDomainSdk'
import GetHrDocByFollowUpPeopleIdRequest = SchoolPalWebModelRequest.GetHrDocByFollowUpPeopleIdRequest
import GetTranSnapshotListDataRequest = SchoolPalWebModelRequest.GetTranSnapshotListDataRequest
import CreditTranOrderRequest = SchoolPalWebModelRequest.CreditTranOrderRequest
import CreditTranEditRequest = SchoolPalWebModelRequest.CreditTranEditRequest
import ItemAndMiscSaveRequest = SchoolPalWebModelRequest.ItemAndMiscSaveRequest
import CheckCanSaveTranOrderObsoleteRequest = SchoolPalWebModelRequest.CheckCanSaveTranOrderObsoleteRequest
import SaveTranOrderObsoluteRequest = SchoolPalWebModelRequest.SaveTranOrderObsoluteRequest
import GetMarketingSolutionRequest = SchoolPalWebModelRequest.GetMarketingSolutionRequest
import GetTranOrderListDataRequest = SchoolPalWebModelRequest.GetTranOrderListDataRequest
import TranOrderListDataExportRequest = SchoolPalWebModelRequest.TranOrderListDataExportRequest
import GetTranOrderListDataStatisticsRequest = SchoolPalWebModelRequest.GetTranOrderListDataStatisticsRequest
import PrintMyDayRequest = SchoolPalWebModelRequest.PrintMyDayRequest
import TranorderAccountDetailIsConfirmUpdateRequest = SchoolPalWebModelRequest.TranorderAccountDetailIsConfirmUpdateRequest
import GetTranOrderFeeTranCommentListRequest = SchoolPalWebModelRequest.GetTranOrderFeeTranCommentListRequest
import IsAllowReturnItemAndMiscRequest = SchoolPalWebModelRequest.IsAllowReturnItemAndMiscRequest
import GetTranOrderByIdRequest = SchoolPalWebModelRequest.GetTranOrderByIdRequest
import SaveReturnOrderRequest = SchoolPalWebModelRequest.SaveReturnOrderRequest
import SaveEnrollRequest = SchoolPalWebModelRequest.SaveEnrollRequest
import GetRepairTranByArrearageTranOrderIdRequest = SchoolPalWebModelRequest.GetRepairTranByArrearageTranOrderIdRequest
import SaveReNewListRequest = SchoolPalWebModelRequest.SaveReNewListRequest
import AddTransforTranRequest = SchoolPalWebModelRequest.AddTransforTranRequest
import EditTransforTranRequest = SchoolPalWebModelRequest.EditTransforTranRequest
import BatchAddTransforRequest = SchoolPalWebModelRequest.BatchAddTransforRequest
import BatchStuDocIdsRequest = SchoolPalWebModelRequest.BatchStuDocIdsRequest
import SaveRepairTranOrderRequest = SchoolPalWebModelRequest.SaveRepairTranOrderRequest
import UpdateRepairTranOrderRequest = SchoolPalWebModelRequest.UpdateRepairTranOrderRequest
import ResponseResult = SchoolPalToolkitResponse.ResponseResult
import PageResult = SchoolPalCloudServiceModel.PageResult
import GetHrDocByFollowUpPeopleIdResponse = SchoolPalWebModelResponse.GetHrDocByFollowUpPeopleIdResponse
import TranOrderFollowUpRelationResponse = SchoolPalWebModelResponse.TranOrderFollowUpRelationResponse
import TranSnapshotDataResponse = SchoolPalWebModelResponse.TranSnapshotDataResponse
import CreditTranResponse = SchoolPalWebModelResponse.CreditTranResponse
import GetCreditTranEditResponse = SchoolPalWebModelResponse.GetCreditTranEditResponse
import GetItemAndMiscEditResponse = SchoolPalWebModelResponse.GetItemAndMiscEditResponse
import GetStuInfoAccountTranListResponse = SchoolPalWebModelResponse.GetStuInfoAccountTranListResponse
import GetStuInfoCreditListResponse = SchoolPalWebModelResponse.GetStuInfoCreditListResponse
import GetMarketingSolutionResponse = SchoolPalWebModelResponse.GetMarketingSolutionResponse
import GetTranOrderListDataResponse = SchoolPalWebModelResponse.GetTranOrderListDataResponse
import GetTranOrderListDataStatisticsResponse = SchoolPalWebModelResponse.GetTranOrderListDataStatisticsResponse
import PrintMyDayResponse = SchoolPalWebModelResponse.PrintMyDayResponse
import GetTranOrderFeeTranCommentListResponse = SchoolPalWebModelResponse.GetTranOrderFeeTranCommentListResponse
import PrintClassCardDetailResponse = SchoolPalWebModelResponse.PrintClassCardDetailResponse
import GetStudyingLessonInfoByStuInfoIdResponse = SchoolPalWebModelResponse.GetStudyingLessonInfoByStuInfoIdResponse
import GetRepairTranByArrearageTranOrderIdResponse = SchoolPalWebModelResponse.GetRepairTranByArrearageTranOrderIdResponse
import SpcPayQrCodeDto = SchoolPalWebModelResponse.SpcPayQrCodeDto
import ScpPaymentResultResponseData = SchoolPalWebModelResponse.ScpPaymentResultResponseData
import GetAccountDetailListByTranOrderIdResponse = SchoolPalWebModelResponse.GetAccountDetailListByTranOrderIdResponse
import GetAccountPaymentMethodsResponse = SchoolPalWebModelResponse.GetAccountPaymentMethodsResponse
import TranOrderDetail = SchoolPalWebModelResponse.TranOrderDetail
import BatchTransforOutLessonAndStuResponse = SchoolPalWebModelResponse.BatchTransforOutLessonAndStuResponse
import GetArrearageTranResponse = SchoolPalWebModelResponse.GetArrearageTranResponse
import GetRepairTranOrderResponse = SchoolPalWebModelResponse.GetRepairTranOrderResponse
import GetRefunTypeResponse = SchoolPalWebModelResponse.GetRefunTypeResponse
import ReturnFeeTranDetailResponse = SchoolPalWebModelResponse.ReturnFeeTranDetailResponse
import GetItemAndMiscRefundEditResponse = SchoolPalWebModelResponse.GetItemAndMiscRefundEditResponse
import GetAccoutTranDetailResponse = SchoolPalWebModelResponse.GetAccoutTranDetailResponse
import ItemOrderResponse = SchoolPalWebModelResponseOrderManage.ItemOrderResponse
import GetTranOrderObsoleteInfoResponse = SchoolPalWebModelResponseOrderManage.GetTranOrderObsoleteInfoResponse
import GetAccountTranEditResponse = SchoolPalWebModelResponseOrderManage.GetAccountTranEditResponse
import SelectReportTranListResponse = SchoolPalWebModelResponseOrderManage.SelectReportTranListResponse
import GetPrintOrderDetailResponse = SchoolPalWebModelResponseOrderManage.GetPrintOrderDetailResponse
import GetEnrollResultByTranOrderIdResponse = SchoolPalWebModelResponseOrderManage.GetEnrollResultByTranOrderIdResponse
import GetNextLessonInfoByStuFeeDocIdResponse = SchoolPalWebModelResponseOrderManage.GetNextLessonInfoByStuFeeDocIdResponse
import GetCurrentLessonInfoByStuFeeDocIdResponse = SchoolPalWebModelResponseOrderManage.GetCurrentLessonInfoByStuFeeDocIdResponse
import GetLessonFeeInfoByLessonIdAndSchoolIdResponse = SchoolPalWebModelResponseOrderManage.GetLessonFeeInfoByLessonIdAndSchoolIdResponse
import TranOrderResponse = SchoolPalWebModelResponseOrderManage.TranOrderResponse
import EditTransforTranResponse = SchoolPalWebModelResponseOrderManage.EditTransforTranResponse
import GetLessonByStuInfoIdResponse = SchoolPalWebModelResponseOrderManage.GetLessonByStuInfoIdResponse
import GetStuItemTranResponse = SchoolPalWebModelResponseOrderManage.GetStuItemTranResponse
import GetStuLeftFeeResponse = SchoolPalWebModelResponseOrderManage.GetStuLeftFeeResponse
import GetStuAccountInfoResponse = SchoolPalWebModelResponseOrderManage.GetStuAccountInfoResponse
import ItemAndMiscEditRequest = SchoolPalWebModelRequestOrderManage.ItemAndMiscEditRequest
import AccountTranSaveRequest = SchoolPalWebModelRequestOrderManage.AccountTranSaveRequest
import AccountTranEditRequest = SchoolPalWebModelRequestOrderManage.AccountTranEditRequest
import GetReportTranListRequest = SchoolPalWebModelRequestOrderManage.GetReportTranListRequest
import GetReportTranListExportRequest = SchoolPalWebModelRequestOrderManage.GetReportTranListExportRequest
import AssignClassForEnrollFailedRequest = SchoolPalWebModelRequestOrderManage.AssignClassForEnrollFailedRequest
import CreateStuDocSeatForEnrollFailedRequest = SchoolPalWebModelRequestOrderManage.CreateStuDocSeatForEnrollFailedRequest
import ReturnFeeOrderRequest = SchoolPalWebModelRequestOrderManage.ReturnFeeOrderRequest
import ReturnOrderEditRequest = SchoolPalWebModelRequestOrderManage.ReturnOrderEditRequest
import ItemTranPackageRequest = SchoolPalWebModelRequestOrderManage.ItemTranPackageRequest
import ItemTranPackageEditRequest = SchoolPalWebModelRequestOrderManage.ItemTranPackageEditRequest
import SaveAccountTranRequest = SchoolPalWebModelRequestOrderManage.SaveAccountTranRequest
import ResponseResult_1 = SchoolPalWebModel.ResponseResult
import TranOrder = SchoolPalDomainSdk.TranOrder

/** 根据售前人员类型获取售前人员 */
export const GetHrDocByFollowUpPeopleId = (
  req: GetHrDocByFollowUpPeopleIdRequest
): AxiosPromise<ResponseResult<PageResult<GetHrDocByFollowUpPeopleIdResponse[]>>> => {
  return service.post('/api2/Order/GetHrDocByFollowUpPeopleId', req)
}

/** 获取学员订单默认销售员 */
export const GetStuInfoTranOrderFollowUpRelation = (
  stuInfoId: number
): AxiosPromise<ResponseResult<TranOrderFollowUpRelationResponse>> => {
  return service.get('/api2/Order/GetStuInfoTranOrderFollowUpRelation', { params: { stuInfoId } })
}

/** 获取订单日志数据 */
export const GetTranSnapshotListData = (
  request: GetTranSnapshotListDataRequest
): AxiosPromise<ResponseResult<TranSnapshotDataResponse>> => {
  return service.post('/api2/Order/GetTranSnapshotListData', request)
}

/** 保存新增积分订单，（包括批量新增/兑换积分订单） */
export const CreditTranSave = (request: CreditTranOrderRequest): AxiosPromise<ResponseResult<CreditTranResponse>> => {
  return service.post('/api2/Order/CreditTranSave', request)
}

/** 保存编辑积分订单 */
export const CreditTranEdit = (request: CreditTranEditRequest): AxiosPromise<ResponseResult<number>> => {
  return service.post('/api2/Order/CreditTranEdit', request)
}

/** 获取编辑积分订单的信息 */
export const GetCreditTranEdit = (tranOrderId: number): AxiosPromise<ResponseResult<GetCreditTranEditResponse>> => {
  return service.get('/api2/Order/GetCreditTranEdit', { params: { tranOrderId } })
}

/** 新增教材杂费订单、批量增加教材杂费订单  成功则data返回创建成功订单id集合； */
export const ItemAndMiscAddSave = (
  request: ItemAndMiscSaveRequest
): AxiosPromise<ResponseResult<ItemOrderResponse>> => {
  return service.post('/api2/Order/ItemAndMiscAddSave', request)
}

/** 获取教材杂费编辑页面 */
export const GetItemAndMiscEdit = (tranOrderId: number): AxiosPromise<ResponseResult<GetItemAndMiscEditResponse>> => {
  return service.get('/api2/Order/GetItemAndMiscEdit', { params: { tranOrderId } })
}

/** 编辑教材杂费信息 */
export const ItemAndMiscEditSave = (request: ItemAndMiscEditRequest): AxiosPromise<ResponseResult<number>> => {
  return service.post('/api2/Order/ItemAndMiscEditSave', request)
}

/** 检验订单能否作废 */
export const CheckCanSaveTranOrderObsolete = (
  request: CheckCanSaveTranOrderObsoleteRequest
): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/Order/CheckCanSaveTranOrderObsolete', request)
}

/** 保存订单作废 */
export const SaveTranOrderObsolete = (request: SaveTranOrderObsoluteRequest): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/Order/SaveTranOrderObsolete', request)
}

/** 获取订单作废信息 */
export const GetTranOrderObsoleteInfo = (
  tranOrderId: number
): AxiosPromise<ResponseResult<GetTranOrderObsoleteInfoResponse>> => {
  return service.get('/api2/Order/GetTranOrderObsoleteInfo', { params: { tranOrderId } })
}

/** 获取学员账户列表 */
export const GetStuInfoAccountTranList = (
  stuInfoId: number,
  pageIndex: number,
  pageSize: number
): AxiosPromise<ResponseResult<PageResult<GetStuInfoAccountTranListResponse[]>>> => {
  return service.get('/api2/Order/GetStuInfoAccountTranList', { params: { stuInfoId, pageIndex, pageSize } })
}

/** 新建学员账户存款 */
export const AccountTranSave = (request: AccountTranSaveRequest): AxiosPromise<ResponseResult<number>> => {
  return service.post('/api2/Order/AccountTranSave', request)
}

/** 编辑学员账户存款订单 */
export const AccountTranEdit = (request: AccountTranEditRequest): AxiosPromise<ResponseResult<number>> => {
  return service.post('/api2/Order/AccountTranEdit', request)
}

/** 获取学员账户编辑页面 */
export const GetAccountTranEdit = (tranOrderId: number): AxiosPromise<ResponseResult<GetAccountTranEditResponse>> => {
  return service.get('/api2/Order/GetAccountTranEdit', { params: { tranOrderId } })
}

/** 获取学员积分列表 */
export const GetStuInfoCreditList = (
  stuInfoId: number,
  pageIndex: number,
  pageSize: number
): AxiosPromise<ResponseResult<PageResult<GetStuInfoCreditListResponse[]>>> => {
  return service.get('/api2/Order/GetStuInfoCreditList', { params: { stuInfoId, pageIndex, pageSize } })
}

/** 获取营销方案 */
export const GetMarketingSolutionListData = (
  request: GetMarketingSolutionRequest
): AxiosPromise<ResponseResult<GetMarketingSolutionResponse>> => {
  return service.post('/api2/Order/GetMarketingSolutionListData', request)
}

/** 获取交易列表 */
export const GetReportTranListData = (
  request: GetReportTranListRequest
): AxiosPromise<ResponseResult<PageResult<SelectReportTranListResponse[]>>> => {
  return service.post('/api2/Order/GetReportTranListData', request)
}

/** 获取交易列表报表Excel */
export const GetReportTranListDataExcel = (
  request: GetReportTranListExportRequest
): AxiosPromise<ResponseResult<string>> => {
  return service.post('/api2/Order/GetReportTranListDataExcel', request)
}

/** 获取订单列表 */
export const GetTranOrderListData = (
  request: GetTranOrderListDataRequest
): AxiosPromise<ResponseResult<PageResult<GetTranOrderListDataResponse[]>>> => {
  return service.post('/api2/Order/GetTranOrderListData', request)
}

/** 订单列表导出 */
export const TranOrderListDataExport = (
  request: TranOrderListDataExportRequest
): AxiosPromise<ResponseResult<string>> => {
  return service.post('/api2/Order/TranOrderListDataExport', request)
}

/** 获取订单列表统计 */
export const GetTranOrderListDataStatistics = (
  request: GetTranOrderListDataStatisticsRequest
): AxiosPromise<ResponseResult<GetTranOrderListDataStatisticsResponse>> => {
  return service.post('/api2/Order/GetTranOrderListDataStatistics', request)
}

/** 我的今日/校区今日 */
export const PrintMyDay = (request: PrintMyDayRequest): AxiosPromise<ResponseResult<PrintMyDayResponse>> => {
  return service.post('/api2/Order/PrintMyDay', request)
}

/** 更新订单是否确认到款 */
export const TranorderAccountDetailIsConfirmUpdate = (
  req: TranorderAccountDetailIsConfirmUpdateRequest
): AxiosPromise<ResponseResult_1> => {
  return service.post('/api2/Order/TranorderAccountDetailIsConfirmUpdate', req)
}

/** 用于订单列表，获取报读多科的报名订单备注 */
export const GetTranOrderFeeTranCommentList = (
  req: GetTranOrderFeeTranCommentListRequest
): AxiosPromise<ResponseResult<GetTranOrderFeeTranCommentListResponse[]>> => {
  return service.post('/api2/Order/GetTranOrderFeeTranCommentList', req)
}

/** 验证是否可以退教材杂费（Data为bool值，表示是否可以退教材杂费） */
export const IsAllowReturnItemAndMisc = (req: IsAllowReturnItemAndMiscRequest): AxiosPromise<ResponseResult_1> => {
  return service.post('/api2/Order/IsAllowReturnItemAndMisc', req)
}

/** 获取打印订单数据 */
export const GetPrintOrderDetail = (tranOrderId: number): AxiosPromise<ResponseResult<GetPrintOrderDetailResponse>> => {
  return service.get('/api2/Order/GetPrintOrderDetail', { params: { tranOrderId } })
}

/** 打印听课证 */
export const PrintClassCardDetail = (
  tranOrderId: number
): AxiosPromise<ResponseResult<PrintClassCardDetailResponse>> => {
  return service.get('/api2/Order/PrintClassCardDetail', { params: { tranOrderId } })
}

/** 根据id获取订单 */
export const GetTranOrderById = (request: GetTranOrderByIdRequest): AxiosPromise<ResponseResult<TranOrder>> => {
  return service.post('/api2/Order/GetTranOrderById', request)
}

/** 要退费的教材杂项 */
export const GetReturnOrderItemTranList = (request: SaveReturnOrderRequest): AxiosPromise<null> => {
  return service.post('/api2/Order/GetReturnOrderItemTranList', request)
}

/** 新建报名保存 */
export const SaveEnroll = (request: SaveEnrollRequest): AxiosPromise<ResponseResult<number>> => {
  return service.post('/api2/Order/SaveEnroll', request)
}

/** 编辑报名保存 */
export const SaveEnrollForModify = (request: SaveEnrollRequest): AxiosPromise<ResponseResult<number>> => {
  return service.post('/api2/Order/SaveEnrollForModify', request)
}

/** 报名分班失败重新分班 */
export const AssignClassForEnrollFailed = (
  request: AssignClassForEnrollFailedRequest
): AxiosPromise<ResponseResult<number>> => {
  return service.post('/api2/Order/AssignClassForEnrollFailed', request)
}

/** 报名排座失败重新排座 */
export const CreateStuDocSeatForEnrollFailed = (
  request: CreateStuDocSeatForEnrollFailedRequest
): AxiosPromise<ResponseResult<number>> => {
  return service.post('/api2/Order/CreateStuDocSeatForEnrollFailed', request)
}

/** 根据订单id获取报名结果失败信息 */
export const GetEnrollResultByTranOrderId = (
  tranOrderId: number
): AxiosPromise<ResponseResult<GetEnrollResultByTranOrderIdResponse>> => {
  return service.get('/api2/Order/GetEnrollResultByTranOrderId', { params: { tranOrderId } })
}

/** 根据学员id获取在读课程信息 */
export const GetStudyingLessonInfoByStuInfoId = (
  stuInfoId: number
): AxiosPromise<ResponseResult<GetStudyingLessonInfoByStuInfoIdResponse>> => {
  return service.get('/api2/Order/GetStudyingLessonInfoByStuInfoId', { params: { stuInfoId } })
}

/** 根据学费账户id获取下期课程信息(升期报名) */
export const GetNextLessonInfoByStuFeeDocId = (
  stuFeeDocId: number
): AxiosPromise<ResponseResult<GetNextLessonInfoByStuFeeDocIdResponse>> => {
  return service.get('/api2/Order/GetNextLessonInfoByStuFeeDocId', { params: { stuFeeDocId } })
}

/** 根据学费账户id获取当前课程信息 */
export const GetCurrentLessonInfoByStuFeeDocId = (
  stuFeeDocId: number
): AxiosPromise<ResponseResult<GetCurrentLessonInfoByStuFeeDocIdResponse>> => {
  return service.get('/api2/Order/GetCurrentLessonInfoByStuFeeDocId', { params: { stuFeeDocId } })
}

/** 根据选择课程以及校区id获取课程详情以及对应收费模式数据 */
export const GetLessonFeeInfoByLessonIdAndSchoolId = (
  schoolId: number,
  lessonId: number
): AxiosPromise<ResponseResult<GetLessonFeeInfoByLessonIdAndSchoolIdResponse>> => {
  return service.get('/api2/Order/GetLessonFeeInfoByLessonIdAndSchoolId', { params: { schoolId, lessonId } })
}

/** 根据欠费订单id获取补费列表数据 */
export const GetRepairTranByArrearageTranOrderId = (
  request: GetRepairTranByArrearageTranOrderIdRequest
): AxiosPromise<ResponseResult<GetRepairTranByArrearageTranOrderIdResponse[]>> => {
  return service.post('/api2/Order/GetRepairTranByArrearageTranOrderId', request)
}

/** 根据订单Id，获取订单下【校宝收银】账户收支明细收银二维码信息 */
export const GetSpcpayQrCodeInfo = (tranOrderId: number): AxiosPromise<ResponseResult<SpcPayQrCodeDto>> => {
  return service.get('/api2/Order/GetSpcpayQrCodeInfo', { params: { tranOrderId } })
}

/** 获取云支付平台支付结果接口 */
export const GetScpPaymentResult = (
  accountDetailId: number
): AxiosPromise<ResponseResult<ScpPaymentResultResponseData>> => {
  return service.get('/api2/Order/GetScpPaymentResult', { params: { accountDetailId } })
}

/** 根据订单id和经办校区id，获得账户和明细列表，支付组件调用 */
export const GetAccountDetailListByTranOrderId = (
  tranOrderId: number,
  schoolId: number,
  stufeedocId: number,
  isTrackRemain: boolean
): AxiosPromise<ResponseResult<GetAccountDetailListByTranOrderIdResponse[]>> => {
  return service.get('/api2/Order/GetAccountDetailListByTranOrderId', {
    params: { tranOrderId, schoolId, stufeedocId, isTrackRemain }
  })
}

/** 获取机构下账户的收款方式列表 */
export const GetAccountPaymentMethods = (
  isOpenBarcodeScanner: boolean
): AxiosPromise<ResponseResult<GetAccountPaymentMethodsResponse[]>> => {
  return service.get('/api2/Order/GetAccountPaymentMethods', { params: { isOpenBarcodeScanner } })
}

/** 获取订单详情 */
export const GetOrderEditDetail = (tranOrderId: number): AxiosPromise<ResponseResult<TranOrderDetail>> => {
  return service.get('/api2/Order/GetOrderEditDetail', { params: { tranOrderId } })
}

/** 批量续费/升期 */
export const SaveReNewList = (request: SaveReNewListRequest): AxiosPromise<ResponseResult<TranOrderResponse[]>> => {
  return service.post('/api2/Order/SaveReNewList', request)
}

/** 根据机构封账状态和类型判断是否可以进行操作  根据时间判断 */
export const CheckFreezeTranByDate = (dealDate: string, isCreating: boolean): AxiosPromise<ResponseResult<boolean>> => {
  return service.get('/api2/Order/CheckFreezeTranByDate', { params: { dealDate, isCreating } })
}

/** 根据机构封账状态和类型判断是否可以进行操作  根据id判断 */
export const CheckFreezeTranByAccountDetailId = (accountDetailId: number): AxiosPromise<ResponseResult<boolean>> => {
  return service.get('/api2/Order/CheckFreezeTranByAccountDetailId', { params: { accountDetailId } })
}

/** 新建转课保存 */
export const AddTransfor = (request: AddTransforTranRequest): AxiosPromise<ResponseResult<number>> => {
  return service.post('/api2/Order/AddTransfor', request)
}

/** 编辑转课保存 */
export const EditTransfor = (request: EditTransforTranRequest): AxiosPromise<ResponseResult<number>> => {
  return service.post('/api2/Order/EditTransfor', request)
}

/** 获取转课编辑数据 */
export const GetEditTransfor = (tranOrderId: number): AxiosPromise<ResponseResult<EditTransforTranResponse>> => {
  return service.get('/api2/Order/GetEditTransfor', { params: { tranOrderId } })
}

/** 批量转课 */
export const SaveBatchTransfor = (
  request: BatchAddTransforRequest
): AxiosPromise<ResponseResult<TranOrderResponse[]>> => {
  return service.post('/api2/Order/SaveBatchTransfor', request)
}

/** 获取批量转课转出信息 */
export const GetBatchTransforOutLessonStuInfo = (
  data: BatchStuDocIdsRequest
): AxiosPromise<ResponseResult<BatchTransforOutLessonAndStuResponse>> => {
  return service.post('/api2/Order/GetBatchTransforOutLessonStuInfo', data)
}

/** 根据学员获取欠费交易列表 */
export const GetArrearageTransForStuInfo = (
  stuInfoId: number
): AxiosPromise<ResponseResult<GetArrearageTranResponse[]>> => {
  return service.get('/api2/Order/GetArrearageTransForStuInfo', { params: { stuInfoId } })
}

/** 新建补费交易 */
export const SaveRepairTranOrder = (req: SaveRepairTranOrderRequest): AxiosPromise<ResponseResult<number>> => {
  return service.post('/api2/Order/SaveRepairTranOrder', req)
}

/** 获取要编辑的补费订单信息 */
export const GetRepairTranByTranOrderId = (
  tranOrderId: number
): AxiosPromise<ResponseResult<GetRepairTranOrderResponse>> => {
  return service.get('/api2/Order/GetRepairTranByTranOrderId', { params: { tranOrderId } })
}

/** 更新补费订单数据 */
export const UpdateRepairTranOrder = (req: UpdateRepairTranOrderRequest): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/Order/UpdateRepairTranOrder', req)
}

/** 获取退费方式 */
export const GetRefundType = (tranOrderId: number): AxiosPromise<ResponseResult<GetRefunTypeResponse>> => {
  return service.get('/api2/Order/GetRefundType', { params: { tranOrderId } })
}

/** 根据学员Id获取课程,在读或停课的学费账户 */
export const GetLessonByStuInfoId = (
  stuinfoId: number
): AxiosPromise<ResponseResult<GetLessonByStuInfoIdResponse[]>> => {
  return service.get('/api2/Order/GetLessonByStuInfoId', { params: { stuinfoId } })
}

/** 获取学员购买的教材杂项 */
export const GetStuItemTrans = (
  stuInfoId: number,
  tranOrderId: number
): AxiosPromise<ResponseResult<GetStuItemTranResponse[]>> => {
  return service.get('/api2/Order/GetStuItemTrans', { params: { stuInfoId, tranOrderId } })
}

/** 获取学员可退学费列表 */
export const GetStuLeftFee = (stuFeeDocId: number): AxiosPromise<ResponseResult<GetStuLeftFeeResponse>> => {
  return service.get('/api2/Order/GetStuLeftFee', { params: { stuFeeDocId } })
}

/** 获取学员账户信息（余额） */
export const GetStuAccountInfo = (stuinfoId: number): AxiosPromise<ResponseResult<GetStuAccountInfoResponse>> => {
  return service.get('/api2/Order/GetStuAccountInfo', { params: { stuinfoId } })
}

/** 保存学费退费 */
export const SaveReturnOrder = (request: ReturnFeeOrderRequest): AxiosPromise<ResponseResult<number>> => {
  return service.post('/api2/Order/SaveReturnOrder', request)
}

/** 编辑学费退费 */
export const ReturnOrderEditSave = (request: ReturnOrderEditRequest): AxiosPromise<ResponseResult<number>> => {
  return service.post('/api2/Order/ReturnOrderEditSave', request)
}

/** 编辑学费退费详情 */
export const ReturnFeeTranDetail = (tranOrderId: number): AxiosPromise<ResponseResult<ReturnFeeTranDetailResponse>> => {
  return service.get('/api2/Order/ReturnFeeTranDetail', { params: { tranOrderId } })
}

/** 教材杂费退费 */
export const ItemAndMiscSave = (request: ItemTranPackageRequest): AxiosPromise<ResponseResult<number>> => {
  return service.post('/api2/Order/ItemAndMiscSave', request)
}

/** 获取编辑教材杂费退费信息 */
export const GetItemAndMiscRefundEdit = (
  tranOrderId: number
): AxiosPromise<ResponseResult<GetItemAndMiscRefundEditResponse>> => {
  return service.get('/api2/Order/GetItemAndMiscRefundEdit', { params: { tranOrderId } })
}

/** 教材杂费退费编辑保存 */
export const ItemAndMiscRefundEditSave = (
  request: ItemTranPackageEditRequest
): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/Order/ItemAndMiscRefundEditSave', request)
}

/** 保存学员账户退费 */
export const SaveAccountRefundTran = (request: SaveAccountTranRequest): AxiosPromise<ResponseResult<number>> => {
  return service.post('/api2/Order/SaveAccountRefundTran', request)
}

/** 编辑学员账户退费 */
export const EditAccountTran = (request: SaveAccountTranRequest): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/Order/EditAccountTran', request)
}

/** 学员账户编辑详情 */
export const AccountRefundTranDetail = (
  tranOrderId: number
): AxiosPromise<ResponseResult<GetAccoutTranDetailResponse>> => {
  return service.get('/api2/Order/AccountRefundTranDetail', { params: { tranOrderId } })
}
