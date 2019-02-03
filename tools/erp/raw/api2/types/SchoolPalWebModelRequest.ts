import SchoolPalDomainSdk from './SchoolPalDomainSdk'
import SchoolPalCloudServiceModel from './SchoolPalCloudServiceModel'
import SchoolPalWebModelResponse from './SchoolPalWebModelResponse'
import SchoolPalWebModel from './SchoolPalWebModel'
import ClassExtend = SchoolPalDomainSdk.ClassExtend
import ClassTeacher = SchoolPalDomainSdk.ClassTeacher
import SchoolInfo = SchoolPalDomainSdk.SchoolInfo
import SubjectInfo = SchoolPalDomainSdk.SubjectInfo
import LessonExtendInfo = SchoolPalDomainSdk.LessonExtendInfo
import FeeStandardInfo = SchoolPalDomainSdk.FeeStandardInfo
import LessonItemPackageInfo = SchoolPalDomainSdk.LessonItemPackageInfo
import FeeStandardForUpdateInfo = SchoolPalDomainSdk.FeeStandardForUpdateInfo
import PageArgument = SchoolPalCloudServiceModel.PageArgument
import StuInfoDto = SchoolPalWebModelResponse.StuInfoDto
import StuInfoExtendDto = SchoolPalWebModelResponse.StuInfoExtendDto
import StuInfoFollowUpRelationDto = SchoolPalWebModelResponse.StuInfoFollowUpRelationDto
import StuinfoExtendSearchDto = SchoolPalWebModel.StuinfoExtendSearchDto
namespace SchoolPalWebModelRequest {
  /** 一对一添加教师 */
  export interface AssignTeacherRequest {
    /** 班级Id */
    classId?: number
    /** 学生Id */
    stuDocId?: number
    /** 教师集合id,name */
    teachers: SimpleTeacherDto[]
    /** 教师类型  0：教师  1：助教 Enum 枚举类型 */
    targetType: 0 | 1
    /** 学员课时 */
    stuClassTime?: number
    /** 教师课时 */
    teacherClassTime?: number
  }

  /** 简单的教师Dto */
  export interface SimpleTeacherDto {
    /** 教师ID */
    teacherId?: number
    /** 教师姓名 */
    teacherName?: string
  }

  /** 选班组件 入参 */
  export interface SelectClassInfoFetchDataRequest {
    /** 校区 */
    schoolId?: number[]
    /** 课程 */
    lessonId?: number[]
    /** 开班日期 */
    searchDate?: string[]
    /** 上课星期 */
    weekIds?: number[]
    /** 上课时段（上午/下午） */
    morning?: number[]
    /** 收费模式 */
    feeMode?: number[]
    /** 科目 */
    subject?: number[]
    /** 学年 */
    academicYear?: number[]
    /** 学季 */
    termTrimester?: number[]
    /** 年级 */
    grade2?: number[]
    /** 学员Id */
    stuInfoId?: number[]
    /** 订单Id */
    tranOrderId?: number[]
    /** 课程授课模式（班课为1，一对一为2） */
    classLessonMode?: number[]
    /** 班级状态,默认为0。0：未开班、1：开班中、2：已结班 */
    status?: number[]
    /** 招生状态,默认为0。1：招生中、0：停止招生 、2：满班自动停止招生 Enum 枚举类型 */
    enrolling: Array<0 | 1 | 2>
    /** 课程类别 */
    lessonClassId?: number[]
    /** 描述缺失 */
    query?: string
    /** 描述缺失 */
    pageSize?: number
    /** 描述缺失 */
    pageIndex?: number
  }

  /** 一对一学员列表/待处理学员列表入参 */
  export interface GetOneToOneListRequest {
    /** 是否只显示未分配教师的列表 true:待处理学员页面 false:一对一学员页面 */
    isUnAssigned?: boolean
    /** 校区ID（过滤条件） */
    schoolId?: number[]
    /** 课程类别ID（过滤条件） */
    lessonClassId?: number[]
    /** 课程ID（过滤条件） */
    lessonId?: number[]
    /** 上课星期（过滤条件） */
    lessonDate?: number[]
    /** 上课时间（过滤条件） */
    lessonTime?: number[]
    /** 收费模式（过滤条件） */
    feeMode?: number[]
    /** 开课状态（过滤条件） */
    classStatus?: number[]
    /** 上课教室ID（过滤条件） */
    classroomId?: number[]
    /** 是否有星标（过滤条件） */
    isCollection?: number[]
    /** 开课日期（过滤条件） */
    startDates?: string[]
    /** 是否显示 退、转、停、结 状态的学员（过滤条件） */
    isShowAll?: boolean
    /** 查询类型 */
    queryType?: string
    /** 排序字段 */
    orderKey?: string
    /** 是否升序 */
    asc?: boolean
    /** 是否升期（1已升期 0未升期） */
    risePeriod?: number[]
    /** 描述缺失 */
    query?: string
    /** 描述缺失 */
    pageSize?: number
    /** 描述缺失 */
    pageIndex?: number
  }

  /** 批量分配教师入参 */
  export interface BatchAssignClassTeacherRequest {
    /** 班级ID列表 */
    classIds?: number[]
    /** 教师/助教ID列表 */
    hrDocIds?: number[]
    /** 模板类型 Enum 枚举类型 */
    targetType: 0 | 1
    /** 学员课时 */
    stuClassTime?: number
    /** 教师课时 */
    teacherClassTime?: number
  }

  /** 添加星标接口入参 */
  export interface ChangeOneToOneCollectionRequest {
    /** 星标类型 Enum 枚举类型 */
    collectionType: 1 | 2 | 3 | 4 | 5
    /** 添加星标的班级ID */
    classId?: number
    /** 操作类型 Enum 枚举类型 */
    operationType: 0 | 1
  }

  /** 课程表 */
  export interface GetStuInfoScheduleListRequest {
    /** 描述缺失 */
    dateEnum?: string
    /** 描述缺失 */
    startTime?: string
    /** 描述缺失 */
    endTime?: string
    /** 描述缺失 */
    schoolId?: string
    /** 描述缺失 */
    lessonId?: string
    /** 描述缺失 */
    classId?: string
    /** 描述缺失 */
    classroomId?: string
    /** 描述缺失 */
    classTeacherId?: string
    /** 描述缺失 */
    hrDocId?: string
    /** 描述缺失 */
    studentId?: number
    /** 描述缺失 */
    orderBy?: string
    /** 描述缺失 */
    orderBySort?: string
    /** 描述缺失 */
    pageIndex?: number
    /** 描述缺失 */
    pageSize?: number
    /** 描述缺失 */
    lessonMode?: number
    /** 描述缺失 */
    type?: string
    /** 描述缺失 */
    name?: string
    /** 描述缺失 */
    classTimeOrder?: string
    /** 描述缺失 */
    lessonClassId?: string
    /** 科目ids */
    subjectIds?: string
    /** 记上课状态：1-已记录；0-未记录 */
    isRecorded?: string
    /** 星期几 */
    dayOfWeek?: number
    /** 请求来自的页面 1：日程列表 ；2：今日上课页面 */
    fromPage?: number
    /** 搜索类别 */
    searchKey?: string
    /** 搜索值 */
    searchValue?: string
  }

  /** 分班 */
  export interface AssignClassForOneToOneRequest {
    /** 学费账户Id */
    stuFeeDocId?: number
    /** 班级Id */
    classIds?: string
  }

  /** 分教师 */
  export interface AssignTeachersRequest {
    /** 描述缺失 */
    stuDocId?: number
    /** 班级Id */
    classId?: number
    /** 教师Id */
    teacherIds?: string
  }

  /** 获取班级下学员详情action 入参 */
  export interface GetClassStuDetailsListRequest {
    /** 班级Id */
    classId?: number
    /** 学员姓名模糊查询 */
    query?: string
    /** 是否显示 转、停、退、结学员 */
    isShowOtherStatus?: boolean
    /** 参数 */
    order?: string
  }

  /** 学员id name 集合 */
  export interface StuInfos {
    /** id */
    id?: number
    /** StuFeeDocId */
    stuFeeDocId?: number
    /** 改为在读使用 */
    stuDocId?: number
    /** 学员姓名 */
    stuName?: string
  }

  /** 学员结课 */
  export interface CloseStuDocsRequest {
    /** 班级Id */
    classId?: number
    /** 学员集合 */
    stuInfoList: StuInfos[]
    /** 班型，1-班课,2-一对一, v10.1 Enum 枚举类型 */
    lessonMode: 1 | 2
    /** 是否结课stufeedoc */
    isCloseStuFeeDoc?: boolean
  }

  /** 选择班级学员 */
  export interface ClassStuInfoRequest {
    /** 班级Id */
    classId?: number
    /** 学员集合 */
    stuInfoList: StuInfos[]
  }

  /** 调班 */
  export interface AdjustmentClassRequest {
    /** 老的班级Id */
    oldClassId?: number
    /** 新的班级Id */
    newClassId?: number
    /** 班级studocList */
    classStuDocList: ClassStuDoc[]
    /** 课程id */
    lessonId?: number
    /** 当前班级schoolId */
    schoolId?: number
  }

  /** StuDoc集合 */
  export interface ClassStuDoc {
    /** 学员账户Id */
    stuDocId?: number
    /** 学费账户id */
    stuFeeDocId?: number
    /** 学员id */
    stuInfoId?: number
    /** 学员姓名 */
    stuName?: string
  }

  /** 检查当前座位是否可选 请求入参 */
  export interface CheckClassSeatIsValidRequest {
    /** 是否报名 */
    isEnroll?: boolean
    /** 排座Id */
    stuDocSeatId?: number
    /** 排座Id2 */
    stuDocSeatId2?: number
    /** 座位排数 */
    row2?: number
    /** 座位列数 */
    column2?: number
    /** 学员档案Id */
    stuDocId?: number
    /** 班级Id */
    classId?: number
    /** 教室Id */
    classroomId?: number
    /** 座位排数 */
    row?: number
    /** 座位列数 */
    column?: number
  }

  /** 学员排座保存请求 */
  export interface CreateStuDocSeatRequest {
    /** 学员档案Id */
    stuDocId?: number
    /** 班级Id */
    classId?: number
    /** 教室Id */
    classroomId?: number
    /** 座位排数 */
    row?: number
    /** 座位列数 */
    column?: number
  }

  /** 取消排座保存请求 */
  export interface CancelStuDocSeatRequest {
    /** 排座Id */
    stuDocSeatId?: number
    /** 学员档案Id */
    stuDocId?: number
    /** 班级Id */
    classId?: number
    /** 教室Id */
    classroomId?: number
    /** 座位排数 */
    row?: number
    /** 座位列数 */
    column?: number
  }

  /** 调座保存请求 */
  export interface ExchangeStuDocSeatRequest {
    /** 排座Id */
    stuDocSeatId?: number
    /** 排座Id2 */
    stuDocSeatId2?: number
    /** 座位排数 */
    row2?: number
    /** 座位列数 */
    column2?: number
    /** 学员档案Id */
    stuDocId?: number
    /** 班级Id */
    classId?: number
    /** 教室Id */
    classroomId?: number
    /** 座位排数 */
    row?: number
    /** 座位列数 */
    column?: number
  }

  /** 学员调座保存请求 */
  export interface ChangeStuDocSeatRequest {
    /** 排座Id */
    stuDocSeatId?: number
    /** 学员档案Id */
    stuDocId?: number
    /** 班级Id */
    classId?: number
    /** 教室Id */
    classroomId?: number
    /** 座位排数 */
    row?: number
    /** 座位列数 */
    column?: number
  }

  /** 描述缺失 */
  export interface ShiftClassRequest {
    /** 旧的学员档案Id */
    outStuDocId?: number
    /** 转入班级Id */
    classId?: number
  }

  /** 班级详情-上课记录列表-查询 */
  export interface GetTeachingLogsByClassIdRequest {
    /** 班级id */
    classId?: number
    /** 开始日期 */
    beginDate?: string
    /** 结束日期 */
    endDate?: string
    /** 查询类型，1 上课日期，2 创建日期  日期字段的查询跟随查询类型变化 */
    searchType?: number
    /** 是否正序 */
    asc?: boolean
    /** 排序关键字，排序字段DateTime（上课日期），AddDate（创建日期） */
    orderKey?: string
  }

  /** 学员详情上课记录查询 */
  export interface GetStuTeachingLogsByStuInfoIdRequest {
    /** 班级id，可为0 */
    classId?: number
    /** 学员id */
    stuInfoId?: number
    /** 每页条数，最大200条 */
    pageSize?: number
    /** 查询的页码，从1开始计数 */
    pageIndex?: number
  }

  /** 保存新建班级请求 */
  export interface SaveNewClassRequest {
    /** 班级模型 */
    classModel: SaveClassModel
    /** 描述缺失 */
    classExtend: ClassExtend
    /** 上课时间 */
    classTimeList: ClassTimingDto[]
    /** 时间是否待定1：是 0：否 */
    dateNoSet?: number
    /** 课程模式：1：按课时 2：按时间 3：按期 Enum 枚举类型 */
    lessonMode: 1 | 2
    /** 存在冲突时用（1：存在冲突仍保存 其他情况为0） */
    confirmConflict?: number
  }

  /** 班级模型 */
  export interface SaveClassModel {
    /** 校区ID */
    schoolId?: number
    /** 课程ID */
    lessonId?: number
    /** 课程名称 */
    className?: string
    /** 最大人数 */
    maxStudent?: number
    /** 开课时间 */
    openDate?: string
    /** 结课时间 */
    closeDate?: string
    /** 每次上课消耗课时  【学生课时】 */
    unitClassTimes?: number
    /** 每次上课消耗课时 【教师课时】 */
    teacherClasstime?: number
    /** 招生状态 Enum 枚举类型 */
    enrolling: 0 | 1 | 2
    /** 班级状态 Enum 枚举类型 */
    status: 0 | 1 | 2
    /** 创建时间 */
    createdTime?: string
    /** 备注 */
    comment?: string
    /** 教室ID */
    classroomId?: number
    /** 教师列表 */
    teachers: ClassTeacher[]
    /** 班级类型 */
    classMode?: string
    /** 是否结班时自动结课 */
    autoCloseStuFeeDoc?: boolean
  }

