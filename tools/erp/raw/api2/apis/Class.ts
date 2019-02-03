import service from './../../api/net'
import { AxiosPromise } from 'axios'
import SchoolPalWebModelRequest from './../types/SchoolPalWebModelRequest'
import SchoolPalToolkitResponse from './../types/SchoolPalToolkitResponse'
import SchoolPalCloudServiceModel from './../types/SchoolPalCloudServiceModel'
import SchoolPalWebModelResponse from './../types/SchoolPalWebModelResponse'
import SchoolPalWebModelRequestClassManage from './../types/SchoolPalWebModelRequestClassManage'
import SchoolPalToolkitResponseInterface from './../types/SchoolPalToolkitResponseInterface'
import SchoolPalWebModel from './../types/SchoolPalWebModel'
import AssignTeacherRequest = SchoolPalWebModelRequest.AssignTeacherRequest
import SelectClassInfoFetchDataRequest = SchoolPalWebModelRequest.SelectClassInfoFetchDataRequest
import GetOneToOneListRequest = SchoolPalWebModelRequest.GetOneToOneListRequest
import BatchAssignClassTeacherRequest = SchoolPalWebModelRequest.BatchAssignClassTeacherRequest
import ChangeOneToOneCollectionRequest = SchoolPalWebModelRequest.ChangeOneToOneCollectionRequest
import GetStuInfoScheduleListRequest = SchoolPalWebModelRequest.GetStuInfoScheduleListRequest
import AssignClassForOneToOneRequest = SchoolPalWebModelRequest.AssignClassForOneToOneRequest
import AssignTeachersRequest = SchoolPalWebModelRequest.AssignTeachersRequest
import GetClassStuDetailsListRequest = SchoolPalWebModelRequest.GetClassStuDetailsListRequest
import CloseStuDocsRequest = SchoolPalWebModelRequest.CloseStuDocsRequest
import ClassStuInfoRequest = SchoolPalWebModelRequest.ClassStuInfoRequest
import AdjustmentClassRequest = SchoolPalWebModelRequest.AdjustmentClassRequest
import CheckClassSeatIsValidRequest = SchoolPalWebModelRequest.CheckClassSeatIsValidRequest
import CreateStuDocSeatRequest = SchoolPalWebModelRequest.CreateStuDocSeatRequest
import CancelStuDocSeatRequest = SchoolPalWebModelRequest.CancelStuDocSeatRequest
import ExchangeStuDocSeatRequest = SchoolPalWebModelRequest.ExchangeStuDocSeatRequest
import ChangeStuDocSeatRequest = SchoolPalWebModelRequest.ChangeStuDocSeatRequest
import ShiftClassRequest = SchoolPalWebModelRequest.ShiftClassRequest
import GetTeachingLogsByClassIdRequest = SchoolPalWebModelRequest.GetTeachingLogsByClassIdRequest
import GetStuTeachingLogsByStuInfoIdRequest = SchoolPalWebModelRequest.GetStuTeachingLogsByStuInfoIdRequest
import SaveNewClassRequest = SchoolPalWebModelRequest.SaveNewClassRequest
import SaveEditClassRequest = SchoolPalWebModelRequest.SaveEditClassRequest
import GetStuDocsByClassIdRequest = SchoolPalWebModelRequest.GetStuDocsByClassIdRequest
import GetClassEliminateClassListRequest = SchoolPalWebModelRequest.GetClassEliminateClassListRequest
import BatchStuDocIdsRequest = SchoolPalWebModelRequest.BatchStuDocIdsRequest
import CloseClassRequest = SchoolPalWebModelRequest.CloseClassRequest
import GetCostOverTuitionStuNamesRequest = SchoolPalWebModelRequest.GetCostOverTuitionStuNamesRequest
import ResponseResult = SchoolPalToolkitResponse.ResponseResult
import PageResult = SchoolPalCloudServiceModel.PageResult
import SelectClassInfoFetchDataResponse = SchoolPalWebModelResponse.SelectClassInfoFetchDataResponse
import PageResultWithCount = SchoolPalWebModelResponse.PageResultWithCount
import GetOneToOneListResponse = SchoolPalWebModelResponse.GetOneToOneListResponse
import GetStuInfoScheduleListResponse = SchoolPalWebModelResponse.GetStuInfoScheduleListResponse
import GetClassStuDetailsListResponse = SchoolPalWebModelResponse.GetClassStuDetailsListResponse
import GetClassDetailResponse = SchoolPalWebModelResponse.GetClassDetailResponse
import GetClassListByLessonIdResponse = SchoolPalWebModelResponse.GetClassListByLessonIdResponse
import GetClassStuDocSeatListResponse = SchoolPalWebModelResponse.GetClassStuDocSeatListResponse
import GetTeachingLogsByClassIdResponse = SchoolPalWebModelResponse.GetTeachingLogsByClassIdResponse
import GetShouldAndActualStusByTeachingLogIdResponse = SchoolPalWebModelResponse.GetShouldAndActualStusByTeachingLogIdResponse
import GetClassNamesByStuInfoIdResponse = SchoolPalWebModelResponse.GetClassNamesByStuInfoIdResponse
import GetStuTeachingLogsByStuInfoIdResponse = SchoolPalWebModelResponse.GetStuTeachingLogsByStuInfoIdResponse
import GetClassesByOrgIdResponse = SchoolPalWebModelResponse.GetClassesByOrgIdResponse
import GetStuDocsByClassIdResponse = SchoolPalWebModelResponse.GetStuDocsByClassIdResponse
import GetOneToOneClassTimesByLessonIdResponse = SchoolPalWebModelResponse.GetOneToOneClassTimesByLessonIdResponse
import GetClassEliminateClassResponse = SchoolPalWebModelResponse.GetClassEliminateClassResponse
import AssignClassRequest = SchoolPalWebModelRequestClassManage.AssignClassRequest
import DeleteStuDocRequest = SchoolPalWebModelRequestClassManage.DeleteStuDocRequest
import IResponse = SchoolPalToolkitResponseInterface.IResponse
import PagedQueryBase = SchoolPalWebModel.PagedQueryBase

