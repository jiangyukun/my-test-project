import service from './../../api/net'
import { AxiosPromise } from 'axios'
import SchoolPalWebModelRequest from './../types/SchoolPalWebModelRequest'
import SchoolPalToolkitResponse from './../types/SchoolPalToolkitResponse'
import SchoolPalWebModelResponse from './../types/SchoolPalWebModelResponse'
import SchoolPalWebModel from './../types/SchoolPalWebModel'
import SchoolPalDomainReportDomainSdk from './../types/SchoolPalDomainReportDomainSdk'
import SchoolPalCloudServiceModel from './../types/SchoolPalCloudServiceModel'
import GetFlowReportChatRequest = SchoolPalWebModelRequest.GetFlowReportChatRequest
import GetFlowReportRequest = SchoolPalWebModelRequest.GetFlowReportRequest
import GetExportFlowReportExcelRequest = SchoolPalWebModelRequest.GetExportFlowReportExcelRequest
import GetUnusedTuitionReportChartRequest = SchoolPalWebModelRequest.GetUnusedTuitionReportChartRequest
import GetUnusedTuitionReportDataRequest = SchoolPalWebModelRequest.GetUnusedTuitionReportDataRequest
import GetUnusedTuitionReportExcelRequest = SchoolPalWebModelRequest.GetUnusedTuitionReportExcelRequest
import GetFinancialFlowBySchoolChartRequest = SchoolPalWebModelRequest.GetFinancialFlowBySchoolChartRequest
import GetTeachingMaterialAndIncidentalReportExcelRequest = SchoolPalWebModelRequest.GetTeachingMaterialAndIncidentalReportExcelRequest
import GetReportByDateRequest = SchoolPalWebModelRequest.GetReportByDateRequest
import GetReportByStartAndEndRequest = SchoolPalWebModelRequest.GetReportByStartAndEndRequest
import GetReportBySchoolRequest = SchoolPalWebModelRequest.GetReportBySchoolRequest
import GetTuitionUsedStatChartRequest = SchoolPalWebModelRequest.GetTuitionUsedStatChartRequest
import GetTuitionUsedStatListRequest = SchoolPalWebModelRequest.GetTuitionUsedStatListRequest
import GetTuitionUsedStatReportExcelRequest = SchoolPalWebModelRequest.GetTuitionUsedStatReportExcelRequest
import GetIncomeByOtherDetailExcelRequest = SchoolPalWebModelRequest.GetIncomeByOtherDetailExcelRequest
import GetUsedTuitionListDataRequest = SchoolPalWebModelRequest.GetUsedTuitionListDataRequest
import GetUsedTuitionDetailListDataRequest = SchoolPalWebModelRequest.GetUsedTuitionDetailListDataRequest
import GetFinanceOrderAndOtherChartRequest = SchoolPalWebModelRequest.GetFinanceOrderAndOtherChartRequest
import GetFinanceOrderAndOtherReportDataRequest = SchoolPalWebModelRequest.GetFinanceOrderAndOtherReportDataRequest
import GetFinanceOrderAndOtherReportExcelRequest = SchoolPalWebModelRequest.GetFinanceOrderAndOtherReportExcelRequest
import GetTeacherReportListDataRequest = SchoolPalWebModelRequest.GetTeacherReportListDataRequest
import GetTeacherReportExcelRequest = SchoolPalWebModelRequest.GetTeacherReportExcelRequest
import GetTeacherClassesListDataRequest = SchoolPalWebModelRequest.GetTeacherClassesListDataRequest
import GetTeacherStuShouldRenewListDataRequest = SchoolPalWebModelRequest.GetTeacherStuShouldRenewListDataRequest
import GetTeacherStuActualRenewListDataRequest = SchoolPalWebModelRequest.GetTeacherStuActualRenewListDataRequest
import GetTeacherStuRefundListDataRequest = SchoolPalWebModelRequest.GetTeacherStuRefundListDataRequest
import GetClassReportListDataRequest = SchoolPalWebModelRequest.GetClassReportListDataRequest
import GetClassReportExcelRequest = SchoolPalWebModelRequest.GetClassReportExcelRequest
import GetClassesStuActualRenewListDataRequest = SchoolPalWebModelRequest.GetClassesStuActualRenewListDataRequest
import GetClassesStuShouldRenewListDataRequest = SchoolPalWebModelRequest.GetClassesStuShouldRenewListDataRequest
import GetTeacherClassTimeStatisticsRequest = SchoolPalWebModelRequest.GetTeacherClassTimeStatisticsRequest
import ResponseResult = SchoolPalToolkitResponse.ResponseResult
import GetFlowReportChartResponse = SchoolPalWebModelResponse.GetFlowReportChartResponse
import GetFlowReportResponse = SchoolPalWebModelResponse.GetFlowReportResponse
import GetUnusedTuitionReportDataResponse = SchoolPalWebModelResponse.GetUnusedTuitionReportDataResponse
import GetTeachingMaterialAndIncidentalRequest = SchoolPalWebModelResponse.GetTeachingMaterialAndIncidentalRequest
import GetTeachingMaterialAndIncidentalResponse = SchoolPalWebModelResponse.GetTeachingMaterialAndIncidentalResponse
import GetFinancialFlowBySchoolChartResponse = SchoolPalWebModelResponse.GetFinancialFlowBySchoolChartResponse
import TuitionUsedStatListResponse = SchoolPalWebModelResponse.TuitionUsedStatListResponse
import IncomeByOtherDetailResponse = SchoolPalWebModelResponse.IncomeByOtherDetailResponse
import GetFinanceOrderAndOtherReportDataResponse = SchoolPalWebModelResponse.GetFinanceOrderAndOtherReportDataResponse
import GetFinanceOrderAndOtherByMonthListDataResponse = SchoolPalWebModelResponse.GetFinanceOrderAndOtherByMonthListDataResponse
import GetFinanceOrderAndOtherByTypeDataResponse = SchoolPalWebModelResponse.GetFinanceOrderAndOtherByTypeDataResponse
import GetTeacherReportListDataResponse = SchoolPalWebModelResponse.GetTeacherReportListDataResponse
import GetTeacherClassesListDataResponse = SchoolPalWebModelResponse.GetTeacherClassesListDataResponse
import GetTeacherStuShouldRenewListDataResponse = SchoolPalWebModelResponse.GetTeacherStuShouldRenewListDataResponse
import GetTeacherStuActualRenewListDataResponse = SchoolPalWebModelResponse.GetTeacherStuActualRenewListDataResponse
import GetTeacherStuRefundListDataResponse = SchoolPalWebModelResponse.GetTeacherStuRefundListDataResponse
import GetClassReportListDataResponse = SchoolPalWebModelResponse.GetClassReportListDataResponse
import GetClassStuActualRenewListDataResponse = SchoolPalWebModelResponse.GetClassStuActualRenewListDataResponse
import GetClassStuShouldRenewListDataResponse = SchoolPalWebModelResponse.GetClassStuShouldRenewListDataResponse
import GetTeacherClassTimeStatisticsResponse = SchoolPalWebModelResponse.GetTeacherClassTimeStatisticsResponse
import GetTeacherClassTimeStatisticsDetailResponse = SchoolPalWebModelResponse.GetTeacherClassTimeStatisticsDetailResponse
import SeriesDataModel = SchoolPalWebModel.SeriesDataModel
import UsedTuitionSummaryModel = SchoolPalDomainReportDomainSdk.UsedTuitionSummaryModel
import UsedTuitionDetailModel = SchoolPalDomainReportDomainSdk.UsedTuitionDetailModel
import PageResult = SchoolPalCloudServiceModel.PageResult