  /** 上课时间列表模型 */
  export interface ClassTimingDto {
    /** Id */
    classPeriodTemplateId?: number
    /** 开始时间 */
    beginTime?: string
    /** 结束时间 */
    endTime?: string
    /** 重复设置 */
    setting?: number
    /** 重复设置显示文案 */
    settingText?: string
    /** 周 */
    weekDay?: number
    /** 周显示文案 */
    weekDayText?: string
    /** 上课时段开始时间（时） */
    startHour?: string
    /** 上课时段开始时间（分） */
    startMinute?: string
    /** 上课时段结束时间（时） */
    endHour?: string
    /** 上课时段结束时间（分） */
    endMinute?: string
    /** 内容 */
    content?: string
    /** 教师ID */
    teacher?: number
    /** 教师名称 */
    teacherName?: string
    /** 助教 */
    assistant?: number
    /** 助教名称 */
    assistantName?: string
    /** 教室Id */
    classRoomId?: number
    /** 教室名称 */
    classRoomName?: string
    /** 重复数 */
    repeatCount?: number
    /** 科目Id */
    subjectId?: number
    /** 科目名 */
    subjectName?: string
  }

  /** 保存新建班级请求 */
  export interface SaveEditClassRequest {
    /** 班级模型 */
    classModel: SaveEditClassModel
    /** 描述缺失 */
    classExtend: ClassExtend
    /** 上课时间 */
    classTimeList: ClassTimingDto[]
    /** 时间是否待定1：是 0：否 */
    dateNoSet?: number
    /** 课程模式：1：按课时 2：按时间 3：按期 Enum 枚举类型 */
    lessonMode: 1 | 2
    /** 存在冲突时用（1：存在冲突仍保存 其他情况为0） */
    confirmConflict?: number
  }

  /** 班级模型 */
  export interface SaveEditClassModel {
    /** 班级id，主键 */
    id?: number
    /** 校区ID */
    schoolId?: number
    /** 课程ID */
    lessonId?: number
    /** 课程名称 */
    className?: string
    /** 最大人数 */
    maxStudent?: number
    /** 开课时间 */
    openDate?: string
    /** 结课时间 */
    closeDate?: string
    /** 每次上课消耗课时  【学生课时】 */
    unitClassTimes?: number
    /** 每次上课消耗课时 【教师课时】 */
    teacherClasstime?: number
    /** 招生状态 Enum 枚举类型 */
    enrolling: 0 | 1 | 2
    /** 班级状态 Enum 枚举类型 */
    status: 0 | 1 | 2
    /** 备注 */
    comment?: string
    /** 教室ID */
    classroomId?: number
    /** 教师列表 */
    teachers: ClassTeacher[]
    /** 班级类型 */
    classMode?: string
    /** 是否结班时自动结课 */
    autoCloseStuFeeDoc?: boolean
  }

  /** 描述缺失 */
  export interface GetStuDocsByClassIdRequest {
    /** 班级id */
    classId?: number[]
  }

  /** 获取发生课消班级List 入参 */
  export interface GetClassEliminateClassListRequest {
    /** 描述缺失 */
    query?: string
    /** 描述缺失 */
    pageSize?: number
    /** 描述缺失 */
    pageIndex?: number
  }

  /** stuDocids */
  export interface BatchStuDocIdsRequest {
    /** 描述缺失 */
    stuDocIds?: number[]
  }

  /** 结班 */
  export interface CloseClassRequest {
    /** 班级Id */
    classId?: number
    /** 是否同时结课 */
    isCloseStuFeeDoc?: boolean
  }

  /** Request for GetCostOverTuitionStuNames */
  export interface GetCostOverTuitionStuNamesRequest {
    /** 学员档案ids */
    stuDocIds?: number[]
  }

  /** 教室查询请求 */
  export interface ClassroomQueryRequest {
    /** 查询校区Id列表，null或空数组表示不限定校区 */
    schoolIds?: number[]
    /** 描述缺失 */
    query?: string
    /** 描述缺失 */
    pageSize?: number
    /** 描述缺失 */
    pageIndex?: number
  }

  /** 获取校区列表请求对象 */
  export interface GetSchoolListRequest {
    /** 是否获取全部校区 */
    isAll?: boolean
    /** 描述缺失 */
    query?: string
    /** 描述缺失 */
    pageSize?: number
    /** 描述缺失 */
    pageIndex?: number
  }

  /** 员工组件分页数据 */
  export interface SelectEmployeeFetchDataRequest {
    /** 描述缺失 */
    search?: string
    /** 描述缺失 */
    isHaveUser?: string
    /** 教师校区ID */
    schoolId?: number[]
    /** 请求来自的页面 1：日程列表 ,3=排课设置 */
    fromPage?: number
    /** 描述缺失 */
    pageIndex?: number
    /** 描述缺失 */
    pageSize?: number
  }

  /** 班级列表 */
  export interface SelectClassForTurnToFetchDataByLessonRequest {
    /** 描述缺失 */
    classId?: string
    /** 描述缺失 */
    lessonId?: number
    /** 描述缺失 */
    stuInfoId?: number
    /** 描述缺失 */
    stuFeeDocSchoolId?: number
    /** 是否使用跨校区分班功能 */
    isUsedOverSchool?: boolean
    /** 描述缺失 */
    pageIndex?: number
    /** 描述缺失 */
    pageSize?: number
  }

  /** 获取收支大类列表请求入参 */
  export interface GetExpenditureClassListRequest {
    /** 当前页码 */
    pageIndex?: number
    /** 每页条数 */
    pageSize?: number
  }

  /** 获取其他收入列表入参 */
  export interface GetIncomeItemListRequest {
    /** 当前页码 */
    pageIndex?: number
    /** 每页条数 */
    pageSize?: number
  }

  /** 收支大类新增 请求参数 */
  export interface ExpenditureClassRequest {
    /** 排序 */
    orderId?: number
    /** 类型，（支出、收入） */
    pageType?: string
    /** 类名 */
    expenditureClassName?: string
  }

  /** 收支大类修改 请求参数 */
  export interface EditExpenditureClassRequest {
    /** 收支大类Id */
    id?: number
    /** 排序 */
    orderId?: number
    /** 类型，（支出、收入） */
    pageType?: string
    /** 类名 */
    expenditureClassName?: string
  }

  /** 收支大类删除 请求参数 */
  export interface DelExpenditureClassRequest {
    /** 收支大类Id */
    id?: number
  }

  /** 收支项目新增修改 请求参数 */
  export interface ExpenditureItemRequest {
    /** 排序 */
    orderId?: number
    /** 支出大类ID，对应expenditureclass.Id */
    expenditureClassId?: number
    /** 支出项目名称 */
    expenditureItemName?: string
    /** 类型，（支出、收入） */
    pageType?: string
  }

  /** 收支项目修改 请求参数 */
  export interface EditExpenditureItemRequest {
    /** 收支大类Id */
    id?: number
    /** 排序 */
    orderId?: number
    /** 支出大类ID，对应expenditureclass.Id */
    expenditureClassId?: number
    /** 支出项目名称 */
    expenditureItemName?: string
    /** 类型，（支出、收入） */
    pageType?: string
  }

  /** 收支项目删除 请求参数 */
  export interface DelExpenditureItemRequest {
    /** 收支小类Id */
    id?: number
    /** 支出大类ID */
    expenditureClassId?: number
  }

  /** （批量）确认/取消到款 入参 */
  export interface BatchChangeAccountDetailStateRequest {
    /** 确认到账:是否确认,默认false。true:已确认 */
    isConfirm?: boolean
    /** 账户明细Id集合 */
    accountDetailIds?: number[]
  }

  /** 账户列表数据Action 入参 */
  export interface GetAccountListDataRequest {
    /** 筛选校区 */
    filtrSchoolIds?: number[]
    /** 描述缺失 */
    query?: string
    /** 描述缺失 */
    pageSize?: number
    /** 描述缺失 */
    pageIndex?: number
  }

  /** 账户名字列表数据 入参 */
  export interface GetAccountNameListData {
    /** 筛选校区 */
    filtrSchoolIds?: number[]
    /** 描述缺失 */
    query?: string
    /** 描述缺失 */
    pageSize?: number
    /** 描述缺失 */
    pageIndex?: number
  }

  /** 新增账户请求入参 */
  export interface AccountAddRequest {
    /** 账户适用校区 */
    accountSchoolLimit?: number[]
    /** 账户名称 */
    name?: string
    /** 是否启用 */
    enable?: boolean
    /** 备注 */
    comment?: string
    /** 是否显示对方账号 */
    showOppositeAccount?: boolean
    /** 是否显示流水单号 */
    showOrderNumber?: boolean
    /** 是否显示找零 */
    showCalcChange?: boolean
    /** 是否置顶 */
    isSetTop?: boolean
  }

  /** 账户编辑请求入参 */
  export interface AccountEditRequest {
    /** 账户Id */
    id?: number
    /** 账户适用校区 */
    accountSchoolLimit?: number[]
    /** 账户名称 */
    name?: string
    /** 是否启用 */
    enable?: boolean
    /** 备注 */
    comment?: string
    /** 是否显示对方账号 */
    showOppositeAccount?: boolean
    /** 是否显示流水单号 */
    showOrderNumber?: boolean
    /** 是否显示找零 */
    showCalcChange?: boolean
    /** 是否置顶 */
    isSetTop?: boolean
  }

  /** 账户删除请求入参 */
  export interface AccountDelRequest {
    /** 账户Id */
    id?: number
  }

  /** 获取确认收入列表请求入参 */
  export interface GetAffirmIncomeListDataRequest {
    /** 搜索日期范围 */
    searchDate?: string[]
    /** 课程类别Id集合 */
    lessonClassIds?: number[]
    /** 校区Id集合 */
    schoolIds?: number[]
    /** 变动类型 */
    sourceNames?: string[]
    /** 收费模式 */
    chargeModes?: string[]
    /** 班级Id */
    classIds?: number[]
    /** 课程Id */
    lessonIds?: number[]
    /** 排序Key */
    orderKey?: string
    /** 排序 */
    asc?: boolean
    /** 描述缺失 */
    query?: string
    /** 描述缺失 */
    pageSize?: number
    /** 描述缺失 */
    pageIndex?: number
  }

  /** 获取收支列表请求参数 */
  export interface GetAccountDetailListDataRequest {
    /** 经办开始日期 */
    startOccurTime?: string
    /** 经办结束日期 */
    endOccurTime?: string
    /** 付款开始日期 */
    startPaymentTime?: string
    /** 付款结束日期 */
    endPaymentTime?: string
    /** 账户Ids */
    accountIds?: number[]
    /** 校区Ids */
    schoolIds?: number[]
    /** 到款状态 */
    isConfirm?: boolean
    /** 搜索类型 Enum 枚举类型 */
    searchType: 1 | 2
    /** 收支类型 Enum 枚举类型 */
    inOutType: 1 | 2 | 3 | 4
    /** 具体收支类型的子类型Ids */
    accountDetailItemIds?: number[]
    /** 是否升序 */
    asc?: boolean
    /** 排序key */
    orderKey?: string
    /** 描述缺失 */
    query?: string
    /** 描述缺失 */
    pageSize?: number
    /** 描述缺失 */
    pageIndex?: number
  }

  /** 获取AccountDetail */
  export interface GetAccountDetailByIdResponse {
    /** 收支明细id；  所有订单新增时不需要此参数；  所有订单编辑时，若当前收支明细是编辑，则需要此参数，收支明细为新增，则不需要此参数； */
    id?: number
    /** 经办校区id； */
    schoolId?: number
    /** 校区名称 */
    schoolName?: string
    /** 经办时间;  所有订单中，不需要此参数；  若收支明细是新增，服务端取订单经办时间； */
    occurTime?: string
    /** 收支明细类型：订单类/其它；  报名/复课时不需要此参数，服务端设置1（订单收支）； Enum 枚举类型 */
    type: 1 | 2 | 3
    /** 收支项目：  订单类存的是枚举类型OrdersAccountDetailType的枚举值，  其它类存的是其他收支项目的id；  报名新增时不需要此参数，服务端设置1（报名收费）；  复课新增时不需要
     * 此参数，服务端设置4（复课收费）；  所有订单中，若收支明细是编辑，需要此参数，此数值不更新; */
    payMethod?: number
    /** 账户id；  所有订单中，若收支明细是新增，需要此参数；  所有订单中，若收支明细是编辑，不需要此参数，此数值不更新； */
    accountId?: number
    /** 金额：有正负区分 */
    amount?: number
    /** 备注  报名/复课时不需要此参数，服务设置为空； */
    comment?: string
    /** 对方账户，非必填 */
    oppositeAccount?: string
    /** 流水单号，非必填 */
    orderNumber?: string
    /** 订单编号,服务端设置订单编号 */
    tranOrderNumber?: number
    /** 订单id；  所有订单中，不需要此参数；  若收支明细是新增，服务端设置订单id；  若收支明细是编辑，此数值不更新； */
    tranOrderId?: number
    /** 创建时间；  所有订单中，不需要此参数；  若收支明细是新增，服务端设置当前时间；  若收支明细是编辑，此数值不更新； */
    createdTime?: string
    /** 创建人；  所有订单中，不需要此参数；  若收支明细是新增，服务端设置为订单的创建人；  若收支明细是编辑，此数值不更新； */
    creator?: string
    /** 是否确认到款；  报名/复课时不需要此参数,服务端设置为false； */
    isConfirm?: boolean
    /** 机构id；  报名/复课时不需要此参数，服务设置取订单的机构id； */
    orgId?: number
    /** 修改时间；  所有订单中，不需要此参数，服务端设置当前时间； */
    modifiedTime?: string
    /** 修改人；  所有订单中，不需要此参数，服务端设置为订单的修改人； */
    modifier?: string
    /** 退费来源ID/复课  报名/复课新增编辑时不需要此参数； */
    sourceRemainId?: number
    /** SCP云支付平台-实际支付金额  所有订单中，不需要此参数  用于校宝收银支付成功后，服务端记录实际支付金额 */
    scpRealPayAmount?: number
    /** 收款方式 */
    accountPaymentMethodId?: number
    /** 支付单号后8位 */
    simplePaymentMethodTradeNo?: string
    /** 付款时间 */
    paymentTime?: string
    /** 订单状态  订单状态默认设置为已经完成，订单待支付状态上线后再去除此默认值 Enum 枚举类型 */
    status: 1 | 2 | 3 | 4
    /** 账户名称 */
    accountdetailAccountName?: string
    /** 账户类型 Enum 枚举类型 */
    accountdetailAccountType: 1 | 2 | 3 | 10 | 11 | 99
    /** 收款方式类型 Enum 枚举类型 */
    accountdetailAccountPaymentmethodtype: 0 | 1 | 2 | 3
    /** 小类id（PayMethod） */
    expenditureItemId?: number
    /** 小类名称 */
    expenditureItemName?: string
    /** 大类Id */
    expenditureClassId?: number
    /** 大类name */
    expenditureClassName?: string
    /** 账户名称 */
    accountName?: string
  }

