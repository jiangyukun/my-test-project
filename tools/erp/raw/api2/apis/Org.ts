import service from './../../api/net'
import { AxiosPromise } from 'axios'
import SchoolPalWebModelRequest from './../types/SchoolPalWebModelRequest'
import SchoolPalToolkitResponse from './../types/SchoolPalToolkitResponse'
import SchoolPalCloudServiceModel from './../types/SchoolPalCloudServiceModel'
import SchoolPalWebModelResponse from './../types/SchoolPalWebModelResponse'
import SchoolPalDomainSdk from './../types/SchoolPalDomainSdk'
import SchoolPalWebModel from './../types/SchoolPalWebModel'
import SchoolPalWebModelRequestOrgManage from './../types/SchoolPalWebModelRequestOrgManage'
import SchoolPalWebModelResponseOrgManage from './../types/SchoolPalWebModelResponseOrgManage'
import GetAllSchoolRequest = SchoolPalWebModelRequest.GetAllSchoolRequest
import GetSubjectsWithSearchRequest = SchoolPalWebModelRequest.GetSubjectsWithSearchRequest
import SaveSubjectRequest = SchoolPalWebModelRequest.SaveSubjectRequest
import EditSubjectRequest = SchoolPalWebModelRequest.EditSubjectRequest
import DeleteSubjectRequest = SchoolPalWebModelRequest.DeleteSubjectRequest
import UpdateSubjectStatusRequest = SchoolPalWebModelRequest.UpdateSubjectStatusRequest
import GetSubjectListDataRequest = SchoolPalWebModelRequest.GetSubjectListDataRequest
import GetExtendAttributeItemsDataRequest = SchoolPalWebModelRequest.GetExtendAttributeItemsDataRequest
import GetOrgextendconfigRequest = SchoolPalWebModelRequest.GetOrgextendconfigRequest
import GetExamScoreRequest = SchoolPalWebModelRequest.GetExamScoreRequest
import GetExamScoresRequest = SchoolPalWebModelRequest.GetExamScoresRequest
import UpdateStuExamScoreRequest = SchoolPalWebModelRequest.UpdateStuExamScoreRequest
import DeleteExamScoresRequest = SchoolPalWebModelRequest.DeleteExamScoresRequest
import SaveExamScoresRequest = SchoolPalWebModelRequest.SaveExamScoresRequest
import JudgeExamItemRequest = SchoolPalWebModelRequest.JudgeExamItemRequest
import ModifyExamItemRequest = SchoolPalWebModelRequest.ModifyExamItemRequest
import AddExamItemRequest = SchoolPalWebModelRequest.AddExamItemRequest
import JudgeExamRequest = SchoolPalWebModelRequest.JudgeExamRequest
import ModifyExamRequest = SchoolPalWebModelRequest.ModifyExamRequest
import AddExamRequest = SchoolPalWebModelRequest.AddExamRequest
import DeleteExamItemRequest = SchoolPalWebModelRequest.DeleteExamItemRequest
import DeleteExamRequest = SchoolPalWebModelRequest.DeleteExamRequest
import ChangeStuInfoListUserCollectionRequest = SchoolPalWebModelRequest.ChangeStuInfoListUserCollectionRequest
import SelectEmployeeCrmFetchHrDocDataRequest = SchoolPalWebModelRequest.SelectEmployeeCrmFetchHrDocDataRequest
import SaveJurisdictionSettingDataRequest = SchoolPalWebModelRequest.SaveJurisdictionSettingDataRequest
import UpdateSysMessageRequest = SchoolPalWebModelRequest.UpdateSysMessageRequest
import GetSysMessagesRequest = SchoolPalWebModelRequest.GetSysMessagesRequest
import GetUsersByOrgIdRequest = SchoolPalWebModelRequest.GetUsersByOrgIdRequest
import UpdateTagRequest = SchoolPalWebModelRequest.UpdateTagRequest
import ResponseResult = SchoolPalToolkitResponse.ResponseResult
import PageResult = SchoolPalCloudServiceModel.PageResult
import SchoolModelResponse = SchoolPalWebModelResponse.SchoolModelResponse
import GetSubjectsWithSearchResponse = SchoolPalWebModelResponse.GetSubjectsWithSearchResponse
import GetSubjectListDataResponse = SchoolPalWebModelResponse.GetSubjectListDataResponse
import GetExtendAttributeItemsDataResponse = SchoolPalWebModelResponse.GetExtendAttributeItemsDataResponse
import OrgParameterResponse = SchoolPalWebModelResponse.OrgParameterResponse
import LogoInfoResponse = SchoolPalWebModelResponse.LogoInfoResponse
import OrgApplicationConfigResponse = SchoolPalWebModelResponse.OrgApplicationConfigResponse
import OrgConfigInfoResponse = SchoolPalWebModelResponse.OrgConfigInfoResponse
import GetOrgextendconfigResponse = SchoolPalWebModelResponse.GetOrgextendconfigResponse
import GetExamScoreResponse = SchoolPalWebModelResponse.GetExamScoreResponse
import GetExamScoresResponse = SchoolPalWebModelResponse.GetExamScoresResponse
import SaveExamScoresResponse = SchoolPalWebModelResponse.SaveExamScoresResponse
import GetExamItemsResponse = SchoolPalWebModelResponse.GetExamItemsResponse
import GetExamsResponse = SchoolPalWebModelResponse.GetExamsResponse
import GetOrgTranorderTagListResponse = SchoolPalWebModelResponse.GetOrgTranorderTagListResponse
import SelectEmployeeCrmFetchHrDocDataResponse = SchoolPalWebModelResponse.SelectEmployeeCrmFetchHrDocDataResponse
import GetJurisdictionSettingDataResponse = SchoolPalWebModelResponse.GetJurisdictionSettingDataResponse
import GetCreditInfoResponse = SchoolPalWebModelResponse.GetCreditInfoResponse
import GetFollowUpPeopleInfoResponse = SchoolPalWebModelResponse.GetFollowUpPeopleInfoResponse
import GetSysMessagesResponse = SchoolPalWebModelResponse.GetSysMessagesResponse
import GetUsersByOrgIdResponse = SchoolPalWebModelResponse.GetUsersByOrgIdResponse
import GetAllAccountByOrgIdResponse = SchoolPalWebModelResponse.GetAllAccountByOrgIdResponse
import ExtendConfig = SchoolPalDomainSdk.ExtendConfig
// import FeeMode = SchoolPalDomainSdk.FeeMode
import ResponseResult_1 = SchoolPalWebModel.ResponseResult
import PagedQueryBase = SchoolPalWebModel.PagedQueryBase
import TagSaveRequest = SchoolPalWebModelRequestOrgManage.TagSaveRequest
import TagResponse = SchoolPalWebModelResponseOrgManage.TagResponse