/** 流水实收报表柱形图 */
export const GetFlowReportChartBySchoolData = (
  req: GetFlowReportChatRequest
): AxiosPromise<ResponseResult<GetFlowReportChartResponse>> => {
  return service.post('/api2/Report/GetFlowReportChartBySchoolData', req)
}

/** 流水实收报表 */
export const GetFlowReportListData = (
  req: GetFlowReportRequest
): AxiosPromise<ResponseResult<GetFlowReportResponse>> => {
  return service.post('/api2/Report/GetFlowReportListData', req)
}

/** 导出财务流水报表 */
export const GetExportFlowReportExcel = (
  req: GetExportFlowReportExcelRequest
): AxiosPromise<ResponseResult<string>> => {
  return service.post('/api2/Report/GetExportFlowReportExcel', req)
}

/** 获取剩余学费图表数据 */
export const GetUnusedTuitionReportChart = (
  req: GetUnusedTuitionReportChartRequest
): AxiosPromise<ResponseResult<SeriesDataModel>> => {
  return service.post('/api2/Report/GetUnusedTuitionReportChart', req)
}

/** 获取剩余学费报表数据 */
export const GetUnusedTuitionReportData = (
  req: GetUnusedTuitionReportDataRequest
): AxiosPromise<ResponseResult<GetUnusedTuitionReportDataResponse>> => {
  return service.post('/api2/Report/GetUnusedTuitionReportData', req)
}