  /** GetItemDataRequest 请求 */
  export interface GetItemDataRequest {
    /** 课程大类Id */
    lessonClassId?: number
    /** 是否获取课程大类为全部的教材  LessonClassId = -1 */
    isAll?: boolean
  }

  /** 描述缺失 */
  export interface GetAllItemRequest {
    /** 描述缺失 */
    query?: string
    /** 描述缺失 */
    pageSize?: number
    /** 描述缺失 */
    pageIndex?: number
  }

  /** 教材组件分页数据 */
  export interface SelectTeachingItemFetchDataRequest {
    /** 描述缺失 */
    query?: string
    /** 描述缺失 */
    pageSize?: number
    /** 描述缺失 */
    pageIndex?: number
  }

  /** 描述缺失 */
  export interface GetItemDataByLessonIdsRequest {
    /** 课程id集合 */
    lessonIds?: number[]
    /** 描述缺失 */
    query?: string
    /** 描述缺失 */
    pageSize?: number
    /** 描述缺失 */
    pageIndex?: number
  }

  /** 描述缺失 */
  export interface GetLessonPackItemDataByLessonIdRequest {
    /** 课程id */
    lessonId?: number
  }

  /** 描述缺失 */
  export interface CreateLessonTranRequest {
    /** 课程大类Id */
    lessonClassId?: number
    /** 课程名称 */
    lessonName?: string
    /** 班型 Enum 枚举类型 */
    lessonMode: 1 | 2
    /** 备注 */
    remark?: string
    /** 是否所有校区 */
    allSchool?: boolean
    /** 课程开课校区 */
    lessonSchools: SchoolInfo[]
    /** 科目Id */
    subjects: SubjectInfo[]
    /** 描述缺失 */
    lessonExtend: LessonExtendInfo
    /** FeeStandard */
    feeStandards: FeeStandardInfo[]
    /** 课程关联的教材 */
    lessonItemPackages: LessonItemPackageInfo[]
  }

  /** 编辑课程保存 */
  export interface UpdateLessonTranRequest {
    /** 课程Id */
    lessonId?: number
    /** 课程大类Id */
    lessonClassId?: number
    /** 课程名称 */
    lessonName?: string
    /** 班型 Enum 枚举类型 */
    lessonMode: 1 | 2
    /** 备注 */
    remark?: string
    /** 是否所有校区 */
    allSchool?: boolean
    /** 课程开课校区 */
    lessonSchools: SchoolInfo[]
    /** 科目 */
    subjects: SubjectInfo[]
    /** 描述缺失 */
    lessonExtend: LessonExtendInfo
    /** FeeStandard */
    feeStandards: FeeStandardForUpdateInfo[]
    /** 课程关联的教材 */
    lessonItemPackages: LessonItemPackageInfo[]
  }

  /** 描述缺失 */
  export interface GetSameLessonNameByExtendRequest {
    /** 课程Id */
    lessonId?: number
    /** 学年 */
    academicYear?: number
    /** 学季 */
    termTrimester?: number
    /** 课程 */
    discipline?: number
    /** 年级 */
    grade2?: number
  }

  /** 描述缺失 */
  export interface GetLessonClassDataRequst {
    /** 描述缺失 */
    query?: string
    /** 描述缺失 */
    pageSize?: number
    /** 描述缺失 */
    pageIndex?: number
  }

  /** 描述缺失 */
  export interface LessonQueryRequest {
    /** 课程列表 */
    lessonClassId?: number[]
    /** 描述缺失 */
    query?: string
    /** 描述缺失 */
    pageSize?: number
    /** 描述缺失 */
    pageIndex?: number
  }

  /** 新建/编辑 课程大类 */
  export interface SaveLessonClassRequest {
    /** 课程类别Id */
    id?: number
    /** 排序 */
    orderId?: number
    /** 课程大类名称 */
    lessonClassName?: string
  }

  /** 删除课程分类请求参数 */
  export interface DelLessonClassRequest {
    /** 主键Id */
    id?: number
  }

  /** SelectLessonInfoFetchData请求值 */
  export interface SelectLessonInfoFetchDataRequest {
    /** 学员id */
    stuInfoId?: number
    /** 学年 */
    academicYear?: number[]
    /** 学季 */
    termTrimester?: number[]
    /** 学科 */
    discipline?: number[]
    /** 年级 */
    grade2?: number[]
    /** 校区 */
    schoolIds?: number[]
    /** 班型 */
    lessonModes?: number[]
    /** 收费模式 */
    feeMode?: number[]
    /** 课程列表 */
    lessonClassIds?: number[]
    /** 课程名 */
    lessonName?: string
    /** 科目 */
    subject?: number[]
    /** 课程状态是否上下架 */
    status?: number[]
    /** 升期课程id */
    upPeriodLessonId?: number[]
    /** 排序 */
    orderBy?: string
    /** 描述缺失 */
    pageIndex?: number
    /** 描述缺失 */
    pageSize?: number
  }

  /** GetLessonData 入参 */
  export interface GetLessonDataRequest {
    /** 学年 */
    academicYear?: number[]
    /** 学季 */
    termTrimester?: number[]
    /** 学科 */
    discipline?: number[]
    /** 年级 */
    grade2?: number[]
    /** 校区 */
    schoolIds?: number[]
    /** 班型 */
    lessonModes?: number[]
    /** 收费模式 */
    feeMode?: number[]
    /** 课程列表 */
    lessonClassIds?: number[]
    /** 科目 */
    subject?: number[]
    /** 课程状态是否上下架 */
    status?: number[]
    /** 是否正序 */
    asc?: boolean
    /** 排序key */
    orderKey?: string
    /** 描述缺失 */
    query?: string
    /** 描述缺失 */
    pageSize?: number
    /** 描述缺失 */
    pageIndex?: number
  }

  /** 描述缺失 */
  export interface GetLessonDataStatisticalRequest {
    /** 学年 */
    academicYear?: number[]
    /** 学季 */
    termTrimester?: number[]
    /** 学科 */
    discipline?: number[]
    /** 年级 */
    grade2?: number[]
    /** 校区 */
    schoolIds?: number[]
    /** 班型 */
    lessonModes?: number[]
    /** 收费模式 */
    feeMode?: number[]
    /** 课程列表 */
    lessonClassIds?: number[]
    /** 科目 */
    subject?: number[]
    /** 课程名模糊查询 */
    query?: string
  }

  /** 批量下架课程 入参 */
  export interface BatchStopLessonRequest {
    /** 课程ids */
    ids?: number[]
  }

  /** BatchDeleteLesson 入参 */
  export interface BatchDeleteLessonRequest {
    /** 课程ids */
    ids?: number[]
  }

  /** DeleteLesson 入参 */
  export interface DeleteLessonRequest {
    /** 课程id */
    id?: number
  }

  /** GetLessonUpgradeRelationships 入参 */
  export interface GetLessonUpgradeRelationshipsRequest {
    /** 模糊查询类型  byName,byClassName */
    queryType?: string
    /** 是否正序 */
    asc?: boolean
    /** 排序键  byName,byPeriod,byClassNum,byCreateAt */
    orderKey?: string
    /** 描述缺失 */
    query?: string
    /** 描述缺失 */
    pageSize?: number
    /** 描述缺失 */
    pageIndex?: number
  }

  /** 单一Id请求 */
  export interface IdRequest {
    /** Id */
    id?: number
  }

  /** 编辑课程升期关系 */
  export interface CreateLessonUpgradeRelationshipRequest {
    /** 课程升期关系名称 */
    lessonUpgradeConfigName?: string
    /** 课程分期 */
    lessonPeriods: CreateLessonPeriodDTO[]
  }

  /** 课程升期配置 */
  export interface CreateLessonPeriodDTO {
    /** 课程Id */
    lessonId?: number
    /** 课程名称 */
    lessonName?: string
    /** 期数 */
    period?: number
  }

  /** 编辑课程升期关系 */
  export interface EditLessonUpgradeRelationshipRequest {
    /** 课程升期关系Id */
    lessonUpgradeConfigId?: number
    /** 课程升期关系名称 */
    lessonUpgradeConfigName?: string
    /** 课程分期 */
    lessonPeriods: EditLessonPeriodDTO[]
  }

  /** 课程升期配置 */
  export interface EditLessonPeriodDTO {
    /** 课程分期Id */
    lessonPeriodId?: number
    /** 课程Id */
    lessonId?: number
    /** 课程名称 */
    lessonName?: string
    /** 期数 */
    period?: number
  }

  /** 描述缺失 */
  export interface GetSelectLessonClassDataRequest {
    /** 描述缺失 */
    query?: string
    /** 描述缺失 */
    pageSize?: number
    /** 描述缺失 */
    pageIndex?: number
  }

  /** 描述缺失 */
  export interface BatchLessonExtendEditRequest {
    /** 课程ID集合(用于批量修改) */
    lessonIds?: number[]
    /** 描述缺失 */
    attributeItemId?: number
  }

  /** 描述缺失 */
  export interface GetHrDocByFollowUpPeopleIdRequest {
    /** 售前人员类型 */
    followUpPeopleId?: number[]
    /** 描述缺失 */
    query?: string
    /** 描述缺失 */
    pageSize?: number
    /** 描述缺失 */
    pageIndex?: number
  }

  /** 获取订单日志数据请求 */
  export interface GetTranSnapshotListDataRequest {
    /** 订单id */
    tranOrderId?: number
    /** 当前页索引 */
    pageIndex?: number
    /** 页面记录数 */
    pageSize?: number
  }

  /** 创建积分订单Request */
  export interface CreditTranOrderRequest {
    /** 批量处理时的学员信息Id集合 */
    stuInfoIds?: number[]
    /** 积分交易类型  1. 增加积分  2. 积分兑换  3. 减少积分 */
    creditTranType?: number
    /** 使用积分 */
    amount?: number
    /** 对内备注 */
    comment?: string
    /** 对外备注 */
    commentOuter?: string
    /** 经办人 */
    creator?: string
    /** 销售员ID */
    hrDocId?: number
    /** 销售员姓名 */
    hrDocName?: string
    /** 经办校区ID */
    schoolId?: number
    /** 经办校区名称 */
    schoolName?: string
    /** 教材杂费ID */
    itemId?: number
    /** 教材杂费数量 */
    itemNum?: number
    /** 是否领用 */
    itemGot?: boolean
    /** 经办时间 */
    dealDate?: string
    /** 订单标签 */
    tags: TranTagDto[]
  }

  /** 订单标签 */
  export interface TranTagDto {
    /** 标签id */
    tagId?: number
    /** 标签名称 */
    tagName?: string
  }

  /** 编辑积分订单请求 */
  export interface CreditTranEditRequest {
    /** 订单ID */
    tranOrderId?: number
    /** 积分交易类型  1. 增加积分  2. 积分兑换  3. 减少积分 */
    creditTranType?: number
    /** 学员信息ID */
    stuInfoId?: number
    /** 教材杂费ID */
    itemId?: number
    /** 教材杂费数量 */
    itemNum?: number
    /** 是否领用 */
    itemGot?: boolean
    /** 使用积分 */
    amount?: number
    /** 对内备注 */
    comment?: string
    /** 对外备注 */
    commentOuter?: string
    /** 销售员ID */
    hrDocId?: number
    /** 销售员姓名 */
    hrDocName?: string
    /** 经办校区ID */
    schoolId?: number
    /** 经办校区名称 */
    schoolName?: string
    /** 修改的经办人 */
    modifier?: string
    /** 订单标签 */
    tags: TranTagDto[]
    /** 经办时间 */
    dealDate?: string
    /** 是否有资格修改订单经办时间 */
    hasEditTranOrderDeanTime?: boolean
  }

  /** 保存教材杂费订单的请求参数 */
  export interface ItemAndMiscSaveRequest {
    /** 学员Id */
    stuInfoIds?: number[]
    /** 教材杂项包 */
    itemInfos: ItemInfoDto[]
    /** 新建订单对象 */
    tranOrderInfo: TranOrderDto
    /** 是否使用余额 */
    isUseStuRemain?: boolean
    /** 对内备注 */
    comment?: string
    /** 对外备注 */
    commentOuter?: string
    /** 收支明细信息 */
    accountDetailDto: AccountDetailDto[]
    /** 订单标签 */
    tags: TranTagDto[]
  }

  /** 教材杂项信息 */
  export interface ItemInfoDto {
    /** 教材杂项ID */
    itemId?: number
    /** 教材杂费名称 */
    itemName?: string
    /** 教材/杂费；  服务端会根据中文转化为相应的枚举类型； */
    itemType?: string
    /** 单价 */
    unitPrice?: number
    /** 进价 */
    purchasePrice?: number
    /** 购买数量,默认0 */
    count?: number
    /** 教材已领,默认0 */
    itemGot?: boolean
    /** 教材杂费欠费金额 */
    arrearage?: number
  }

  /** 新建订单对象 */
  export interface TranOrderDto {
    /** 主键 */
    id?: number
    /** 订单类型  1.报名  2.账户余额变动  3.转课  4.停课  5.复课  6.结课  7.退费  8.教材杂费  9.积分  10.补费 */
    type?: number
    /** 应付总额，默认为0；  批量升期/批量续费时，需要传此参数；  报名/复课编辑时，可以不传此参数，服务端会根据交易重新计算订单应收； */
    shouldPay?: number
    /** 实付总额，默认0；  批量升期/批量续费时，不需要传此参数； */
    realPay?: number
    /** 校区id,默认为0 */
    schoolId?: number
    /** 校区名称 */
    schoolName?: string
    /** 经办日期 */
    dealDate?: string
    /** 学员账户变动金额，  使用为-，  增加为+；  批量升期/批量续费时，需要传此参数；  新增补费时，使用账户余额时为+，预存增加- */
    remain?: number
    /** 学员积分变动数；  所有订单新增/编辑时不需要此参数，服务端根据实收*比率计算赋值；  批量升期/批量续费时，不需要传此参数； */
    credit?: number
    /** 欠费金额(汇总订单相关的交易欠费金额)，  数值总是为+；  批量升期/批量续费时，需要传此参数； */
    arrearage?: number
    /** 员工id,默认为0。销售员(业绩归属人) */
    hrDocId?: number
    /** 销售员名称 */
    hrdocName?: string
    /** 销售来源；  报名新增/编辑才需要此参数，非必填；  其它订单不需要此参数； */
    salesSource?: string
  }