/** 获取当前机构的所有校区 */
export const GetAllSchool = (
  request: GetAllSchoolRequest
): AxiosPromise<ResponseResult<PageResult<SchoolModelResponse[]>>> => {
  return service.post('/api2/Org/GetAllSchool', request)
}

/** 筛选项组件 科目搜索 */
export const GetSelectSubjectData = (
  para: GetSubjectsWithSearchRequest
): AxiosPromise<ResponseResult<PageResult<GetSubjectsWithSearchResponse[]>>> => {
  return service.post('/api2/Org/GetSelectSubjectData', para)
}

/** 保存科目 */
export const SaveSubject = (req: SaveSubjectRequest): AxiosPromise<ResponseResult<number>> => {
  return service.post('/api2/Org/SaveSubject', req)
}

/** 编辑科目 */
export const EditSubject = (req: EditSubjectRequest): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/Org/EditSubject', req)
}

/** 删除科目 */
export const DeleteSubject = (req: DeleteSubjectRequest): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/Org/DeleteSubject', req)
}

/** 修改科目状态 */
export const UpdateSubjectStatus = (req: UpdateSubjectStatusRequest): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/Org/UpdateSubjectStatus', req)
}

/** 科目列表数据 */
export const GetSubjectListData = (
  para: GetSubjectListDataRequest
): AxiosPromise<ResponseResult<PageResult<GetSubjectListDataResponse[]>>> => {
  return service.post('/api2/Org/GetSubjectListData', para)
}

/** 扩展字段查询 */
export const GetExtendConfig = (entity: string): AxiosPromise<ResponseResult<ExtendConfig[]>> => {
  return service.get('/api2/Org/GetExtendConfig', { params: { entity } })
}

