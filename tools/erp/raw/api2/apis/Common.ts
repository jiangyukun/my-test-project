import service from './../../api/net'
import { AxiosPromise } from 'axios'
import SchoolPalToolkitResponse from './../types/SchoolPalToolkitResponse'
import SchoolPalWebAuthentication from './../types/SchoolPalWebAuthentication'
import SchoolPalWebModelResponse from './../types/SchoolPalWebModelResponse'
import SchoolPalWebModelRequest from './../types/SchoolPalWebModelRequest'
import SchoolPalCloudServiceModel from './../types/SchoolPalCloudServiceModel'
import SchoolPalWebModel from './../types/SchoolPalWebModel'
import ResponseResult = SchoolPalToolkitResponse.ResponseResult
import CurrentUser = SchoolPalWebAuthentication.CurrentUser
import OrgAuthorityResponse = SchoolPalWebModelResponse.OrgAuthorityResponse
import SchoolModelResponse = SchoolPalWebModelResponse.SchoolModelResponse
import SelectEmployeeFetchDataResponse = SchoolPalWebModelResponse.SelectEmployeeFetchDataResponse
import SelectClassForTurnToFetchDataByLessonResponse = SchoolPalWebModelResponse.SelectClassForTurnToFetchDataByLessonResponse
import GetSchoolListRequest = SchoolPalWebModelRequest.GetSchoolListRequest
import SelectEmployeeFetchDataRequest = SchoolPalWebModelRequest.SelectEmployeeFetchDataRequest
import SelectClassForTurnToFetchDataByLessonRequest = SchoolPalWebModelRequest.SelectClassForTurnToFetchDataByLessonRequest
import PageResult = SchoolPalCloudServiceModel.PageResult
import PagedQueryBase = SchoolPalWebModel.PagedQueryBase

/** 获取当前用户的信息 */
export const GetUserInfo = (): AxiosPromise<ResponseResult<CurrentUser>> => {
  return service.get('/api2/Common/GetUserInfo')
}

/** 获取当前用户的信息 */
export const GetUserAuthoritys = (): AxiosPromise<ResponseResult<number[]>> => {
  return service.get('/api2/Common/GetUserAuthoritys')
}

/** 获取机构权限 */
export const GetOrgAuthoritys = (): AxiosPromise<ResponseResult<OrgAuthorityResponse[]>> => {
  return service.get('/api2/Common/GetOrgAuthoritys')
}

/** 获取办理订单时的销售来源 */
export const GetSalesSources = (): AxiosPromise<ResponseResult<string[]>> => {
  return service.get('/api2/Common/GetSalesSources')
}

/** 获取校区列表 */
export const GetSchoolList = (
  request: GetSchoolListRequest
): AxiosPromise<ResponseResult<PageResult<SchoolModelResponse[]>>> => {
  return service.post('/api2/Common/GetSchoolList', request)
}

/** 获取上次交易的校区Id */
export const GetLastSchoolIdByTran = (): AxiosPromise<ResponseResult<number>> => {
  return service.get('/api2/Common/GetLastSchoolIdByTran')
}

/** 获取公立校班级名称 */
export const GetGradeList = (req: PagedQueryBase): AxiosPromise<ResponseResult<PageResult<string[]>>> => {
  return service.post('/api2/Common/GetGradeList', req)
}

/** 获取公立学校集合 */
export const GetPubSchoolList = (req: PagedQueryBase): AxiosPromise<ResponseResult<PageResult<string[]>>> => {
  return service.post('/api2/Common/GetPubSchoolList', req)
}

/** 获取员工组件分页数据 */
export const SelectEmployeeFetchData = (
  request: SelectEmployeeFetchDataRequest
): AxiosPromise<ResponseResult<PageResult<SelectEmployeeFetchDataResponse[]>>> => {
  return service.post('/api2/Common/SelectEmployeeFetchData', request)
}

/** 获取分班弹窗班级列表 */
export const SelectClassForTurnToFetchDataByLesson = (
  request: SelectClassForTurnToFetchDataByLessonRequest
): AxiosPromise<ResponseResult<PageResult<SelectClassForTurnToFetchDataByLessonResponse[]>>> => {
  return service.post('/api2/Common/SelectClassForTurnToFetchDataByLesson', request)
}