  /** 账户的收支明细 */
  export interface AccountDetailDto {
    /** 主键 */
    id?: number
    /** 账户id */
    accountId?: number
    /** 账户名称 */
    accountName?: string
    /** 金额：有正负区分 */
    amount?: number
    /** 备注 */
    comment?: string
    /** 对方账户 */
    oppositeAccount?: string
    /** 流水单号 */
    orderNumber?: string
    /** 收款方式 */
    accountPaymentMethodId?: number
    /** 支付单号后8位 */
    simplePaymentMethodTradeNo?: string
    /** 账户类型 Enum 枚举类型 */
    accountType: 1 | 2 | 3 | 10 | 11 | 99
    /** 收款方式类型 Enum 枚举类型 */
    accountPaymentMethodType: 0 | 1 | 2 | 3
    /** 退费来源ID/复课  报名/复课新增编辑时不需要此参数； */
    sourceRemainId?: number
  }

  /** 作废订单请求参数 */
  export interface CheckCanSaveTranOrderObsoleteRequest {
    /** 订单id */
    tranOrderId?: number
  }

  /** 保存订单作废请求对象 */
  export interface SaveTranOrderObsoluteRequest {
    /** 订单Id */
    tranOrderId?: number
    /** 作废原因 */
    reason?: string
  }

  /** 营销云接收的搜索参数 */
  export interface GetMarketingSolutionRequest {
    /** 机构Id */
    orgId?: number
    /** 页码 */
    pageIndex?: number
    /** 数量 */
    pageSize?: number
    /** 搜索条件 */
    query?: string
  }

  /** 描述缺失 */
  export interface GetTranOrderListDataRequest {
    /** 跟进人Id */
    followUpPeopleId?: number[]
    /** 是否欠费 */
    isArrearage?: number[]
    /** 描述缺失 */
    pageIndex?: number
    /** 描述缺失 */
    pageSize?: number
    /** 学员 */
    stuInfoId?: number
    /** 杂费 */
    items?: number[]
    /** 课程 */
    lessons?: number[]
    /** 售前人员 */
    hrDocs?: number[]
    /** 订单标签 */
    tranOrderTags?: number[]
    /** 经办人 */
    creators?: string[]
    /** 订单类型 */
    tranTypes?: number[]
    /** 经办时间 */
    dealDates?: string[]
    /** 经办校区 */
    dealSchoolIds?: number[]
    /** 订单状态 */
    tranOrderStatuses?: number[]
    /** 描述缺失 */
    asc?: boolean
    /** 描述缺失 */
    orderKey?: string
    /** 模糊查询 */
    query?: string
    /** 模糊查询类型 */
    queryType?: string
  }

  /** 描述缺失 */
  export interface TranOrderListDataExportRequest {
    /** 跟进人Id */
    followUpPeopleId?: number[]
    /** 是否欠费 */
    isArrearage?: number[]
    /** 学员 */
    stuInfoId?: number
    /** 杂费 */
    items?: number[]
    /** 课程 */
    lessons?: number[]
    /** 售前人员 */
    hrDocs?: number[]
    /** 订单标签 */
    tranOrderTags?: number[]
    /** 经办人 */
    creators?: string[]
    /** 订单类型 */
    tranTypes?: number[]
    /** 经办时间 */
    dealDates?: string[]
    /** 经办校区 */
    dealSchoolIds?: number[]
    /** 订单状态 */
    tranOrderStatuses?: number[]
    /** 描述缺失 */
    asc?: boolean
    /** 描述缺失 */
    orderKey?: string
    /** 模糊查询 */
    query?: string
    /** 模糊查询类型 */
    queryType?: string
  }

  /** 描述缺失 */
  export interface GetTranOrderListDataStatisticsRequest {
    /** 跟进人Id */
    followUpPeopleId?: number[]
    /** 是否欠费 */
    isArrearage?: number[]
    /** 学员 */
    stuInfoId?: number
    /** 杂费 */
    items?: number[]
    /** 课程 */
    lessons?: number[]
    /** 售前人员 */
    hrDocs?: number[]
    /** 订单标签 */
    tranOrderTags?: number[]
    /** 经办人 */
    creators?: string[]
    /** 订单类型 */
    tranTypes?: number[]
    /** 经办时间 */
    dealDates?: string[]
    /** 经办校区 */
    dealSchoolIds?: number[]
    /** 订单状态 */
    tranOrderStatuses?: number[]
    /** 描述缺失 */
    asc?: boolean
    /** 描述缺失 */
    orderKey?: string
    /** 模糊查询 */
    query?: string
    /** 模糊查询类型 */
    queryType?: string
  }

  /** 描述缺失 */
  export interface PrintMyDayRequest {
    /** 开始时间 */
    beginDate?: string
    /** 校区统计页面类型（ 0-我的今日 1-校区今日） */
    billDisplayType?: number
    /** 当前校区 0：全部校区 */
    schoolId?: number
  }

  /** 描述缺失 */
  export interface TranorderAccountDetailIsConfirmUpdateRequest {
    /** 订单id */
    tranOrderId?: number
    /** 是否确认到款  true：确认到款|false：取消确认到款 */
    isConfirm?: boolean
  }

  /** 描述缺失 */
  export interface GetTranOrderFeeTranCommentListRequest {
    /** 订单id */
    tranOrderId?: number
  }

  /** 描述缺失 */
  export interface IsAllowReturnItemAndMiscRequest {
    /** 订单id */
    tranOrderId?: number
  }

  /** 描述缺失 */
  export interface GetTranOrderByIdRequest {
    /** 订单id */
    tranOrderId?: number
  }

  /** 保存退费订单请求信息 */
  export interface SaveReturnOrderRequest {
    /** 退费学员id */
    stuInfoId?: number
    /** 退费类型  1: 学费退费  2: 余额退费  3: 教材杂项退费 Enum 枚举类型 */
    returnTranType: 1 | 2 | 3
    /** 对内备注 */
    comment?: string
    /** 对外备注 */
    commentOuter?: string
    /** 经办校区 */
    schoolId?: number
    /** 经办人 */
    hrDocId?: number
    /** 应付金额 */
    shouldPay?: number
    /** 实付金额 */
    realPay?: number
    /** 经办日期 */
    createTime?: string
    /** 余额退费交易 */
    remainReturnOrderInfo: RemainReturnOrderTransforTranDto
    /** 学费退费交易 */
    feeReturnOrderTransforTrans: FeeReturnOrderTransforTranDto
    /** 教材杂项退费交易 */
    itemsReturnOrderTransforTrans: ItemsReturnOrderTransforTranDto[]
    /** 支付信息 */
    accountInfo: AccountDetailDto[]
    /** 订单标签 */
    tags: TranTagDto[]
  }

  /** 余额退费交易 */
  export interface RemainReturnOrderTransforTranDto {
    /** 实退金额（余额退费） */
    realReturn?: number
    /** 交易类型  2 办理退费  3 部分退费 Enum 枚举类型 */
    tranType: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  }

  /** 学费退费交易 */
  export interface FeeReturnOrderTransforTranDto {
    /** 课程id */
    lessonId?: number
    /** 课程名称 */
    lessonName?: string
    /** 学费账户id */
    stuFeeDocId?: number
    /** 交易类型  2办理退费  3部分退费 Enum 枚举类型 */
    tranType: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
    /** 收费模式 Enum 枚举类型 */
    feeMode: 1 | 2 | 3
    /** 学费退费交易详情数据 */
    feeReturnOrderTransforTranDetails: FeeReturnOrderTransforTranDetailDto[]
  }

  /** 教材杂费退费 */
  export interface ItemsReturnOrderTransforTranDto {
    /** 教材杂项Id */
    itemId?: number
    /** 教材交易Id */
    itemTranId?: number
    /** 订单交易Id */
    tranOrderId?: number
    /** 关联的课程Id */
    lessonId?: number
    /** 交易类型 Enum 枚举类型 */
    itemTranType: 1 | 2 | 3 | 4
    /** 教材杂费购买时单价 */
    itemGotPrice?: number
    /** 该交易购买的教材杂费总数 */
    itemTotalCount?: number
    /** 退费数量 */
    returnItemCount?: number
    /** 应收（实付）金额 */
    realAmount?: number
    /** 欠费金额 */
    arrearage?: number
    /** 退出单价 */
    itemReturnPrice?: number
    /** 是否归还 */
    isBack?: boolean
    /** 归还时间（最后办理时间） */
    backTime?: string
  }

  /** 学费退费交易详情 */
  export interface FeeReturnOrderTransforTranDetailDto {
    /** 退费交易；  编辑时需要此参数；  新增时不需要此参数； */
    id?: number
    /** 退费课时,默认0（按课时购买） */
    classTimes?: number
    /** 退费时长（按时间购买） */
    times?: number
    /** 退费金额,转出学费20为-20 */
    amount?: number
    /** 学费交易id,默认0； */
    feetranId?: number
    /** 学费来源，默认0。1：交易，2导入；  部分退费，使用导入金额退费时，此处才为2； Enum 枚举类型 */
    tuitionSource: 1 | 2
  }

  /** 报名请求 */
  export interface SaveEnrollRequest {
    /** 报名请求学员信息 */
    stuInfo: StuInfoDto
    /** 报名打包信息；  批量升期/批量续费时，需要传此参数； */
    packages: EnrollPackageDto[]
    /** 新建订单对象 */
    tranOrder: TranOrderDto
    /** 收支明细信息；  批量升期/批量续费时，不需要传此参数； */
    accountInfo: AccountDetailDto[]
    /** 标签集合； */
    tagIds: TranTagDto[]
    /** 学费账户Id  批量升期/批量续费时，需要传此参数； */
    stuFeeDocId?: number
    /** 保存学员与员工关系、 订单与员工关系 */
    tranOrderFollowUpRelations: TranOrderFollowUpRelationDto[]
    /** 删除的交易id集合 */
    deleteFeeTranIdList?: number[]
  }

  /** 报名请求学员信息 */
  export interface StuInfoDto {
    /** 学员id */
    stuInfoId?: number
  }

  /** 报名打包信息 */
  export interface EnrollPackageDto {
    /** 报名信息 */
    enrollInfo: EnrollInfoDto
    /** 教材杂项信息；  报名同时购买了杂费，才需要此参数；  批量升期/批量续费时，不需要传此参数； */
    itemInfos: EnrollItemInfoDto[]
  }

  /** 新老学员报名时所需的学员与员工关系数据及订单与员工关系数据 */
  export interface TranOrderFollowUpRelationDto {
    /** 机构ID */
    orgId?: number
    /** 订单Id */
    tranOrderId?: number
    /** 销售员id */
    hrDocId?: number
    /** 员工类型 */
    followUpPeopleId?: number
    /** 咨询学员id */
    stuInfoId?: number
    /** 登录账号名 */
    userName?: string
    /** 员工名称 */
    hrdocName?: string
    /** 跟进人员名称 */
    followUpPeopleName?: string
  }

  /** 报名信息 */
  export interface EnrollInfoDto {
    /** 校区Id；  报名/复课新增编辑时报读的课程对应校区；  批量升期/批量续费时，需要传此参数； */
    schoolId?: number
    /** 课程Id；  报名/复课新增编辑时报读的课程；  批量升期/批量续费时，需要传此参数； */
    lessonId?: number
    /** 教师Id（无用参数） */
    teacherId?: number
    /** 班级Id；  报名/复课时选择的班级，此参数非必填；  报名/复课编辑时不需要此参数；  批量升期/批量续费时，不需要传此参数； */
    classId?: number
    /** 单价；  按课时、按时间为单价，按期为每期的价格；  批量升期/批量续费时，不需要传此参数； */
    unitPrice?: number
    /** 学费单位  1. 元/期；  2. 元/课时；  3. 元/天；  4. 元/月；  5. 元/季；  6. 元/年；  批量升期/批量续费时，不需要传此参数； */
    unit?: number
    /** 数量,默认0  乐高项目1.0修改含义，冗余学费标准中的Count */
    count?: number
    /** 用户购买sku数量   乐高项目1.0增加 */
    feeStandardCount?: number
    /** 开始时间；  按课时、按期不需要此参数，  按时间需要；  批量升期/批量续费时，需要传此参数； */
    beginDate?: string
    /** 过期时间；  按期不需要此参数，  按时间、按课时需要；  批量升期/批量续费时，需要传此参数； */
    expiryDate?: string
    /** 优惠信息列表 */
    promotionsList: PromotionInfoDto[]
    /** 对内备注 */
    comment?: string
    /** 对外备注 */
    commentOuter?: string
    /** 默认每次课消耗的课时/天数 【学生课时】；  报名/复课新增时，一对一专用，创建班级时使用；  批量升期/批量续费时，不需要传此参数； */
    unitClassTimes?: number
    /** 默认每次课消耗的课时/天数 【教师课时】；  报名/复课新增时，一对一专用，创建班级时使用；  批量升期/批量续费时，不需要传此参数； */
    teacherClasstime?: number
    /** 班级教师列表信息；  报名/复课新增时，一对一专用，创建班级时使用；  报名、复课编辑时不需要此参数；  批量升期/批量续费时，不需要传此参数； */
    teachersList: ClassTeacherDto[]
    /** 学费交易id ；  报名/复课新增时不需要此参数；  报名/复课编辑里需要此参数；  批量升期/批量续费时，不需要传此参数； */
    feeTranId?: number
    /** 课程名称；  用于生成订单快照；  报名/复课新增时，一对一此不需要此参数，后端会重新获取；  报名/复课编辑时总是需要此参数；  批量升期/批量续费时，不需要传此参数； */
    lessonName?: string
    /** 交易欠费金额；  批量升期/批量续费时，需要传此参数； */
    arrearage?: number
    /** 报名时选择的排座行数 */
    stuDocSeatRow?: number
    /** 报名时选择的排座列数 */
    stuDocSeatColumn?: number
    /** 报名类型  0 新报  1 续费  2 无  3 升期  4 扩科 Enum 枚举类型 */
    enrollType: 0 | 1 | 2 | 3 | 4
    /** 交易时包含的营销方案信息 */
    tranMarketing: TranMarketingDto
    /** 收费标准id(skuid)  乐高项目1.0增加 */
    feeStandardId?: number
    /** 报名时选择的班级的教室Id */
    classroomId?: number
    /** sku价格(冗余)  乐高项目1.0增加 */
    price?: number
  }