/** 获取下拉框数据源 */
export const GetExtendAttributeItemsData = (
  req: GetExtendAttributeItemsDataRequest
): AxiosPromise<ResponseResult<PageResult<GetExtendAttributeItemsDataResponse[]>>> => {
  return service.post('/api2/Org/GetExtendAttributeItemsData', req)
}

/** 获取机构开启的收费模式  1.按课时  2.按时间  3.按期 */
export const GetOrgFeeModes = (): AxiosPromise<ResponseResult<number[]>> => {
  return service.get('/api2/Org/GetOrgFeeModes')
}

/** 机构基于OrgParameter的全量配置(前端) */
export const GetOrgParameterConfig = (): AxiosPromise<ResponseResult<OrgParameterResponse>> => {
  return service.get('/api2/Org/GetOrgParameterConfig')
}

/** 获取机构Logo信息 */
export const GetLogoInfo = (): AxiosPromise<ResponseResult<LogoInfoResponse>> => {
  return service.get('/api2/Org/GetLogoInfo')
}

/** 获取机构应用配置 */
export const GetOrgApplicationConfig = (): AxiosPromise<ResponseResult<OrgApplicationConfigResponse>> => {
  return service.get('/api2/Org/GetOrgApplicationConfig')
}

/** 获取机构首屏全量配置 */
export const GetOrgConfigInfo = (): AxiosPromise<ResponseResult<OrgConfigInfoResponse>> => {
  return service.get('/api2/Org/GetOrgConfigInfo')
}

/** 获取预留字段和自定义字段的配置（学员维度） */
export const GetOrgextendconfig = (
  request: GetOrgextendconfigRequest
): AxiosPromise<ResponseResult<GetOrgextendconfigResponse[]>> => {
  return service.post('/api2/Org/GetOrgextendconfig', request)
}

/** 获取考试成绩 */
export const GetExamScore = (req: GetExamScoreRequest): AxiosPromise<ResponseResult<GetExamScoreResponse>> => {
  return service.post('/api2/Org/GetExamScore', req)
}

/** 获取考试成绩 */
export const GetExamScores = (
  req: GetExamScoresRequest
): AxiosPromise<ResponseResult<PageResult<GetExamScoresResponse[]>>> => {
  return service.post('/api2/Org/GetExamScores', req)
}

/** 修改学员成绩 */
export const UpdateStuExamScore = (dto: UpdateStuExamScoreRequest): AxiosPromise<ResponseResult_1> => {
  return service.post('/api2/Org/UpdateStuExamScore', dto)
}

/** 删除学员成绩 */
export const DeleteExamScores = (dto: DeleteExamScoresRequest): AxiosPromise<ResponseResult_1> => {
  return service.post('/api2/Org/DeleteExamScores', dto)
}

/** 录入成绩，批量录入 */
export const SaveExamScores = (dto: SaveExamScoresRequest): AxiosPromise<ResponseResult<SaveExamScoresResponse>> => {
  return service.post('/api2/Org/SaveExamScores', dto)
}

/** 判断项目名称 */
export const JudgeExamItem = (dto: JudgeExamItemRequest): AxiosPromise<ResponseResult_1> => {
  return service.post('/api2/Org/JudgeExamItem', dto)
}

/** 编辑项目 */
export const ModifyExamItem = (dto: ModifyExamItemRequest): AxiosPromise<ResponseResult_1> => {
  return service.post('/api2/Org/ModifyExamItem', dto)
}

/** 添加项目 */
export const AddExamItem = (dto: AddExamItemRequest): AxiosPromise<ResponseResult<number>> => {
  return service.post('/api2/Org/AddExamItem', dto)
}

/** 判断项目名称 */
export const JudgeExam = (dto: JudgeExamRequest): AxiosPromise<ResponseResult_1> => {
  return service.post('/api2/Org/JudgeExam', dto)
}

/** 编辑项目 */
export const ModifyExam = (dto: ModifyExamRequest): AxiosPromise<ResponseResult_1> => {
  return service.post('/api2/Org/ModifyExam', dto)
}

/** 添加项目 */
export const AddExam = (dto: AddExamRequest): AxiosPromise<ResponseResult<number>> => {
  return service.post('/api2/Org/AddExam', dto)
}

