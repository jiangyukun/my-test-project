import service from './../../api/net'
import { AxiosPromise } from 'axios'
import SchoolPalWebModelRequest from './../types/SchoolPalWebModelRequest'
import SchoolPalToolkitResponse from './../types/SchoolPalToolkitResponse'
import SchoolPalWebModelResponse from './../types/SchoolPalWebModelResponse'
import SchoolPalCloudServiceModel from './../types/SchoolPalCloudServiceModel'
import GetPhoneByStuInfoIdRequest = SchoolPalWebModelRequest.GetPhoneByStuInfoIdRequest
import DeleteStuInfoRequest = SchoolPalWebModelRequest.DeleteStuInfoRequest
import SaveStuInfoRequest = SchoolPalWebModelRequest.SaveStuInfoRequest
import CreateStuInfoRequest = SchoolPalWebModelRequest.CreateStuInfoRequest
import UpdateStuInfoFollowUpRequest = SchoolPalWebModelRequest.UpdateStuInfoFollowUpRequest
import SaveCommuRequest = SchoolPalWebModelRequest.SaveCommuRequest
import DeleteCommuRequest = SchoolPalWebModelRequest.DeleteCommuRequest
import UploadStuInfoAttchmentRequest = SchoolPalWebModelRequest.UploadStuInfoAttchmentRequest
import UpdateStuInfoAttachmentNameRequest = SchoolPalWebModelRequest.UpdateStuInfoAttachmentNameRequest
import DeleteStuInfoAttachmentRequest = SchoolPalWebModelRequest.DeleteStuInfoAttachmentRequest
import UpdateSPHRequest = SchoolPalWebModelRequest.UpdateSPHRequest
import CheckStuInfoNameAndPhoneRequest = SchoolPalWebModelRequest.CheckStuInfoNameAndPhoneRequest
import UpdateStuInfoCardIdRequest = SchoolPalWebModelRequest.UpdateStuInfoCardIdRequest
import UpdateStuInfoHeadImageUrlRequest = SchoolPalWebModelRequest.UpdateStuInfoHeadImageUrlRequest
import GetLessonEnrollStuListDataRequest = SchoolPalWebModelRequest.GetLessonEnrollStuListDataRequest
import GetLessonEnrollStuListStatisticsDataRequest = SchoolPalWebModelRequest.GetLessonEnrollStuListStatisticsDataRequest
import LessonEnrollStuListDataExportRequest = SchoolPalWebModelRequest.LessonEnrollStuListDataExportRequest
import GetStudocAndClassListRequest = SchoolPalWebModelRequest.GetStudocAndClassListRequest
import StudocAndClassListExportRequest = SchoolPalWebModelRequest.StudocAndClassListExportRequest
import GetStuInfoListDataRequest = SchoolPalWebModelRequest.GetStuInfoListDataRequest
import GetStuInfoListStatisticsDataRequest = SchoolPalWebModelRequest.GetStuInfoListStatisticsDataRequest
import DeleteStuInfosRequest = SchoolPalWebModelRequest.DeleteStuInfosRequest
import StuinfoListExportRequest = SchoolPalWebModelRequest.StuinfoListExportRequest
import BatchChangeRequest = SchoolPalWebModelRequest.BatchChangeRequest
import SelectStuInfoFetchDataRequest = SchoolPalWebModelRequest.SelectStuInfoFetchDataRequest
import GetChannelsRequest = SchoolPalWebModelRequest.GetChannelsRequest
import GetChannelClassificationsRequest = SchoolPalWebModelRequest.GetChannelClassificationsRequest
import GetStuNameByCardRequest = SchoolPalWebModelRequest.GetStuNameByCardRequest
import ResponseResult = SchoolPalToolkitResponse.ResponseResult
import GetPhoneByStuInfoIdResponse = SchoolPalWebModelResponse.GetPhoneByStuInfoIdResponse
import GetStuInfoDetailResponse = SchoolPalWebModelResponse.GetStuInfoDetailResponse
import StuInfoDetailDto = SchoolPalWebModelResponse.StuInfoDetailDto
import GetCommuListResponse = SchoolPalWebModelResponse.GetCommuListResponse
import GetCommuInfoResponse = SchoolPalWebModelResponse.GetCommuInfoResponse
import GetInteractiveRecordListResponse = SchoolPalWebModelResponse.GetInteractiveRecordListResponse
import GetStuInfoAttchmentListResponse = SchoolPalWebModelResponse.GetStuInfoAttchmentListResponse
import GetConsultOperationLogListResponse = SchoolPalWebModelResponse.GetConsultOperationLogListResponse
import CheckStuInfoNameAndPhoneResponse = SchoolPalWebModelResponse.CheckStuInfoNameAndPhoneResponse
import GetLessonEnrollStuListDataResponse = SchoolPalWebModelResponse.GetLessonEnrollStuListDataResponse
import GetLessonEnrollStuListStatisticsDataResponse = SchoolPalWebModelResponse.GetLessonEnrollStuListStatisticsDataResponse
import GetStudocAndClassListResponse = SchoolPalWebModelResponse.GetStudocAndClassListResponse
import GetStuInfoListDataResponse = SchoolPalWebModelResponse.GetStuInfoListDataResponse
import GetStuInfoListStatisticsDataResponse = SchoolPalWebModelResponse.GetStuInfoListStatisticsDataResponse
import DeleteStuInfosResponse = SchoolPalWebModelResponse.DeleteStuInfosResponse
import BatchChangeResponse = SchoolPalWebModelResponse.BatchChangeResponse
import SelectStuInfoFetchDataResponse = SchoolPalWebModelResponse.SelectStuInfoFetchDataResponse
import GetChannelsResponse = SchoolPalWebModelResponse.GetChannelsResponse
import GetChannelClassificationsResponse = SchoolPalWebModelResponse.GetChannelClassificationsResponse
import GetStuInfoUnusedCreditResponse = SchoolPalWebModelResponse.GetStuInfoUnusedCreditResponse
import GetStuNameByCardResponse = SchoolPalWebModelResponse.GetStuNameByCardResponse
import PageResult = SchoolPalCloudServiceModel.PageResult