/** 获取剩余学费报表Excel */
export const GetUnusedTuitionReportExcel = (
  req: GetUnusedTuitionReportExcelRequest
): AxiosPromise<ResponseResult<string>> => {
  return service.post('/api2/Report/GetUnusedTuitionReportExcel', req)
}

/** 教材杂费列表 */
export const GetTeachingMaterialAndIncidentalListData = (
  req: GetTeachingMaterialAndIncidentalRequest
): AxiosPromise<ResponseResult<GetTeachingMaterialAndIncidentalResponse>> => {
  return service.post('/api2/Report/GetTeachingMaterialAndIncidentalListData', req)
}

/** 教材杂费柱状图 */
export const GetTeachingMaterialAndIncidentalChartData = (
  req: GetFinancialFlowBySchoolChartRequest
): AxiosPromise<ResponseResult<GetFinancialFlowBySchoolChartResponse>> => {
  return service.post('/api2/Report/GetTeachingMaterialAndIncidentalChartData', req)
}

/** 获取教材杂费报表Excel */
export const GetTeachingMaterialAndIncidentalReportExcel = (
  req: GetTeachingMaterialAndIncidentalReportExcelRequest
): AxiosPromise<ResponseResult<string>> => {
  return service.post('/api2/Report/GetTeachingMaterialAndIncidentalReportExcel', req)
}

/** 新增咨询报表 */
export const GetNewStuinfoByDate = (request: GetReportByDateRequest): AxiosPromise<ResponseResult<SeriesDataModel>> => {
  return service.post('/api2/Report/GetNewStuinfoByDate', request)
}

/** 新增咨询环比 */
export const GetNewStuinfoByStartAndEnd = (
  request: GetReportByStartAndEndRequest
): AxiosPromise<ResponseResult<SeriesDataModel>> => {
  return service.post('/api2/Report/GetNewStuinfoByStartAndEnd', request)
}

/** 新增咨询对比数据 */
export const GetNewStuinfoBySchool = (
  request: GetReportBySchoolRequest
): AxiosPromise<ResponseResult<SeriesDataModel>> => {
  return service.post('/api2/Report/GetNewStuinfoBySchool', request)
}

/** 招生人次 */
export const GetRecruitStudentsNumByDate = (
  request: GetReportByDateRequest
): AxiosPromise<ResponseResult<SeriesDataModel>> => {
  return service.post('/api2/Report/GetRecruitStudentsNumByDate', request)
}

/** 招生人次环比 */
export const GetRecruitStudentsNumByStartAndEnd = (
  request: GetReportByStartAndEndRequest
): AxiosPromise<ResponseResult<SeriesDataModel>> => {
  return service.post('/api2/Report/GetRecruitStudentsNumByStartAndEnd', request)
}

/** 招生人次对比 */
export const GetRecruitStudentsNumBySchool = (
  request: GetReportBySchoolRequest
): AxiosPromise<ResponseResult<SeriesDataModel>> => {
  return service.post('/api2/Report/GetRecruitStudentsNumBySchool', request)
}

/** 招生应收数据 */
export const GetRecruitStudentsRealAmountByDate = (
  request: GetReportByDateRequest
): AxiosPromise<ResponseResult<SeriesDataModel>> => {
  return service.post('/api2/Report/GetRecruitStudentsRealAmountByDate', request)
}

/** 招生应收环比 */
export const GetRecruitStudentsRealAmountByStartAndEnd = (
  request: GetReportByStartAndEndRequest
): AxiosPromise<ResponseResult<SeriesDataModel>> => {
  return service.post('/api2/Report/GetRecruitStudentsRealAmountByStartAndEnd', request)
}

/** 招生应收对比 */
export const GetRecruitStudentsRealAmountBySchool = (
  request: GetReportBySchoolRequest
): AxiosPromise<ResponseResult<SeriesDataModel>> => {
  return service.post('/api2/Report/GetRecruitStudentsRealAmountBySchool', request)
}

