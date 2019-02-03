import service from './../../api/net'
import { AxiosPromise } from 'axios'
import SchoolPalToolkitResponse from './../types/SchoolPalToolkitResponse'
import SchoolPalCloudServiceModel from './../types/SchoolPalCloudServiceModel'
import SchoolPalWebModelResponse from './../types/SchoolPalWebModelResponse'
import SchoolPalWebModelRequest from './../types/SchoolPalWebModelRequest'
import ResponseResult = SchoolPalToolkitResponse.ResponseResult
import PageResult = SchoolPalCloudServiceModel.PageResult
import GetTrialListResponse = SchoolPalWebModelResponse.GetTrialListResponse
import UpdateTrialStatusRequest = SchoolPalWebModelRequest.UpdateTrialStatusRequest

/** 获取试听记录列表 */
export const GetTrialList = (
  stuInfoId: number,
  pageIndex: number,
  pageSize: number
): AxiosPromise<ResponseResult<PageResult<GetTrialListResponse[]>>> => {
  return service.get('/api2/Trial/GetTrialList', { params: { stuInfoId, pageIndex, pageSize } })
}

/** 更新试听状态 */
export const UpdateTrialStatus = (request: UpdateTrialStatusRequest): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/Trial/UpdateTrialStatus', request)
}
