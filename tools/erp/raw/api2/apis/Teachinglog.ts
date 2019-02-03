import service from './../../api/net'
import { AxiosPromise } from 'axios'
import SchoolPalWebModelRequest from './../types/SchoolPalWebModelRequest'
import SchoolPalToolkitResponse from './../types/SchoolPalToolkitResponse'
import SchoolPalWebModelResponse from './../types/SchoolPalWebModelResponse'
import SchoolPalCloudServiceModel from './../types/SchoolPalCloudServiceModel'
import StudentSignRequest = SchoolPalWebModelRequest.StudentSignRequest
import SwipeCardByStudentRequest = SchoolPalWebModelRequest.SwipeCardByStudentRequest
import AddTeachingLogRequest = SchoolPalWebModelRequest.AddTeachingLogRequest
import CheckDeleteStuTeachingLogRequest = SchoolPalWebModelRequest.CheckDeleteStuTeachingLogRequest
import CheckEditStuTeachingLogRequest = SchoolPalWebModelRequest.CheckEditStuTeachingLogRequest
import DeleteStuTeachingLogRequest = SchoolPalWebModelRequest.DeleteStuTeachingLogRequest
import EditTeachingLogRequest = SchoolPalWebModelRequest.EditTeachingLogRequest
import CheckDeleteTeachingLogRequest = SchoolPalWebModelRequest.CheckDeleteTeachingLogRequest
import DeleteTeachingLogRequest = SchoolPalWebModelRequest.DeleteTeachingLogRequest
import GetTeachingLogsByClassRequest = SchoolPalWebModelRequest.GetTeachingLogsByClassRequest
import GetStuTeachingLogsByStuinfoRequest = SchoolPalWebModelRequest.GetStuTeachingLogsByStuinfoRequest
import SaveMakeUpsRequest = SchoolPalWebModelRequest.SaveMakeUpsRequest
import GetTeacherClassTimeStatisticsRequest = SchoolPalWebModelRequest.GetTeacherClassTimeStatisticsRequest
import GetStuInfoClassTimeStatisticsRequest = SchoolPalWebModelRequest.GetStuInfoClassTimeStatisticsRequest
import ResponseResult = SchoolPalToolkitResponse.ResponseResult
import StudentSignResponse = SchoolPalWebModelResponse.StudentSignResponse
import SwipeCardByStudentResponse = SchoolPalWebModelResponse.SwipeCardByStudentResponse
import CheckDeleteStuTeachingLogResponse = SchoolPalWebModelResponse.CheckDeleteStuTeachingLogResponse
import CheckEditStuTeachingLogResponse = SchoolPalWebModelResponse.CheckEditStuTeachingLogResponse
import GetTeachingLogsByClassResponse = SchoolPalWebModelResponse.GetTeachingLogsByClassResponse
import GetStuTeachingLogsByStuInfoResponse = SchoolPalWebModelResponse.GetStuTeachingLogsByStuInfoResponse
import GetTeacherClassTimeStatisticsResponse = SchoolPalWebModelResponse.GetTeacherClassTimeStatisticsResponse
import GetTeacherClassTimeStatisticsDetailResponse = SchoolPalWebModelResponse.GetTeacherClassTimeStatisticsDetailResponse
import GetStuInfoClassTimeStatisticsResponse = SchoolPalWebModelResponse.GetStuInfoClassTimeStatisticsResponse
import GetStuInfoClassTimeStatisticsDetailResponse = SchoolPalWebModelResponse.GetStuInfoClassTimeStatisticsDetailResponse
import GetStuInfoSignListResponse = SchoolPalWebModelResponse.GetStuInfoSignListResponse
import PageResult = SchoolPalCloudServiceModel.PageResult

/** 磁卡考勤 */
export const StudentSign = (request: StudentSignRequest): AxiosPromise<ResponseResult<StudentSignResponse>> => {
  return service.post('/api2/TeachingLog/StudentSign', request)
}

/** 学员刷卡（兼容qt 桌面程序） */
export const SwipeCardByStudent = (
  request: SwipeCardByStudentRequest
): AxiosPromise<ResponseResult<SwipeCardByStudentResponse>> => {
  return service.post('/api2/TeachingLog/SwipeCardByStudent', request)
}

/** 新增上课记录 */
export const AddTeachingLog = (request: AddTeachingLogRequest): AxiosPromise<ResponseResult<number>> => {
  return service.post('/api2/TeachingLog/AddTeachingLog', request)
}

/** 判断是否允许删除学员的上课记录 */
export const CheckDeleteStuTeachingLog = (
  request: CheckDeleteStuTeachingLogRequest
): AxiosPromise<ResponseResult<CheckDeleteStuTeachingLogResponse>> => {
  return service.post('/api2/TeachingLog/CheckDeleteStuTeachingLog', request)
}

/** 判断是否允许编辑学员的上课记录 */
export const CheckEditStuTeachingLog = (
  request: CheckEditStuTeachingLogRequest
): AxiosPromise<ResponseResult<CheckEditStuTeachingLogResponse>> => {
  return service.post('/api2/TeachingLog/CheckEditStuTeachingLog', request)
}