/** 获取项目列表 */
export const GetExamItems = (dto: PagedQueryBase): AxiosPromise<ResponseResult<PageResult<GetExamItemsResponse[]>>> => {
  return service.post('/api2/Org/GetExamItems', dto)
}

/** 删除项目 */
export const DeleteExamItem = (dto: DeleteExamItemRequest): AxiosPromise<ResponseResult_1> => {
  return service.post('/api2/Org/DeleteExamItem', dto)
}

/** 获取考试列表 */
export const GetExams = (dto: PagedQueryBase): AxiosPromise<ResponseResult<PageResult<GetExamsResponse[]>>> => {
  return service.post('/api2/Org/GetExams', dto)
}

/** 删除考试 */
export const DeleteExam = (dto: DeleteExamRequest): AxiosPromise<ResponseResult_1> => {
  return service.post('/api2/Org/DeleteExam', dto)
}

/** 更改学员星标状态 */
export const ChangeStuInfoListUserCollection = (
  dto: ChangeStuInfoListUserCollectionRequest
): AxiosPromise<ResponseResult_1> => {
  return service.post('/api2/Org/ChangeStuInfoListUserCollection', dto)
}

/** 用于获取订单标签列表 */
export const GetOrgTranorderTagList = (): AxiosPromise<ResponseResult<GetOrgTranorderTagListResponse>> => {
  return service.post('/api2/Org/GetOrgTranorderTagList', {})
}

/** 选择销售员组件（stuinfo）获取员工列表接口 */
export const SelectEmployeeCrmFetchHrDocData = (
  req: SelectEmployeeCrmFetchHrDocDataRequest
): AxiosPromise<ResponseResult<PageResult<SelectEmployeeCrmFetchHrDocDataResponse[]>>> => {
  return service.post('/api2/Org/SelectEmployeeCrmFetchHrDocData', req)
}

/** 获取内部管理权限设置 */
export const GetJurisdictionSettingData = (): AxiosPromise<ResponseResult<GetJurisdictionSettingDataResponse>> => {
  return service.get('/api2/Org/GetJurisdictionSettingData')
}

/** 保存内部管理权限设置 */
export const SaveJurisdictionSettingData = (
  req: SaveJurisdictionSettingDataRequest
): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/Org/SaveJurisdictionSettingData', req)
}

/** 获取积分配置信息 */
export const GetCreditInfo = (): AxiosPromise<ResponseResult<GetCreditInfoResponse>> => {
  return service.get('/api2/Org/GetCreditInfo')
}

/** 获取新建订单时的 销售关系 */
export const GetFollowUpPeopleInfo = (): AxiosPromise<ResponseResult<GetFollowUpPeopleInfoResponse>> => {
  return service.post('/api2/Org/GetFollowUpPeopleInfo', {})
}

/** 创建标签 */
export const CreateTag = (request: TagSaveRequest): AxiosPromise<ResponseResult<TagResponse>> => {
  return service.post('/api2/Org/CreateTag', request)
}

/** 修改系统消息状态 */
export const UpdateSysMessageReaded = (request: UpdateSysMessageRequest): AxiosPromise<ResponseResult<boolean>> => {
  return service.post('/api2/Org/UpdateSysMessageReaded', request)
}

/** 系统消息列表数据 */
export const GetSysMessages = (
  para: GetSysMessagesRequest
): AxiosPromise<ResponseResult<PageResult<GetSysMessagesResponse[]>>> => {
  return service.post('/api2/Org/GetSysMessages', para)
}

/** 获取机构用户 */
export const GetUsersByOrgId = (
  req: GetUsersByOrgIdRequest
): AxiosPromise<ResponseResult<PageResult<GetUsersByOrgIdResponse[]>>> => {
  return service.post('/api2/Org/GetUsersByOrgId', req)
}

/** 获取机构所有收款账户 */
export const GetAllAccount = (): AxiosPromise<ResponseResult<GetAllAccountByOrgIdResponse[]>> => {
  return service.post('/api2/Org/GetAllAccount', {})
}

/** 更新标签 */
export const UpdateTag = (req: UpdateTagRequest): AxiosPromise<ResponseResult_1> => {
  return service.post('/api2/Org/UpdateTag', req)
}