/** 通过学员id获取手机号 */
export const GetPhoneByStuInfoId = (
  req: GetPhoneByStuInfoIdRequest
): AxiosPromise<ResponseResult<GetPhoneByStuInfoIdResponse>> => {
  return service.post('/api2/StuInfo/GetPhoneByStuInfoId', req)
}

/** 根据学员Id获取学员详情 */
export const GetStuInfoDetail = (stuInfoId: number): AxiosPromise<ResponseResult<GetStuInfoDetailResponse>> => {
  return service.get('/api2/StuInfo/GetStuInfoDetail', { params: { stuInfoId } })
}

/** 根据学员Id删除学员 */
export const DeleteStuInfo = (request: DeleteStuInfoRequest): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/StuInfo/DeleteStuInfo', request)
}

/** 更新学员 */
export const UpdateStuInfo = (request: SaveStuInfoRequest): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/StuInfo/UpdateStuInfo', request)
}

/** 新增学员 */
export const CreateStuInfo = (request: CreateStuInfoRequest): AxiosPromise<ResponseResult<number>> => {
  return service.post('/api2/StuInfo/CreateStuInfo', request)
}

/** 获取学员跟进信息列表 */
export const GetStuInfoFollowUpList = (stuInfoId: number): AxiosPromise<ResponseResult<StuInfoDetailDto>> => {
  return service.get('/api2/StuInfo/GetStuInfoFollowUpList', { params: { stuInfoId } })
}

/** 编辑学员跟进信息 */
export const UpdateStuInfoFollowUp = (request: UpdateStuInfoFollowUpRequest): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/StuInfo/UpdateStuInfoFollowUp', request)
}

/** 获取学员沟通记录列表 */
export const GetCommuList = (
  stuInfoId: number,
  pageIndex: number,
  pageSize: number
): AxiosPromise<ResponseResult<PageResult<GetCommuListResponse[]>>> => {
  return service.get('/api2/StuInfo/GetCommuList', { params: { stuInfoId, pageIndex, pageSize } })
}