/** 删除学员的上课记录 */
export const DeleteStuTeachingLog = (request: DeleteStuTeachingLogRequest): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/TeachingLog/DeleteStuTeachingLog', request)
}

/** 编辑上课记录 */
export const EditTeachingLog = (request: EditTeachingLogRequest): AxiosPromise<ResponseResult<number>> => {
  return service.post('/api2/TeachingLog/EditTeachingLog', request)
}

/** 取消记上课  判断是否有已补课的请假记录 */
export const CheckDeleteTeachingLog = (
  request: CheckDeleteTeachingLogRequest
): AxiosPromise<ResponseResult<string[]>> => {
  return service.post('/api2/TeachingLog/CheckDeleteTeachingLog', request)
}

/** 取消记上课 */
export const DeleteTeachingLog = (request: DeleteTeachingLogRequest): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/TeachingLog/DeleteTeachingLog', request)
}

/** 获取记上课按班级上课记录列表 */
export const GetTeachingLogsByClass = (
  req: GetTeachingLogsByClassRequest
): AxiosPromise<ResponseResult<GetTeachingLogsByClassResponse>> => {
  return service.post('/api2/TeachingLog/GetTeachingLogsByClass', req)
}

/** 导出记上课按班级上课记录 */
export const ExportTeachingLogsByClass = (req: GetTeachingLogsByClassRequest): AxiosPromise<ResponseResult<string>> => {
  return service.post('/api2/TeachingLog/ExportTeachingLogsByClass', req)
}

/** 获取记上课按学员上课记录列表 */
export const GetStuTeachingLogsByStuinfo = (
  req: GetStuTeachingLogsByStuinfoRequest
): AxiosPromise<ResponseResult<GetStuTeachingLogsByStuInfoResponse>> => {
  return service.post('/api2/TeachingLog/GetStuTeachingLogsByStuinfo', req)
}

/** 导出记上课按学员上课记录 */
export const ExportStuTeachingLogsByStuinfo = (
  req: GetStuTeachingLogsByStuinfoRequest
): AxiosPromise<ResponseResult<string>> => {
  return service.post('/api2/TeachingLog/ExportStuTeachingLogsByStuinfo', req)
}

/** 补课管理保存编辑/批量编辑 */
export const SaveMakeUps = (req: SaveMakeUpsRequest): AxiosPromise<ResponseResult<string[]>> => {
  return service.post('/api2/TeachingLog/SaveMakeUps', req)
}

/** 获取课时汇总按教师课时列表 */
export const GetTeacherClassTimeStatistics = (
  req: GetTeacherClassTimeStatisticsRequest
): AxiosPromise<ResponseResult<PageResult<GetTeacherClassTimeStatisticsResponse[]>>> => {
  return service.post('/api2/TeachingLog/GetTeacherClassTimeStatistics', req)
}

/** 获取单个教师课时汇总详情 */
export const GetTeacherClassTimeStatisticsDetail = (
  req: GetTeacherClassTimeStatisticsRequest
): AxiosPromise<ResponseResult<GetTeacherClassTimeStatisticsDetailResponse[]>> => {
  return service.post('/api2/TeachingLog/GetTeacherClassTimeStatisticsDetail', req)
}

/** 导出课时汇总按教师课时列表 */
export const ExportTeacherClassTimeStatistics = (
  req: GetTeacherClassTimeStatisticsRequest
): AxiosPromise<ResponseResult<string>> => {
  return service.post('/api2/TeachingLog/ExportTeacherClassTimeStatistics', req)
}

/** 获取课时汇总按学员课时列表 */
export const GetStuInfoClassTimeStatistics = (
  req: GetStuInfoClassTimeStatisticsRequest
): AxiosPromise<ResponseResult<PageResult<GetStuInfoClassTimeStatisticsResponse[]>>> => {
  return service.post('/api2/TeachingLog/GetStuInfoClassTimeStatistics', req)
}

/** 获取单个学员课时汇总详情 */
export const GetStuInfoClassTimeStatisticsDetail = (
  req: GetStuInfoClassTimeStatisticsRequest
): AxiosPromise<ResponseResult<GetStuInfoClassTimeStatisticsDetailResponse[]>> => {
  return service.post('/api2/TeachingLog/GetStuInfoClassTimeStatisticsDetail', req)
}

/** 导出课时汇总按学员课时 */
export const ExportStuInfoClassTimeStatistics = (
  req: GetStuInfoClassTimeStatisticsRequest
): AxiosPromise<ResponseResult<string>> => {
  return service.post('/api2/TeachingLog/ExportStuInfoClassTimeStatistics', req)
}

/** 获取刷卡记录列表 */
export const GetStuInfoSignList = (
  stuInfoId: number,
  classId: number,
  pageIndex: number,
  pageSize: number
): AxiosPromise<ResponseResult<PageResult<GetStuInfoSignListResponse[]>>> => {
  return service.get('/api2/TeachingLog/GetStuInfoSignList', { params: { stuInfoId, classId, pageIndex, pageSize } })
}