/** 一对一添加教师 */
export const AssignTeacher = (req: AssignTeacherRequest): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/Class/AssignTeacher', req)
}

/** 选班组件 */
export const SelectClassInfoFetchData = (
  request: SelectClassInfoFetchDataRequest
): AxiosPromise<ResponseResult<PageResult<SelectClassInfoFetchDataResponse[]>>> => {
  return service.post('/api2/Class/SelectClassInfoFetchData', request)
}

/** 获取一对一列表 */
export const GetOneToOneList = (
  req: GetOneToOneListRequest
): AxiosPromise<ResponseResult<PageResultWithCount<GetOneToOneListResponse[]>>> => {
  return service.post('/api2/Class/GetOneToOneList', req)
}

/** 批量分配教师 */
export const BatchAssignClassTeacher = (req: BatchAssignClassTeacherRequest): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/Class/BatchAssignClassTeacher', req)
}

/** 一对一星标操作接口 */
export const ChangeOneToOneCollection = (
  req: ChangeOneToOneCollectionRequest
): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/Class/ChangeOneToOneCollection', req)
}

/** 学员详情-课程表 */
export const GetStuInfoScheduleList = (
  request: GetStuInfoScheduleListRequest
): AxiosPromise<ResponseResult<GetStuInfoScheduleListResponse[]>> => {
  return service.post('/api2/Class/GetStuInfoScheduleList', request)
}

/** 分班保存 */
export const AssignClassForOneToOne = (
  request: AssignClassForOneToOneRequest
): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/Class/AssignClassForOneToOne', request)
}