/** 获取学员沟通记录详情 */
export const GetCommuInfo = (id: number): AxiosPromise<ResponseResult<GetCommuInfoResponse>> => {
  return service.get('/api2/StuInfo/GetCommuInfo', { params: { id } })
}

/** 保存沟通记录 */
export const SaveCommu = (request: SaveCommuRequest): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/StuInfo/SaveCommu', request)
}

/** 删除沟通记录 */
export const DeleteCommu = (request: DeleteCommuRequest): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/StuInfo/DeleteCommu', request)
}

/** 互动记录 */
export const GetInteractiveRecordList = (
  stuInfoId: number
): AxiosPromise<ResponseResult<GetInteractiveRecordListResponse[]>> => {
  return service.get('/api2/StuInfo/GetInteractiveRecordList', { params: { stuInfoId } })
}

/** 获取学员文件夹列表 */
export const GetStuInfoAttchmentList = (
  stuInfoId: number,
  fileNameKey: string,
  pageIndex: number,
  pageSize: number
): AxiosPromise<ResponseResult<PageResult<GetStuInfoAttchmentListResponse[]>>> => {
  return service.get('/api2/StuInfo/GetStuInfoAttchmentList', {
    params: { stuInfoId, fileNameKey, pageIndex, pageSize }
  })
}

/** 上传文件 */
export const UploadStuInfoAttchment = (
  request: UploadStuInfoAttchmentRequest
): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/StuInfo/UploadStuInfoAttchment', request)
}

/** 更新文件名 */
export const UpdateStuInfoAttachmentName = (
  request: UpdateStuInfoAttachmentNameRequest
): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/StuInfo/UpdateStuInfoAttachmentName', request)
}

/** 删除文件 */
export const DeleteStuInfoAttachment = (
  request: DeleteStuInfoAttachmentRequest
): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/StuInfo/DeleteStuInfoAttachment', request)
}

/** 文件是否在校宝家显示 */
export const UpdateSPH = (request: UpdateSPHRequest): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/StuInfo/UpdateSPH', request)
}

/** 获取学员操作日志列表 */
export const GetConsultOperationLogList = (
  stuInfoId: number,
  pageIndex: number,
  pageSize: number
): AxiosPromise<ResponseResult<PageResult<GetConsultOperationLogListResponse[]>>> => {
  return service.get('/api2/StuInfo/GetConsultOperationLogList', { params: { stuInfoId, pageIndex, pageSize } })
}

/** 检测学员姓名和手机号是否重复 */
export const CheckStuInfoNameAndPhone = (
  request: CheckStuInfoNameAndPhoneRequest
): AxiosPromise<ResponseResult<CheckStuInfoNameAndPhoneResponse>> => {
  return service.post('/api2/StuInfo/CheckStuInfoNameAndPhone', request)
}

/** 更新学员卡号 */
export const UpdateStuInfoCardId = (request: UpdateStuInfoCardIdRequest): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/StuInfo/UpdateStuInfoCardId', request)
}

/** 更新学员头像 */
export const UpdateStuInfoHeadImageUrl = (
  request: UpdateStuInfoHeadImageUrlRequest
): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/StuInfo/UpdateStuInfoHeadImageUrl', request)
}

/** 获得报读学员列表 */
export const GetLessonEnrollStuListData = (
  request: GetLessonEnrollStuListDataRequest
): AxiosPromise<ResponseResult<PageResult<GetLessonEnrollStuListDataResponse[]>>> => {
  return service.post('/api2/StuInfo/GetLessonEnrollStuListData', request)
}

/** 获得学员报读列表的统计数据 */
export const GetLessonEnrollStuListStatisticsData = (
  request: GetLessonEnrollStuListStatisticsDataRequest
): AxiosPromise<ResponseResult<GetLessonEnrollStuListStatisticsDataResponse>> => {
  return service.post('/api2/StuInfo/GetLessonEnrollStuListStatisticsData', request)
}