/** 招生实收数据 */
export const GetRecruitStudentsActualIncomeByDate = (
  request: GetReportByDateRequest
): AxiosPromise<ResponseResult<SeriesDataModel>> => {
  return service.post('/api2/Report/GetRecruitStudentsActualIncomeByDate', request)
}

/** 招生实收环比 */
export const GetRecruitStudentsActualIncomeByStartAndEnd = (
  request: GetReportByStartAndEndRequest
): AxiosPromise<ResponseResult<SeriesDataModel>> => {
  return service.post('/api2/Report/GetRecruitStudentsActualIncomeByStartAndEnd', request)
}

/** 招生实收对比 */
export const GetRecruitStudentsActualIncomeBySchool = (
  request: GetReportBySchoolRequest
): AxiosPromise<ResponseResult<SeriesDataModel>> => {
  return service.post('/api2/Report/GetRecruitStudentsActualIncomeBySchool', request)
}

/** 教材杂费金额 */
export const GetItemAmountByDate = (request: GetReportByDateRequest): AxiosPromise<ResponseResult<SeriesDataModel>> => {
  return service.post('/api2/Report/GetItemAmountByDate', request)
}

/** 账户余额金额 */
export const GetAccountByDate = (request: GetReportByDateRequest): AxiosPromise<ResponseResult<SeriesDataModel>> => {
  return service.post('/api2/Report/GetAccountByDate', request)
}

/** 退费金额 */
export const GetTransforAmountByDate = (
  request: GetReportByDateRequest
): AxiosPromise<ResponseResult<SeriesDataModel>> => {
  return service.post('/api2/Report/GetTransforAmountByDate', request)
}

/** 学员就读数据 */
export const GetAttendSchool = (request: GetReportByDateRequest): AxiosPromise<ResponseResult<SeriesDataModel>> => {
  return service.post('/api2/Report/GetAttendSchool', request)
}

/** 学费消耗 */
export const GetClassTimesAmount = (request: GetReportByDateRequest): AxiosPromise<ResponseResult<SeriesDataModel>> => {
  return service.post('/api2/Report/GetClassTimesAmount', request)
}

/** 获取员工数据 */
export const GetHrDoc = (request: GetReportByDateRequest): AxiosPromise<ResponseResult<SeriesDataModel>> => {
  return service.post('/api2/Report/GetHrDoc', request)
}

/** 财务数据 */
export const GetFinanceDataByDate = (
  request: GetReportByDateRequest
): AxiosPromise<ResponseResult<SeriesDataModel>> => {
  return service.post('/api2/Report/GetFinanceDataByDate', request)
}

/** 财务环比 */
export const GetFinanceDataByStartAndEnd = (
  request: GetReportByStartAndEndRequest
): AxiosPromise<ResponseResult<SeriesDataModel>> => {
  return service.post('/api2/Report/GetFinanceDataByStartAndEnd', request)
}

/** 财务对比 */
export const GetFinanceDataBySchool = (
  request: GetReportBySchoolRequest
): AxiosPromise<ResponseResult<SeriesDataModel>> => {
  return service.post('/api2/Report/GetFinanceDataBySchool', request)
}

/** 学费消耗报表柱形图 */
export const GetTuitionUsedStatChartData = (
  req: GetTuitionUsedStatChartRequest
): AxiosPromise<ResponseResult<SeriesDataModel>> => {
  return service.post('/api2/Report/GetTuitionUsedStatChartData', req)
}

/** 获取学费消耗报表 */
export const GetTuitionUsedStatListData = (
  req: GetTuitionUsedStatListRequest
): AxiosPromise<ResponseResult<TuitionUsedStatListResponse>> => {
  return service.post('/api2/Report/GetTuitionUsedStatListData', req)
}

/** 非课消收入明细报表 */
export const GetIncomeByOtherDetailListData = (
  req: GetTuitionUsedStatListRequest
): AxiosPromise<ResponseResult<IncomeByOtherDetailResponse>> => {
  return service.post('/api2/Report/GetIncomeByOtherDetailListData', req)
}

/** 学费消耗报表Excel */
export const GetTuitionUsedStatReportExcel = (
  req: GetTuitionUsedStatReportExcelRequest
): AxiosPromise<ResponseResult<string>> => {
  return service.post('/api2/Report/GetTuitionUsedStatReportExcel', req)
}