/** 分配教师 */
export const AssignTeachers = (request: AssignTeachersRequest): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/Class/AssignTeachers', request)
}

/** 获取班级详情学员数据 */
export const GetClassStuDetailsList = (
  request: GetClassStuDetailsListRequest
): AxiosPromise<ResponseResult<GetClassStuDetailsListResponse>> => {
  return service.post('/api2/Class/GetClassStuDetailsList', request)
}

/** 导出班级下学员列表 */
export const GetExportClassStudentListExcel = (
  request: GetClassStuDetailsListRequest
): AxiosPromise<ResponseResult<string>> => {
  return service.post('/api2/Class/GetExportClassStudentListExcel', request)
}

/** 班级详情 */
export const GetClassDetail = (classId: number): AxiosPromise<ResponseResult<GetClassDetailResponse>> => {
  return service.get('/api2/Class/GetClassDetail', { params: { classId } })
}

/** 分班（班级详情使用） */
export const AssignClass = (request: AssignClassRequest): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/Class/AssignClass', request)
}

/** 删除学员档案（班级详情使用） */
export const DeleteStuDoc = (request: DeleteStuDocRequest): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/Class/DeleteStuDoc', request)
}

/** 结班（班级详情使用） */
export const CloseStuDocs = (request: CloseStuDocsRequest): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/Class/CloseStuDocs', request)
}

/** 改为在读（班级详情使用） */
export const CancelCloseStuDocs = (request: ClassStuInfoRequest): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/Class/CancelCloseStuDocs', request)
}

/** 调班（班级详情使用） */
export const AdjustmentClass = (request: AdjustmentClassRequest): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/Class/AdjustmentClass', request)
}

/** 查询课程下所有班级（可指定班级去除）（班级详情使用） */
export const GetClassListByLessonId = (
  lessonId: number,
  classId: number,
  schoolId: number
): AxiosPromise<ResponseResult<GetClassListByLessonIdResponse[]>> => {
  return service.get('/api2/Class/GetClassListByLessonId', { params: { lessonId, classId, schoolId } })
}

/** 班级是否开启了排座 */
export const CheckClassEnableSelectSeat = (
  classId: number,
  classRoomId: number
): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/Class/CheckClassEnableSelectSeat', { classId, classRoomId })
}

/** 检查当前座位是否可选 */
export const CheckClassSeatIsValid = (request: CheckClassSeatIsValidRequest): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/Class/CheckClassSeatIsValid', request)
}

/** 获取班级排座信息列表 */
export const GetClassStuDocSeatList = (
  classId: number,
  classRoomId: number
): AxiosPromise<ResponseResult<GetClassStuDocSeatListResponse>> => {
  return service.get('/api2/Class/GetClassStuDocSeatList', { params: { classId, classRoomId } })
}

/** 学员选座 */
export const CreateStuDocSeat = (request: CreateStuDocSeatRequest): AxiosPromise<ResponseResult<number>> => {
  return service.post('/api2/Class/CreateStuDocSeat', request)
}

/** 取消学员选座 */
export const CancelStuDocSeat = (request: CancelStuDocSeatRequest): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/Class/CancelStuDocSeat', request)
}

/** 调换学员选座 */
export const ExchangeStuDocSeat = (request: ExchangeStuDocSeatRequest): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/Class/ExchangeStuDocSeat', request)
}

/** 调换排座（从已选座位调到空座） */
export const ChangeStuDocSeat = (request: ChangeStuDocSeatRequest): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/Class/ChangeStuDocSeat', request)
}

/** 同校区同课程调班 */
export const ShiftClass = (dto: ShiftClassRequest): AxiosPromise<IResponse> => {
  return service.post('/api2/Class/ShiftClass', dto)
}

/** 获取班级详情上课记录列表 */
export const GetTeachingLogsByClassId = (
  req: GetTeachingLogsByClassIdRequest
): AxiosPromise<ResponseResult<GetTeachingLogsByClassIdResponse>> => {
  return service.post('/api2/Class/GetTeachingLogsByClassId', req)
}