  /** 教材杂项信息 */
  export interface EnrollItemInfoDto {
    /** 教材杂项交易；  此参数报名/复课新增时不需要；  报名/复课编辑时，需要此参数； */
    id?: number
    /** 教材杂项ID */
    itemId?: number
    /** 教材/杂费；  服务端会根据中文转化为相应的枚举类型； */
    itemType?: string
    /** 单价 */
    unitPrice?: number
    /** 进价 */
    purchasePrice?: number
    /** 购买数量,默认0 */
    count?: number
    /** 教材已领,默认0 */
    itemGot?: boolean
    /** 名称；  用于生成订单快照； */
    itemName?: string
    /** 原单价，即教材杂费的售价；  新增时不需要此参数，后端赋值；  编辑时不需要此参数，不更改此值； */
    originalUnitPrice?: number
    /** 教材杂费欠费金额 */
    arrearage?: number
    /** 购买教材杂费交易id；  当前交易为退教材杂费才需要此参数； */
    purchaseItemTranId?: number
  }

  /** 优惠信息 */
  export interface PromotionInfoDto {
    /** 报名时优惠折扣类型  0：原价；  1：优惠；  2：折扣；  3：插班减少； */
    promotionType?: number
    /** 优惠：此时为金额；  折扣：此时为折扣值，必须小于1；  插班减少：此时为课时数； */
    amount?: number
  }

  /** 班级教师关系表 */
  export interface ClassTeacherDto {
    /** 教师姓名 */
    teacherName?: string
    /** 教师类型  0：教师  1：助教 Enum 枚举类型 */
    targetType: 0 | 1
    /** 员工id,默认为0 */
    hrDocId?: number
  }

  /** 交易时包含的营销方案信息 */
  export interface TranMarketingDto {
    /** 营销中心门槛id */
    gradeId?: number
    /** 营销中心门槛 */
    threShold?: number
    /** 营销方案门槛的优惠 */
    marketingPromotion?: number
    /** 前端传递的使用营销方案的优惠金额 */
    marketingPromotionAmount?: number
    /** 营销方案id */
    marketingSolutinId?: number
    /** 营销方案名称 */
    markrtingSolutionName?: string
    /** 优惠类型 1.满折；2.满减；3：满赠课时 */
    promotionType?: number
  }

  /** 描述缺失 */
  export interface GetRepairTranByArrearageTranOrderIdRequest {
    /** 订单id */
    tranOrderId?: number
  }

  /** 保存批量续费/批量升期请求对象 */
  export interface SaveReNewListRequest {
    /** 增加学费交易Dto集合 */
    stuFeeTranAddDtos: SaveEnrollRequest[]
  }

  /** 新建转课对象 */
  export interface AddTransforTranRequest {
    /** 学员信息Id */
    stuInfoId?: number
    /** 转出信息 */
    transforTrans: TransforTranDto[]
    /** 报名信息 */
    enrollInfo: EnrollInfoDto
    /** 新建订单对象 */
    tranOrder: TranOrderDto
    /** 订单标签 */
    tags: TranTagDto[]
    /** 收支信息 */
    accountDetails: AccountDetailDto[]
  }

  /** 转出信息 */
  export interface TransforTranDto {
    /** 主键 */
    id?: number
    /** 交易类型  转课转出=1  办理退费=2  部分退费=3  办理停课=4  办理结课=5  转课手续费=6  退费手续费=7  停课手续费=8  结课收入=9  部分转出=10 Enum 枚举类型 */
    tranType: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
    /** 学员id,默认0 */
    stuInfoId?: number
    /** 转出课时/天数,用户手动转入 */
    classTimes?: number
    /** 转出金额,用户手转 */
    amount?: number
    /** 学费账户,默认0 */
    stuFeeDocId?: number
    /** 学费交易id,默认0。  办理部分退费时才需要此参数 */
    feetranId?: number
    /** 手续费课时,默认0 */
    procedureClassTimes?: number
    /** 手续费金额,默认0 */
    procedureAmount?: number
  }

  /** 编辑转课对象 */
  export interface EditTransforTranRequest {
    /** 转出信息 */
    transforTrans: TransforTranEditDto[]
    /** 学费交易 */
    feeTran: FeeTranEditDto
    /** 新建订单对象 */
    tranOrder: TranOrderDto
    /** 订单标签 */
    tags: TranTagDto[]
    /** 收支信息 */
    accountDetails: AccountDetailDto[]
  }

  /** 转出交易 */
  export interface TransforTranEditDto {
    /** 转出交易id */
    transforTranId?: number
    /** 课时,默认0 */
    classTimes?: number
    /** 金额,转出学费20为-20 */
    amount?: number
    /** 学费交易id,默认0。 */
    feetranId?: number
    /** 余额 */
    reamin?: number
    /** 手续费交易 */
    procedureTranId?: number
    /** 手续费课时,默认0 */
    procedureClassTimes?: number
    /** 手续费金额,默认0 */
    procedureAmount?: number
  }

  /** 学费交易 */
  export interface FeeTranEditDto {
    /** 学费交易id */
    id?: number
    /** 优惠json,默认空 */
    promotion?: string
    /** 优惠金额,默认0 */
    promotionAmount?: number
    /** 原价格,默认0 */
    originAmount?: number
    /** 实付价格,默认0 */
    realAmount?: number
    /** 实付单价,默认0 */
    realUnitPrice?: number
    /** 开始时间 */
    beginDate?: string
    /** 过期时间 */
    expiryDate?: string
    /** 对内备注 */
    comment?: string
    /** 对外备注（校宝家交易详情页显示） */
    commentOuter?: string
    /** 欠费金额 */
    arrearage?: number
    /** 实收金额 */
    actualIncome?: number
    /** 报名类型 Enum 枚举类型 */
    enrollType: 0 | 1 | 2 | 3 | 4
    /** 购买sku数量   乐高项目1.0增加 */
    feeStandardCount?: number
    /** 余额  乐高项目二期增加 */
    reamin?: number
  }

  /** 批量创建转课 */
  export interface BatchAddTransforRequest {
    /** 单个转课据 */
    addTransforTranRequests: AddTransforTranRequest[]
  }

  /** 保存补费订单请求 */
  export interface SaveRepairTranOrderRequest {
    /** 学员Id */
    stuInfoId?: number
    /** 欠费交易列表(内含补费信息) */
    arrearageTrans: ArrearageTranModel[]
    /** 应付总额，默认为0 */
    shouldPay?: number
    /** 实付总额，默认0 */
    realPay?: number
    /** 经办员工id,默认为0。销售员(业绩归属人) */
    hrDocId?: number
    /** 经办校区id,默认为0 */
    schoolId?: number
    /** 经办日期 */
    dealDate?: string
    /** 学员账户变动金额 */
    remain?: number
    /** 学员积分变动数 */
    credit?: number
    /** 支付账户使用信息 */
    accountInfo: AccountDetailDto[]
    /** 欠费金额(汇总订单相关的交易欠费金额) */
    arrearage?: number
    /** 订单标签 */
    tags: TranTagDto[]
    /** 对内备注 */
    comment?: string
    /** 对外备注 */
    commentOuter?: string
  }

  /** 欠费交易模型(目前只有feetran上的：按时间缴费、按期交费、按课时缴费、转课转入) */
  export interface ArrearageTranModel {
    /** 交易ID */
    id?: number
    /** 欠费订单Id */
    tranOrderId?: number
    /** 订单号 */
    tranOrderNo?: string
    /** 交易Id */
    tranId?: number
    /** 订单类型描述 */
    tranOrderType?: string
    /** 订单类型枚举 Enum 枚举类型 */
    type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
    /** 经办人 */
    creator?: string
    /** 经办时间 */
    dealTime?: string
    /** 经办校区Id */
    schoolId?: number
    /** 经办校区名 */
    schoolName?: string
    /** 欠费金额 */
    arrearageAmount?: number
    /** 欠费项目名称(课程名或教材杂项名) */
    arrearageItem?: string
    /** 课程名 */
    lessonName?: string
    /** 教材杂项名 */
    itemName?: string
    /** 欠费交易类型  1. 学费交易  2.教材杂费交易 Enum 枚举类型 */
    arrearageTranType: 1 | 2
    /** 补费金额 */
    repairAmount?: number
    /** 对内备注（详情页面需要此参数） */
    comment?: string
    /** 对外备注（详情页面需要此参数） */
    commentOuter?: string
    /** 学费账户状态 Enum 枚举类型 */
    status: 1 | 2 | 3 | 4 | 5 | 6 | 7 | -1
  }

  /** 保存补费修改请求 */
  export interface UpdateRepairTranOrderRequest {
    /** 编辑的补费订单Id */
    tranOrderId?: number
    /** 应付总额，默认为0 */
    shouldPay?: number
    /** 实付总额，默认0 */
    realPay?: number
    /** 学员账户变动金额 */
    remain?: number
    /** 学员积分变动数 */
    credit?: number
    /** 欠费金额(汇总订单相关的交易欠费金额) */
    arrearage?: number
    /** 经办员工id,默认为0。销售员(业绩归属人) */
    hrDocId?: number
    /** 经办校区id,默认为0 */
    schoolId?: number
    /** 经办日期 */
    dealDate?: string
    /** 支付信息 */
    accountInfo: AccountDetailDto[]
    /** 欠费交易列表(内含补费信息) */
    arrearageTrans: ArrearageTranModel[]
    /** 标签id */
    tags: TranTagDto[]
    /** 对内备注 */
    comment?: string
    /** 对外备注 */
    commentOuter?: string
  }

  /** 获取所有校区 */
  export interface GetAllSchoolRequest {
    /** 描述缺失 */
    query?: string
    /** 描述缺失 */
    pageSize?: number
    /** 描述缺失 */
    pageIndex?: number
  }

  /** 科目查询请求参数 */
  export interface GetSubjectsWithSearchRequest {
    /** 描述缺失 */
    query?: string
    /** 描述缺失 */
    pageSize?: number
    /** 描述缺失 */
    pageIndex?: number
  }

  /** 新建、保存科目 */
  export interface SaveSubjectRequest {
    /** 科目名称 */
    name?: string
  }

  /** 编辑科目 入参 */
  export interface EditSubjectRequest {
    /** 科目Id */
    id?: number
    /** 科目名称 */
    name?: string
  }

  /** DeleteSubject 入参 */
  export interface DeleteSubjectRequest {
    /** 科目Id */
    id?: number
  }

  /** 停用科目 入参 */
  export interface UpdateSubjectStatusRequest {
    /** 科目Id */
    id?: number
    /** 状态 */
    status?: boolean
  }

  /** GetSubjectListData 入参 */
  export interface GetSubjectListDataRequest {
    /** 描述缺失 */
    query?: string
    /** 描述缺失 */
    pageSize?: number
    /** 描述缺失 */
    pageIndex?: number
  }

  /** GetExtendAttributeItemsData 入参 */
  export interface GetExtendAttributeItemsDataRequest {
    /** 所属实体 */
    entity?: string
    /** 所属列 */
    column?: string
    /** 是否过滤隐藏数据 （默认不过滤） */
    isFiltrationHide?: boolean
    /** 描述缺失 */
    query?: string
    /** 描述缺失 */
    pageSize?: number
    /** 描述缺失 */
    pageIndex?: number
  }

  /** 描述缺失 */
  export interface GetOrgextendconfigRequest {
    /** 制定过滤字段 */
    columns?: string[]
  }

  /** 描述缺失 */
  export interface GetExamScoreRequest {
    /** 考试Id */
    examScoreId?: number
  }

  /** 描述缺失 */
  export interface GetExamScoresRequest {
    /** 来源 */
    examScoreType?: number[]
    /** 科目ids */
    examItems?: number[]
    /** 考试ids */
    exams?: number[]
    /** 班级ids */
    classes?: number[]
    /** 学员ids */
    stuInfoIds?: number[]
    /** 考试开始时间 */
    examTimeSd?: string
    /** 考试结束时间 */
    examTimeEnd?: string
    /** 模糊查询类型 */
    queryType?: string
    /** 查询 */
    query?: string
    /** 描述缺失 */
    pageIndex?: number
    /** 描述缺失 */
    pageSize?: number
    /** 描述缺失 */
    asc?: boolean
    /** 描述缺失 */
    orderKey?: string
  }

  /** 描述缺失 */
  export interface UpdateStuExamScoreRequest {
    /** 描述缺失 */
    id?: number
    /** 考试类型，1机构内，2机构外 */
    type?: number
    /** 科目id */
    examItemId?: number
    /** 考试id */
    examId?: number
    /** 考试时间 */
    examTime?: string
    /** 班级id */
    classId?: number
    /** 考试成绩 */
    score?: number
    /** 备注 */
    remark?: string
    /** 员工id */
    hrdocId?: number
  }

  /** 描述缺失 */
  export interface DeleteExamScoresRequest {
    /** ExamScoresid */
    id?: number
  }

  /** 描述缺失 */
  export interface SaveExamScoresRequest {
    /** 描述缺失 */
    examScores: ExamScore[]
  }

  /** 考试成绩 */
  export interface ExamScore {
    /** 学员id */
    stuinfoId?: number
    /** 班级id */
    classId?: number
    /** 考试id */
    examId?: number
    /** 科目id */
    examItemId?: number
    /** 考试时间 */
    examTime?: string
    /** 考试类型，1机构内，2机构外 */
    type?: number
    /** 考试成绩 */
    score?: number
    /** 备注 */
    remark?: string
    /** 学员名 */
    stuName?: string
    /** 主要电话 */
    mainTel?: string
    /** 次要电话 */
    minorTel?: string
    /** 其他电话 */
    otherTel?: string
    /** 主要电话所属关系 */
    mainTelRelationship?: number
    /** 次要电话所属关系 */
    minorTelRelationship?: number
    /** 其他电话所属关系 */
    otherTelRelationship?: number
  }

  /** 描述缺失 */
  export interface JudgeExamItemRequest {
    /** 项目名 */
    examItemName?: string
    /** 项目id */
    examItemId?: number
  }

  /** 描述缺失 */
  export interface ModifyExamItemRequest {
    /** 项目名 */
    examItemName?: string
    /** 项目id */
    examItemId?: number
  }