/** 非课消明细报表Excel */
export const GetIncomeByOtherDetailReportExcel = (
  req: GetIncomeByOtherDetailExcelRequest
): AxiosPromise<ResponseResult<string>> => {
  return service.post('/api2/Report/GetIncomeByOtherDetailReportExcel', req)
}

/** 上课记录 */
export const GetUsedTuitionListData = (
  req: GetUsedTuitionListDataRequest
): AxiosPromise<ResponseResult<UsedTuitionSummaryModel>> => {
  return service.post('/api2/Report/GetUsedTuitionListData', req)
}

/** 上课记录导出 */
export const GetUsedTuitionListDataExcel = (
  req: GetUsedTuitionListDataRequest
): AxiosPromise<ResponseResult<string>> => {
  return service.post('/api2/Report/GetUsedTuitionListDataExcel', req)
}

/** 上课记录 */
export const GetUsedTuitionDetailListData = (
  req: GetUsedTuitionDetailListDataRequest
): AxiosPromise<ResponseResult<PageResult<UsedTuitionDetailModel[]>>> => {
  return service.post('/api2/Report/GetUsedTuitionDetailListData', req)
}

/** 上课记录明细导出 */
export const GetUsedTuitionDetailListDataExcel = (
  req: GetUsedTuitionDetailListDataRequest
): AxiosPromise<ResponseResult<string>> => {
  return service.post('/api2/Report/GetUsedTuitionDetailListDataExcel', req)
}

/** 财务收支报表柱形图 */
export const GetFinanceOrderAndOtherChartData = (
  req: GetFinanceOrderAndOtherChartRequest
): AxiosPromise<ResponseResult<SeriesDataModel>> => {
  return service.post('/api2/Report/GetFinanceOrderAndOtherChartData', req)
}

/** 收支按经办校区列表 */
export const GetFinanceOrderAndOtherBySchooolListData = (
  req: GetFinanceOrderAndOtherReportDataRequest
): AxiosPromise<ResponseResult<GetFinanceOrderAndOtherReportDataResponse>> => {
  return service.post('/api2/Report/GetFinanceOrderAndOtherBySchooolListData', req)
}

/** 收支按月份列表 */
export const GetFinanceOrderAndOtherByMonthListData = (
  req: GetFinanceOrderAndOtherReportDataRequest
): AxiosPromise<ResponseResult<GetFinanceOrderAndOtherByMonthListDataResponse>> => {
  return service.post('/api2/Report/GetFinanceOrderAndOtherByMonthListData', req)
}

/** 财务收支报表按类型列表 */
export const GetFinanceOrderAndOtherByTypeData = (
  req: GetFinanceOrderAndOtherReportDataRequest
): AxiosPromise<ResponseResult<GetFinanceOrderAndOtherByTypeDataResponse>> => {
  return service.post('/api2/Report/GetFinanceOrderAndOtherByTypeData', req)
}

/** 财务收支报表Excel */
export const GetFinanceOrderAndOtherReportExcel = (
  req: GetFinanceOrderAndOtherReportExcelRequest
): AxiosPromise<ResponseResult<string>> => {
  return service.post('/api2/Report/GetFinanceOrderAndOtherReportExcel', req)
}

/** 获取教师报表 */
export const GetTeacherReportListData = (
  request: GetTeacherReportListDataRequest
): AxiosPromise<ResponseResult<GetTeacherReportListDataResponse>> => {
  return service.post('/api2/Report/GetTeacherReportListData', request)
}

/** 教师报表导出 */
export const GetTeacherReportExcel = (request: GetTeacherReportExcelRequest): AxiosPromise<ResponseResult<string>> => {
  return service.post('/api2/Report/GetTeacherReportExcel', request)
}

/** 获取教师带班报表 */
export const GetTeacherClassesListData = (
  request: GetTeacherClassesListDataRequest
): AxiosPromise<ResponseResult<GetTeacherClassesListDataResponse>> => {
  return service.post('/api2/Report/GetTeacherClassesListData', request)
}

/** 教师带班报表导出 */
export const GetTeacherClassesReportExcel = (
  request: GetTeacherReportExcelRequest
): AxiosPromise<ResponseResult<string>> => {
  return service.post('/api2/Report/GetTeacherClassesReportExcel', request)
}

/** 获取教师所带学生应续报表 */
export const GetTeacherStuShouldRenewListData = (
  request: GetTeacherStuShouldRenewListDataRequest
): AxiosPromise<ResponseResult<GetTeacherStuShouldRenewListDataResponse>> => {
  return service.post('/api2/Report/GetTeacherStuShouldRenewListData', request)
}

