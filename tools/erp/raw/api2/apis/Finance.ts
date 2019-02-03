import service from './../../api/net'
import { AxiosPromise } from 'axios'
import SchoolPalWebModelRequest from './../types/SchoolPalWebModelRequest'
import SchoolPalToolkitResponse from './../types/SchoolPalToolkitResponse'
import SchoolPalWebModelResponse from './../types/SchoolPalWebModelResponse'
import SchoolPalCloudServiceModel from './../types/SchoolPalCloudServiceModel'
import GetExpenditureClassListRequest = SchoolPalWebModelRequest.GetExpenditureClassListRequest
import GetIncomeItemListRequest = SchoolPalWebModelRequest.GetIncomeItemListRequest
import ExpenditureClassRequest = SchoolPalWebModelRequest.ExpenditureClassRequest
import EditExpenditureClassRequest = SchoolPalWebModelRequest.EditExpenditureClassRequest
import DelExpenditureClassRequest = SchoolPalWebModelRequest.DelExpenditureClassRequest
import ExpenditureItemRequest = SchoolPalWebModelRequest.ExpenditureItemRequest
import EditExpenditureItemRequest = SchoolPalWebModelRequest.EditExpenditureItemRequest
import DelExpenditureItemRequest = SchoolPalWebModelRequest.DelExpenditureItemRequest
import BatchChangeAccountDetailStateRequest = SchoolPalWebModelRequest.BatchChangeAccountDetailStateRequest
import GetAccountListDataRequest = SchoolPalWebModelRequest.GetAccountListDataRequest
import GetAccountNameListData = SchoolPalWebModelRequest.GetAccountNameListData
import AccountAddRequest = SchoolPalWebModelRequest.AccountAddRequest
import AccountEditRequest = SchoolPalWebModelRequest.AccountEditRequest
import AccountDelRequest = SchoolPalWebModelRequest.AccountDelRequest
import GetAffirmIncomeListDataRequest = SchoolPalWebModelRequest.GetAffirmIncomeListDataRequest
import GetAccountDetailListDataRequest = SchoolPalWebModelRequest.GetAccountDetailListDataRequest
import GetAccountDetailByIdResponse = SchoolPalWebModelRequest.GetAccountDetailByIdResponse
import ResponseResult = SchoolPalToolkitResponse.ResponseResult
import GetExpenditureItemsResponse = SchoolPalWebModelResponse.GetExpenditureItemsResponse
import GetAccountListDataResponse = SchoolPalWebModelResponse.GetAccountListDataResponse
import AccountResponse = SchoolPalWebModelResponse.AccountResponse
import GetAccountInfoDataResponse = SchoolPalWebModelResponse.GetAccountInfoDataResponse
import GetAffirmIncomeListDataResponse = SchoolPalWebModelResponse.GetAffirmIncomeListDataResponse
import GetAffirmIncomeStuEndClassInfoResponse = SchoolPalWebModelResponse.GetAffirmIncomeStuEndClassInfoResponse
import GetAccountDetailListDataResponse = SchoolPalWebModelResponse.GetAccountDetailListDataResponse
import GetAccountDetailListStatisticsResponse = SchoolPalWebModelResponse.GetAccountDetailListStatisticsResponse
import GetExpenditureItemByTypeResponse = SchoolPalWebModelResponse.GetExpenditureItemByTypeResponse
import PageResult = SchoolPalCloudServiceModel.PageResult

/** 获取收支大类列表 */
export const GetExpenditureClassList = (
  request: GetExpenditureClassListRequest
): AxiosPromise<ResponseResult<GetExpenditureItemsResponse>> => {
  return service.post('/api2/Finance/GetExpenditureClassList', request)
}

/** 获取其他收入列表 */
export const GetIncomeItemList = (
  request: GetIncomeItemListRequest
): AxiosPromise<ResponseResult<GetExpenditureItemsResponse>> => {
  return service.post('/api2/Finance/GetIncomeItemList', request)
}

/** 新增收支大类 */
export const ExpenditureClassAdd = (request: ExpenditureClassRequest): AxiosPromise<ResponseResult<number>> => {
  return service.post('/api2/Finance/ExpenditureClassAdd', request)
}

/** 收支大类修改 */
export const ExpenditureClassEdit = (request: EditExpenditureClassRequest): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/Finance/ExpenditureClassEdit', request)
}

/** 支出大类删除 */
export const ExpenditureClassDel = (request: DelExpenditureClassRequest): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/Finance/ExpenditureClassDel', request)
}

/** 新增支出项目 */
export const ExpenditureItemAdd = (request: ExpenditureItemRequest): AxiosPromise<ResponseResult<number>> => {
  return service.post('/api2/Finance/ExpenditureItemAdd', request)
}