  /** 描述缺失 */
  export interface AddExamItemRequest {
    /** 项目名 */
    examItemName?: string
    /** 项目id */
    examItemId?: number
  }

  /** 描述缺失 */
  export interface JudgeExamRequest {
    /** 考试名称 */
    examName?: string
    /** 考试名称id */
    examId?: number
  }

  /** 描述缺失 */
  export interface ModifyExamRequest {
    /** 考试名称 */
    examName?: string
    /** 考试名称id */
    examId?: number
  }

  /** 描述缺失 */
  export interface AddExamRequest {
    /** 考试名称 */
    examName?: string
  }

  /** 描述缺失 */
  export interface DeleteExamItemRequest {
    /** ExamItemId */
    id?: number
  }

  /** 描述缺失 */
  export interface DeleteExamRequest {
    /** 描述缺失 */
    id?: number
  }

  /** 描述缺失 */
  export interface ChangeStuInfoListUserCollectionRequest {
    /** 是否点亮星标 */
    isCollection?: boolean
    /** 学员Id */
    stuinfoId?: number
  }

  /** 描述缺失 */
  export interface SelectEmployeeCrmFetchHrDocDataRequest {
    /** 描述缺失 */
    query?: string
    /** 描述缺失 */
    pageSize?: number
    /** 描述缺失 */
    pageIndex?: number
  }

  /** Request for SaveJurisdictionSettingData */
  export interface SaveJurisdictionSettingDataRequest {
    /** 开放登录开始时间 */
    sysOpenTimeStart?: string
    /** 开放登录结束时间 */
    sysOpenTimeEnd?: string
    /** 自动登出时间 */
    loginOutTime?: number
    /** 账目修改时间 */
    branchUserEditDelTime?: number
    /** 教材杂费是否允许欠费 */
    isAllowItemArrear?: boolean
    /** 封账是否开启 */
    isOpenFreezeTran?: boolean
    /** 封账日 */
    freezeTranByDay?: number
    /** 是否直接封账 */
    isJustFreezeTran?: boolean
  }

  /** 更新系统消息状态 */
  export interface UpdateSysMessageRequest {
    /** 更新订单 */
    ids?: number[]
  }

  /** 获取消息列表请求对象 */
  export interface GetSysMessagesRequest {
    /** 是否已读,null表示全部 */
    readed?: boolean
    /** 描述缺失 */
    pageIndex?: number
    /** 描述缺失 */
    pageSize?: number
  }

  /** 描述缺失 */
  export interface GetUsersByOrgIdRequest {
    /** 描述缺失 */
    query?: string
    /** 描述缺失 */
    pageSize?: number
    /** 描述缺失 */
    pageIndex?: number
  }

  /** 描述缺失 */
  export interface UpdateTagRequest {
    /** 标签id */
    id?: number
    /** 标签名 */
    tagName?: string
    /** 是否启用 */
    isEnable?: boolean
  }

  /** 描述缺失 */
  export interface ScpPaymentNotifyRequestModel {
    /** 【商户交易号】 */
    merchantTradeNo?: string
    /** 【商户Id】 */
    merchantId?: number
    /** 【校宝云支付交易号】 */
    schoolPalCloudPayTradeNo?: number
    /** 【实际支付金额】 */
    realPayAmount?: number
    /** 【交易支付时间】 */
    paymentTime?: string
    /** 随机字符串 */
    nonceStr?: string
    /** 签名 */
    sign?: string
  }

  /** 描述缺失 */
  export interface ScpPaymentNotifyResponseModel {
    /** 错误码 */
    errCode?: number
    /** 错误信息 */
    errMsg?: string
  }

  /** 流水实收报表-柱形图请求参数 */
  export interface GetFlowReportChatRequest {
    /** 校区Id集合 */
    schoolIds?: number[]
    /** 搜索日期范围 */
    searchDate?: string[]
    /** 搜索类型 （101：按经办校区 102：按经办人 103：按销售员 104：按月 105：按课程 106：按课程类别 ） */
    searchType?: number
  }

  /** 流水实收报表-请求参数 */
  export interface GetFlowReportRequest {
    /** 校区Id */
    schoolIds?: number[]
    /** 开始时间 */
    searchDate?: string[]
    /** 搜索类型 （101：按经办校区 102：按经办人 103：按销售员 104：按月 105：按课程 106：按课程类别 ） */
    searchType?: number
    /** 页码 */
    pageSize?: number
    /** 页数 */
    pageIndex?: number
    /** 排序字符串 */
    orderByKey?: string
    /** 排序方式 */
    orderByType?: string
  }

  /** 流水报表导出请求 */
  export interface GetExportFlowReportExcelRequest {
    /** 校区Id集合 */
    schoolIds?: number[]
    /** 搜索日期范围，["2018-06-15","2018-06-30"] */
    searchDate?: string[]
    /** 搜索类型 （101：按经办校区 102：按经办人 103：按销售员 104：按月 105：按课程 106：按课程类别 ） */
    searchType?: number
    /** 排序字符串 */
    orderByKey?: string
    /** 排序方式 */
    orderByType?: string
  }

  /** 获取剩余学费报表图表数据请求 */
  export interface GetUnusedTuitionReportChartRequest {
    /** 查询类型，1-按校区，2-按课程，3-按课程大类 */
    searchType?: number
    /** 校区Id集合 */
    schoolIds?: number[]
  }

  /** 查询剩余学费报表数据请求 */
  export interface GetUnusedTuitionReportDataRequest {
    /** 查询类型，1-按校区，2-按课程，3-按课程大类 */
    searchType?: number
    /** 校区Id集合 */
    schoolIds?: number[]
    /** 当前页码 */
    pageIndex?: number
    /** 每页条数 */
    pageSize?: number
  }

  /** 获取剩余学费报表excel请求 */
  export interface GetUnusedTuitionReportExcelRequest {
    /** 查询类型，1-按校区，2-按课程，3-按课程类别 */
    searchType?: number
    /** 校区Id集合 */
    schoolIds?: number[]
  }

  /** 描述缺失 */
  export interface GetFinancialFlowBySchoolChartRequest {
    /** 校区Id */
    schoolIds?: number[]
    /** 开始时间 */
    searchDate?: string[]
  }

  /** 描述缺失 */
  export interface GetTeachingMaterialAndIncidentalReportExcelRequest {
    /** 校区Id */
    schoolIds?: number[]
    /** 开始时间 */
    searchDate?: string[]
    /** 页码 */
    pageSize?: number
    /** 页数 */
    pageIndex?: number
    /** 排序字符串 */
    orderByKey?: string
    /** 排序方式 */
    orderByType?: string
  }

  /** 报表按时间查询（最基础的报表，环比 对比 用其他俩种） */
  export interface GetReportByDateRequest {
    /** 校区Id */
    schoolId?: number
    /** 开始结束时间集合 */
    searchDate?: string[]
  }

  /** 报表环比查询 */
  export interface GetReportByStartAndEndRequest {
    /** 校区Id */
    schoolId?: number
    /** 原查询时间（本身数据） */
    thisSearchDate?: string[]
    /** 环比查询时间 */
    otherSearchDate?: string[]
  }

  /** 报表对比查询 */
  export interface GetReportBySchoolRequest {
    /** 校区Id集合 */
    schoolIdList?: number[]
    /** 查询时间集合 */
    searchDate?: string[]
  }

  /** 获取学费消耗图表入参 */
  export interface GetTuitionUsedStatChartRequest {
    /** 校区Id集合 */
    schoolIds?: number[]
    /** 搜索日期范围 */
    searchDate?: string[]
    /** 搜索类型 （301:学费消耗按报读校区 302:按课程 303:按课程类别 304:按班级 305:按科目 306:按教师[课消明细要用，学费消耗不处理] 307:月对比） */
    searchType?: number
  }

  /** 获取学费消耗列表入参 */
  export interface GetTuitionUsedStatListRequest {
    /** 校区Id集合 */
    schoolIds?: number[]
    /** 搜索日期范围 */
    searchDate?: string[]
    /** （301:学费消耗按报读校区 302:按课程 303:按课程类别 304:按班级 305:按科目 306:月对比） */
    searchType?: number
    /** 条件参数 */
    searchKey?: string
    /** 页数 */
    pageIndex?: number
    /** 每页条数 */
    pageSize?: number
  }

  /** 学费消耗报表Excel */
  export interface GetTuitionUsedStatReportExcelRequest {
    /** 搜索类型 （301:学费消耗按报读校区 302:按课程 303:按课程类别 304:按班级 305:按科目 306:按教师[课消明细要用，学费消耗不处理] 307:月对比） */
    searchType?: number
    /** 校区Id集合 */
    schoolIds?: number[]
    /** 搜索日期范围 */
    searchDate?: string[]
  }

  /** 导出非课消明细报表入参 */
  export interface GetIncomeByOtherDetailExcelRequest {
    /** 校区Id集合 */
    schoolIds?: number[]
    /** 搜索日期范围 */
    searchDate?: string[]
    /** （301:学费消耗按报读校区 302:按课程 303:按课程类别 304:按班级 305:按科目 306:按教师[课消明细要用，学费消耗不处理] 307:月对比） */
    searchType?: number
    /** 条件参数 */
    searchKey?: string
  }

  /** 上课记录报表 request */
  export interface GetUsedTuitionListDataRequest {
    /** 校区 */
    schoolIds?: number[]
    /** 日期 */
    searchDate?: string[]
    /** 描述缺失 */
    page: PageArgument
    /** 报表类型 Enum 枚举类型 */
    usedTuitionSummaryReportType: 601 | 602 | 603 | 604 | 605 | 606 | 607
  }

  /** 上课记录报表明细 request */
  export interface GetUsedTuitionDetailListDataRequest {
    /** 校区 */
    schoolIds?: number[]
    /** 日期 */
    searchDate?: string[]
    /** 描述缺失 */
    page: PageArgument
    /** 报表类型 Enum 枚举类型 */
    usedTuitionSummaryReportType: 601 | 602 | 603 | 604 | 605 | 606 | 607
    /** 类别Id */
    categoryId?: number
  }

  /** 描述缺失 */
  export interface GetFinanceOrderAndOtherChartRequest {
    /** 校区Id集合 */
    schoolIds?: number[]
    /** 搜索日期范围 */
    searchDate?: string[]
    /** 搜索类型 （101：按经办校区 102：按月 103：按订单收入小类 104：按订单支出按小类 105：其他支出按大类 106：按其他支出按小类 107：其他收入按大类 108：按其收入按小类） */
    searchType?: number
  }

  /** 描述缺失 */
  export interface GetFinanceOrderAndOtherReportDataRequest {
    /** 搜索类型 （101：按经办校区 102：按月 103：按订单收入小类 104：按订单支出按小类 105：其他支出按大类 106：按其他支出按小类 107：其他收入按大类 108：按其收入按小类） */
    searchType?: number
    /** 校区Id集合 */
    schoolIds?: number[]
    /** 搜索日期范围 */
    searchDate?: string[]
    /** 当前页码 */
    pageIndex?: number
    /** 每页条数 */
    pageSize?: number
    /** 排序字符串 */
    orderByKey?: string
    /** 排序方式 */
    orderByType?: string
  }

  /** 财务收支报表Excel */
  export interface GetFinanceOrderAndOtherReportExcelRequest {
    /** 搜索类型 （101：按经办校区 102：按月 103：按订单收入小类 104：按订单支出按小类 105：其他支出按大类 106：按其他支出按小类 107：其他收入按大类 108：按其收入按小类） */
    searchType?: number
    /** 校区Id集合 */
    schoolIds?: number[]
    /** 搜索日期范围 */
    searchDate?: string[]
    /** 排序字符串 */
    orderByKey?: string
    /** 排序方式 */
    orderByType?: string
  }

  /** 获取教师报表入参 */
  export interface GetTeacherReportListDataRequest {
    /** 校区集合 */
    schoolIds?: number[]
    /** 筛选日期 */
    searchDate?: string[]
    /** 描述缺失 */
    query?: string
    /** 描述缺失 */
    pageSize?: number
    /** 描述缺失 */
    pageIndex?: number
  }

  /** 获取教师报表Excel入参 */
  export interface GetTeacherReportExcelRequest {
    /** 教师Id */
    teacherId?: number
    /** 校区集合 */
    schoolIds?: number[]
    /** 筛选日期 */
    searchDate?: string[]
  }

  /** 获取教师带班报表入参 */
  export interface GetTeacherClassesListDataRequest {
    /** 教师Id */
    teacherId?: number
    /** 校区集合 */
    schoolIds?: number[]
    /** 筛选日期 */
    searchDate?: string[]
    /** 描述缺失 */
    query?: string
    /** 描述缺失 */
    pageSize?: number
    /** 描述缺失 */
    pageIndex?: number
  }

  /** 教师所带学生应续列表Model */
  export interface GetTeacherStuShouldRenewListDataRequest {
    /** 教师Id */
    teacherId?: number
    /** 校区集合 */
    schoolIds?: number[]
    /** 筛选日期 */
    searchDate?: string[]
    /** 描述缺失 */
    query?: string
    /** 描述缺失 */
    pageSize?: number
    /** 描述缺失 */
    pageIndex?: number
  }

  /** 教师所带学生实续列表Model */
  export interface GetTeacherStuActualRenewListDataRequest {
    /** 教师Id */
    teacherId?: number
    /** 校区集合 */
    schoolIds?: number[]
    /** 筛选日期 */
    searchDate?: string[]
    /** 描述缺失 */
    query?: string
    /** 描述缺失 */
    pageSize?: number
    /** 描述缺失 */
    pageIndex?: number
  }

  /** 教师所带学生退费列表Model */
  export interface GetTeacherStuRefundListDataRequest {
    /** 教师Id */
    teacherId?: number
    /** 校区集合 */
    schoolIds?: number[]
    /** 筛选日期 */
    searchDate?: string[]
    /** 描述缺失 */
    query?: string
    /** 描述缺失 */
    pageSize?: number
    /** 描述缺失 */
    pageIndex?: number
  }

  /** 获取班级报表入参 */
  export interface GetClassReportListDataRequest {
    /** 校区集合 */
    schoolIds?: number[]
    /** 筛选日期 */
    searchDate?: string[]
    /** 描述缺失 */
    query?: string
    /** 描述缺失 */
    pageSize?: number
    /** 描述缺失 */
    pageIndex?: number
  }

