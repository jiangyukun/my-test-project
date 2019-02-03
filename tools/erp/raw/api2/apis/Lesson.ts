import service from './../../api/net'
import { AxiosPromise } from 'axios'
import SchoolPalWebModelRequest from './../types/SchoolPalWebModelRequest'
import SchoolPalToolkitResponse from './../types/SchoolPalToolkitResponse'
import SchoolPalWebModelResponse from './../types/SchoolPalWebModelResponse'
import SchoolPalCloudServiceModel from './../types/SchoolPalCloudServiceModel'
import CreateLessonTranRequest = SchoolPalWebModelRequest.CreateLessonTranRequest
import UpdateLessonTranRequest = SchoolPalWebModelRequest.UpdateLessonTranRequest
import GetSameLessonNameByExtendRequest = SchoolPalWebModelRequest.GetSameLessonNameByExtendRequest
import GetLessonClassDataRequst = SchoolPalWebModelRequest.GetLessonClassDataRequst
import LessonQueryRequest = SchoolPalWebModelRequest.LessonQueryRequest
import SaveLessonClassRequest = SchoolPalWebModelRequest.SaveLessonClassRequest
import DelLessonClassRequest = SchoolPalWebModelRequest.DelLessonClassRequest
import SelectLessonInfoFetchDataRequest = SchoolPalWebModelRequest.SelectLessonInfoFetchDataRequest
import GetLessonDataRequest = SchoolPalWebModelRequest.GetLessonDataRequest
import GetLessonDataStatisticalRequest = SchoolPalWebModelRequest.GetLessonDataStatisticalRequest
import BatchStopLessonRequest = SchoolPalWebModelRequest.BatchStopLessonRequest
import BatchDeleteLessonRequest = SchoolPalWebModelRequest.BatchDeleteLessonRequest
import DeleteLessonRequest = SchoolPalWebModelRequest.DeleteLessonRequest
import GetLessonUpgradeRelationshipsRequest = SchoolPalWebModelRequest.GetLessonUpgradeRelationshipsRequest
import IdRequest = SchoolPalWebModelRequest.IdRequest
import CreateLessonUpgradeRelationshipRequest = SchoolPalWebModelRequest.CreateLessonUpgradeRelationshipRequest
import EditLessonUpgradeRelationshipRequest = SchoolPalWebModelRequest.EditLessonUpgradeRelationshipRequest
import GetSelectLessonClassDataRequest = SchoolPalWebModelRequest.GetSelectLessonClassDataRequest
import BatchLessonExtendEditRequest = SchoolPalWebModelRequest.BatchLessonExtendEditRequest
import ResponseResult = SchoolPalToolkitResponse.ResponseResult
import GetLessonDetailResponse = SchoolPalWebModelResponse.GetLessonDetailResponse
import GetLessonClassDataResponse = SchoolPalWebModelResponse.GetLessonClassDataResponse
import LessonQueryResponseItem = SchoolPalWebModelResponse.LessonQueryResponseItem
import SelectLessonInfoFetchDataResponse = SchoolPalWebModelResponse.SelectLessonInfoFetchDataResponse
import GetLessonDataResponse = SchoolPalWebModelResponse.GetLessonDataResponse
import BatchDeleteLessonResponse = SchoolPalWebModelResponse.BatchDeleteLessonResponse
import GetLessonUpgradeRelationshipsResponse = SchoolPalWebModelResponse.GetLessonUpgradeRelationshipsResponse
import GetLessonUpgradeRelationshipResponse = SchoolPalWebModelResponse.GetLessonUpgradeRelationshipResponse
import GetPreviousLessonsByLessonIdResponse = SchoolPalWebModelResponse.GetPreviousLessonsByLessonIdResponse
import GetSelectLessonClassDataResponse = SchoolPalWebModelResponse.GetSelectLessonClassDataResponse
import PageResult = SchoolPalCloudServiceModel.PageResult

/** 创建课程业务 */
export const CreateLessonTran = (req: CreateLessonTranRequest): AxiosPromise<ResponseResult<number>> => {
  return service.post('/api2/Lesson/CreateLessonTran', req)
}

/** 更新课程 */
export const UpdateLessonTran = (req: UpdateLessonTranRequest): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/Lesson/UpdateLessonTran', req)
}

/** 校验课程名称是否存在 */
export const IsLessonNameExist = (name: string): AxiosPromise<ResponseResult<boolean>> => {
  return service.get('/api2/Lesson/IsLessonNameExist', { params: { name } })
}

/** 获取课程详情 */
export const GetLessonDetail = (lessonId: number): AxiosPromise<ResponseResult<GetLessonDetailResponse>> => {
  return service.get('/api2/Lesson/GetLessonDetail', { params: { lessonId } })
}

/** 根据课程扩展属性获取相似名称的个数,用于前端根据扩展属性生成课程名 */
export const GetSameLessonNamePrefixByExtend = (
  req: GetSameLessonNameByExtendRequest
): AxiosPromise<ResponseResult<number>> => {
  return service.post('/api2/Lesson/GetSameLessonNamePrefixByExtend', req)
}