/** 教师所带学生应续报表导出 */
export const GetTeacherStuShouldRenewReportExcel = (
  request: GetTeacherReportExcelRequest
): AxiosPromise<ResponseResult<string>> => {
  return service.post('/api2/Report/GetTeacherStuShouldRenewReportExcel', request)
}

/** 获取教师所带学生实续报表 */
export const GetTeacherStuActualRenewListData = (
  request: GetTeacherStuActualRenewListDataRequest
): AxiosPromise<ResponseResult<GetTeacherStuActualRenewListDataResponse>> => {
  return service.post('/api2/Report/GetTeacherStuActualRenewListData', request)
}

/** 教师所带班级实续报表导出 */
export const GetTeacherStuActualRenewReportExcel = (
  request: GetTeacherReportExcelRequest
): AxiosPromise<ResponseResult<string>> => {
  return service.post('/api2/Report/GetTeacherStuActualRenewReportExcel', request)
}

/** 获取教师所带学生退费人次列表 */
export const GetTeacherStuRefundListData = (
  request: GetTeacherStuRefundListDataRequest
): AxiosPromise<ResponseResult<GetTeacherStuRefundListDataResponse>> => {
  return service.post('/api2/Report/GetTeacherStuRefundListData', request)
}

/** 教师所带学生退费人次报表导出 */
export const GetTeacherStuRefundReportExcel = (
  request: GetTeacherReportExcelRequest
): AxiosPromise<ResponseResult<string>> => {
  return service.post('/api2/Report/GetTeacherStuRefundReportExcel', request)
}

/** 获取班级报表 */
export const GetClassReportListData = (
  request: GetClassReportListDataRequest
): AxiosPromise<ResponseResult<GetClassReportListDataResponse>> => {
  return service.post('/api2/Report/GetClassReportListData', request)
}

/** 班级报表导出 */
export const GetClassReportExcel = (request: GetClassReportExcelRequest): AxiosPromise<ResponseResult<string>> => {
  return service.post('/api2/Report/GetClassReportExcel', request)
}

/** 班级下学生实续报表 */
export const GetClassesStuActualRenewListData = (
  request: GetClassesStuActualRenewListDataRequest
): AxiosPromise<ResponseResult<GetClassStuActualRenewListDataResponse>> => {
  return service.post('/api2/Report/GetClassesStuActualRenewListData', request)
}

/** 班级下学生实续报表导出 */
export const GetClassesStuActualRenewReportExcel = (
  request: GetClassReportExcelRequest
): AxiosPromise<ResponseResult<string>> => {
  return service.post('/api2/Report/GetClassesStuActualRenewReportExcel', request)
}

/** 获取教师所带学生应续报表 */
export const GetClassStuShouldRenewListData = (
  request: GetClassesStuShouldRenewListDataRequest
): AxiosPromise<ResponseResult<GetClassStuShouldRenewListDataResponse>> => {
  return service.post('/api2/Report/GetClassStuShouldRenewListData', request)
}

/** 教师所带学生应续报表导出 */
export const GetClassStuShouldRenewReportExcel = (
  request: GetClassReportExcelRequest
): AxiosPromise<ResponseResult<string>> => {
  return service.post('/api2/Report/GetClassStuShouldRenewReportExcel', request)
}

/** 获取课时汇总按教师课时列表 */
export const GetTeacherClassTimeStatistics = (
  req: GetTeacherClassTimeStatisticsRequest
): AxiosPromise<ResponseResult<PageResult<GetTeacherClassTimeStatisticsResponse[]>>> => {
  return service.post('/api2/Report/GetTeacherClassTimeStatistics', req)
}

/** 获取单个教师课时汇总详情 */
export const GetTeacherClassTimeStatisticsDetail = (
  req: GetTeacherClassTimeStatisticsRequest
): AxiosPromise<ResponseResult<GetTeacherClassTimeStatisticsDetailResponse[]>> => {
  return service.post('/api2/Report/GetTeacherClassTimeStatisticsDetail', req)
}

/** 导出课时汇总按教师课时列表 */
export const ExportTeacherClassTimeStatistics = (
  req: GetTeacherClassTimeStatisticsRequest
): AxiosPromise<ResponseResult<string>> => {
  return service.post('/api2/Report/ExportTeacherClassTimeStatistics', req)
}