  /** 获取班级报表Excel入参 */
  export interface GetClassReportExcelRequest {
    /** 班级Id */
    classId?: number
    /** 校区集合 */
    schoolIds?: number[]
    /** 筛选日期 */
    searchDate?: string[]
  }

  /** 教师所带学生实续列表Model */
  export interface GetClassesStuActualRenewListDataRequest {
    /** 班级Id */
    classId?: number
    /** 校区集合 */
    schoolIds?: number[]
    /** 筛选日期 */
    searchDate?: string[]
    /** 描述缺失 */
    query?: string
    /** 描述缺失 */
    pageSize?: number
    /** 描述缺失 */
    pageIndex?: number
  }

  /** 教师所带学生应续列表Model */
  export interface GetClassesStuShouldRenewListDataRequest {
    /** 班级Id */
    classId?: number
    /** 校区集合 */
    schoolIds?: number[]
    /** 筛选日期 */
    searchDate?: string[]
    /** 描述缺失 */
    query?: string
    /** 描述缺失 */
    pageSize?: number
    /** 描述缺失 */
    pageIndex?: number
  }

  /** Request for GetTeacherClassTimeStatistics */
  export interface GetTeacherClassTimeStatisticsRequest {
    /** 搜索类型，1 上课校区，2 所属校区，默认值1 */
    schoolType?: number
    /** 查询开始时间 */
    beginDate?: string
    /** 查询结束时间 */
    endDate?: string
    /** 校区Ids，全部校区传入空数组，所属校区传值-2 */
    schoolIds?: number[]
    /** 课程分类Id */
    lessonClassIds?: number[]
    /** 课程Id */
    lessonIds?: number[]
    /** 教师Id */
    teacherHrdocIds?: number[]
    /** 科目Ids */
    subjectIds?: number[]
    /** 查询的页码，从1开始计数 */
    pageIndex?: number
    /** 每页条数，最大200条 */
    pageSize?: number
  }

  /** 设置有效期 */
  export interface UpdateStuFeeDocExpiryDateRequest {
    /** 学费账户 */
    stuFeeDocId?: number
    /** 日期 */
    date?: string
  }

  /** 设置有效期 */
  export interface UpdateSubStuFeeDocExpiryDateRequest {
    /** 学费账户 */
    subStuFeeDocId?: number
    /** 日期 */
    date?: string
  }

  /** 升期 */
  export interface SetStuFeeDocUpPeriodRequest {
    /** 当前学费账户Id */
    currentStuFeeDocId?: number
    /** 下一期学费账户Id */
    nextStuFeeDocId?: number
  }

  /** 结课 */
  export interface SaveCloseLessonRequest {
    /** 学费账户Id */
    stuFeeDocId?: number
  }

  /** 停课 */
  export interface SaveStopClassesRequest {
    /** 学费账户Id */
    stuFeeDocId?: number
    /** 备注 */
    remark?: string
  }

  /** 复课 */
  export interface SaveResumeLessonRequest {
    /** 学费账户Id */
    stuFeeDocId?: number
    /** 日期 */
    date?: string
  }

  /** Request for GetStuFeeDocTuitionCostById */
  export interface GetStuFeeDocTuitionCostByIdRequest {
    /** 学费档案id */
    stuFeeDocId?: number
    /** 变动类型，1 学费缴费 2 学费消耗  可以多选 */
    tuitionType?: number[]
    /** 开始时间 */
    beginDate?: string
    /** 结束时间 */
    endDate?: string
    /** 是否正序 */
    asc?: boolean
    /** 排序关键字 */
    orderKey?: string
    /** 每页条数，最大200条 */
    pageSize?: number
    /** 查询的页码，从1开始计数 */
    pageIndex?: number
  }

  /** 取消结课入参 */
  export interface CancelCloseStufeeDocRequest {
    /** 学员id */
    stuInfoId?: number
    /** StuFeeDocId */
    stuFeeDocId?: number
  }

  /** 描述缺失 */
  export interface GetPhoneByStuInfoIdRequest {
    /** 学员id */
    stuInfoId?: number
  }

  /** 描述缺失 */
  export interface DeleteStuInfoRequest {
    /** 描述缺失 */
    id?: number
  }

  /** 保存学员请求参数 */
  export interface SaveStuInfoRequest {
    /** 学员id */
    id?: number
    /** 学员原始数据集合（包含stuinfo 以及 扩展 字段信息） */
    stuInfoList: StuInfoCustomDto[]
    /** 学员自定义字段数据集合 */
    stuInfoCustomList: StuInfoCustomDto[]
  }

  /** 学员自定义字段数据 */
  export interface StuInfoCustomDto {
    /** 字段名 */
    columnName?: string
    /** 自定义字段值 */
    value?: string
  }

  /** 描述缺失 */
  export interface CreateStuInfoRequest {
    /** 学员信息 */
    stuInfo: StuInfoDto
    /** stuinfo扩展属性 */
    stuInfoExtend: StuInfoExtendDto
    /** 学员自定义字段数据集合 */
    stuInfoCustoms: StuInfoCustomDto[]
  }

  /** 编辑学员跟进信息 */
  export interface UpdateStuInfoFollowUpRequest {
    /** 学员Id */
    stuInfoId?: number
    /** 意向度 */
    interest?: string
    /** 标记 */
    marker?: string
    /** 归属(经办)校区Id */
    schoolId?: number
    /** 咨询方式：来电/来访/网络/其他 */
    method?: string
    /** 咨询课程ID */
    lessonClassId1?: number
    /** 咨询课程2ID */
    lessonClassId2?: number
    /** 咨询课程3ID */
    lessonClassId3?: number
    /** 销售员 */
    salesMan?: string
    /** 销售员Id */
    hrdocId?: number
    /** 跟进状态：1：待跟进、2：跟进中、3：已成交、4：已失效、5：已到访、6：已邀约、7：已试听 */
    followUpState?: number
    /** 渠道Id */
    channelId?: number
    /** 销售员员工Id */
    salesManHrDocId?: number
    /** 学员跟进人关系 */
    stuInfoFollowUpRelations: StuInfoFollowUpRelationDto[]
  }

  /** 新建编辑沟通 */
  export interface SaveCommuRequest {
    /** 学员Id */
    stuInfoId?: number
    /** 沟通Id */
    commuId?: number
    /** 学校Id */
    schoolId?: number
    /** 沟通类型 */
    commuType?: string
    /** 沟通内容 */
    commuContent?: string
    /** 沟通结果 */
    commuResult?: string
    /** 沟通时间 */
    dateTime?: string
    /** 是否开启回访提醒 */
    isRemind?: boolean
    /** 回访时间 */
    remindDate?: string
    /** 是否已回访 */
    isDone?: boolean
    /** 沟通人 */
    user?: string
  }

  /** 描述缺失 */
  export interface DeleteCommuRequest {
    /** 描述缺失 */
    id?: number
  }

  /** 上传文件 */
  export interface UploadStuInfoAttchmentRequest {
    /** 学员Id */
    stuInfoId?: number
    /** 文件大小 */
    size?: number
    /** 文件地址 */
    fileUrl?: string
    /** 文件名 */
    fileName?: string
  }

  /** 描述缺失 */
  export interface UpdateStuInfoAttachmentNameRequest {
    /** Id */
    id?: number
    /** 学员Id */
    stuInfoId?: number
    /** 文件名 */
    fileName?: string
    /** 文件扩展名 */
    fileExtension?: string
  }

  /** 删除学员文件 */
  export interface DeleteStuInfoAttachmentRequest {
    /** 描述缺失 */
    id?: number
  }

  /** 描述缺失 */
  export interface UpdateSPHRequest {
    /** 描述缺失 */
    id?: number
    /** 描述缺失 */
    isShowOnSPH?: number
  }

  /** 检测学员的姓名和手机号 */
  export interface CheckStuInfoNameAndPhoneRequest {
    /** 学生Id */
    id?: number
    /** 学生姓名 */
    stuName?: string
    /** 母亲电话 */
    motherTel?: string
    /** 父亲电话 */
    fatherTel?: string
    /** 其他电话 */
    otherTel?: string
  }

  /** 描述缺失 */
  export interface UpdateStuInfoCardIdRequest {
    /** 学员Id */
    id?: number
    /** 磁卡卡号 */
    cardId?: string
  }

  /** 更新学员头像 */
  export interface UpdateStuInfoHeadImageUrlRequest {
    /** 学员Id */
    id?: number
    /** 小头像 */
    headImageUrl156?: string
    /** 大头像 */
    headImageUrl512?: string
  }

  /** 描述缺失 */
  export interface GetLessonEnrollStuListDataRequest {
    /** 模糊查询类型 */
    queryType?: string
    /** 查询 */
    query?: string
    /** 是否升期 */
    isUp?: number[]
    /** 校区 */
    schoolIds?: number[]
    /** 课程 */
    lessonId?: number[]
    /** 状态 */
    status?: string[]
    /** 1- 按期（课时） ，2-按课时（课时）,3-按时间，4-按课时有效期 */
    classTimeType?: number[]
    /** 开始时间和结束时间 */
    time?: string[]
    /** 开始时间和结束时间 */
    classTime?: number[]
    /** 授课模式  班课：1。一对一：2。 */
    mode?: number[]
    /** 收费模式  按课时:1 按时间:2 按期:3 */
    feeMode?: number[]
    /** 课程大类id */
    lessonClassId?: number[]
    /** 是否欠款 */
    isArrearage?: number[]
    /** 是否分班 */
    isDivideIntoClasses?: number[]
    /** 是否消超 */
    isExcessConsumption?: number[]
    /** 描述缺失 */
    pageIndex?: number
    /** 描述缺失 */
    pageSize?: number
    /** 是否正序 */
    asc?: boolean
    /** 排序key */
    orderKey?: string
  }

  /** 描述缺失 */
  export interface GetLessonEnrollStuListStatisticsDataRequest {
    /** 模糊查询类型 */
    queryType?: string
    /** 查询 */
    query?: string
    /** 是否升期 */
    isUp?: number[]
    /** 校区 */
    schoolIds?: number[]
    /** 课程 */
    lessonId?: number[]
    /** 状态 */
    status?: string[]
    /** 1- 按期（课时） ，2-按课时（课时）,3-按时间，4-按课时有效期 */
    classTimeType?: number[]
    /** 开始时间和结束时间 */
    time?: string[]
    /** 开始时间和结束时间 */
    classTime?: number[]
    /** 授课模式  班课：1。一对一：2。 */
    mode?: number[]
    /** 收费模式  按课时:1 按时间:2 按期:3 */
    feeMode?: number[]
    /** 课程大类id */
    lessonClassId?: number[]
    /** 是否欠款 */
    isArrearage?: number[]
    /** 是否分班 */
    isDivideIntoClasses?: number[]
    /** 是否消超 */
    isExcessConsumption?: number[]
  }

  /** 描述缺失 */
  export interface LessonEnrollStuListDataExportRequest {
    /** 模糊查询类型 */
    queryType?: string
    /** 查询 */
    query?: string
    /** 是否升期 */
    isUp?: number[]
    /** 校区 */
    schoolIds?: number[]
    /** 课程 */
    lessonId?: number[]
    /** 状态 */
    status?: string[]
    /** 1- 按期（课时） ，2-按课时（课时）,3-按时间，4-按课时有效期 */
    classTimeType?: number[]
    /** 开始时间和结束时间 */
    time?: string[]
    /** 开始时间和结束时间 */
    classTime?: number[]
    /** 授课模式  班课：1。一对一：2。 */
    mode?: number[]
    /** 收费模式  按课时:1 按时间:2 按期:3 */
    feeMode?: number[]
    /** 课程大类id */
    lessonClassId?: number[]
    /** 是否欠款 */
    isArrearage?: number[]
    /** 是否分班 */
    isDivideIntoClasses?: number[]
    /** 是否消超 */
    isExcessConsumption?: number[]
    /** 是否正序 */
    asc?: boolean
    /** 排序key */
    orderKey?: string
  }

  /** 描述缺失 */
  export interface GetStudocAndClassListRequest {
    /** 模糊查询类型  Mobile:手机号模糊搜索,StuName:学员名称模糊搜索，TeacherName:老师名称模糊搜索,ClassName:班级名称模糊搜索 */
    queryType?: string
    /** 查询 */
    query?: string
    /** 是否升期 */
    isUp?: number[]
    /** 分班日期 */
    addDate?: string[]
    /** 校区 */
    schoolIds?: number[]
    /** 课程 */
    lessonId?: number[]
    /** 课程大类id */
    lessonClassId?: number[]
    /** 状态 */
    status?: string[]
    /** 描述缺失 */
    pageIndex?: number
    /** 描述缺失 */
    pageSize?: number
    /** 是否正序 */
    asc?: boolean
    /** 排序key */
    orderKey?: string
  }

  /** 描述缺失 */
  export interface StudocAndClassListExportRequest {
    /** 模糊查询类型  Mobile:手机号模糊搜索,StuName:学员名称模糊搜索，TeacherName:老师名称模糊搜索,ClassName:班级名称模糊搜索 */
    queryType?: string
    /** 查询 */
    query?: string
    /** 是否升期 */
    isUp?: number[]
    /** 分班日期 */
    addDate?: string[]
    /** 校区 */
    schoolIds?: number[]
    /** 课程 */
    lessonId?: number[]
    /** 课程大类 */
    lessonClassId?: number[]
    /** 状态 */
    status?: string[]
    /** 是否正序 */
    asc?: boolean
    /** 排序key */
    orderKey?: string
  }

  /** 描述缺失 */
  export interface GetStuInfoListDataRequest {
    /** 页码 */
    pageIndex?: number
    /** 每页条数 */
    pageSize?: number
    /** 性别 */
    sex?: number[]
    /** 是否关注校宝家 */
    schoolPalHome?: number[]
    /** 是否欠款 */
    isArrearage?: number[]
    /** 是否绑定磁卡 */
    magnetCard?: number[]
    /** 是否有星标 */
    isCollection?: number[]
    /** 是否有余额 */
    balance?: number[]
    /** 是否是新老生 */
    isNewStuInfo?: number[]
    /** 渠道 */
    channelId?: number[]
    /** 渠道分类 */
    channelCategoryId?: number[]
    /** 学员生日 */
    stuBirthRange?: string[]
    /** 学员列表扩展字段筛选集合 */
    extendSearchList: StuinfoExtendSearchDto[]
    /** 是否正序 */
    asc?: boolean
    /** 排序的key */
    orderKey?: string
    /** 模糊查询类型 */
    queryType?: string
    /** 查询 */
    query?: string
  }