/** 学员报读列表导出（暂定为重构  如果组件不支持 暂不重构） */
export const LessonEnrollStuListDataExport = (
  request: LessonEnrollStuListDataExportRequest
): AxiosPromise<ResponseResult<string>> => {
  return service.post('/api2/StuInfo/LessonEnrollStuListDataExport', request)
}

/** 获得学员分班列表 */
export const GetStudocAndClassList = (
  request: GetStudocAndClassListRequest
): AxiosPromise<ResponseResult<PageResult<GetStudocAndClassListResponse[]>>> => {
  return service.post('/api2/StuInfo/GetStudocAndClassList', request)
}

/** 学员分班列表导出（暂定为重构  如果组件不支持 暂不重构） */
export const StudocAndClassListExport = (
  dto: StudocAndClassListExportRequest
): AxiosPromise<ResponseResult<string>> => {
  return service.post('/api2/StuInfo/StudocAndClassListExport', dto)
}

/** 获取学员列表 */
export const GetStuInfoListData = (
  dto: GetStuInfoListDataRequest
): AxiosPromise<ResponseResult<PageResult<GetStuInfoListDataResponse[]>>> => {
  return service.post('/api2/StuInfo/GetStuInfoListData', dto)
}

/** 获得学员列表的统计数据 */
export const GetStuInfoListStatisticsData = (
  dto: GetStuInfoListStatisticsDataRequest
): AxiosPromise<ResponseResult<GetStuInfoListStatisticsDataResponse>> => {
  return service.post('/api2/StuInfo/GetStuInfoListStatisticsData', dto)
}

/** 批量删除学员 */
export const DeleteStuInfos = (
  request: DeleteStuInfosRequest
): AxiosPromise<ResponseResult<DeleteStuInfosResponse>> => {
  return service.post('/api2/StuInfo/DeleteStuInfos', request)
}

/** 学员导出（暂定为重构  如果组件不支持 暂不重构） */
export const StuinfoListExport = (dto: StuinfoListExportRequest): AxiosPromise<ResponseResult<string>> => {
  return service.post('/api2/StuInfo/StuinfoListExport', dto)
}

/** 学员批量调整 */
export const BatchChange = (request: BatchChangeRequest): AxiosPromise<ResponseResult<BatchChangeResponse>> => {
  return service.post('/api2/StuInfo/BatchChange', request)
}

/** 选择学员组件获取分页数据 （分班获取学员和冗余在这里） */
export const SelectStuInfoFetchData = (
  para: SelectStuInfoFetchDataRequest
): AxiosPromise<ResponseResult<PageResult<SelectStuInfoFetchDataResponse[]>>> => {
  return service.post('/api2/StuInfo/SelectStuInfoFetchData', para)
}

/** 获取渠道(学员列表筛选项数据源) */
export const GetChannels = (
  req: GetChannelsRequest
): AxiosPromise<ResponseResult<PageResult<GetChannelsResponse[]>>> => {
  return service.post('/api2/StuInfo/GetChannels', req)
}

/** 获取渠道分类 */
export const GetChannelClassifications = (
  req: GetChannelClassificationsRequest
): AxiosPromise<ResponseResult<PageResult<GetChannelClassificationsResponse[]>>> => {
  return service.post('/api2/StuInfo/GetChannelClassifications', req)
}

/** 获取学员剩余积分 */
export const GetStuInfoUnusedCredit = (
  StuInfoId: number
): AxiosPromise<ResponseResult<GetStuInfoUnusedCreditResponse>> => {
  return service.get('/api2/StuInfo/GetStuInfoUnusedCredit', { params: { StuInfoId } })
}

/** 根据磁卡获取学员信息 */
export const GetStuNameByCard = (
  req: GetStuNameByCardRequest
): AxiosPromise<ResponseResult<GetStuNameByCardResponse>> => {
  return service.post('/api2/StuInfo/GetStuNameByCard', req)
}

/** 根据学员Id获取是否是新学员（不存在任何stufeedoc） */
export const GetIsNewStudentByStuInfoId = (stuInfoId: number): AxiosPromise<ResponseResult<boolean>> => {
  return service.get('/api2/StuInfo/GetIsNewStudentByStuInfoId', { params: { stuInfoId } })
}
