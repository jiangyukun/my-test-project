import service from './../../api/net'
import { AxiosPromise } from 'axios'
import SchoolPalWebModelRequest from './../types/SchoolPalWebModelRequest'
import SchoolPalToolkitResponse from './../types/SchoolPalToolkitResponse'
import SchoolPalWebModelResponse from './../types/SchoolPalWebModelResponse'
import SchoolPalCloudServiceModel from './../types/SchoolPalCloudServiceModel'
import GetItemDataRequest = SchoolPalWebModelRequest.GetItemDataRequest
import GetAllItemRequest = SchoolPalWebModelRequest.GetAllItemRequest
import SelectTeachingItemFetchDataRequest = SchoolPalWebModelRequest.SelectTeachingItemFetchDataRequest
import GetItemDataByLessonIdsRequest = SchoolPalWebModelRequest.GetItemDataByLessonIdsRequest
import GetLessonPackItemDataByLessonIdRequest = SchoolPalWebModelRequest.GetLessonPackItemDataByLessonIdRequest
import ResponseResult = SchoolPalToolkitResponse.ResponseResult
import GetItemDataResponse = SchoolPalWebModelResponse.GetItemDataResponse
import GetAllItemResponse = SchoolPalWebModelResponse.GetAllItemResponse
import SelectTeachingItemFetchDataDto = SchoolPalWebModelResponse.SelectTeachingItemFetchDataDto
import GetItemDataByLessonIdsResponse = SchoolPalWebModelResponse.GetItemDataByLessonIdsResponse
import GetLessonPackItemDataByLessonIdResponse = SchoolPalWebModelResponse.GetLessonPackItemDataByLessonIdResponse
import PageResult = SchoolPalCloudServiceModel.PageResult

/** 获取教材杂项列表 */
export const GetItemData = (req: GetItemDataRequest): AxiosPromise<ResponseResult<GetItemDataResponse>> => {
  return service.post('/api2/Item/GetItemData', req)
}

/** 获取机构下所有的教材杂费信息 */
export const GetItemDataAll = (): AxiosPromise<ResponseResult<GetItemDataResponse>> => {
  return service.post('/api2/Item/GetItemDataAll', {})
}

/** 获取机构所有教材杂费 */
export const GetAllItem = (req: GetAllItemRequest): AxiosPromise<ResponseResult<PageResult<GetAllItemResponse[]>>> => {
  return service.post('/api2/Item/GetAllItem', req)
}

/** 积分兑换中获取兑换教材数据 */
export const SelectTeachingItemFetchData = (
  request: SelectTeachingItemFetchDataRequest
): AxiosPromise<ResponseResult<PageResult<SelectTeachingItemFetchDataDto[]>>> => {
  return service.post('/api2/Item/SelectTeachingItemFetchData', request)
}

/** 根据课程id获取教材杂项列表 */
export const GetItemDataByLessonIds = (
  req: GetItemDataByLessonIdsRequest
): AxiosPromise<ResponseResult<PageResult<GetItemDataByLessonIdsResponse[]>>> => {
  return service.post('/api2/Item/GetItemDataByLessonIds', req)
}

/** 根据课程id获取课程包教材杂项列表 */
export const GetLessonPackItemDataByLessonId = (
  req: GetLessonPackItemDataByLessonIdRequest
): AxiosPromise<ResponseResult<GetLessonPackItemDataByLessonIdResponse[]>> => {
  return service.post('/api2/Item/GetLessonPackItemDataByLessonId', req)
}