  /** 描述缺失 */
  export interface GetStuInfoListStatisticsDataRequest {
    /** 性别 */
    sex?: number[]
    /** 是否关注校宝家 */
    schoolPalHome?: number[]
    /** 是否是新老生 */
    isNewStuInfo?: number[]
    /** 是否欠款 */
    isArrearage?: number[]
    /** 是否绑定磁卡 */
    magnetCard?: number[]
    /** 是否有余额 */
    balance?: number[]
    /** 是否有星标 */
    isCollection?: number[]
    /** 渠道 */
    channelId?: number[]
    /** 渠道分类 */
    channelCategoryId?: number[]
    /** 学员生日 */
    stuBirthRange?: string[]
    /** 学员列表扩展字段筛选集合 */
    extendSearchList: StuinfoExtendSearchDto[]
    /** 模糊查询类型 */
    queryType?: string
    /** 查询 */
    query?: string
  }

  /** 描述缺失 */
  export interface DeleteStuInfosRequest {
    /** 学员id集合 */
    stuIndoIds?: number[]
  }

  /** 描述缺失 */
  export interface StuinfoListExportRequest {
    /** 是否是新老生 */
    isNewStuInfo?: number[]
    /** 性别 */
    sex?: number[]
    /** 是否关注校宝家 */
    schoolPalHome?: number[]
    /** 是否欠款 */
    isArrearage?: number[]
    /** 是否绑定磁卡 */
    magnetCard?: number[]
    /** 是否有星标 */
    isCollection?: number[]
    /** 是否有余额 */
    balance?: number[]
    /** 渠道 */
    channelId?: number[]
    /** 渠道分类 */
    channelCategoryId?: number[]
    /** 学员生日 */
    stuBirthRange?: string[]
    /** 学员列表扩展字段筛选集合 */
    extendSearchList: StuinfoExtendSearchDto[]
    /** 是否正序 */
    asc?: boolean
    /** 排序的key */
    orderKey?: string
    /** 模糊查询类型 */
    queryType?: string
    /** 查询 */
    query?: string
  }

  /** 描述缺失 */
  export interface BatchChangeRequest {
    /** 调整类型 */
    type?: string
    /** 调整前的数据 */
    from?: string
    /** 调整后数据 */
    to?: string
    /** 是否强制调整 */
    isConfirm?: boolean
  }

  /** 描述缺失 */
  export interface SelectStuInfoFetchDataRequest {
    /** 学员id集合 */
    stuInfoIds?: number[]
    /** 学生姓名 */
    stuName?: string
    /** 学号 */
    stuInfoNumber?: string
    /** 手机号 */
    mobile?: string
    /** 校区ids */
    schoolIds?: number[]
    /** 是否欠款 */
    isArrearage?: boolean
    /** 是否在读 */
    isStudying?: boolean
    /** 描述缺失 */
    pageIndex?: number
    /** 描述缺失 */
    pageSize?: number
    /** 是否有教材杂费 */
    isHaveItemTran?: boolean
    /** 是否存余额 */
    isBalance?: boolean
  }

  /** 描述缺失 */
  export interface GetChannelsRequest {
    /** 分类ID */
    channelClassificationId?: number[]
    /** 描述缺失 */
    query?: string
    /** 描述缺失 */
    pageSize?: number
    /** 描述缺失 */
    pageIndex?: number
  }

  /** 描述缺失 */
  export interface GetChannelClassificationsRequest {
    /** 描述缺失 */
    query?: string
    /** 描述缺失 */
    pageSize?: number
    /** 描述缺失 */
    pageIndex?: number
  }

  /** 描述缺失 */
  export interface GetStuNameByCardRequest {
    /** 磁卡号 */
    card?: string
  }

  /** 描述缺失 */
  export interface StudentSignRequest {
    /** 描述缺失 */
    stuDocId?: number
    /** 描述缺失 */
    stuInfoId?: number
    /** 描述缺失 */
    classScheduleId?: number
    /** 描述缺失 */
    onOff?: string
    /** 是否来源磁卡刷卡 */
    fromStuSignAction?: boolean
    /** 描述缺失 */
    timeZone?: number
  }

  /** 描述缺失 */
  export interface SwipeCardByStudentRequest {
    /** 学员ID */
    stuInfoId?: number
    /** 学员档案ID(用于对匹配出的多个日程进行选择) */
    stuDocId?: number
    /** 班级日程ID(用于对匹配出的多个日程进行选择) */
    classScheduleId?: number
    /** 时区 */
    timeZone?: number
  }

  /** Request For AddTeachingLog  Lego二期页面不作调整,接口参数沿用原来的 */
  export interface AddTeachingLogRequest {
    /** 班级Id */
    classId?: number
    /** 应到人数 */
    shouldAttendanceCount?: number
    /** 记上课时间 */
    teachingLogTime?: string
    /** 上课内容 */
    lessonContent?: string
    /** 附件图片地址 */
    imgUrl?: string
    /** 附件缩略图片地址 */
    smallImgUrl?: string
    /** 备注 */
    comment?: string
    /** (原属性名)Teacher  日程选择教师 */
    teachers: TeacherDTO[]
    /** (原属性名)Assistant  日程选择助教 */
    assistants: AssistantDTO[]
    /** 上课学员列表 */
    stuTeachingLogInfos: StuTeachingLogInfo[]
    /** 教师课时 */
    teacherClassTime?: number
    /** 日程选中科目 */
    subjects: SubjectDTO[]
    /** 上课日程 */
    classScheduleId?: number
  }

  /** 教师信息 DTO */
  export interface TeacherDTO {
    /** Id */
    id?: number
    /** 名称 */
    name?: string
  }

  /** 助教信息 DTO */
  export interface AssistantDTO {
    /** Id */
    id?: number
    /** 名称 */
    name?: string
  }

  /** 描述缺失 */
  export interface StuTeachingLogInfo {
    /** 描述缺失 */
    stuInfoId?: number
    /** 描述缺失 */
    stuName?: string
    /** 描述缺失 */
    stuDocId?: number
    /** 学员档案真正classId */
    classId?: number
    /** 学员档案状态 */
    stuDocStatus?: string
    /** 描述缺失 */
    sex?: string
    /** 描述缺失 */
    headImgUrl156?: string
    /** 学费账户剩余课时 */
    leftClassTime?: number
    /** 学员消耗课时 */
    costClassTime?: number
    /** 学员上课状态 */
    attendanceStatus?: string
    /** 学员上课分类 0.上课 1.插班 2.补课 Enum 枚举类型 */
    stuTeachingLogDiffStatus: 0 | 1 | 2
    /** 是否有对应补课记录（请假状态才有用） */
    haveMakeUpRecord?: boolean
    /** 关联的请假时间（补课状态才有用） */
    offDateTime?: string
    /** 关联的请假记上课id(补课状态才有用) */
    stuTeachingLogId?: number
    /** 学员请假次数 */
    stuDocLeaveTimes?: number
    /** 过期时间 */
    expiryDate?: string
    /** 描述缺失 */
    tRemark?: number
    /** 描述缺失 */
    tRemark2?: number
    /** 描述缺失 */
    commentSmallImgUrl?: string
    /** 描述缺失 */
    commentImgUrl?: string
    /** 描述缺失 */
    tComment?: string
    /** 课程收费模式 Enum 枚举类型 */
    feeMode: 1 | 2 | 3
  }

  /** 科目信息 DTO */
  export interface SubjectDTO {
    /** Id */
    id?: number
    /** 名称 */
    name?: string
  }

  /** 判断是否允许删除学员上课记录的请求模型 */
  export interface CheckDeleteStuTeachingLogRequest {
    /** 学员上课记录ID */
    stuTeachingLogId?: number
  }

  /** 判断是否允许编辑学员上课记录的请求模型 */
  export interface CheckEditStuTeachingLogRequest {
    /** 学员上课记录ID */
    stuTeachingLogId?: number
  }

  /** 描述缺失 */
  export interface DeleteStuTeachingLogRequest {
    /** 学员记上课Id */
    stuTeachingLogId?: number
  }

  /** Request For EditTeachingLog  Lego二期页面不作调整,接口参数沿用原来的 */
  export interface EditTeachingLogRequest {
    /** 班级Id */
    classId?: number
    /** 应到人数 */
    shouldAttendanceCount?: number
    /** 记上课时间 */
    teachingLogTime?: string
    /** 上课内容 */
    lessonContent?: string
    /** 附件图片地址 */
    imgUrl?: string
    /** 附件缩略图片地址 */
    smallImgUrl?: string
    /** 备注 */
    comment?: string
    /** (原属性名)Teacher  日程选择教师 */
    teachers: TeacherDTO[]
    /** (原属性名)Assistant  日程选择助教 */
    assistants: AssistantDTO[]
    /** 上课学员列表 */
    stuTeachingLogInfos: StuTeachingLogInfo[]
    /** 教师课时 */
    teacherClassTime?: number
    /** 日程选中科目 */
    subjects: SubjectDTO[]
    /** 描述缺失 */
    schoolId?: number
    /** 描述缺失 */
    classScheduleId?: number
    /** 描述缺失 */
    schoolName?: string
    /** 描述缺失 */
    lessonId?: number
    /** 描述缺失 */
    lessonName?: string
    /** 描述缺失 Enum 枚举类型 */
    lessonMode: 1 | 2
    /** 描述缺失 */
    teachingLogId?: number
    /** 课程收费模式 废弃 Enum 枚举类型 */
    feeMode: 1 | 2 | 3
    /** 描述缺失 */
    className?: string
    /** 日程开始时间 */
    periodStart?: string
    /** 日程结束时间 */
    periodEnd?: string
    /** 班级课时 */
    unitClassTimes?: number
    /** 实到人数 */
    actualAttendanceCount?: number
    /** 描述缺失 */
    homeworkButtonStatus: HomeworkButtonStatus
    /** 描述缺失 */
    userName?: string
    /** 描述缺失 */
    createTime?: string
  }

  /** 描述缺失 */
  export interface HomeworkButtonStatus {
    /** 当前用户有没有布置作业的权限 -- 前端显示不显示保存并布置作业的按钮 */
    hasHomeworkAuthority?: boolean
    /** 是否重定向到布置作业的页面（如果班级的学员不满足条件则为false，不能跳转到作业的页面） */
    isRedirectToHomeworkPage?: boolean
  }

  /** Request for CheckDeleteTeachingLog  Lego二期页面不作调整,接口参数沿用原来的 */
  export interface CheckDeleteTeachingLogRequest {
    /** 描述缺失 */
    teachingLogId?: number
  }

  /** Request for DeleteTeachingLog  Lego二期页面不作调整,接口参数沿用原来的 */
  export interface DeleteTeachingLogRequest {
    /** 描述缺失 */
    teachingLogId?: number
  }

  /** Request for GetTeachingLogsByClass */
  export interface GetTeachingLogsByClassRequest {
    /** 班级名称 */
    className?: string
    /** 教师姓名 */
    teacherName?: string
    /** 助教姓名 */
    assistantName?: string
    /** 上课日期开始时间 */
    beginDate?: string
    /** 上课日期结束时间 */
    endDate?: string
    /** 校区Ids */
    schoolIds?: number[]
    /** 课程类别Ids */
    lessonClassIds?: number[]
    /** 课程Ids */
    lessonIds?: number[]
    /** 科目ID */
    subjectIds?: number[]
    /** 根据权限判断而获得教师/助教id */
    teacherOrAssistantId?: number
    /** 是否正序 */
    asc?: boolean
    /** 排序关键字 */
    orderKey?: string
    /** 每页条数，最大200条 */
    pageSize?: number
    /** 查询的页码，从1开始计数 */
    pageIndex?: number
  }

  /** Request for GetStuTeachingLogsByStuinfo */
  export interface GetStuTeachingLogsByStuinfoRequest {
    /** 学员姓名 */
    stuName?: string
    /** 班级名称 */
    className?: string
    /** 教师姓名 */
    teacherName?: string
    /** 助教姓名 */
    assistantName?: string
    /** 上课日期开始时间 */
    beginDate?: string
    /** 上课日期结束时间 */
    endDate?: string
    /** 校区Ids */
    schoolIds?: number[]
    /** 考勤(上课)状态 */
    attendanceStatus?: number[]
    /** 课程类别Ids */
    lessonClassIds?: number[]
    /** 课程Ids */
    lessonIds?: number[]
    /** 根据权限判断而获得教师/助教id */
    teacherOrAssistantId?: number
    /** 是否正序 */
    asc?: boolean
    /** 排序关键字 */
    orderKey?: string
    /** 每页条数，最大200条 */
    pageSize?: number
    /** 查询的页码，从1开始计数 */
    pageIndex?: number
  }

  /** Request for SaveMakeUps */
  export interface SaveMakeUpsRequest {
    /** 上课状态 Enum 枚举类型 */
    attendanceStatus: 0 | 1 | 2 | 3 | 4 | 5
    /** 扣除课时数 */
    deductClassTimes?: number
    /** 学员上课记录Id */
    stuTeachingLogIds?: number[]
  }

  /** Request for GetStuInfoClassTimeStatistics */
  export interface GetStuInfoClassTimeStatisticsRequest {
    /** 校区Ids，全部校区不需要传入参数 */
    schoolIds?: number[]
    /** 课程分类Id */
    lessonClassIds?: number[]
    /** 课程Id */
    lessonIds?: number[]
    /** 班级Ids */
    classIds?: number[]
    /** 学员Id */
    stuInfoIds?: number[]
    /** 科目Ids */
    subjectIds?: number[]
    /** 查询开始时间 */
    beginDate?: string
    /** 查询结束时间 */
    endDate?: string
    /** 查询的页码，从1开始计数 */
    pageIndex?: number
    /** 每页条数，最大200条 */
    pageSize?: number
  }

  /** 更新试听状态 */
  export interface UpdateTrialStatusRequest {
    /** 试听Id */
    trialId?: number
    /** 试听状态 */
    trialStatus?: number
  }

  /** 获取用户管辖校区查询请求 */
  export interface GetUserSchoolsRequest {
    /** 是否查询全部校区 */
    isAll?: boolean
    /** 描述缺失 */
    query?: string
    /** 描述缺失 */
    pageSize?: number
    /** 描述缺失 */
    pageIndex?: number
  }
}
export default SchoolPalWebModelRequest
