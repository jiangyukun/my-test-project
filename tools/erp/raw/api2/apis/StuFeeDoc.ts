import service from './../../api/net'
import { AxiosPromise } from 'axios'
import SchoolPalToolkitResponse from './../types/SchoolPalToolkitResponse'
import SchoolPalWebModelResponse from './../types/SchoolPalWebModelResponse'
import SchoolPalWebModelRequest from './../types/SchoolPalWebModelRequest'
import ResponseResult = SchoolPalToolkitResponse.ResponseResult
import GetStuInfoLessonListResponse = SchoolPalWebModelResponse.GetStuInfoLessonListResponse
import GetSubStuFeeDocExpiryDateListResponse = SchoolPalWebModelResponse.GetSubStuFeeDocExpiryDateListResponse
import PrintClassCardDetailResponse = SchoolPalWebModelResponse.PrintClassCardDetailResponse
import GetStuFeeDocUpPeriodInfoResponse = SchoolPalWebModelResponse.GetStuFeeDocUpPeriodInfoResponse
import StopClassesResponse = SchoolPalWebModelResponse.StopClassesResponse
import GetResumeLessonInfoResponse = SchoolPalWebModelResponse.GetResumeLessonInfoResponse
import GetStuFeeDocTuitionCostByIdResponse = SchoolPalWebModelResponse.GetStuFeeDocTuitionCostByIdResponse
import GetStuFeeDocWithStuInfoByIdResponse = SchoolPalWebModelResponse.GetStuFeeDocWithStuInfoByIdResponse
import UpdateStuFeeDocExpiryDateRequest = SchoolPalWebModelRequest.UpdateStuFeeDocExpiryDateRequest
import SetStuFeeDocUpPeriodRequest = SchoolPalWebModelRequest.SetStuFeeDocUpPeriodRequest
import SaveCloseLessonRequest = SchoolPalWebModelRequest.SaveCloseLessonRequest
import SaveStopClassesRequest = SchoolPalWebModelRequest.SaveStopClassesRequest
import SaveResumeLessonRequest = SchoolPalWebModelRequest.SaveResumeLessonRequest
import GetStuFeeDocTuitionCostByIdRequest = SchoolPalWebModelRequest.GetStuFeeDocTuitionCostByIdRequest
import CancelCloseStufeeDocRequest = SchoolPalWebModelRequest.CancelCloseStufeeDocRequest

/** 获取学员课程列表 */
export const GetStuInfoLessonList = (stuInfoId: number): AxiosPromise<ResponseResult<GetStuInfoLessonListResponse>> => {
  return service.get('/api2/StuFeeDoc/GetStuInfoLessonList', { params: { stuInfoId } })
}

/** 设置有效期 */
export const UpdateStuFeeDocExpiryDate = (
  request: UpdateStuFeeDocExpiryDateRequest
): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/StuFeeDoc/UpdateStuFeeDocExpiryDate', request)
}

/** 获取子账户列表 */
export const GetSubStuFeeDocExpiryDateList = (
  stuFeeDocId: number
): AxiosPromise<ResponseResult<GetSubStuFeeDocExpiryDateListResponse[]>> => {
  return service.get('/api2/StuFeeDoc/GetSubStuFeeDocExpiryDateList', { params: { stuFeeDocId } })
}

/** 设置有效期 */
export const UpdateSubStuFeeDocExpiryDate = (request: object[]): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/StuFeeDoc/UpdateSubStuFeeDocExpiryDate', request)
}

/** 打印听课证 */
export const PrintClassCardDetail = (
  stuFeeDocId: number
): AxiosPromise<ResponseResult<PrintClassCardDetailResponse>> => {
  return service.get('/api2/StuFeeDoc/PrintClassCardDetail', { params: { stuFeeDocId } })
}

/** 判断学员是否可以升期 */
export const IsRiseStuFeeDoc = (stuFeeDocId: number): AxiosPromise<ResponseResult<boolean>> => {
  return service.get('/api2/StuFeeDoc/IsRiseStuFeeDoc', { params: { stuFeeDocId } })
}

/** 获得学费账户的升期关系 */
export const GetStuFeeDocUpPeriodInfo = (
  stuFeeDocId: number
): AxiosPromise<ResponseResult<GetStuFeeDocUpPeriodInfoResponse>> => {
  return service.get('/api2/StuFeeDoc/GetStuFeeDocUpPeriodInfo', { params: { stuFeeDocId } })
}

/** 保存升期 */
export const SetStuFeeDocUpPeriod = (request: SetStuFeeDocUpPeriodRequest): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/StuFeeDoc/SetStuFeeDocUpPeriod', request)
}

/** 保存结课 */
export const SaveCloseLesson = (request: SaveCloseLessonRequest): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/StuFeeDoc/SaveCloseLesson', request)
}

/** 停课 */
export const StopClasses = (stuFeeDocId: number): AxiosPromise<ResponseResult<StopClassesResponse>> => {
  return service.get('/api2/StuFeeDoc/StopClasses', { params: { stuFeeDocId } })
}

/** 保存停课 */
export const SaveStopClasses = (request: SaveStopClassesRequest): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/StuFeeDoc/SaveStopClasses', request)
}

/** 按时间复课信息提示 */
export const GetResumeLessonInfo = (
  stuFeeDocId: number,
  date: string
): AxiosPromise<ResponseResult<GetResumeLessonInfoResponse[]>> => {
  return service.get('/api2/StuFeeDoc/GetResumeLessonInfo', { params: { stuFeeDocId, date } })
}

/** 保存复课 */
export const SaveResumeLesson = (request: SaveResumeLessonRequest): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/StuFeeDoc/SaveResumeLesson', request)
}

/** 获取用户是否可以跨校区操作学费账户 */
export const GetCanOperateStuFeeDoc = (stuFeeDocId: number): AxiosPromise<ResponseResult<boolean>> => {
  return service.get('/api2/StuFeeDoc/GetCanOperateStuFeeDoc', { params: { stuFeeDocId } })
}

/** 获取学费总账户流水 */
export const GetStuFeeDocTuitionCostById = (
  req: GetStuFeeDocTuitionCostByIdRequest
): AxiosPromise<ResponseResult<GetStuFeeDocTuitionCostByIdResponse>> => {
  return service.post('/api2/StuFeeDoc/GetStuFeeDocTuitionCostById', req)
}

/** 获取学员及学员报读课程信息 */
export const GetStuFeeDocById = (id: number): AxiosPromise<ResponseResult<GetStuFeeDocWithStuInfoByIdResponse>> => {
  return service.get('/api2/StuFeeDoc/GetStuFeeDocById', { params: { id } })
}

/** 学员结课还原 */
export const CancelCloseStufeeDoc = (request: CancelCloseStufeeDocRequest): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/StuFeeDoc/CancelCloseStufeeDoc', request)
}