/** 收支项目修改 */
export const ExpenditureitemEdit = (request: EditExpenditureItemRequest): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/Finance/ExpenditureitemEdit', request)
}

/** 支出项目删除 */
export const ExpenditureitemDel = (request: DelExpenditureItemRequest): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/Finance/ExpenditureitemDel', request)
}

/** 判断收支项目能否删除 */
export const CheckDeleteExpenditureItem = (
  request: DelExpenditureItemRequest
): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/Finance/CheckDeleteExpenditureItem', request)
}

/** （批量）确认/取消到款 */
export const BatchChangeAccountDetailState = (
  request: BatchChangeAccountDetailStateRequest
): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/Finance/BatchChangeAccountDetailState', request)
}

/** 根据经办校区获取账户 */
export const GetAccountListBySchoolList = (
  request: GetAccountListDataRequest
): AxiosPromise<ResponseResult<GetAccountListDataResponse<AccountResponse[]>>> => {
  return service.post('/api2/Finance/GetAccountListBySchoolList', request)
}

/** 账户名字列表数据 */
export const GetAccountNameListData = (
  request: GetAccountNameListData
): AxiosPromise<ResponseResult<GetAccountListDataResponse<AccountResponse[]>>> => {
  return service.post('/api2/Finance/GetAccountNameListData', request)
}

/** 账户列表数据 */
export const GetAccountListData = (
  request: GetAccountListDataRequest
): AxiosPromise<ResponseResult<GetAccountListDataResponse<AccountResponse[]>>> => {
  return service.post('/api2/Finance/GetAccountListData', request)
}

/** 新增 / 编辑时需要获取账户信息（GET） */
export const GetAccountInfoData = (accountId: number): AxiosPromise<ResponseResult<GetAccountInfoDataResponse>> => {
  return service.get('/api2/Finance/GetAccountInfoData', { params: { accountId } })
}

/** 新增账户 */
export const AccountAdd = (request: AccountAddRequest): AxiosPromise<ResponseResult<number>> => {
  return service.post('/api2/Finance/AccountAdd', request)
}

/** 判断账户能不能被当前登录用户编辑 */
export const CheckAccountEditable = (accountId: number): AxiosPromise<ResponseResult<string>> => {
  return service.get('/api2/Finance/CheckAccountEditable', { params: { accountId } })
}

/** 判断账户能不能被当前登录用户删除 */
export const CheckAccountDeleteable = (accountId: number): AxiosPromise<ResponseResult<boolean>> => {
  return service.get('/api2/Finance/CheckAccountDeleteable', { params: { accountId } })
}

/** 编辑账户 */
export const AccountEdit = (request: AccountEditRequest): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/Finance/AccountEdit', request)
}

/** 账户删除 */
export const AccountDel = (request: AccountDelRequest): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/Finance/AccountDel', request)
}

/** 获取确认收入列表 */
export const GetAffirmIncomeListData = (
  request: GetAffirmIncomeListDataRequest
): AxiosPromise<ResponseResult<GetAffirmIncomeListDataResponse>> => {
  return service.post('/api2/Finance/GetAffirmIncomeListData', request)
}

/** 获取学员结课信息 */
export const GetAffirmIncomeStuEndClassInfo = (
  id: number
): AxiosPromise<ResponseResult<GetAffirmIncomeStuEndClassInfoResponse>> => {
  return service.get('/api2/Finance/GetAffirmIncomeStuEndClassInfo', { params: { id } })
}

/** 收支明细列表 */
export const GetAccountDetailListData = (
  req: GetAccountDetailListDataRequest
): AxiosPromise<ResponseResult<PageResult<GetAccountDetailListDataResponse[]>>> => {
  return service.post('/api2/Finance/GetAccountDetailListData', req)
}

/** 支付明细列表数据统计 */
export const GetAccountDetailListStatistics = (
  req: GetAccountDetailListDataRequest
): AxiosPromise<ResponseResult<GetAccountDetailListStatisticsResponse>> => {
  return service.post('/api2/Finance/GetAccountDetailListStatistics', req)
}

/** 判断当前机构是否用收银宝账户 */
export const HaveScpAccount = (): AxiosPromise<ResponseResult<boolean>> => {
  return service.get('/api2/Finance/HaveScpAccount')
}

/** 获取交易流水详情 */
export const GetAccountDetailById = (
  accountDetailId: number
): AxiosPromise<ResponseResult<GetAccountDetailByIdResponse>> => {
  return service.get('/api2/Finance/GetAccountDetailById', { params: { accountDetailId } })
}

/** 根据类型获取收支项目 */
export const GetExpenditureItemByType = (
  type: number
): AxiosPromise<ResponseResult<GetExpenditureItemByTypeResponse[]>> => {
  return service.get('/api2/Finance/GetExpenditureItemByType', { params: { type } })
}