/** 课程大类搜索 */
export const GetLessonClassData = (
  query: GetLessonClassDataRequst
): AxiosPromise<ResponseResult<PageResult<GetLessonClassDataResponse[]>>> => {
  return service.post('/api2/Lesson/GetLessonClassData', query)
}

/** 获取课程(可与课程类别联动) */
export const Query = (
  request: LessonQueryRequest
): AxiosPromise<ResponseResult<PageResult<LessonQueryResponseItem[]>>> => {
  return service.post('/api2/Lesson/Query', request)
}

/** 获取课程类别最大Id */
export const GetMaxLessonClassOrderId = (): AxiosPromise<ResponseResult<number>> => {
  return service.get('/api2/Lesson/GetMaxLessonClassOrderId')
}

/** 新增课程类别 */
export const AddLessonClass = (req: SaveLessonClassRequest): AxiosPromise<ResponseResult<number>> => {
  return service.post('/api2/Lesson/AddLessonClass', req)
}

/** 编辑课程类别 */
export const EditLessonClass = (req: SaveLessonClassRequest): AxiosPromise<ResponseResult<number>> => {
  return service.post('/api2/Lesson/EditLessonClass', req)
}

/** 删除课程分类 */
export const DeleteLessonClass = (req: DelLessonClassRequest): AxiosPromise<ResponseResult<number>> => {
  return service.post('/api2/Lesson/DeleteLessonClass', req)
}

/** 选课组件获取课程列表 */
export const SelectLessonInfoFetchData = (
  para: SelectLessonInfoFetchDataRequest
): AxiosPromise<ResponseResult<PageResult<SelectLessonInfoFetchDataResponse[]>>> => {
  return service.post('/api2/Lesson/SelectLessonInfoFetchData', para)
}

/** 获得课程列表 */
export const GetLessonData = (
  para: GetLessonDataRequest
): AxiosPromise<ResponseResult<PageResult<GetLessonDataResponse[]>>> => {
  return service.post('/api2/Lesson/GetLessonData', para)
}

/** 获得课程列表上架课程统计 */
export const GetLessonDataStatistical = (
  para: GetLessonDataStatisticalRequest
): AxiosPromise<ResponseResult<number>> => {
  return service.post('/api2/Lesson/GetLessonDataStatistical', para)
}

/** 批量下架课程 */
export const BatchStopLesson = (req: BatchStopLessonRequest): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/Lesson/BatchStopLesson', req)
}

/** 批量上架课程 */
export const BatchShowLesson = (req: BatchStopLessonRequest): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/Lesson/BatchShowLesson', req)
}

/**  */
export const BatchDeleteLesson = (
  req: BatchDeleteLessonRequest
): AxiosPromise<ResponseResult<BatchDeleteLessonResponse>> => {
  return service.post('/api2/Lesson/BatchDeleteLesson', req)
}

/** 删除课程 */
export const DeleteLesson = (req: DeleteLessonRequest): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/Lesson/DeleteLesson', req)
}

/** 获取课程升期关系列表 */
export const GetLessonUpgradeRelationships = (
  request: GetLessonUpgradeRelationshipsRequest
): AxiosPromise<ResponseResult<PageResult<GetLessonUpgradeRelationshipsResponse[]>>> => {
  return service.post('/api2/Lesson/GetLessonUpgradeRelationships', request)
}

/** 获取课程升期关系 */
export const GetLessonUpgradeRelationship = (
  id: number
): AxiosPromise<ResponseResult<GetLessonUpgradeRelationshipResponse>> => {
  return service.get('/api2/Lesson/GetLessonUpgradeRelationship', { params: { id } })
}

/** 删除课程升期关系列表 */
export const DeleteLessonUpgradeRelationship = (request: IdRequest): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/Lesson/DeleteLessonUpgradeRelationship', request)
}

/** 创建课程升期关系 */
export const CreateLessonUpgradeRelationship = (
  request: CreateLessonUpgradeRelationshipRequest
): AxiosPromise<ResponseResult<number>> => {
  return service.post('/api2/Lesson/CreateLessonUpgradeRelationship', request)
}

/** 编辑课程升期关系 */
export const EditLessonUpgradeRelationship = (
  request: EditLessonUpgradeRelationshipRequest
): AxiosPromise<ResponseResult<number>> => {
  return service.post('/api2/Lesson/EditLessonUpgradeRelationship', request)
}

/** 根据课程升期关系的课程对应的上期课程 */
export const GetPreviousLessonsByLessonId = (
  lessonId: number
): AxiosPromise<ResponseResult<GetPreviousLessonsByLessonIdResponse>> => {
  return service.get('/api2/Lesson/GetPreviousLessonsByLessonId', { params: { lessonId } })
}

/** 筛选项组件 课程类别搜索 */
export const GetSelectLessonClassData = (
  req: GetSelectLessonClassDataRequest
): AxiosPromise<ResponseResult<PageResult<GetSelectLessonClassDataResponse[]>>> => {
  return service.post('/api2/Lesson/GetSelectLessonClassData', req)
}

/** 批量 */
export const BatchLessonExtendEdit = (para: BatchLessonExtendEditRequest): AxiosPromise<ResponseResult<number[]>> => {
  return service.post('/api2/Lesson/BatchLessonExtendEdit', para)
}