/** 班级详情上课记录导出 */
export const ExportTeachingLogsByClassId = (
  req: GetTeachingLogsByClassIdRequest
): AxiosPromise<ResponseResult<string>> => {
  return service.post('/api2/Class/ExportTeachingLogsByClassId', req)
}

/** 获取班级上课记录的实到/应到学员列表 */
export const GetShouldAndActualStusByTeachingLogId = (
  id: number
): AxiosPromise<ResponseResult<GetShouldAndActualStusByTeachingLogIdResponse[]>> => {
  return service.get('/api2/Class/GetShouldAndActualStusByTeachingLogId', { params: { id } })
}

/** 获取学员记上课的班级 */
export const GetClassNamesByStuInfoId = (
  stuinfoId: number
): AxiosPromise<ResponseResult<GetClassNamesByStuInfoIdResponse[]>> => {
  return service.get('/api2/Class/GetClassNamesByStuInfoId', { params: { stuinfoId } })
}

/** 获取学员详情上课记录 */
export const GetStuTeachingLogsByStuInfoId = (
  req: GetStuTeachingLogsByStuInfoIdRequest
): AxiosPromise<ResponseResult<PageResult<GetStuTeachingLogsByStuInfoIdResponse[]>>> => {
  return service.post('/api2/Class/GetStuTeachingLogsByStuInfoId', req)
}

/** 保存新建班级 */
export const SaveNewClass = (req: SaveNewClassRequest): AxiosPromise<ResponseResult<object>> => {
  return service.post('/api2/Class/SaveNewClass', req)
}

/** 保存编辑班级 */
export const SaveEditClass = (req: SaveEditClassRequest): AxiosPromise<ResponseResult<object>> => {
  return service.post('/api2/Class/SaveEditClass', req)
}

/** 根据机构获取班级分页数据 */
export const GetClassesByOrgId = (
  req: PagedQueryBase
): AxiosPromise<ResponseResult<PageResult<GetClassesByOrgIdResponse[]>>> => {
  return service.post('/api2/Class/GetClassesByOrgId', req)
}

/** 根据班级id集合获取studoc分页数据 */
export const GetStuDocsByClassIds = (
  req: GetStuDocsByClassIdRequest
): AxiosPromise<ResponseResult<GetStuDocsByClassIdResponse[]>> => {
  return service.post('/api2/Class/GetStuDocsByClassIds', req)
}

/** 根据课程id获取id最大的一对一班级课时消耗 */
export const GetOneToOneClassTimesByLessonId = (
  lessonId: number
): AxiosPromise<ResponseResult<GetOneToOneClassTimesByLessonIdResponse>> => {
  return service.get('/api2/Class/GetOneToOneClassTimesByLessonId', { params: { lessonId } })
}

/** 获取发生课消班级List */
export const GetClassEliminateClassList = (
  request: GetClassEliminateClassListRequest
): AxiosPromise<ResponseResult<GetClassEliminateClassResponse>> => {
  return service.post('/api2/Class/GetClassEliminateClassList', request)
}

/** 判断stuDoc和StuFeeDoc所需校区是否一致 */
export const CheckSchoolAgreement = (request: BatchStuDocIdsRequest): AxiosPromise<ResponseResult<string[]>> => {
  return service.post('/api2/Class/CheckSchoolAgreement', request)
}

/** 结班 */
export const CloseClass = (request: CloseClassRequest): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/Class/CloseClass', request)
}

/** 获取学费消耗已经超过已缴学费学员名 */
export const GetCostOverTuitionStuNames = (
  req: GetCostOverTuitionStuNamesRequest
): AxiosPromise<ResponseResult<string[]>> => {
  return service.post('/api2/Class/GetCostOverTuitionStuNames', req)
}
