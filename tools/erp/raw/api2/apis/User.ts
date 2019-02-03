import service from './../../api/net'
import { AxiosPromise } from 'axios'
import SchoolPalToolkitResponse from './../types/SchoolPalToolkitResponse'
import SchoolPalWebModelResponse from './../types/SchoolPalWebModelResponse'
import SchoolPalWebModelRequest from './../types/SchoolPalWebModelRequest'
import SchoolPalCloudServiceModel from './../types/SchoolPalCloudServiceModel'
import ResponseResult = SchoolPalToolkitResponse.ResponseResult
import UserInfoResponse = SchoolPalWebModelResponse.UserInfoResponse
import SchoolModelResponse = SchoolPalWebModelResponse.SchoolModelResponse
import GetUserCenterResponse = SchoolPalWebModelResponse.GetUserCenterResponse
import GetUserSchoolsRequest = SchoolPalWebModelRequest.GetUserSchoolsRequest
import PageResult = SchoolPalCloudServiceModel.PageResult

/** 登出接口 */
export const Logout = (): AxiosPromise<ResponseResult<boolean>> => {
  return service.get('/api2/User/Logout')
}

/** 获取当前用户 */
export const GetUserInfo = (): AxiosPromise<ResponseResult<UserInfoResponse>> => {
  return service.get('/api2/User/GetUserInfo')
}

/** 获取当前用户的权限校区 */
export const GetUserSchools = (
  request: GetUserSchoolsRequest
): AxiosPromise<ResponseResult<PageResult<SchoolModelResponse[]>>> => {
  return service.post('/api2/User/GetUserSchools', request)
}

/** 获取个人中心 */
export const GetUserCenter = (): AxiosPromise<ResponseResult<GetUserCenterResponse>> => {
  return service.get('/api2/User/GetUserCenter')
}
