import SchoolPalDomainSdk from './SchoolPalDomainSdk'
import SchoolPalDomainReportDomainSdk from './SchoolPalDomainReportDomainSdk'
import FeeStandard = SchoolPalDomainSdk.FeeStandard
import ClassRoom = SchoolPalDomainSdk.ClassRoom
import ClassroomInvalidSeat = SchoolPalDomainSdk.ClassroomInvalidSeat
import ExpenditureClassModel = SchoolPalDomainSdk.ExpenditureClassModel
import Item = SchoolPalDomainSdk.Item
import LessonModel = SchoolPalDomainSdk.LessonModel
import SeriesData = SchoolPalDomainReportDomainSdk.SeriesData
namespace SchoolPalWebModelResponse {
  /** 描述缺失 */
  export interface SelectClassInfoFetchDataResponse {
    /** 校区Id */
    schoolId: number
    /** 校区名 */
    schoolName?: string
    /** 班级Id */
    classId: number
    /** 班级名 */
    className?: string
    /** 班级状态 */
    classStatus?: string
    /** 课程Id */
    lessonId: number
    /** 课程名称 */
    lessonName?: string
    /** 教室Id */
    classroomId: number
    /** 教师 */
    teacherName?: string
    /** 开班日期 */
    openDate?: string
    /** 描述缺失 */
    stuFeeDocId: number
    /** 描述缺失 */
    stuDocId: number
    /** 最大人数 */
    maxStudent: number
    /** 报读学员人数 */
    stuCount: number
    /** 课时 */
    classTime?: string
    /** 是否已经被其它机构选择 */
    classSelectState?: boolean
    /** 班级状态,默认为0。0：未开班、1：开班中、2：已结班 */
    status: number
    /** 1：招生中、0：停止招生 、2：满班自动停止招生 Enum 枚举类型 */
    enrolling: 0 | 1 | 2
    /** 课程授课模式（班课为1，一对一为2） */
    classLessonMode: number
    /** 是否开启报名选座 */
    hasEnrollSelectSeat?: boolean
    /** sku 列表（全部） */
    feeStandards: FeeStandardDto[]
    /** sku 列表（选中） */
    selectedFeeStandards: FeeStandardDto[]
    /** 显示教师姓名 */
    teachers: HrDocDto[]
  }

  /** 描述缺失 */
  export interface FeeStandardDto {
    /** 主键 */
    id: number
    /** 收费模式 */
    mode: number
    /** v10.1 含义变更  UnitPrice = Price / Count */
    unitPrice: number
    /** 收费标准单位 */
    unit: number
    /** v10.1 含义变更  数量 */
    count: number
    /** 价格 */
    price: number
    /** 校区Id  -1 表示全部校区 */
    schoolId: number
    /** 校区名称【冗余】  v10.1新增 */
    schoolName?: string
  }

  /** 教师 */
  export interface HrDocDto {
    /** Id */
    id: number
    /** 姓名 */
    teacherName?: string
  }

  /** 按页返回添加数据 */
  export interface PageResultWithCount<T0> {
    /** 总在读学员数 */
    studyCount: number
    /** 描述缺失 */
    totalCount: number
    /** 描述缺失 */
    currentIndex: number
    /** 描述缺失 */
    itemCount: number
    /** 描述缺失 */
    list: T0
  }

  /** 一对一学员列表/待处理学员列表出参 */
  export interface GetOneToOneListResponse {
    /** 主键ID */
    id: number
    /** 班级ID */
    classId: number
    /** 班级名称 */
    className?: string
    /** 班级状态 Enum 枚举类型 */
    classStatus: 0 | 1 | 2
    /** 学员信息ID */
    stuInfoId: number
    /** 学员姓名 */
    studentName?: string
    /** 教师ID */
    teacherId?: string
    /** 教师姓名 */
    teacherName?: string
    /** 助教ID */
    assistantId?: string
    /** 助教姓名 */
    assistantName?: string
    /** 课程ID */
    lessonId: number
    /** 课程名称 */
    lessonName?: string
    /** 开课日期 */
    openDate?: string
    /** 校区ID */
    schoolId: number
    /** 校区名称 */
    schoolName?: string
    /** 已用课时 */
    usedClassTimes: number
    /** 已用学费 */
    usedTuition: number
    /** 主要联系方式 */
    mainTel?: string
    /** 主要联系方式类型 Enum 枚举类型 */
    mainTelRelationship: 0 | 1 | 5 | 9 | 13
    /** 教室名称 */
    classroomName?: string
    /** 学费档案ID */
    stuFeeDocId: number
    /** 学员学费档案状态 Enum 枚举类型 */
    stuFeeDocStatus: 1 | 2 | 3 | 4 | 5 | 6 | 7 | -1
    /** 学员档案状态 */
    stuDocStatus?: string
    /** 学员档案ID */
    stuDocId: number
    /** 剩余课时 */
    remainClassTime: number
    /** 剩余学费 */
    remainTuition: number
    /** 收费标准 */
    feeStandardList: FeeStandard[]
    /** 上课时间 */
    classTimeDescription?: string
    /** 星标 */
    isCollection?: boolean
    /** 校宝家关注 */
    isSchoolPalHomeConcerned?: boolean
    /** 是否升期 */
    isUped?: boolean
  }

  /** 课程表 */
  export interface GetStuInfoScheduleListResponse {
    /** 描述缺失 */
    subject?: string
    /** 描述缺失 */
    start?: string
    /** 描述缺失 */
    end?: string
    /** 描述缺失 */
    id: number
    /** 描述缺失 */
    teacherId: number
    /** 描述缺失 */
    teacher?: string
    /** 描述缺失 */
    class?: string
    /** 描述缺失 */
    classRoomId: number
    /** 描述缺失 */
    classRoomname?: string
    /** 描述缺失 */
    color?: string
    /** 描述缺失 */
    classId: number
    /** 描述缺失 */
    unitClassTimes: number
    /** 描述缺失 */
    isSelf?: boolean
    /** 课程类型  1：班课  2：一对一 */
    lessonMode: number
    /** 描述缺失 */
    student?: string
    /** 描述缺失 */
    lessonName?: string
    /** 描述缺失 */
    assistantId: number
    /** 描述缺失 */
    assistantName?: string
    /** 描述缺失 */
    realClassPeriodTemplateId: number
    /** 科目名称 */
    subjectName?: string
    /** 科目id */
    subjectId: number
    /** 记上课Id，没有则为0 */
    teachingLogId: number
  }

  /** 获取班级下学员详情action 出参 */
  export interface GetClassStuDetailsListResponse {
    /** 班级下学员详情总计信息 */
    info: ClassStuDetailsTotalDataResponse
    /** 班级下学员详情集合 */
    classStuDetailsList: ClassStuDetailsResponse[]
  }

  /** 班级下学员详情总计信息 */
  export interface ClassStuDetailsTotalDataResponse {
    /** 学员总数 */
    stuCount: number
    /** 已用学费总计 */
    totalUsedTuition?: string
    /** 未用学费总计 */
    totalUnusedTuition?: string
    /** 总学费共计 */
    totalTuition?: string
  }

  /** 班级下学员详情 */
  export interface ClassStuDetailsResponse {
    /** 学员档案Id */
    id: number
    /** 学员档案状态 */
    status?: string
    /** 分班日期 */
    addDate?: string
    /** 学员信息ID */
    stuInfoId: number
    /** 学员学费档案Id */
    stuFeeDocId: number
    /** 未用学费 */
    unusedTuition: number
    /** 未用课时 */
    unusedClassTimes: number
    /** 总课时 */
    totalClassTimes?: string
    /** 总学费 */
    totalTuition: number
    /** 已用学费 */
    usedTuition: number
    /** 已用课时 */
    usedClassTimes: number
    /** 学费账户状态 */
    stuFeeDocStatus: number
    /** 到期时间 */
    expiryDate?: string
    /** 是否已升期 */
    isUped?: boolean
    /** 收费模式 */
    mode: number
    /** 新生/老生 */
    newOld?: string
    /** 学员姓名 */
    stuName?: string
    /** 其他信息 */
    comment?: string
    /** 学校年级班级 */
    pubSchoolGradeClass?: string
    /** 家庭地址 */
    homeAdd?: string
    /** 微信号 */
    weChatId?: string
    /** 学员账户：余额；  报名新增时不需要传此参数； */
    remain: number
    /** 是否星标 */
    isCollection?: boolean
    /** 性别 */
    sex?: string
    /** 生日 */
    birthDate?: string
    /** 联系电话 */
    telPhone?: string
    /** 公立学校 */
    pubSchoolName?: string
    /** 校宝家关注 */
    sphHome?: boolean
    /** 欠费金额(汇总学员相关的交易欠费金额)；  报名新增时不需要传此参数； */
    arrearage: number
    /** 联系方式与此学员的关系 */
    relationship: number
    /** 学员账户：未用积分；  报名新增时不需要传此参数； */
    unusedCredit: number
    /** 身份证号 */
    identityCard?: string
    /** 学员的行业 */
    industry?: string
    /** 学员的职业 */
    pofession?: string
    /** 民族 */
    nation?: string
    /** 是否允许数据库营销 */
    dbmarketing?: string
    /** 机构学员的档案号 */
    stuFileNumber?: string
    /** 小学学校 */
    primarySchool?: string
    /** 初中学校 */
    juniorHighSchool?: string
    /** 高中学校 */
    seniorHighSchool?: string
    /** 家长姓名 */
    parentName?: string
    /** （积分等级图标）样式类名 */
    styleClassName?: string
    /** 年级 */
    grade1?: string
    /** 合同编号,过个合同编号之间用逗号分隔 */
    contractNumber?: string
    /** 是否参与保险 */
    joinedInsurance?: string
    /** 段位 */
    taekwondoRank?: string
    /** 幼儿园 */
    kindergarten?: string
    /** QQ号码 */
    qqNumber?: string
    /** 毕业时间 */
    graduationTime?: string
    /** 毕业院校 */
    graduationSchool?: string
    /** 所学专业 */
    profession?: string
    /** 单位名称 */
    companyName?: string
    /** 最高学历 */
    highestEducation?: string
    /** 学员自定义字段数据集合 */
    stuInfoCustomDataList: ClassStuinfoCustomData[]
  }

  /** 学员自定义字段数据 */
  export interface ClassStuinfoCustomData {
    /** 字段名 */
    columnName?: string
    /** 自定义字段值 */
    value?: string
  }

  /** 获取班级详情接口 */
  export interface GetClassDetailResponse {
    /** 班级ID */
    classId: number
    /** 班级名称 */
    className?: string
    /** 课程Id */
    lessonId: number
    /** 课程名称 */
    lessonName?: string
    /** 收费标准（按校区过滤） */
    feeStandardList: FeeStandardDto[]
    /** 校区Id */
    schoolId: number
    /** 校区名 */
    schoolName?: string
    /** 开班日期 */
    openDate?: string
    /** 结班日期 */
    closeDate?: string
    /** 成班人数 */
    numToOpen: number
    /** 已招人数 */
    stuCount: number
    /** 班级教师 */
    classTeacherList: ClassteacherDto[]
    /** 备注 */
    comment?: string
    /** 班级教室Id */
    classroomId: number
    /** 班级教室名称 */
    classroomName?: string
    /** 最大人数 */
    maxStudent: number
    /** 上课时间（拼接） */
    classTimeDescription?: string
    /** 招生状态, 默认为0。1：招生中、0：停止招生 Enum 枚举类型 */
    enrolling: 0 | 1 | 2
    /** 班级状态,默认为0。0：未开班、1：开班中、2：已结班 Enum 枚举类型 */
    status: 0 | 1 | 2
    /** 满班率 */
    fullRate: number
    /** 新生率 */
    newRate: number
    /** 转出率 */
    transferRate: number
    /** 退费率 */
    returnRate: number
    /** 停课率 */
    stopRate: number
    /** 出勤率 */
    attendanceRate: number
    /** 升期率 */
    upedRate: number
  }

  /** 班级教师 */
  export interface ClassteacherDto {
    /** 教师名称 */
    teacherName?: string
    /** 类型 */
    targetType: number
    /** 员工Id */
    hrDocId: number
  }

  /** 根据课程Id返回班级信息 */
  export interface GetClassListByLessonIdResponse {
    /** 班级Id */
    classId: number
    /** 班级Name */
    className?: string
    /** 校区Id */
    schoolId: number
    /** 校区name */
    schoolName?: string
    /** 招生状态, 默认为0。1：招生中、0：停止招生 Enum 枚举类型 */
    enrolling: 0 | 1 | 2
    /** 班级状态,默认为0。0：未开班、1：开班中、2：已结班 Enum 枚举类型 */
    status: 0 | 1 | 2
    /** 在读学员数量 */
    stuDocCount: number
    /** 最大人数 */
    maxStudent: number
  }

  /** 获取班级排座信息列表返回值 */
  export interface GetClassStuDocSeatListResponse {
    /** 描述缺失 */
    classroom: ClassRoom
    /** 班级排座列表 */
    stuDocSeats: GetClassStuDocSeatItemModel[]
    /** 教室不可用座位列表 */
    classroomInvalidSeats: ClassroomInvalidSeat[]
  }

  /** 学员档案分座dto */
  export interface GetClassStuDocSeatItemModel {
    /** 学员Id */
    stuInfoId: number
    /** 学员姓名 */
    stuName?: string
    /** 学员档案分班日期 */
    addDate?: string
    /** 描述缺失 */
    id: number
    /** 描述缺失 */
    orgId: number
    /** 描述缺失 */
    stuDocId: number
    /** 描述缺失 */
    classId: number
    /** 描述缺失 */
    classroomId: number
    /** 描述缺失 */
    row: number
    /** 描述缺失 */
    column: number
  }

  /** Response For GetTeachingLogsByClassId */
  export interface GetTeachingLogsByClassIdResponse {
    /** 班级上课记录统计信息 */
    dataStatistic: TeachingLogDataStatistic
    /** 班级上课记录列表 */
    classTeachingLogs: GetTeachingLogsByClassId[]
  }

  /** 班级上课记录统计信息 */
  export interface TeachingLogDataStatistic {
    /** 出勤率总计 */
    attendanceRate: number
    /** 学员总课时 */
    totalStuClassTimes: number
    /** 学员总学费 */
    totalStuCost: number
  }

  /** 班级详情-上课记录列表-结果 */
  export interface GetTeachingLogsByClassId {
    /** 班级上记录id */
    id: number
    /** 上课日期 */
    teachingDateTime?: string
    /** 上课记录创建日期 */
    teachingAddDateTime?: string
    /** 教师名 (第一个老师为默认老师） */
    teacherName?: string
    /** 助教名 (第一个助教为默认助教） */
    assisantName?: string
    /** 科目名称 */
    subjectName?: string
    /** 应到学员数 */
    shouldAttendanceCount: number
    /** 实到学员数 */
    actualAttendanceCount: number
    /** 上课学生数量 */
    attendNumber: number
    /** 请假学员数量 */
    leaveNumber: number
    /** 旷课学员数量 */
    truantNumber: number
    /** 补课学员数量 */
    makeupNumber: number
    /** 学员上课课时 */
    stuClassTimeTotal: number
    /** 学员学费消耗 */
    stuCostTotal: number
    /** 上课内容 */
    lessonContent?: string
    /** 校区名称 */
    schoolName?: string
    /** 班级名称 */
    className?: string
    /** 课程名称 */
    lessonName?: string
    /** 创建人 */
    addUser?: string
    /** 备注 */
    comment?: string
    /** 学员姓名 */
    stuName?: string
    /** 课程类型 Enum 枚举类型 */
    lessonMode: 1 | 2
    /** 上课状态，一对一班级使用 */
    attendanceStatus?: string
  }

  /** 班级上课记录实到/应到学员 */
  export interface GetShouldAndActualStusByTeachingLogIdResponse {
    /** 学员上课记录id */
    id: number
    /** 学员id */
    stuInfoId: number
    /** 学费档案id */
    stuFeedocId: number
    /** 学员名称 */
    stuName?: string
    /** 学员档案状态 */
    stuDocStatus?: string
    /** 学员性别 */
    sex?: string
    /** 学员小头像 */
    headImgUrl156?: string
    /** 学员上课记录状态 */
    attendanceStatus?: string
    /** 学费档案剩余课时 */
    unusedClassTimes: number
  }

  /** 学员报读课程所属的班级 */
  export interface GetClassNamesByStuInfoIdResponse {
    /** 班级id */
    id: number
    /** 班级名称 */
    className?: string
  }

  /** 学员详情上课记录结果 */
  export interface GetStuTeachingLogsByStuInfoIdResponse {
    /** 班级记上课id */
    teachingLogId: number
    /** 学员记上课id */
    stuTeachingLogId: number
    /** 上课日期 */
    teachingLogDateTime?: string
    /** 班级名称 */
    className?: string
    /** 课程名称 */
    lessonName?: string
    /** 课程类型 Enum 枚举类型 */
    lessonMode: 1 | 2
    /** 科目名称 */
    subjectName?: string
    /** 教师名称 */
    teacherName?: string
    /** 出勤状态 */
    attendanceStatus?: string
    /** 完成课时 */
    classTimes: number
    /** 消耗学费 */
    cost: number
  }

  /** 描述缺失 */
  export interface GetClassesByOrgIdResponse {
    /** 班级id */
    id: number
    /** 班级名称 */
    name?: string
  }

  /** 描述缺失 */
  export interface GetStuDocsByClassIdResponse {
    /** 班级id */
    classId: number
    /** 学员id */
    stuInfoId: number
    /** 学员名 */
    stuName?: string
    /** 主要电话 */
    mainTel?: string
    /** 次要电话 */
    minorTel?: string
    /** 其他电话 */
    otherTel?: string
    /** 主要电话所属关系 */
    mainTelRelationship: number
    /** 次要电话所属关系 */
    minorTelRelationship: number
    /** 其他电话所属关系 */
    otherTelRelationship: number
  }

  /** 描述缺失 */
  export interface GetOneToOneClassTimesByLessonIdResponse {
    /** 每次上课消耗课时 */
    unitClassTimes: number
    /** 教师默认课时 */
    teacherClasstime: number
  }

  /** 获取发生课消班级 出参 */
  export interface GetClassEliminateClassResponse {
    /** 当前页Index */
    currentIndex: number
    /** 记录数 */
    itemCount: number
    /** 总记录数 */
    totalCount: number
    /** 发生课消班级List */
    list: GetClassEliminateClassListResponse[]
  }

  /** 获取发生课消班级List 出参 */
  export interface GetClassEliminateClassListResponse {
    /** 班级id，主键 */
    id: number
    /** 校区id */
    schoolId: number
    /** 班级名称 */
    className?: string
  }

  /** 教室查询结果 */
  export interface ClassroomQueryResponseItem {
    /** 教室Id */
    id: number
    /** 教室名称 */
    name?: string
  }

  /** 获取机构权限返回参数 */
  export interface OrgAuthorityResponse {
    /** 描述缺失 */
    id: number
    /** 描述缺失 */
    authorityId: number
    /** 描述缺失 */
    orgId: number
  }

  /** 校区模型 */
  export interface SchoolModelResponse {
    /** 校区Id */
    id: number
    /** 校区名称 */
    schoolName?: string
    /** 排序号 */
    orderId: number
  }

  /** 员工组件分页数据 */
  export interface SelectEmployeeFetchDataResponse {
    /** 员工Id */
    id: number
    /** 员工姓名 */
    name?: string
    /** 员工手机号 */
    phone?: string
    /** 员工性别 */
    sex?: string
    /** 员工在排课教师表中的校区权限 */
    scheduleSchoolLimit?: string
    /** 员工在排课教师表中的多个校区名 */
    scheduleSchoolNames?: string
  }

  /** 班级列表 */
  export interface SelectClassForTurnToFetchDataByLessonResponse {
    /** 描述缺失 */
    id: number
    /** 描述缺失 */
    orgId: number
    /** 描述缺失 */
    schoolId: number
    /** 学校名称 */
    schoolName?: string
    /** 描述缺失 */
    lessonId: number
    /** 描述缺失 */
    className?: string
    /** 描述缺失 */
    maxStudent: number
    /** 描述缺失 */
    openDate?: string
    /** 描述缺失 */
    closeDate?: string
    /** 每次上课消耗课时  【学生课时】 */
    unitClassTimes: number
    /** 每次上课消耗课时 【教师课时】 */
    teacherClasstime: number
    /** 招生状态  1：开放招生  0：停止招生 */
    enrolling: number
    /** 班级状态  0：未开班  1：开班中  2：已结班 */
    status: number
    /** 创建时间 */
    createdTime?: string
    /** 描述缺失 */
    comment?: string
    /** 描述缺失 */
    deleted?: boolean
    /** 描述缺失 */
    classroomId: number
    /** 描述缺失 */
    isSmsStuSign?: boolean
    /** 描述缺失 */
    hidden?: boolean
    /** 描述缺失 */
    hideSph?: boolean
    /** 描述缺失 */
    creator?: string
    /** 描述缺失 */
    classMode?: string
    /** 按期班级结班时自动结课 */
    autoCloseStuFeeDoc?: boolean
    /** 描述缺失 */
    stuCount: number
    /** 显示教师姓名 */
    teachers: HrDocDto[]
    /** 上课时间 */
    classTimeDescription?: string
    /** 描述缺失 */
    classTime?: string
    /** 是否开启报名选座 */
    hasEnrollSelectSeat?: boolean
  }

  /** 收支大类列表返回值 */
  export interface GetExpenditureItemsResponse {
    /** 总数 */
    totalCount: number
    /** 当前页 */
    currentIndex: number
    /** 支出项目集合 */
    expenditureClassList: ExpenditureClassModel[]
  }

  /** 账户数据 */
  export interface GetAccountListDataResponse<T0> {
    /** 描述缺失 */
    totalCount: number
    /** 描述缺失 */
    currentIndex: number
    /** 描述缺失 */
    itemCount: number
    /** 描述缺失 */
    list: T0
  }

  /** 账户请求入参 */
  export interface AccountResponse {
    /** 账户Id */
    id: number
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
    /** 是否系统创建 */
    isSys?: boolean
    /** 是否不允许编辑 */
    unableEdit?: boolean
    /** 是否系统使用账户 */
    sysUseAccount?: boolean
    /** 创建时间 */
    createdTime?: string
    /** 账户类型 Enum 枚举类型 */
    accountType: 1 | 2 | 3 | 10 | 11 | 99
  }

  /** 新增 / 编辑时需要获取账户信息 返回值 */
  export interface GetAccountInfoDataResponse {
    /** 账户请求入参 */
    accountInfo: AccountResponse
    /** 用户管辖的校区 */
    userLimitedSchools: GetAccountSchoolDto[]
    /** 账号管辖的校区 */
    accountLimitedSchoolIds?: number[]
  }

  /** 账户校区信息 */
  export interface GetAccountSchoolDto {
    /** 校区Id */
    id: number
    /** 校区名字 */
    schoolName?: string
    /** 校区地址 */
    schoolAdd?: string
    /** 校区类型 */
    schoolType?: string
    /** 排序 */
    orderId: number
    /** 是否隐藏 */
    hidden?: boolean
  }

  /** 确认收入列表返回值 */
  export interface GetAffirmIncomeListDataResponse {
    /** 总课时 */
    totalClassTimes: number
    /** 总学费 */
    totalAmount: number
    /** 描述缺失 */
    totalCount: number
    /** 描述缺失 */
    currentIndex: number
    /** 描述缺失 */
    itemCount: number
    /** 描述缺失 */
    list: AffirmIncomeModel[]
  }

  /** 确认收入 */
  export interface AffirmIncomeModel {
    /** Id */
    id: number
    /** 学员信息Id */
    stuInfoId: number
    /** 学员姓名 */
    stuName?: string
    /** 课程Id */
    lessonId: number
    /** 课程名字 */
    lessonName?: string
    /** 课程类别Id */
    lessonClassID: number
    /** 课程类别名字 */
    lessonClassName?: string
    /** 班级Id */
    classId: number
    /** 班级名字 */
    className?: string
    /** 校区Id */
    schoolId: number
    /** 校区名字 */
    schoolName?: string
    /** 收费模式 Enum 枚举类型 */
    chargeMode: 1 | 2 | 3
    /** 数量 */
    count: number
    /** 单位 */
    unit?: string
    /** 金额 */
    amount: number
    /** 来源Id(当前记录对应的订单或者课消记录ID) */
    sourceId: number
    /** 类型（课消收入、转、退、结课） */
    sourceName?: string
    /** 来源类型(课消收入OR非课消收入) */
    sourceType?: string
    /** 状态（已作废、正常） */
    status: number
    /** 时间（发生课消或者发生手续费日期） */
    dateTime?: string
    /** 班级模式 */
    classLessonMode: number
    /** 订单类型 */
    tranOrderType: number
    /** 订单Id(非课消收入时需要对此字段赋值) */
    tranOrderId: number
    /** 记上课Id */
    teachingLogId: number
  }

  /** 学员结课信息返回值 */
  export interface GetAffirmIncomeStuEndClassInfoResponse {
    /** 学员姓名 */
    stuName?: string
    /** 课程 */
    lessonName?: string
    /** 上课校区 */
    schoolName?: string
    /** 收费模式 */
    mode?: string
    /** 数量 */
    count: number
    /** 单位 */
    unit?: string
    /** 学费 */
    amount: number
    /** 结课日期 */
    endClassTime?: string
    /** 结课方式 */
    endClassMode?: string
    /** 操作人 */
    operator?: string
    /** 状态 */
    state?: string
  }

  /** 获取收支明细列表返回对象 */
  export interface GetAccountDetailListDataResponse {
    /** 到款状态 */
    isConfirm?: boolean
    /** AccountDetailId */
    id: number
    /** 收支明细类型：订单类/其它；  报名/复课时不需要此参数，服务端设置1（订单收支）； Enum 枚举类型 */
    type: 1 | 2 | 3
    /** 收银宝到款 */
    scpRealPayAmount: number
    /** 收支金额 */
    amount: number
    /** SchoolId */
    schoolId: number
    /** 经办时间 */
    occurTime?: string
    /** 创建人 */
    creator?: string
    /** 对方账户 */
    oppositeAccount?: string
    /** 流水单号 */
    orderNumber?: string
    /** 备注 */
    comment?: string
    /** 订单号 */
    tranOrderNumber: number
    /** 订单Id */
    tranOrderId: number
    /** 支付单号后8位 */
    simplePaymentMethodTradeNo?: string
    /** 付款时间 */
    paymentTime?: string
    /** AccountPaymentMethodId */
    accountPaymentMethodId: number
    /** 账户id； */
    accountId: number
    /** 订单上学员账户变动金额， */
    remain: number
    /** 订单状态 Enum 枚举类型 */
    tranOrderStatus: 1 | 2 | 3 | 4
    /** 收款方式类型 Enum 枚举类型 */
    accountdetailAccountPaymentmethodtype: 1 | 2 | 3
    /** 收支大类 */
    expenditureClass?: string
    /** 收支项目 */
    expenditureItem?: string
    /** 收支小类显示 */
    expenditureItemDisplay?: string
    /** 账户明细的交易类型(收入、支出、转账，转账暂不用) Enum 枚举类型 */
    accountDetailType: 1 | 2 | 3
    /** 大类是否删除 */
    isHiddenInClass?: boolean
    /** 子项是否删除 */
    isHiddenInItem?: boolean
    /** 订单类型 Enum 枚举类型 */
    tranOrderType: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
    /** 学员Id */
    stuInfoId: number
    /** 经办校区名称 */
    schoolName?: string
    /** 账户名称 */
    accountName?: string
    /** 账户是否允许编辑 */
    unableEdit?: boolean
    /** 账户类型 Enum 枚举类型 */
    accountType: 1 | 2 | 3 | 10 | 11 | 99
    /** 学员姓名 */
    stuName?: string
    /** 账户的收款方式名称 */
    paymentMethodName?: string
    /** 交账校区Id */
    settleSchoolId: number
    /** 交账账户Id */
    settleAccountId: number
    /** 交账日期 */
    settleDate?: string
    /** 是否存在买教材杂费交易：前端点击编辑时跳转逻辑判断使用 */
    isBuyTextbookOrIncidental?: boolean
    /** 是否存在教材杂费交易（包括退教材杂费交易）：前端点击编辑时跳转逻辑判断使用 */
    isTextbookOrIncidental?: boolean
    /** 是否是在线支付 */
    isOnlinePayment?: boolean
    /** 当前tranorder是否有用在线支付的收支明细 */
    tranOrderHasOnliePayment?: boolean
  }

  /** 支付明细列表数据统计 */
  export interface GetAccountDetailListStatisticsResponse {
    /** 总收入 */
    totalIncome: number
    /** 总支出 */
    totalCost: number
  }

  /** GetExpenditureItemByTypeResponse */
  export interface GetExpenditureItemByTypeResponse {
    /** ExpenditureItemId */
    id: number
    /** ExpenditureItem */
    name?: string
  }

  /** 描述缺失 */
  export interface GetItemDataResponse {
    /** 描述缺失 */
    items: Item[]
  }

  /** 描述缺失 */
  export interface GetAllItemResponse {
    /** 教材杂费id */
    itemId: number
    /** 教材杂费名 */
    itemName?: string
  }

  /** 描述缺失 */
  export interface SelectTeachingItemFetchDataDto {
    /** 教材杂费Id */
    id: number
    /** 教材杂费名称 */
    itemName?: string
    /** 所需积分 */
    creditPrice: number
  }

  /** 描述缺失 */
  export interface GetItemDataByLessonIdsResponse {
    /** 主键 */
    id: number
    /** 机构Id */
    orgId: number
    /** 类型：教材、杂费 */
    itemType?: string
    /** 名称 */
    itemName?: string
    /** 排序 */
    orderId: number
    /** 价格 */
    price: number
    /** 进价 */
    purchasePrice: number
    /** 教材/杂费状态，true：下架，false：正常 */
    hidden?: boolean
    /** 积分是否能兑换 */
    creditExchange?: boolean
    /** 兑换积分 */
    creditPrice: number
    /** 课程大类Id */
    lessonClassId: number
  }

  /** 描述缺失 */
  export interface GetLessonPackItemDataByLessonIdResponse {
    /** 主键 */
    id: number
    /** 机构Id */
    orgId: number
    /** 类型：教材、杂费 */
    itemType?: string
    /** 名称 */
    itemName?: string
    /** 排序 */
    orderId: number
    /** 价格 */
    price: number
    /** 进价 */
    purchasePrice: number
    /** 教材/杂费状态，true：下架，false：正常 */
    hidden?: boolean
    /** 积分是否能兑换 */
    creditExchange?: boolean
    /** 兑换积分 */
    creditPrice: number
    /** 课程大类Id */
    lessonClassId: number
    /** 课程相关的默认数量 */
    count: number
  }

  /** 课程详情 */
  export interface GetLessonDetailResponse {
    /** 描述缺失 */
    lessonModel: LessonModel
    /** 课程扩展属性信息 */
    lessonExtendInfo: LessonExtendDisplayInfo
    /** 教材价格 */
    lessonItemPackageDisplayInfos: LessonItemPackageDisplayInfo[]
  }

  /** 课程扩展属性信息 */
  export interface LessonExtendDisplayInfo {
    /** 学年名称 */
    academicYearName?: string
    /** 学季名称 */
    termTrimesterName?: string
    /** 学科名称 */
    disciplineName?: string
    /** 年级名称 */
    gradeName?: string
  }

  /** 教材价格 */
  export interface LessonItemPackageDisplayInfo {
    /** 价格 */
    price: number
    /** 描述缺失 */
    id: number
    /** 描述缺失 */
    itemId: number
    /** 描述缺失 */
    count: number
    /** 描述缺失 */
    lessonId: number
    /** 描述缺失 */
    orgId: number
    /** 描述缺失 */
    itemName?: string
  }

  /** 描述缺失 */
  export interface GetLessonClassDataResponse {
    /** 描述缺失 */
    id: number
    /** 描述缺失 */
    lessonClassName?: string
    /** 描述缺失 */
    orgId: number
    /** 描述缺失 */
    orderId: number
    /** 描述缺失 */
    hidden?: boolean
  }

  /** 课程查询结果 */
  export interface LessonQueryResponseItem {
    /** Id */
    lessonId: number
    /** name */
    lessonName?: string
  }

  /** SelectLessonInfoFetchData action 的出参 */
  export interface SelectLessonInfoFetchDataResponse {
    /** 校区id */
    schoolId: number
    /** 课程id */
    lessonId: number
    /** 课程名称 */
    lessonName?: string
    /** 班型 */
    lessonMode: number
    /** 课程类别 */
    lessonClassName?: string
    /** 课程的该校区下所有的学费标准集合 */
    feeStandards: FeeStandardDto[]
    /** 通过FeeMode筛选后的学费标准数据集合 */
    selectedFeeStandards: FeeStandardDto[]
    /** 开班数，该课程的全部开班中的班级数，不包含已结班的班级数，一对一的课程开班数不显示 */
    classCount: number
    /** 需要续费的数据，会关联出的StuFeeDoc的数据。默认为0。  一定要在传入了StuInfo的参数以后才会有值。 */
    stuFeeDocId: number
    /** 校区名 */
    schoolName?: string
  }

  /** GetLessonData 出参 */
  export interface GetLessonDataResponse {
    /** 课程id */
    id: number
    /** 机构id */
    orgId: number
    /** 课程类别 */
    lessonClassName?: string
    /** 课程名 */
    lessonName?: string
    /** 描述缺失 */
    orderId: number
    /** 是否下架 */
    hidden?: boolean
    /** 班课类型 */
    mode: number
    /** 创建时间 */
    createdTime?: string
    /** 备注 */
    remark?: string
    /** 创建人 */
    creator?: string
    /** 课程的该校区下学费标准集合 */
    feeStandards: FeeStandardDto[]
    /** 校区数 */
    schoolCount?: string
    /** 开班数 */
    openingClassCount?: string
    /** 课程表扩展-学年 */
    academicYear?: string
    /** 课程表扩展-学季 */
    termTrimester?: string
    /** 课程表扩展-学科 */
    discipline?: string
    /** 课程表扩展-年级 */
    grade2?: string
    /** 课程关联科目名 */
    subject?: string
  }

  /** 批量删除学员返回 */
  export interface BatchDeleteLessonResponse {
    /** 是否成功 */
    success: number
    /** 失败个数 */
    failed: number
  }

  /** 获取课程升期关系列表 */
  export interface GetLessonUpgradeRelationshipsResponse {
    /** 课程升期关系Id */
    lessonUpgradeConfigId: number
    /** 课程升期关系名称 */
    lessonUpgradeConfigName?: string
    /** 创建日期 */
    createdAt?: string
    /** 课程分期 */
    lessonPeriods: GetLessonPeriodDTO[]
  }

  /** 课程升期配置 */
  export interface GetLessonPeriodDTO {
    /** 课程分期Id */
    id: number
    /** 课程Id */
    lessonId: number
    /** 课程名称 */
    lessonName?: string
    /** 期数 */
    period: number
  }

  /** 获取课程升期关系 */
  export interface GetLessonUpgradeRelationshipResponse {
    /** 课程升期关系Id */
    lessonUpgradeConfigId: number
    /** 课程升期关系名称 */
    lessonUpgradeConfigName?: string
    /** 创建日期 */
    createdAt?: string
    /** 课程分期 */
    lessonPeriods: GetLessonPeriodDTO[]
  }

  /** 描述缺失 */
  export interface GetPreviousLessonsByLessonIdResponse {
    /** 上期课程 课程名 */
    lessonNames?: string[]
  }

  /** 描述缺失 */
  export interface GetSelectLessonClassDataResponse {
    /** 描述缺失 */
    id: number
    /** 课程类别名称 */
    lessonClassName?: string
  }

  /** 描述缺失 */
  export interface GetHrDocByFollowUpPeopleIdResponse {
    /** 员工id */
    hrDocId: number
    /** 员工名 */
    hrDocName?: string
  }

  /** 学员报名时所需的学员与员工关系数据及订单与员工关系数据 */
  export interface TranOrderFollowUpRelationResponse {
    /** 订单Id */
    tranOrderId: number
    /** 销售员id */
    hrDocId: number
    /** 员工类型 */
    followUpPeopleId: number
    /** 员工名称 */
    hrdocName?: string
    /** 跟进人员名称 */
    followUpPeopleName?: string
  }

  /** 订单日志数据 */
  export interface TranSnapshotDataResponse {
    /** 订单号 */
    tranOrderNumber?: string
    /** 学员名 */
    stuName?: string
    /** 订单类型 */
    type: number
    /** 描述缺失 */
    totalCount: number
    /** 描述缺失 */
    currentIndex: number
    /** 描述缺失 */
    itemCount: number
    /** 描述缺失 */
    list: TranSnapshotDto[]
  }

  /** 订单日志 */
  export interface TranSnapshotDto {
    /** Id */
    id: number
    /** 订单id */
    tranOrderId: number
    /** 机构id */
    orgId: number
    /** 创建时间 */
    createdTime?: string
    /** 应付总额，默认为0 */
    shouldPay: number
    /** 实付总额，默认0 */
    realPay: number
    /** 使用余额 */
    remain: number
    /** 创建人，默认为空。存放username */
    creator?: string
    /** 订单内容 */
    content?: string
    /** 收支明细日志 */
    payContent?: string
  }

  /** 新增积分订单、编辑积分订单Response */
  export interface CreditTranResponse {
    /** 订单Id */
    tranOrderIds?: number[]
  }

  /** 编辑积分订单返回积分订单Response */
  export interface GetCreditTranEditResponse {
    /** 订单号 */
    orderNumber: number
    /** 订单Id */
    tranOrderId: number
    /** 订单状态 */
    status: number
    /** 积分交易类型  1. 增加积分  2. 积分兑换  3. 减少积分 */
    creditTranType: number
    /** 使用积分 */
    amount: number
    /** 对内备注 */
    comment?: string
    /** 对外备注 */
    commentOuter?: string
    /** 学员信息ID */
    stuInfoId: number
    /** 学员姓名 */
    stuName?: string
    /** 未用积分 */
    unusedCredit: number
    /** 教材杂费ID */
    itemId: number
    /** 教材杂费数量 */
    itemNum: number
    /** 是否领用 */
    itemGot?: boolean
    /** 兑换教材名称 */
    itemName?: string
    /** 积分兑换价格 */
    creditPrice: number
    /** 销售员Id */
    hrDocId: number
    /** 销售员姓名 */
    hrDocName?: string
    /** 交易积分兑换交易能否编辑教材杂费 */
    canEditMiscInfo?: boolean
    /** 已退教材杂费是否归还 */
    itemReturn?: boolean
    /** 订单标签 */
    tags: TranTagDto[]
    /** 收支明细是否已确认到款 */
    isTranOrderConfirm?: boolean
    /** 经办校区Id */
    schoolId: number
    /** 经办校区名称 */
    schoolName?: string
    /** 创建日期 */
    createdTime?: string
    /** 经办人 */
    creator?: string
    /** 经办日期 */
    dealDate?: string
  }

  /** 订单标签 */
  export interface TranTagDto {
    /** 标签id */
    tagId: number
    /** 标签名称 */
    tagName?: string
  }

  /** 获取教材杂费编辑页面Response */
  export interface GetItemAndMiscEditResponse {
    /** 学员Id */
    stuInfoId: number
    /** 学员姓名 */
    stuName?: string
    /** 学员账户余额 */
    remain: number
    /** 教材杂项包 */
    itemInfos: ItemInfoDto[]
    /** 订单信息 */
    tranOrderInfo: TranOrderDto
    /** 是否使用余额 */
    isUseStuRemain?: boolean
    /** 对内备注 */
    comment?: string
    /** 对外备注 */
    commentOuter?: string
    /** 账户的收支明细 */
    accountInfo: AccountDetailDto[]
    /** 订单标签 */
    tags: TranTagDto[]
    /** 订单是否确认到款 */
    isTranOrderConfirm?: boolean
    /** 教材杂费交易是否为补费订单 */
    isRepairTran?: boolean
    /** 订单状态  1.待支付  2.已完成   3.已作废  4.订单已经失效 */
    status: number
    /** 过期时间 */
    expiryDate?: string
    /** 是否使用收银宝 */
    isSchoolPalPay?: boolean
    /** 订单能否编辑 */
    isTranOrderEdit?: boolean
  }

  /** 教材杂项信息 */
  export interface ItemInfoDto {
    /** 教材杂项ID */
    itemId: number
    /** 教材杂费名称 */
    itemName?: string
    /** 教材杂费交易Id */
    itemTranId: number
    /** 教材/杂费；  服务端会根据中文转化为相应的枚举类型； */
    itemType?: string
    /** 单价 */
    unitPrice: number
    /** 进价 */
    purchasePrice: number
    /** 购买数量,默认0 */
    count: number
    /** 教材已领,默认0 */
    itemGot?: boolean
    /** 教材杂费欠费金额 */
    arrearage: number
    /** 已退教材杂费数量 */
    returnedItemCount: number
    /** 可退教材杂费数量 */
    returnableItemCount: number
    /** 已归还教材杂费数量 */
    returnBackItemCount: number
    /** 能否编辑教材杂费 */
    canEditMiscInfo?: boolean
    /** 已退教材杂费是否归还 */
    itemReturn?: boolean
  }

  /** 订单信息 */
  export interface TranOrderDto {
    /** 主键 */
    id: number
    /** 订单类型  1.报名  2.账户余额变动  3.转课  4.停课  5.复课  6.结课  7.退费  8.教材杂费  9.积分  10.补费 */
    type: number
    /** 应付总额，默认为0；  批量升期/批量续费时，需要传此参数；  报名/复课编辑时，可以不传此参数，服务端会根据交易重新计算订单应收； */
    shouldPay: number
    /** 实付总额，默认0；  批量升期/批量续费时，不需要传此参数； */
    realPay: number
    /** 校区id,默认为0 */
    schoolId: number
    /** 校区名称 */
    schoolName?: string
    /** 经办日期 */
    dealDate?: string
    /** 学员账户变动金额，  使用为-，  增加为+；  批量升期/批量续费时，需要传此参数；  新增补费时，使用账户余额时为+，预存增加- */
    remain: number
    /** 学员积分变动数；  所有订单新增/编辑时不需要此参数，服务端根据实收*比率计算赋值；  批量升期/批量续费时，不需要传此参数； */
    credit: number
    /** 欠费金额(汇总订单相关的交易欠费金额)，  数值总是为+；  批量升期/批量续费时，需要传此参数； */
    arrearage: number
    /** 员工id,默认为0。销售员(业绩归属人) */
    hrDocId: number
    /** 销售员名称 */
    hrdocName?: string
    /** 销售来源；  报名新增/编辑才需要此参数，非必填；  其它订单不需要此参数； */
    salesSource?: string
    /** 订单号 */
    orderNumber: number
    /** 学员Id */
    stuInfoId: number
    /** 是否确认到款 */
    isConfirm?: boolean
    /** 订单状态 Enum 枚举类型 */
    status: 1 | 2 | 3 | 4
    /** 过期时间 */
    expiryDate?: string
    /** 创建日期 */
    createdTime?: string
    /** 创建人 */
    creator?: string
  }

  /** 账户的收支明细 */
  export interface AccountDetailDto {
    /** 主键 */
    id: number
    /** 账户id */
    accountId: number
    /** 账户名称 */
    accountName?: string
    /** 金额：有正负区分 */
    amount: number
    /** 备注 */
    comment?: string
    /** 对方账户 */
    oppositeAccount?: string
    /** 流水单号 */
    orderNumber?: string
    /** 收款方式 */
    accountPaymentMethodId: number
    /** 支付单号后8位 */
    simplePaymentMethodTradeNo?: string
    /** 账户类型 Enum 枚举类型 */
    accountType: 1 | 2 | 3 | 10 | 11 | 99
    /** 收款方式类型 Enum 枚举类型 */
    accountPaymentMethodType: 1 | 2 | 3
    /** 退费来源ID/复课  报名/复课新增编辑时不需要此参数； */
    sourceRemainId: number
  }

  /** 学员账户 */
  export interface GetStuInfoAccountTranListResponse {
    /** 描述缺失 */
    tranOrderId: number
    /** 描述缺失 */
    orderNumber: number
    /** 描述缺失 */
    stuInfoId: number
    /** 描述缺失 */
    schoolId: number
    /** 订单类型  1：报名  2：账户余额变动  3：转课  4：停课  5：复课  6：结课  7：退费  8：教材杂费  9：积分  10：补费 */
    tranOrderType: number
    /** 余额交易类型  1. 预存余额  2. 学费转余额  3. 退余额  4. 使用余额 */
    tranType: number
    /** 描述缺失 */
    amount: number
    /** 描述缺失 */
    commentOuter?: string
    /** 描述缺失 */
    comment?: string
    /** 描述缺失 */
    schoolName?: string
    /** 描述缺失 */
    creator?: string
    /** 描述缺失 */
    createdTime?: string
    /** 是否报读多科 */
    hasMultiLessonEnroll?: boolean
  }

  /** 学员积分 */
  export interface GetStuInfoCreditListResponse {
    /** 描述缺失 */
    tranOrderId: number
    /** 描述缺失 */
    orderNumber: number
    /** 描述缺失 */
    stuInfoId: number
    /** 订单类型  1：报名  2：账户余额变动  3：转课  4：停课  5：复课  6：结课  7：退费  8：教材杂费  9：积分  10：补费 */
    tranOrderType: number
    /** 余额交易类型  1. 预存余额  2. 学费转余额  3. 退余额  4. 使用余额 */
    tranType: number
    /** 描述缺失 */
    amount: number
    /** 描述缺失 */
    commentOuter?: string
    /** 描述缺失 */
    comment?: string
    /** 描述缺失 */
    schoolName?: string
    /** 描述缺失 */
    creator?: string
    /** 描述缺失 */
    createdTime?: string
  }

  /** 获取营销活动 response */
  export interface GetMarketingSolutionResponse {
    /** 当前活动总数 */
    totalCount: number
    /** 当前页码 */
    currentIndex: number
    /** 数量 */
    itemCount: number
    /** 营销活动列表数据 */
    list: MarketingsolutionBo[]
  }

  /** 营销活动 */
  export interface MarketingsolutionBo {
    /** 营销方案Id(主键) */
    marketingsolutionId: number
    /** 营销方案名称 */
    name?: string
    /** 营销方案类型 1.满折 2.满减 3.满赠课时 = ['1', '2', '3'] */
    promotiontype: number
    /** 营销方案状态  1.上架  2.下架=['1','2'] */
    status: number
    /** 营销方案开始时间 */
    starttime?: string
    /** 营销方案结束时间 */
    endtime?: string
  }

  /** 描述缺失 */
  export interface GetTranOrderListDataResponse {
    /** Id；  订单新增时不需要此参数；  订单编辑时需要此参数； */
    id: number
    /** 机构Id */
    orgId: number
    /** 订单号(机构内自增、唯一)；  所有订单新增时不需要此参数，服务端设置；  所有订单编辑时不需要此参数，此数据值不更新； */
    orderNumber: number
    /** 订单类型；  报名新增时不需要此参数，服务端设置1（报名）；  复课新增时不需要此参数，服务端设置5（复课）；  所有订单编辑时不需要此参数，此数据值不更新； */
    type: number
    /** 是否删除；  报名/复课新增时不需要此参数，服务端设置false；  所有订单编辑时不需要此参数，此数据值不更新； */
    deleted?: boolean
    /** 创建时间；  所有订单新增时不需要此参数，服务端设置当前时间；  所有订单编辑时不需要此参数，此数据值不更新； */
    createdTime?: string
    /** 应付总额，默认为0；  批量升期/批量续费时，需要传此参数；  报名/复课编辑时，可以不传此参数，服务端会根据交易重新计算订单应收； */
    shouldPay: number
    /** 实付总额，默认0；  批量升期/批量续费时，不需要传此参数； */
    realPay: number
    /** 现金/刷卡/转账/支票/网络；  字段已经弃用； */
    payMethod?: string
    /** 员工id,默认为0。销售员(业绩归属人)  批量升期/批量续费时，需要传此参数 */
    hrDocId: number
    /** 校区id,默认为0 */
    schoolId: number
    /** 创建人，默认为空。存放username；  所有订单新增时不需要此参数，服务端设置当前操作人；  所有订单编辑时不需要此参数，此数据值不更新； */
    creator?: string
    /** 修改人，默认为空。存放username  所有订单新增/编辑时不需要此参数，服务端设置当前操作人； */
    modifier?: string
    /** 修改时间；  所有订单新增/编辑时不需要此参数，服务端设置当前时间； */
    modifiedTime?: string
    /** 销售来源；  报名新增/编辑才需要此参数，非必填；  其它订单不需要此参数； */
    salesSource?: string
    /** 经办日期 */
    dealDate?: string
    /** 学员Id,默认为0(教材杂费零售的订单可能会没有StuInfoId)；  所有订单新增时不需要此参数，服务端设置为当前学员id；  所有订单编辑时不需要此参数，此数据值不更新； */
    stuInfoId: number
    /** 订单最后的快照Id；  所有订单都不需要此参数，服务端设置为最新的快照id； */
    lastSnapshotId: number
    /** 学员账户变动金额，  使用为-，  增加为+；  批量升期/批量续费时，需要传此参数；  新增补费时，使用账户余额时为+，预存增加- */
    remain: number
    /** 学员积分变动数；  所有订单新增/编辑时不需要此参数，服务端根据实收*比率计算赋值；  批量升期/批量续费时，不需要传此参数； */
    credit: number
    /** 欠费金额(汇总订单相关的交易欠费金额)，  数值总是为+；  批量升期/批量续费时，需要传此参数； */
    arrearage: number
    /** 订单状态 */
    status: number
    /** 订单中的收支明细是否全部已确认到款（冗余）  复杂列表优化项目加上 */
    hasConfirmedDetail?: boolean
    /** 订单来源 */
    sourceType: number
    /** 学员姓名 */
    stuName?: string
    /** 经办校区名 */
    schoolName?: string
    /** 销售员姓名 */
    salesman?: string
    /** 交易内容 */
    content?: string
    /** 是否有退教材交易 */
    hasBuyTextbookOrIncidental?: boolean
    /** 描述缺失 */
    followUpPeopleDetail: FollowUpPeopleDto[]
    /** 是否报读多科 */
    hasMultiLessonEnroll?: boolean
    /** 对内备注 */
    comment?: string
    /** 对外备注 */
    commentOuter?: string
    /** 订单tag */
    tranOrderTags?: string
    /** 过期时间 */
    expiryDate?: string
    /** 是否用线上支付 */
    isOnlinePayment?: boolean
    /** 是否有教材杂费交易（包括退教材退杂费） */
    hasTextbookOrIncidental?: boolean
    /** 是否退费（包括 教材杂费退费，余额交易退费 学费退费） */
    isReturn?: boolean
  }

  /** 描述缺失 */
  export interface FollowUpPeopleDto {
    /** 描述缺失 */
    followUpPeopleName?: string
    /** 描述缺失 */
    hrDocName?: string
    /** 描述缺失 */
    hrDocId: number
    /** 描述缺失 */
    followUpPeopleId: number
  }

  /** 描述缺失 */
  export interface GetTranOrderListDataStatisticsResponse {
    /** 应收总计 */
    shouldPayTotal: number
    /** 实收总计 */
    realPayTotal: number
    /** 余额变动总计 */
    remainTotal: number
    /** 积分变动总计 */
    creditTotal: number
    /** 欠费合计 */
    arrearageToal: number
  }

  /** 描述缺失 */
  export interface PrintMyDayResponse {
    /** 查询时间 */
    beginDate?: string
    /** 打印时间 */
    printDate?: string
    /** 校区统计页面类型（我的今日、校区今日） */
    billDisplayType: number
    /** 费用基本信息 */
    fee: BillInfo
    /** 费用基本信息 */
    itemBook: BillInfo
    /** 费用基本信息 */
    itemExtras: BillInfo
    /** 费用基本信息 */
    amount: BillInfo
    /** 费用基本信息 */
    total: BillInfo
    /** 账户收支明细表 */
    accountDetailed: BillInfo[]
    /** 机构名称 */
    orgName?: string
    /** 机构后缀名 */
    orgEName?: string
  }

  /** 费用基本信息 */
  export interface BillInfo {
    /** 描述缺失 */
    title?: string
    /** 收入 */
    income: number
    /** 支出 */
    expenditure: number
    /** 总计 */
    total: number
  }

  /** 描述缺失 */
  export interface GetTranOrderFeeTranCommentListResponse {
    /** 课程名称 */
    lessonName?: string
    /** 班级名称 */
    className?: string
    /** 对内备注 */
    comment?: string
    /** 对外备注（校宝家交易详情页显示） */
    commentOuter?: string
  }

  /** 听课证 */
  export interface PrintClassCardDetailResponse {
    /** 停课许可证 */
    classPermitComment?: string
    /** 描述缺失 */
    printClassCardDetails: PrintClassCardDetailDto[]
  }

  /** 描述缺失 */
  export interface PrintClassCardDetailDto {
    /** 学员姓名 */
    stuName?: string
    /** 档案号 */
    stuFileNumber?: string
    /** 课程名称 */
    lessonName?: string
    /** 课程类型（1：班课，2：一对一） */
    lessonMode: number
    /** 校区名称 */
    schoolName?: string
    /** 学校地址 */
    schoolAdd?: string
    /** 学校电话 */
    schoolTel?: string
    /** 收费模式：1：按课时、2：按时间、3：按期 */
    feeMode: number
    /** 按课时：学费账户总课时数 */
    totalClassTimes: number
    /** 学费账户的开始时间 */
    beginDate?: string
    /** 学费账户的有效期时间 */
    expiryDate?: string
    /** 班级信息 */
    permitClassInfoItems: PermitClassInfoItemDto[]
  }

  /** 描述缺失 */
  export interface PermitClassInfoItemDto {
    /** 班级名称 */
    className?: string
    /** 教室名称 */
    classroomName?: string
    /** 开始时间 */
    openDate?: string
    /** 结束时间 */
    closeDate?: string
    /** 班级上课时间段 */
    classPeriodItems: ClassPeriodItemDto[]
  }

  /** 描述缺失 */
  export interface ClassPeriodItemDto {
    /** 重复类型 Enum 枚举类型 */
    repeatType: 1 | 2 | 3 | 4
    /** 重复间隔 */
    repeatSpan: number
    /** 上课时段开始 */
    startTime: number
    /** 上课时段结束 */
    endTime: number
    /** 上课时段开始 Enum 枚举类型 */
    weekDays: 1 | 2 | 4 | 8 | 16 | 32 | 64
  }

  /** 根据学员id获取在读课程信息 */
  export interface GetStudyingLessonInfoByStuInfoIdResponse {
    /** 课程打包信息集合 */
    lessonInfoPackages: LessonInfoPackageDto[]
  }

  /** 课程打包信息 */
  export interface LessonInfoPackageDto {
    /** 在读课程id */
    lessonId: number
    /** 在读课程所属校区id */
    schoolId: number
    /** 收费模式 Enum 枚举类型 */
    mode: 1 | 2 | 3
    /** 下期课程 */
    nextLessonId: number
    /** 报读课程下开始和结束时间集合 */
    studyingLessonDates: StudyingLessonDateDto[]
  }

  /** 报读课程下开始和结束时间 */
  export interface StudyingLessonDateDto {
    /** 上课起算日期 */
    beginDate?: string
    /** 过期时间 */
    expiryDate?: string
  }

  /** 描述缺失 */
  export interface GetRepairTranByArrearageTranOrderIdResponse {
    /** 订单Id */
    tranOrderId: number
    /** 订单号 */
    tranOrderNo?: string
    /** 课程名；  教材杂费欠费项目上线后，此字段弃用，使用ArrearageItem代替； */
    lessonName?: string
    /** 欠费项目名称(课程名或教材杂费名) */
    arrearageItem?: string
    /** 补费金额 */
    repairAmount: number
    /** 经办人 */
    creator?: string
    /** 经办时间 */
    dealTime?: string
    /** 经办校区名 */
    schoolName?: string
    /** 补费项目类型；  1.学费（课程）；  2.教材；  3.杂费； */
    arrearageTranItemType: number
  }

  /** ERP校宝收银订单二维码信息实体 */
  export interface SpcPayQrCodeDto {
    /** 收支明细id */
    id: number
    /** 学员id */
    stuInfoId: number
    /** 学员姓名 */
    stuName?: string
    /** 应收金额 */
    amount: number
    /** 校宝云支付实收金额 */
    scpRealPayAmount: number
    /** 是否已支付 */
    isPayed?: boolean
    /** 订单详情页URL */
    url?: string
  }

  /** 云支付平台支付结果信息 */
  export interface ScpPaymentResultResponseData {
    /** 状态 Enum 枚举类型 */
    scpPaymentResultStatus: 0 | 1 | -1
    /** 实际支付金额 */
    scpRealPayAmount: number
  }

  /** 支付组件的账户和明细使用的dto */
  export interface GetAccountDetailListByTranOrderIdResponse {
    /** 账户id */
    accountId: number
    /** 账户名称 */
    accountName?: string
    /** 是否启用 */
    enable?: boolean
    /** 是否显示对方账户 */
    showOppositeAccount?: boolean
    /** 是否显示流水单号 */
    showOrderNumber?: boolean
    /** 是否显示找零 */
    showCalcChange?: boolean
    /** 是否是系统使用账户 */
    sysUseAccount?: boolean
    /** 账户类型 Enum 枚举类型 */
    type: 1 | 2 | 3 | 10 | 11 | 99
    /** 收支明细id */
    accountDetailId: number
    /** 金额 */
    amount: number
    /** 对方账号 */
    oppositeAccount?: string
    /** 流水单号 */
    orderNumber?: string
    /** 经办时间 */
    occurTime?: string
    /** 订单id */
    tranOrderId: number
    /** 订单编号 */
    tranOrderNumber: number
    /** 是否确认到款 */
    isConfirm?: boolean
    /** 已退金额合计 */
    totalReturn: number
    /** 实退金额 */
    realReturn: number
    /** 有退费交易 */
    hasReturnTran?: boolean
    /** 退费来源ID */
    sourceRemainId: number
    /** 原交易金额（报名收入） */
    sourceAmount: number
    /** 描述缺失 */
    accountDetailIds?: string
    /** 描述缺失 */
    createdTime?: string
    /** 账户收款方式Id */
    accountPaymentMethodId: number
    /** 支付单号后8位 */
    simplePaymentMethodTradeNo?: string
  }

  /** 账户的收款方式Dto */
  export interface GetAccountPaymentMethodsResponse {
    /** 账户Id */
    accountId: number
    /** 收款方式Id */
    accountPaymentMethodId: number
    /** 收款方式名称 */
    paymentMethodName?: string
    /** 收款方式类型 Enum 枚举类型 */
    accountPaymentMethodType: 1 | 2 | 3
    /** 是否显示支付单号后8位输入框 */
    isShowSimplePaymentMethodTradeNo?: boolean
  }

  /** 订单详情 */
  export interface TranOrderDetail {
    /** 订单标签列表 */
    tagData: TranOrderTagDto[]
    /** 是否是由校宝秀创建  不可编辑 */
    isFromSchoolPalShow?: boolean
    /** 描述缺失 */
    enrollInfo: EnrollDto
    /** 机构是否允许教材杂费欠费 */
    isAllowItemArrear?: boolean
    /** 订单是否是校宝钱包收费 */
    isTranOrderSchoolPalPayWallet?: boolean
    /** 是否是收银宝支付 */
    isSchoolPalPay?: boolean
    /** 是否有补费交易 */
    hasRepairTran?: boolean
  }

  /** 订单标签 */
  export interface TranOrderTagDto {
    /** 标签id */
    tagId: number
    /** 标签名称 */
    tagName?: string
  }

  /** 描述缺失 */
  export interface EnrollDto {
    /** 订单信息 */
    tranOrder: TranOrderDto
    /** 学员信息 */
    stuInfo: StuInfo
    /** 报名交易及教材杂费交易 */
    enrollInfo: EnrollTranDto[]
    /** 余额交易值 */
    accountTranAmount: number
    /** 积分交易值 */
    creditTranAmount: number
    /** 售前人员关系 */
    followUpPeopleDetail: FollowUpPeopleDetail[]
  }

  /** 学员信息 */
  export interface StuInfo {
    /** 学员信息ID；  报名新增时，新增学员不需要此参数，选择已有学员需要此参数；  报名/复课编辑，必需要此属性，其它属性都不需要；  批量升期/批量续费时，需要此参数，其他属性不需要 */
    id: number
    /** 机构Id */
    orgId: number
    /** 学生姓名 */
    stuName?: string
    /** 性别 */
    sex?: string
    /** 生日 */
    birthDate?: string
    /** 主要联系电话 */
    motherTel?: string
    /** 次要联系电话 */
    fatherTel?: string
    /** 其他联系电话 */
    otherTel?: string
    /** 仅咨询/已报名；  报名新增时不需要传此参数，服务端重置此值为true（已报名）； */
    enrolled?: boolean
    /** 磁卡ID */
    cardId?: string
    /** 公立学校 */
    pubSchoolName?: string
    /** 学校年级班级 */
    pubSchoolGradeClass?: string
    /** 家庭地址 */
    homeAdd?: string
    /** 其他信息 */
    comment?: string
    /** 学员录入系统的业务时间，根据每个用户的不同情况，在录入时允许被修改；  报名新增时不需要传此参数； */
    addDate?: string
    /** 学员录入系统的真实时间，自动生成，不可被修改；  报名新增时不需要传此参数； */
    createdAt?: string
    /** 销售员更新时间；  报名新增时不需要传此参数； */
    salesmanEditDate?: string
    /** 备用字段1；  暂未使用； */
    cust1?: string
    /** 备用字段2；  暂未使用； */
    cust2?: string
    /** 备用字段3；  暂未使用； */
    cust3?: string
    /** 备用字段4；  暂未使用； */
    cust4?: string
    /** 备用字段5；  暂未使用； */
    cust5?: string
    /** 小头像地址，非必填 */
    headImgUrl156?: string
    /** 大头像地址，非必填 */
    headImgUrl512?: string
    /** 学员账户：余额；  报名新增时不需要传此参数； */
    remain: number
    /** 学员账户：杂费(已用钱，用于购买教材杂项)；  报名新增时不需要传此参数； */
    misc: number
    /** 学员账户：已用积分；  报名新增时不需要传此参数； */
    usedCredit: number
    /** 学员账户：未用积分；  报名新增时不需要传此参数； */
    unusedCredit: number
    /** 所属校区Id；  报名新增时不需要传此参数，新建学员服务端设置为订单的经办校区； */
    schoolId: number
    /** 咨询中录入的微信号 */
    weChatId?: string
    /** 跟进状态：1：待跟进、2：跟进中、3：已成交、4：已失效、5：已到访、6：已邀约、7：已试听；  报名新增时不需要传此参数，服务端设置为3（已成交）； */
    followUpState: number
    /** 编辑时间；  报名新增时不需要传此参数； */
    editDate?: string
    /** 是否新线索：0旧 false，1新 true；  报名新增时不需要传此参数； */
    isActive?: boolean
    /** 最近参与活动时间；  报名新增时不需要传此参数； */
    recentInteractiveAt?: string
    /** 行政区域编码；  报名新增时不需要传此参数； */
    districtId: number
    /** 销售员 */
    salesman?: string
    /** 销售员员工Id；  报名新增时不需要传此参数； */
    salesManHrDocId: number
    /** 销售来源；  报名新增时不需要传此参数； */
    salesway?: string
    /** 意向度；  报名新增时不需要传此参数，新建学员服务端设置为“？”； */
    interest?: string
    /** 标记；  报名新增时不需要传此参数； */
    marker?: string
    /** 归属(经办)校区Id；  报名新增时不需要传此参数，服务端设置为订单经办校区； */
    ascriptionSchoolId: number
    /** 员工id,默认0。销售员；  报名新增时不需要传此参数； */
    hrDocId: number
    /** 咨询方式：来电/来访/网络/其他；  报名新增时不需要传此参数； */
    method?: string
    /** 咨询课程ID；  报名新增时不需要传此参数； */
    lessonClassId: number
    /** 咨询课程2ID；  报名新增时不需要传此参数； */
    secondLessonClassId: number
    /** 咨询课程3ID；  报名新增时不需要传此参数； */
    thirdLessonClassId: number
    /** 经办人；  报名新增时不需要传此参数； */
    user?: string
    /** 渠道Id */
    channelId: number
    /** 学生来源标记  901：校宝9校宝秀(微店)，  1001：校宝10校宝秀(微店),  1002：移动咨询本快速新增,  1003：pc咨询本新增咨询,  1004：pc咨询本批量导入,  1005：
     * 办理中心新生报名,  1006：批量导入学员,  1007：校宝家系统报名；  1008：微信作业小程序  报名新增时不需要传此参数； */
    registerWay: number
    /** 欠费金额(汇总学员相关的交易欠费金额)；  报名新增时不需要传此参数； */
    arrearage: number
    /** MotherTel字段所属关系  0 无  1 母亲  5 父亲  9 本人  13 其他 */
    motherTelRelationship: number
    /** fatherTel字段所属关系 */
    fatherTelRelationship: number
    /** otherTel字段所属关系 */
    otherTelRelationship: number
    /** 学费档案数量 */
    stuFeeDocCount: number
  }

  /** 描述缺失 */
  export interface EnrollTranDto {
    /** 课程id */
    lessonId: number
    /** 课程名 */
    lessonName?: string
    /** 收费模式  1:按课时  2:按时间  3:按期 Enum 枚举类型 */
    feeMode: 1 | 2 | 3
    /** 课程类型  1. 班课  2. 一对一 Enum 枚举类型 */
    lessonMode: 1 | 2
    /** 校区id */
    schoolId: number
    /** 学费账户状态  1. 在读  2. 转出  3. 退费  4. 停课  5. 结课  6. 复课 Enum 枚举类型 */
    status: 1 | 2 | 3 | 4 | 5 | 6 | 7 | -1
    /** 学费交易 */
    feeTran: FeeTranDto
    /** 教材杂费交易对象集合 */
    itemTran: ItemTranDto[]
    /** 描述缺失 */
    classPeriod?: string
    /** 报读课程校区名称 */
    schoolName?: string
    /** 订单详情每笔交易中包含的营销活动优惠信息 */
    tranMarketing: TranOrderMarketingDetailDto
    /** 交易是否可删除 */
    isFeetranCanDel?: boolean
    /** 报名类型是否可修改 */
    isEnrollTypeEdit?: boolean
    /** 班级名称 */
    className?: string
    /** 每次上课消耗课时 */
    unitClassTimes: number
    /** 一对一班级教师消耗课时 */
    teacherClasstime: number
    /** 教师名称 */
    teacherName?: string
    /** 座位行数 */
    row: number
    /** 座位列数 */
    column: number
    /** 按时间且有转出/退费交易 */
    isByTimeAndHasTransforTran?: boolean
  }

  /** 跟进人信息 */
  export interface FollowUpPeopleDetail {
    /** 跟进人类型名称 */
    followUpPeopleName?: string
    /** 销售员姓名 */
    hrDocName?: string
    /** 销售员id */
    hrDocId: number
    /** 员工类型 */
    followUpPeopleId: number
  }

  /** 学费交易 */
  export interface FeeTranDto {
    /** 学费交易id */
    id: number
    /** 学费交易类型  1. 按期缴费  2. 按课时缴费  3. 按时间缴费  4. 转课转入  5.赠送课时 ^ v1.1 营销中心项目扩展含义 */
    tranType: number
    /** 学员id,默认0 */
    stuInfoId: number
    /** 单价,默认0  乐高项目1.0修改含义，冗余学费标准中的UnitPrice */
    unitPrice: number
    /** 学费单位  1. 元/期  2. 元/课时  3. 元/天  4. 元/月  5. 元/季  6. 元/年  乐高项目1.0修改含义，冗余学费标准中的Unit */
    unit: number
    /** 数量,默认0  乐高项目1.0修改含义，冗余学费标准中的Count */
    count: number
    /** 优惠json,默认空 */
    promotion?: string
    /** 优惠金额,默认0 */
    promotionAmount: number
    /** 原价格,默认0 */
    originAmount: number
    /** 实付价格,默认0 */
    realAmount: number
    /** 实付单价,默认0 */
    realUnitPrice: number
    /** 学费账户Id,默认0 */
    stuFeeDocId: number
    /** 学生档案id。默认0 */
    stuDocId: number
    /** 订单Id,默认0 */
    tranOrderId: number
    /** 开始时间 */
    beginDate?: string
    /** 过期时间 */
    expiryDate?: string
    /** 对内备注 */
    comment?: string
    /** 对外备注（校宝家交易详情页显示） */
    commentOuter?: string
    /** 欠费金额 */
    arrearage: number
    /** 实收金额 */
    actualIncome: number
    /** 未用课时（剩余可用课时）。冗余字段。 */
    unUseClassTimes: number
    /** 报名类型  0 新报  1 续费  2 无 */
    enrollType: number
    /** 校区id,默认为0 */
    schoolId: number
    /** 课程id,默认为0 */
    lessonId: number
    /** 班级id,默认为0 */
    classId: number
    /** 收费模式(冗余)  乐高项目1.0增加 Enum 枚举类型 */
    feeMode: 1 | 2 | 3
    /** 班级类型(冗余)  乐高项目1.0增加 Enum 枚举类型 */
    classMode: 1 | 2
    /** 购买sku数量   乐高项目1.0增加 */
    feeStandardCount: number
    /** sku价格(冗余)  乐高项目1.0增加 */
    price: number
    /** FeeStandardId  乐高项目1.0增加 */
    feeStandardId: number
    /** 课程大类  乐高项目二期增加 */
    lessonClassName?: string
    /** 校区名称  乐高项目二期增加 */
    schoolName?: string
    /** 课程名称  乐高项目二期增加 */
    lessonName?: string
    /** 班级名称  乐高项目二期增加 */
    className?: string
  }

  /** 教材杂费扩展对象 */
  export interface ItemTranDto {
    /** 教材杂费名称 */
    itemName?: string
    /** 教材杂费分类 */
    itemType?: string
    /** 教材对应课程名字 */
    lessonName?: string
    /** 已退教材杂费数量 */
    returnedItemCount: number
    /** 已归还教材杂费数量 */
    returnBackItemCount: number
    /** 是否有关联的退教材交易 */
    hasReturnItemTran?: boolean
    /** 教材在经办校区的库存数 */
    number: number
    /** 描述缺失 */
    id: number
    /** 教材杂项交易类型  1 支付杂费  2 购买教材  3 退教材  4 退杂费 Enum 枚举类型 */
    tranType: 1 | 2 | 3 | 4
    /** 学员id */
    stuInfoId: number
    /** 单价 */
    unitPrice: number
    /** 数量 */
    count: number
    /** 教材杂费项目上线后，此参数含义变更为应收（2017-09-21添加备注） */
    realAmount: number
    /** 进价 */
    purchasePrice: number
    /** 教材杂项id */
    itemId: number
    /** 学费账户id */
    stuFeeDocId: number
    /** 教材是否已领 */
    itemGot?: boolean
    /** 订单id */
    tranOrderId: number
    /** 机构id */
    orgId: number
    /** 对内备注 */
    comment?: string
    /** 对外备注 */
    commentOuter?: string
    /** 归还时间 */
    itemGotTime?: string
    /** 原单价，即教材杂费的售价 */
    originalUnitPrice: number
    /** 欠费金额 */
    arrearage: number
    /** 实收金额 */
    actualIncome: number
    /** 购买教材杂费交易，当前交易为退教材杂费才用的到 */
    purchaseItemTranId: number
    /** 校区id,默认为0 */
    schoolId: number
    /** 课程id,默认为0 */
    lessonId: number
  }

  /** 订单详情每笔交易中包含的营销活动优惠信息 */
  export interface TranOrderMarketingDetailDto {
    /** 订单详情页活动优惠内容 */
    marketingComment?: string
    /** 订单回执页活动优惠内容 */
    shortMarketingComment?: string
    /** 营销活动优惠的金额 */
    marketingPromotionAmount: number
    /** 营销活动类型 0: 非赠送课时；1: 赠送课时类型 */
    promotionType: number
  }

  /** 学费退费详情 */
  export interface EditRetrunFeeTranDetailDto {
    /** 退费交易id */
    transforTranId: number
    /** 交易类型  转课转出=1  办理退费=2  部分退费=3  办理停课=4  办理结课=5  转课手续费=6  退费手续费=7  停课手续费=8  结课收入=9  部分转出=10 Enum 枚举类型 */
    tranType: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
    /** 退费课时 */
    classtimes: number
    /** 退费时长（按时间购买） */
    times: number
    /** 退费金额 */
    amount: number
    /** 报名交易id */
    feetranId: number
    /** 数量,默认0 */
    count: number
    /** 购买sku数量   乐高项目1.0增加 */
    feeStandardCount: number
    /** 原价格,默认0 */
    originAmount: number
    /** 优惠json,默认空;用于服务端计算； */
    promotion?: string
    /** 优惠金额,默认0 */
    promotionAmount: number
    /** 实际应付价格,默认0 */
    realAmount: number
    /** 实收金额（交易实收+补费） */
    actualIncome: number
    /** 欠费数据 */
    arrearage: number
    /** 单价,默认0 */
    unitPrice: number
    /** 真实的单价（每次记上课的单价） */
    realUnitPrice: number
    /** 未用课时（剩余可用课时）。冗余字段。 */
    unUseClassTimes: number
    /** 已退学费 */
    returnedTuition: number
    /** 经办日期 */
    dealDate?: string
    /** 订单号(机构内自增、唯一) */
    orderNumber: number
    /** 学费来源，默认0。1:交易，2:导入。  部分退费，使用导入金额退费时，此处才为2。 Enum 枚举类型 */
    tuitionSource: 1 | 2
    /** 课消金额 */
    cost: number
    /** 营销活动优惠内容 */
    marketingComment?: string
    /** 营销活动优惠金额 */
    tranMarketingPromotionAmount: number
    /** 最大可退金额（计算好后给前端） */
    maxReturnAmount: number
    /** 已退课时（计算好后给前端） */
    returnedClassTimes: number
    /** 开始时间 */
    beginDate?: string
    /** 失效时间 */
    expiryDate?: string
    /** 手续费交易 */
    procedureTranId: number
    /** 手续费课时,默认0 */
    procedureClassTimes: number
    /** 手续费金额,默认0 */
    procedureAmount: number
  }

  /** 交易扩展信息 */
  export interface FeeTranExtrasDto {
    /** 每次上课消耗课时 【学生课时】 */
    unitClassTimes: number
    /** 每次上课消耗课时 【教师课时】 */
    teacherClasstime: number
    /** 教师对应的HrDocName */
    hrDocName?: string
    /** 座位行数 */
    row: number
    /** 座位列数 */
    column: number
  }

  /** 新建订单对象 */
  export interface TransferTranOrderDto {
    /** 主键 */
    id: number
    /** 学生姓名 */
    stuName?: string
    /** 主要联系电话 */
    mainTel?: string
    /** 订单号(机构内自增、唯一)； */
    orderNumber: number
    /** 交易类型  转课转出=1  办理退费=2  部分退费=3  办理停课=4  办理结课=5  转课手续费=6  退费手续费=7  停课手续费=8  结课收入=9 */
    type: number
    /** 应付总额，默认为0； */
    shouldPay: number
    /** 实付总额，默认0； */
    realPay: number
    /** 校区id,默认为0 */
    schoolId: number
    /** 校区名称 */
    schoolName?: string
    /** 经办日期 */
    dealDate?: string
    /** 学员账户变动金额，  使用为-，  增加为+； */
    remain: number
    /** 学员积分变动数； */
    credit: number
    /** 欠费金额(汇总订单相关的交易欠费金额)，  数值总是为+； */
    arrearage: number
    /** 员工姓名 */
    hrdocName?: string
    /** 员工id,默认为0。销售员(业绩归属人) */
    hrDocId?: string
    /** 订单状态 Enum 枚举类型 */
    status: 1 | 2 | 3 | 4
    /** 过期时间 */
    expiryDate?: string
    /** 创建时间 */
    createdTime?: string
    /** 创建人，默认为空。存放username； */
    creator?: string
  }

  /** 批量转出课程班级及学员信息 */
  export interface BatchTransforOutLessonAndStuResponse {
    /** 课程id */
    lessonId: number
    /** 校区id */
    schoolId: number
    /** 班级id */
    classId: number
    /** 课程名称 */
    lessonName?: string
    /** 班级名称 */
    className?: string
    /** 是否开启原路退费 */
    isTrackRemain?: boolean
    /** 转出学员信息集合 */
    transforOutStus: BatchTransforOutStuDto[]
    /** 转出课程sku */
    transForLessonSku: BatchLessonSkuDto[]
  }

  /** 转出学员信息 */
  export interface BatchTransforOutStuDto {
    /** 学费账户对应的校区id */
    schoolId: number
    /** 学员id */
    stuInfoId: number
    /** 学员档案id */
    stuDocId: number
    /** 学费账户id */
    stuFeeDocId: number
    /** 学员信息 */
    stuName?: string
    /** 学生档案账户：未用学费 */
    tuition: number
    /** 学生档案账户：未用课时/天数 */
    classTimes: number
    /** 总课时/天数 */
    totalClassTimes: number
    /** 总学费 */
    totalTuition: number
    /** 课时/按时间到期时间 */
    expiryDate?: string
    /** 学员账户欠费金额 */
    arrearage: number
    /** 学员余额 */
    remain: number
    /** 收费模式  1:按课时  2:按时间  3:按期 Enum 枚举类型 */
    feeMode: 1 | 2 | 3
  }

  /** 课程sku */
  export interface BatchLessonSkuDto {
    /** 学员studocid */
    id: number
    /** 收费模式  1:按课时  2:按时间  3:按期 Enum 枚举类型 */
    mode: 1 | 2 | 3
    /** 单价 */
    unitPrice: number
    /** 单位 Enum 枚举类型 */
    unit: 2 | 3 | 4 | 5 | 6 | 7
    /** 描述信息 */
    feeDescription?: string
    /** 校区Id */
    schoolId: number
  }

  /** 欠费交易 */
  export interface GetArrearageTranResponse {
    /** 订单枚举类型 Enum 枚举类型 */
    type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
    /** 订单类型 */
    tranOrderType?: string
    /** 经办校区Id */
    schoolId: number
    /** 对内备注（详情页面需要此参数） */
    comment?: string
    /** 对外备注（详情页面需要此参数） */
    commentOuter?: string
    /** 补费交易Id */
    id: number
    /** 订单编辑号（机构内唯一） */
    tranOrderNo: number
    /** 订单号（系统唯一） */
    tranOrderId: number
    /** 欠费交易Id */
    tranId: number
    /** 经办人 */
    creator?: string
    /** 经办日期 */
    dealTime?: string
    /** 经办校区名 */
    schoolName?: string
    /** 欠费金额 */
    arrearageAmount: number
    /** 欠费项目名称(课程名或教材杂项名) */
    arrearageItem?: string
    /** 课程名 */
    lessonName?: string
    /** 教材杂项名 */
    itemName?: string
    /** 补费金额 */
    repairAmount: number
    /** 学费账户状态  1. 在读  2. 转出  3. 退费  4. 停课  5. 结课  6. 复课 Enum 枚举类型 */
    status: 1 | 2 | 3 | 4 | 5 | 6 | 7 | -1
    /** 欠费交易类型  1. 学费交易  2.教材杂费交易 Enum 枚举类型 */
    arrearageTranType: 1 | 2
    /** 教材杂费补费交易关联的购买教材交易是否办理过退教材或退杂费 */
    hasReturnItem?: boolean
    /** 本次最少补费金额，本交补金额+MinRepairAmount&gt;=0才能保存交易  当此金额&gt;=0，本次补费无最小金额限制  当此金额小于0,本次补费金额必须&gt;大于此金额的绝对值 */
    minRepairAmount: number
    /** 退费教材杂费 状态 */
    returnItemOrderStatus: number
  }

  /** 补费订单信息 */
  export interface GetRepairTranOrderResponse {
    /** 学员id */
    stuInfoId: number
    /** 学员姓名 */
    stuName?: string
    /** 学员账户余额 */
    remain: number
    /** 补费交易订单信息 */
    tranOrderInfo: RepairTranOrderDto
    /** 支付信息 */
    accountInfo: AccountDetailDto[]
    /** 欠费交易列表(内含补费信息) */
    arrearageTrans: RepairArrearageTranDto[]
    /** 标签集合 */
    tags: TranTagDto[]
    /** 对内备注 */
    comment?: string
    /** 对外备注 */
    commentOuter?: string
    /** 是否允许编辑 */
    isTranOrderEdit?: boolean
  }

  /** 补费交易订单信息 */
  export interface RepairTranOrderDto {
    /** 订单Id */
    id: number
    /** 应付总额，默认为0 */
    shouldPay: number
    /** 实付总额，默认0 */
    realPay: number
    /** 学员账户变动金额 */
    remain: number
    /** 学员积分变动数 */
    credit: number
    /** 欠费金额(汇总订单相关的交易欠费金额) */
    arrearage: number
    /** 员工id,默认为0。销售员(业绩归属人) */
    hrDocId: number
    /** 经办校区id,默认为0 */
    schoolId: number
    /** 员工名称，销售员(业绩归属人) */
    hrDocName?: string
    /** 经办校区名称 */
    schoolName?: string
    /** 经办日期 */
    dealDate?: string
    /** 创建人，默认为空。存放username */
    creator?: string
    /** 订单号(机构内自增、唯一) */
    orderNumber: number
    /** 订单状态 Enum 枚举类型 */
    status: 1 | 2 | 3 | 4
    /** 订单是否是校宝钱包收费 */
    isTranOrderSchoolPalPay?: boolean
    /** 过期时间 */
    expiryDate?: string
    /** 订单是否确认到款 */
    isConfirm?: boolean
    /** 订单创建时间 */
    createdTime?: string
    /** 是否是收银宝支付 */
    isSchoolPalPay?: boolean
  }

  /** 编辑获取用的欠费交易 */
  export interface RepairArrearageTranDto {
    /** 补费交易Id */
    id: number
    /** 订单编辑号（机构内唯一） */
    tranOrderNo: number
    /** 订单号（系统唯一） */
    tranOrderId: number
    /** 欠费交易Id */
    tranId: number
    /** 订单类型 */
    tranOrderType?: string
    /** 经办人 */
    creator?: string
    /** 经办日期 */
    dealTime?: string
    /** 经办校区名 */
    schoolName?: string
    /** 欠费金额 */
    arrearageAmount: number
    /** 欠费项目名称(课程名或教材杂项名) */
    arrearageItem?: string
    /** 课程名 */
    lessonName?: string
    /** 教材杂项名 */
    itemName?: string
    /** 补费金额 */
    repairAmount: number
    /** 学费账户状态  1. 在读  2. 转出  3. 退费  4. 停课  5. 结课  6. 复课 Enum 枚举类型 */
    status: 1 | 2 | 3 | 4 | 5 | 6 | 7 | -1
    /** 欠费交易类型  1. 学费交易  2.教材杂费交易 Enum 枚举类型 */
    arrearageTranType: 1 | 2
    /** 教材杂费补费交易关联的购买教材交易是否办理过退教材或退杂费 */
    hasReturnItem?: boolean
    /** 本次最少补费金额，本交补金额+MinRepairAmount&gt;=0才能保存交易  当此金额&gt;=0，本次补费无最小金额限制  当此金额小于0,本次补费金额必须&gt;大于此金额的绝对值 */
    minRepairAmount: number
    /** 退费教材杂费 状态 */
    returnItemOrderStatus: number
  }

  /** 获取订单退费类型 */
  export interface GetRefunTypeResponse {
    /** 学员Id */
    stuInfoId: number
    /** 学员姓名 */
    stuName?: string
    /** 退费类型 1：学费退费  2：余额退费  3：教材杂费退费  0：其他 */
    refundType: number
  }

  /** 学费编辑详情 */
  export interface ReturnFeeTranDetailResponse {
    /** 学员id */
    stuInfoId: number
    /** 学员姓名 */
    stuName?: string
    /** 学员账户Id */
    stuFeeDocId: number
    /** 对内备注 */
    comment?: string
    /** 对外备注 */
    commentOuter?: string
    /** 校区名称 */
    schoolName?: string
    /** 校区Id */
    schoolId: number
    /** 销售名称 */
    hrDocName?: string
    /** 销售员Id */
    hrDocId: number
    /** 描述缺失 */
    transforTranId: number
    /** 是否确认到账 */
    isTranOrderConfirm?: boolean
    /** 学员账户状态 Enum 枚举类型 */
    stufeeDocStatus: 1 | 2 | 3 | 4 | 5 | 6 | 7 | -1
    /** 经办日期 */
    dealDate?: string
    /** 积分 */
    credit: number
    /** 订单状态 Enum 枚举类型 */
    status: 1 | 2 | 3 | 4
    /** 订单号 */
    orderNumber: number
    /** 创建时间 */
    createdTime?: string
    /** 经办人 */
    creator?: string
    /** 学费退费编辑对象 */
    editReturnFeeTrans: EditReturnFeeTrans
    /** 订单标签 */
    tags: TranTagDto[]
  }

  /** 学费退费编辑对象 */
  export interface EditReturnFeeTrans {
    /** 学费退费详情 */
    editReturnFeeTranDetails: EditReturnFeeTranDetails[]
    /** 课程Id */
    lessonId: number
    /** 课程名称 */
    lessonName?: string
    /** 收费模式 Enum 枚举类型 */
    feeMode: 1 | 2 | 3
    /** 退费模式 Enum 枚举类型 */
    tranType: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  }

  /** 学费退费详情 */
  export interface EditReturnFeeTranDetails {
    /** 报名交易id */
    feetranId: number
    /** 购买课时（总数） */
    count: number
    /** 购买sku数量   乐高项目1.0增加 */
    feeStandardCount: number
    /** 原价格,默认0 */
    originAmount: number
    /** 实际应付价格,默认0 */
    realAmount: number
    /** 实收金额（交易实收+补费） */
    actualIncome: number
    /** 单价,默认0 */
    unitPrice: number
    /** 真实的单价（每次记上课的单价） */
    realUnitPrice: number
    /** 未用课时（剩余可用课时）。冗余字段。 */
    unUseClassTimes: number
    /** 已退学费 */
    returnedTuition: number
    /** 经办日期 */
    dealDate?: string
    /** 订单号(机构内自增、唯一) */
    orderNumber: number
    /** 课消金额 */
    cost: number
    /** 营销活动优惠内容 */
    marketingComment?: string
    /** 营销活动优惠金额 */
    tranMarketingPromotionAmount: number
    /** 最大可退金额（计算好后给前端） */
    maxReturnAmount: number
    /** 已退课时（计算好后给前端） */
    returnedClassTimes: number
    /** 优惠json,默认空;用于服务端计算； */
    promotion?: string
    /** 用户的课时（中间数据，用于计算总课时） */
    promotionClassTimes: number
    /** 优惠金额,默认0 */
    promotionAmount: number
    /** 欠费金额 */
    arrearage: number
    /** 开始时间 */
    beginDate?: string
    /** 结束时间 */
    expiryDate?: string
    /** 已退课时 */
    classTimes: number
    /** 已退学费 */
    amount: number
    /** 转出交易Id */
    id: number
  }

  /** 获取编辑教材杂费退费信息回复 */
  export interface GetItemAndMiscRefundEditResponse {
    /** 订单信息 */
    tranOrder: GetItemAndMiscRefundEditTranOrderDto
    /** 订单标签 */
    tags: TranTagDto[]
    /** 教材杂费交易 */
    itemTrans: ItemTranRefundDto[]
    /** 对内备注 */
    comment?: string
    /** 对外备注 */
    commentOuter?: string
    /** 是否允许编辑 */
    isTranOrderEdit?: boolean
  }

  /** 订单信息 */
  export interface GetItemAndMiscRefundEditTranOrderDto {
    /** 主键 */
    id: number
    /** 应付总额，默认为0；  批量升期/批量续费时，需要传此参数；  报名/复课编辑时，可以不传此参数，服务端会根据交易重新计算订单应收； */
    shouldPay: number
    /** 实付总额，默认0；  批量升期/批量续费时，不需要传此参数； */
    realPay: number
    /** 校区id,默认为0 */
    schoolId: number
    /** 校区名称 */
    schoolName?: string
    /** 经办日期 */
    dealDate?: string
    /** 学员账户变动金额，  使用为-，  增加为+；  批量升期/批量续费时，需要传此参数；  新增补费时，使用账户余额时为+，预存增加- */
    remain: number
    /** 学员积分变动数；  所有订单新增/编辑时不需要此参数，服务端根据实收*比率计算赋值；  批量升期/批量续费时，不需要传此参数； */
    credit: number
    /** 员工id,默认为0。销售员(业绩归属人) */
    hrDocId: number
    /** 销售员名称 */
    hrDocName?: string
    /** 订单号 */
    orderNumber: number
    /** 学员Id */
    stuInfoId: number
    /** 学员姓名 */
    stuInfoName?: string
    /** 是否确认到款 */
    isConfirm?: boolean
    /** 订单状态 Enum 枚举类型 */
    status: 1 | 2 | 3 | 4
    /** 过期时间 */
    expiryDate?: string
    /** 订单创建时间 */
    createdTime?: string
    /** 创建人 */
    creator?: string
  }

  /** 教材杂费退费详情 */
  export interface ItemTranRefundDto {
    /** 主键 */
    id: number
    /** 交易类型 Enum 枚举类型 */
    tranType: 1 | 2 | 3 | 4
    /** 单价 */
    unitPrice: number
    /** 数量 */
    count: number
    /** 教材杂费项目上线后，此参数含义变更为应收（2017-09-21添加备注） */
    realAmount: number
    /** 教材是否归还 */
    itemGot?: boolean
    /** 教材是否领用 */
    itemGotState?: boolean
    /** 教材归还时间 */
    itemGotTime?: string
    /** 进价 */
    itemGotPrice: number
    /** 购入数量 */
    itemTotalCount: number
    /** 总购入金额 */
    totalAmount: number
    /** 实收金额 */
    actualIncome: number
    /** 购买教材杂费交易，当前交易为退教材杂费才用的到 */
    purchaseItemTranId: number
    /** 课程名称 */
    lessonName?: string
    /** 教材杂费名称 */
    itemName?: string
    /** 已退数量 */
    returnedItemCount: number
    /** 已归还数量 */
    returnBackItemCount: number
    /** 可退数量 */
    canReturnedItemCount: number
    /** 教材/杂费 */
    itemType?: string
    /** 原始订单编号 */
    orderNumber: number
    /** 原购买教材订单经办日期 */
    dealDate?: string
  }

  /** 学员账户编辑详情 */
  export interface GetAccoutTranDetailResponse {
    /** 订单号 */
    orderNumber: number
    /** 已退金额 */
    remain: number
    /** 学员Id */
    stuInfoId: number
    /** 学员姓名 */
    stuName?: string
    /** 对内备注 */
    comment?: string
    /** 对外备注 */
    commentOuter?: string
    /** 校区Id */
    schoolId: number
    /** 校区名称 */
    schoolName?: string
    /** 销售员Id */
    hrDocId: number
    /** 销售名称 */
    hrDocName?: string
    /** 是否确认到账 */
    isTranOrderConfirm?: boolean
    /** 经办日期 */
    dealDate?: string
    /** 积分 */
    credit: number
    /** 创建时间 */
    createdTime?: string
    /** 经办人 */
    creator?: string
    /** 订单状态 Enum 枚举类型 */
    status: 1 | 2 | 3 | 4
    /** 订单标签 */
    tags: TranTagDto[]
  }

  /** 描述缺失 */
  export interface GetSubjectsWithSearchResponse {
    /** 描述缺失 */
    name?: string
    /** 描述缺失 */
    id: number
  }

  /** GetSubjectListData  出参 */
  export interface GetSubjectListDataResponse {
    /** 科目id */
    id: number
    /** 科目名 */
    name?: string
    /** 科目状态 */
    status?: boolean
  }

  /** GetExtendAttributeItemsData 出参 */
  export interface GetExtendAttributeItemsDataResponse {
    /** 描述缺失 */
    id: number
    /** 描述缺失 */
    name?: string
  }

  /** 提供前端基于OrgParameter的权限配置集合 */
  export interface OrgParameterResponse {
    /** 跨校区分班开关 */
    isAllowOverSchool?: boolean
    /** 按期分多班开关 */
    isAllowMultiClassBySeason?: boolean
    /** 零售教材开关 */
    isAllowItemForSale?: boolean
    /** 一课多模式开关 */
    isClassAllowMultiMode?: boolean
    /** 机构启用的收费模式 Enum 枚举类型 */
    allowedFeeModes: Array<1 | 2 | 3>
    /** 机构封账开关 */
    isFreezeTran?: boolean
    /** 机构封账日期 */
    freezeTranDate: number
    /** 机构封账是否是直接锁死 */
    isJustFreeze?: boolean
    /** 教材杂费欠费开关 */
    isAllowItemArrear?: boolean
    /** 是否开启学员账户 */
    isOpenStuAccount?: boolean
    /** 是否开启教材杂费 */
    isOpenItemTran?: boolean
    /** 账目修改后可在多少小时内修改账目 */
    branchUserEditDelTime: number
  }

  /** 左上角logo信息集合 */
  export interface LogoInfoResponse {
    /** CRM版本 */
    crmVer?: string
    /** 机构名称 */
    name?: string
    /** 机构英文缩写 */
    eName?: string
    /** Logo地址 */
    orgLogoImgUrl?: string
    /** Config里的机构名 */
    configOrgName?: string
    /** neworg.CreatedTime */
    createdTime?: string
  }

  /** 机构应用配置 */
  export interface OrgApplicationConfigResponse {
    /** 是否启用学员账户 */
    isOpenStuAccount?: boolean
    /** 是否单一支付 */
    isSingleAccount?: boolean
    /** 是否开启原路退费（限制订单编辑） */
    isTrackRemain?: boolean
    /** 办理中心今日交账跳转地址 */
    todaySettleUrl?: string
    /** 是否有交账应用（控制财务应用中是否显示"报表"和"交账"tab） */
    hasSettleApplication?: boolean
    /** 是否隐藏单独购买教材杂费 */
    isHideItemTran?: boolean
    /** 是否有课消：1有，0没有 */
    hasTeachingLogCost?: boolean
    /** 是否有磁卡考勤：1有，0没有 */
    hasCardSign?: boolean
    /** 是否有SMS服务：1 有， 0 没有 */
    hasSMS?: boolean
    /** 是否有报名选座功能：1 有， 0 没有 */
    hasEnrollSelectSeat?: boolean
    /** 是否有新报名页功能：1 有，0 没有 */
    hasNewEnrollsPage?: boolean
    /** 是否隐藏公告栏（0：否；1：是） */
    isHideBulletinBoard?: boolean
    /** 是否隐藏在线客服（0：否；1：是） */
    isHideOnlineService?: boolean
    /** 是否隐藏帮助中心（0：否；1：是） */
    isHideHelpCenter?: boolean
    /** 是否隐藏运营弹窗（0：否；1：是） */
    isHideOperationBanner?: boolean
  }

  /** 机构配置信息 */
  export interface OrgConfigInfoResponse {
    /** 机构应用配置 */
    orgApplicationConfig: OrgApplicationConfigResponse
    /** 左上角logo信息集合 */
    logoInfoResponse: LogoInfoResponse
  }

  /** 描述缺失 */
  export interface GetOrgextendconfigResponse {
    /** 机构ID */
    orgId: number
    /** 属性名 */
    column?: string
    /** 属性中文名 */
    columnName?: string
    /** 字段值(数字类型的下拉) */
    value?: string
    /** 字段值(字符类型的下拉) */
    columnValue?: string
    /** 组件外观 */
    columnType: number
    /** 最大字符长度 */
    maxLength: number
    /** 是否为自定义字段 */
    isCustomField?: boolean
    /** 固定字段，stuinfo上的预留字段，stuinfoextend上的预留字段，自定义字段 */
    columnSourceType: number
    /** 过滤类型： 1：搜索；2：筛选，0：不用' */
    siftType: number
    /** 是否必填 */
    required?: boolean
    /** 是否启用 */
    activate?: boolean
    /** 排序 */
    sortNum: number
    /** 主键 */
    id: number
  }

  /** 描述缺失 */
  export interface GetExamScoreResponse {
    /** 考试成绩id */
    id: number
    /** 机构id */
    orgId: number
    /** 学员id */
    stuinfoId: number
    /** 班级id */
    classId: number
    /** 考试id */
    examId: number
    /** 科目id */
    examItemId: number
    /** 考试时间 */
    examTime?: string
    /** 考试类型，1机构内，2机构外 */
    type: number
    /** 考试成绩 */
    score: number
    /** 备注 */
    remark?: string
    /** 学员姓名 */
    stuName?: string
    /** 母亲电话 */
    motherTel?: string
    /** 父亲电话 */
    fatherTel?: string
    /** 其他电话 */
    otherTel?: string
    /** 项目名称 */
    examItemName?: string
    /** 考试名称 */
    examName?: string
    /** 班级名称 */
    className?: string
  }

  /** 描述缺失 */
  export interface GetExamScoresResponse {
    /** 考试成绩id */
    id: number
    /** 学员id */
    stuinfoId: number
    /** 班级id */
    classId: number
    /** 考试时间 */
    examTime?: string
    /** 考试类型，1机构内，2机构外 */
    type: number
    /** 考试成绩 */
    score: number
    /** 备注 */
    remark?: string
    /** 学员姓名 */
    stuName?: string
    /** 电话 */
    phoneTel?: string
    /** 关系 */
    relationship: number
    /** 项目名称 */
    examItemName?: string
    /** 考试名称 */
    examName?: string
    /** 班级名称 */
    className?: string
  }

  /** 描述缺失 */
  export interface SaveExamScoresResponse {
    /** 成功个数 */
    succeedCount: number
    /** 失败个数 */
    failCount: number
  }

  /** 描述缺失 */
  export interface GetExamItemsResponse {
    /** 科目id */
    id: number
    /** 科目名称 */
    name?: string
  }

  /** 描述缺失 */
  export interface GetExamsResponse {
    /** 考试id */
    id: number
    /** 考试名称 */
    name?: string
  }

  /** 订单标签列表 */
  export interface GetOrgTranorderTagListResponse {
    /** 数据 */
    list: TagDto[]
  }

  /** 描述缺失 */
  export interface TagDto {
    /** 描述缺失 */
    id: number
    /** 描述缺失 */
    orgId: number
    /** 启用 */
    isEnable?: boolean
    /** 标签名 */
    name?: string
  }

  /** 销售员 */
  export interface SelectEmployeeCrmFetchHrDocDataResponse {
    /** hrdocid */
    id: number
    /** 员工姓名 */
    name?: string
    /** 手机号 */
    phone?: string
    /** 关联的账户名称 */
    userName?: string
  }

  /** Response for GetJurisdictionSettingData */
  export interface GetJurisdictionSettingDataResponse {
    /** 开放登录开始时间 */
    sysOpenTimeStart?: string
    /** 开放登录结束时间 */
    sysOpenTimeEnd?: string
    /** 自动登出时间 */
    loginOutTime: number
    /** 账目修改时间 */
    branchUserEditDelTime: number
    /** 教材杂费是否允许欠费 */
    isAllowItemArrear?: boolean
    /** 封账是否开启 */
    isOpenFreezeTran?: boolean
    /** 封账日 */
    freezeTranByDay: number
    /** 是否直接封账 */
    isJustFreezeTran?: boolean
  }

  /** 获取积分配置信息 */
  export interface GetCreditInfoResponse {
    /** 开始生效日期 */
    creditEnaleDate?: string
    /** 学费每1元的积分转化率 */
    creditCalcRate: number
  }

  /** 描述缺失 */
  export interface GetFollowUpPeopleInfoResponse {
    /** 数据集合 */
    list: FollowUpPeopleDto[]
  }

  /** 描述缺失 */
  export interface FollowUpPeopleDto {
    /** id */
    id: number
    /** 机构id */
    orgId: number
    /** 类型名称 */
    name?: string
    /** 创建时间 */
    createdTime?: string
    /** 交接人类型id */
    nextId: number
    /** 是否开启 */
    enable?: boolean
    /** 是否开启公有池 */
    hasPublicPool?: boolean
    /** 多少天未跟进进入公有池 */
    publicPoolLimit: number
    /** 新增咨询要不要显示 */
    addConsult?: boolean
    /** 编辑跟进信息 */
    editFollowUp?: boolean
    /** 移动端基本信息 */
    infoApp?: boolean
    /** 分配咨询 */
    assignSale?: boolean
    /** 报名订单上有没有这个字段 */
    tranOrder?: boolean
    /** 模板的售前人员id */
    followupPeopleTemplateId: number
  }

  /** 获取系统消息 */
  export interface GetSysMessagesResponse {
    /** 主键 */
    id: number
    /** 用户id */
    hrDocId: number
    /** 是否已经读 */
    readed?: boolean
    /** 创建时间 */
    addDate?: string
    /** 消息内容 */
    content?: string
  }

  /** 描述缺失 */
  export interface GetUsersByOrgIdResponse {
    /** 用户id */
    userId: number
    /** 用户名 */
    userName?: string
  }

  /** 收款账户 response */
  export interface GetAllAccountByOrgIdResponse {
    /** 收款账户id */
    accountId: number
    /** 收款账户名 */
    accountName?: string
  }

  /** 流水收支报表--柱形图 */
  export interface GetFlowReportChartResponse {
    /** X轴名称集合校区名称 */
    name?: string[]
    /** 数据集合 */
    seriesData: SeriesData[]
  }

  /** 财务报表-流水实收 */
  export interface GetFlowReportResponse {
    /** 总学费 */
    allTuition: number
    /** 总教材费 */
    allTextbookFee: number
    /** 总杂费 */
    allIncidental: number
    /** 总余额 */
    allRemain: number
    /** 总金额 */
    allTotalMoney: number
    /** 描述缺失 */
    totalCount: number
    /** 描述缺失 */
    currentIndex: number
    /** 描述缺失 */
    itemCount: number
    /** 描述缺失 */
    list: GetFlowReportResponseItem[]
  }

  /** 数据列表 */
  export interface GetFlowReportResponseItem {
    /** 分组名称 */
    name?: string
    /** 学费 */
    tuition: number
    /** 教材费 */
    textbookFee: number
    /** 杂费 */
    incidental: number
    /** 余额 */
    remain: number
    /** 总计 */
    total: number
  }

  /** 获取剩余学费报表数据响应数据 */
  export interface GetUnusedTuitionReportDataResponse {
    /** 未用学费合计 */
    totalUnusedTuition: number
    /** 未用课时合计 */
    totalUnusedClassTime: number
    /** 描述缺失 */
    totalCount: number
    /** 描述缺失 */
    currentIndex: number
    /** 描述缺失 */
    itemCount: number
    /** 描述缺失 */
    list: GetUnusedTuitionReportDataResponseItem[]
  }

  /** 获取剩余学费报表数据明细 */
  export interface GetUnusedTuitionReportDataResponseItem {
    /** 维度id， */
    id: number
    /** 维度名称， */
    name?: string
    /** 剩余学费 */
    unusedTuition: number
    /** 剩余课时 */
    unusedClassTime: number
  }

  /** 描述缺失 */
  export interface GetTeachingMaterialAndIncidentalRequest {
    /** 校区Id */
    schoolIds?: number[]
    /** 开始时间 */
    searchDate?: string[]
    /** 页码 */
    pageSize: number
    /** 页数 */
    pageIndex: number
    /** 排序字符串 */
    orderByKey?: string
    /** 排序方式 */
    orderByType?: string
  }

  /** 描述缺失 */
  export interface GetTeachingMaterialAndIncidentalResponse {
    /** 总收入 */
    allIncome: number
    /** 总出售数量 */
    allSoldCount: number
    /** 总成本 */
    allPurchase: number
    /** 总利润 */
    allProfit: number
    /** 描述缺失 */
    totalCount: number
    /** 描述缺失 */
    currentIndex: number
    /** 描述缺失 */
    itemCount: number
    /** 描述缺失 */
    list: GetTeachingMaterialAndIncidentalItem[]
  }

  /** 描述缺失 */
  export interface GetTeachingMaterialAndIncidentalItem {
    /** 教材杂费名称 */
    itemName?: string
    /** 出售数量 */
    soldCount: number
    /** 收入 */
    income: number
    /** 成本 */
    purchase: number
    /** 利润 */
    profit: number
  }

  /** 描述缺失 */
  export interface GetFinancialFlowBySchoolChartResponse {
    /** 教材杂费名称 */
    name?: string[]
    /** 数据集合 */
    seriesData: TeachingMaterialAndIncidentalSeriesDataModel[]
  }

  /** 柱形图名称 */
  export interface TeachingMaterialAndIncidentalSeriesDataModel {
    /** 柱形图名称 */
    name?: string
    /** 类型 */
    type?: string
    /** 数据 */
    data?: number[]
  }

  /** 学费消耗返回 */
  export interface TuitionUsedStatListResponse {
    /** 消耗课时 */
    costClassTime: number
    /** 课消收入 */
    incomeByAttendClass: number
    /** 非课消收入 */
    incomeByOther: number
    /** 总计 */
    total: number
    /** 描述缺失 */
    totalCount: number
    /** 描述缺失 */
    currentIndex: number
    /** 描述缺失 */
    itemCount: number
    /** 描述缺失 */
    list: TuitionUsedStatResponseModel[]
  }

  /** 课消返回模型 */
  export interface TuitionUsedStatResponseModel {
    /** 课消收入 */
    incomeByAttendClass: number
    /** 非课消收入 */
    incomeByOther: number
    /** 已消耗课时 */
    costClassTime: number
    /** 总计 */
    total: number
    /** 课程类别名称 */
    month?: string
    /** 科目名称 */
    subjectName?: string
    /** 课程类别名称 */
    className?: string
    /** 课程类别名称 */
    lessonClassName?: string
    /** 课程名称 */
    lessonName?: string
    /** 报读校区名称 */
    schoolName?: string
    /** 各种ID（校区、课程、课程类别、班级、科目） */
    id: number
  }

  /** 学费消耗按月统计 */
  export interface IncomeByOtherDetailResponse {
    /** 非课消收入 */
    incomeByOther: number
    /** 描述缺失 */
    totalCount: number
    /** 描述缺失 */
    currentIndex: number
    /** 描述缺失 */
    itemCount: number
    /** 描述缺失 */
    list: IncomeByOtherDetailResponseModel[]
  }

  /** 非课消收入明细模型 */
  export interface IncomeByOtherDetailResponseModel {
    /** 学员姓名 */
    stuName?: string
    /** 非课消收入类型 */
    tranType?: string
    /** 课程类别名称 */
    lessonClassName?: string
    /** 课程名称 */
    lessonName?: string
    /** 订单ID */
    tranOrderId?: string
    /** 收入金额 */
    amount: number
    /** 校区名称 */
    schoolName?: string
    /** 经办时间 */
    dealDate?: string
    /** 经办人名称 */
    hrDocName?: string
  }

  /** 财务订单收支 */
  export interface GetFinanceOrderAndOtherReportDataResponse {
    /** 订单总收入 */
    orderIncomeTotal: number
    /** 订单总支出 */
    orderExpenditureTotal: number
    /** 其他总收入 */
    otherIncomeTotal: number
    /** 其他总支出 */
    otherExpenditureTotal: number
    /** 总净收入 */
    netIncomeTotal: number
    /** 描述缺失 */
    totalCount: number
    /** 描述缺失 */
    currentIndex: number
    /** 描述缺失 */
    itemCount: number
    /** 描述缺失 */
    list: FinanceOrderAndOtherBySchoolItemResponse[]
  }

  /** 描述缺失 */
  export interface FinanceOrderAndOtherBySchoolItemResponse {
    /** 校区Id */
    schoolId: number
    /** 校区Name */
    schoolName?: string
    /** 订单收入 */
    orderIncome: number
    /** 订单支出 */
    orderExpenditure: number
    /** 其他收入 */
    otherIncome: number
    /** 其他支出 */
    otherExpenditure: number
    /** 净收入 */
    netIncome: number
    /** 条数 */
    count: number
  }

  /** 收支按月 */
  export interface GetFinanceOrderAndOtherByMonthListDataResponse {
    /** 订单总收入 */
    orderIncomeTotal: number
    /** 订单总支出 */
    orderExpenditureTotal: number
    /** 其他总收入 */
    otherIncomeTotal: number
    /** 其他总支出 */
    otherExpenditureTotal: number
    /** 总利润 */
    netIncomeTotal: number
    /** 描述缺失 */
    totalCount: number
    /** 描述缺失 */
    currentIndex: number
    /** 描述缺失 */
    itemCount: number
    /** 描述缺失 */
    list: FinanceOrderAndOtherByMonthItemResponse[]
  }

  /** 描述缺失 */
  export interface FinanceOrderAndOtherByMonthItemResponse {
    /** 月份 */
    month?: string
    /** 订单收入 */
    orderIncome: number
    /** 订单支出 */
    orderExpenditure: number
    /** 其他收入 */
    otherIncome: number
    /** 其他支出 */
    otherExpenditure: number
    /** 净收入 */
    netIncome: number
    /** 条数 */
    count: number
  }

  /** 描述缺失 */
  export interface GetFinanceOrderAndOtherByTypeDataResponse {
    /** 总金额 */
    amountTotal?: string
    /** 描述缺失 */
    totalCount: number
    /** 描述缺失 */
    currentIndex: number
    /** 描述缺失 */
    itemCount: number
    /** 描述缺失 */
    list: FinanceOrderAndOtherByTypeItemResponse[]
  }

  /** 描述缺失 */
  export interface FinanceOrderAndOtherByTypeItemResponse {
    /** 分类名称 */
    categoryName?: string
    /** 金额 */
    amount: number
  }

  /** 获取教师报表返回值 */
  export interface GetTeacherReportListDataResponse {
    /** 统计时间 */
    statisticalTime?: string
    /** 教师数量 */
    teacherCount: number
    /** 平均出勤率 */
    avgAttendanceRate?: string
    /** 平均续费率 */
    avgRenewRate?: string
    /** 教师报表Data */
    data: GetTeacherReportListModel[]
  }

  /** 获取教室报表Model */
  export interface GetTeacherReportListModel {
    /** 教师档案Id */
    hrDocId: number
    /** 教师姓名 */
    teacherName?: string
    /** 带班数 */
    classCount: number
    /** 教师带班在读学员数 */
    stuCount: number
    /** 升期人次 */
    risePeriodCount: number
    /** 退费人次 */
    refundCount: number
    /** 应续人次 */
    shouldRenewCount: number
    /** 实续人次 */
    actualRenewCount: number
    /** 续费率 */
    renewRate?: string
    /** 学员应到人数总和 */
    totalShouldAttendanceCount: number
    /** 学员实到人数总和 */
    totalActualAttendanceCount: number
    /** 出勤率 */
    attendanceRate?: string
  }

  /** 获取教师带班报表 */
  export interface GetTeacherClassesListDataResponse {
    /** 总条数 */
    totalCount: number
    /** 教师所带班级列表 */
    data: GetTeacherClassesListModel[]
  }

  /** 教师所带班级列表 */
  export interface GetTeacherClassesListModel {
    /** 班级Id */
    classId: number
    /** 班级名字 */
    className?: string
    /** 校区名字 */
    schoolName?: string
    /** 开班日期 */
    openDate?: string
    /** 班级最大人数 */
    maxStudent: number
    /** 班级在读学员人数 */
    stuCount: number
    /** 成班人数 */
    numToOpen: number
    /** 教室名字 */
    classRoomName?: string
    /** 班级备注 */
    comment?: string
    /** 教师名字 */
    teacherName?: string
    /** 助教名字 */
    assistinName?: string
    /** 上课时间 */
    classTimeDescription?: string
  }

  /** 教师应续学生返回值 */
  export interface GetTeacherStuShouldRenewListDataResponse {
    /** 总条数 */
    totalCount: number
    /** 获取教师应续列表 */
    data: GetTeacherStuShouldRenewListModel[]
  }

  /** 获取教师应续列表 */
  export interface GetTeacherStuShouldRenewListModel {
    /** 学生姓名 */
    stuName?: string
    /** 校区名字 */
    schoolName?: string
    /** 课程名字 */
    lessonName?: string
    /** 班级名字 */
    classNames?: string
    /** 教师名字 */
    teacherNames?: string
    /** 剩余课时/天数 */
    unusedClassTimes: number
    /** 课时有效期 */
    classTimesExpiryDate?: string
    /** 剩余学费 */
    unusedTuition: number
  }

  /** 教师实续学生返回值 */
  export interface GetTeacherStuActualRenewListDataResponse {
    /** 总条数 */
    totalCount: number
    /** 获取班级应续列表 */
    data: GetTeacherStuActualRenewListModel[]
  }

  /** 教师实续列表 */
  export interface GetTeacherStuActualRenewListModel {
    /** 学生姓名 */
    stuName?: string
    /** 校区名字 */
    schoolName?: string
    /** 课程名字 */
    lessonName?: string
    /** 班级名字 */
    classNames?: string
    /** 教师名字 */
    teacherNames?: string
    /** 剩余课时/天数 */
    unusedClassTimes: number
    /** 课时有效期 */
    classTimesExpiryDate?: string
    /** 剩余学费 */
    unusedTuition: number
    /** 续费课时/天数 */
    renewalClassTimes: number
  }

  /** 教师所带学生退费 返回值 */
  export interface GetTeacherStuRefundListDataResponse {
    /** 总条数 */
    totalCount: number
    /** 获取班级应续列表 */
    data: GetTeacherStuRefundListModel[]
  }

  /** 教师所带学生退费列表 */
  export interface GetTeacherStuRefundListModel {
    /** 学生姓名 */
    stuName?: string
    /** 校区名字 */
    schoolName?: string
    /** 课程名字 */
    lessonName?: string
    /** 班级名字 */
    classNames?: string
    /** 教师名字 */
    teacherNames?: string
    /** 退费课时数 */
    refundClassTimes: number
    /** 经办时间 */
    dealDate?: string
  }

  /** 获取班级报表返回值 */
  export interface GetClassReportListDataResponse {
    /** 班级数量 */
    classCount: number
    /** 统计时间 */
    statisticalTime?: string
    /** 平均出勤率 */
    avgAttendanceRate?: string
    /** 平均续费率 */
    avgRenewRate?: string
    /** 平均满班率 */
    avgMaxStudentRate?: string
    /** 班级报表Data */
    data: GetClassReportListModel[]
  }

  /** 获取班级报表列表 */
  export interface GetClassReportListModel {
    /** 班级Id */
    classID: number
    /** 班级名字 */
    className?: string
    /** 教师名字 */
    teacher?: string
    /** 在读学员人数 */
    stuCount: number
    /** 班级最大人数 */
    maxStudent: number
    /** 满班率 */
    maxStudentRate?: string
    /** 转出人次 */
    transforCount: number
    /** 退费人次 */
    refundCount: number
    /** 停课人次 */
    stopCount: number
    /** 结课人次 */
    endCount: number
    /** 应续人次 */
    shouldRenewCount: number
    /** 实续人次 */
    actualRenewCount: number
    /** 续费率 */
    renewRate?: string
    /** 开课次数 */
    startClassCount: number
    /** 实到人数 */
    actualAttendanceCount: number
    /** 应到人数 */
    shouldAttendanceCount: number
    /** 出勤率 */
    attendanceRate?: string
  }

  /** 班级实续学生返回值 */
  export interface GetClassStuActualRenewListDataResponse {
    /** 总条数 */
    totalCount: number
    /** 获取班级应续列表 */
    data: GetTeacherStuActualRenewListModel[]
  }

  /** 班级应续学生返回值 */
  export interface GetClassStuShouldRenewListDataResponse {
    /** 总条数 */
    totalCount: number
    /** 获取教师应续列表 */
    data: GetClassStuShouldRenewListModel[]
  }

  /** 获取班级应续列表 */
  export interface GetClassStuShouldRenewListModel {
    /** 学生姓名 */
    stuName?: string
    /** 校区名字 */
    schoolName?: string
    /** 课程名字 */
    lessonName?: string
    /** 班级名字 */
    classNames?: string
    /** 教师名字 */
    teacherNames?: string
    /** 剩余课时/天数 */
    unusedClassTimes: number
    /** 课时有效期 */
    classTimesExpiryDate?: string
    /** 剩余学费 */
    unusedTuition: number
  }

  /** Response for GetTeacherClassTimeStatistics */
  export interface GetTeacherClassTimeStatisticsResponse {
    /** 教师id */
    teacherId: number
    /** 上课老师 */
    teacherName?: string
    /** 管辖校区 */
    manageSchoolName?: string
    /** 上课校区 */
    classSchoolName?: string
    /** 上课人数 */
    stuTeachingLogNumber: number
    /** 学员课时 */
    stuTeachingLogClassTimes: number
    /** 教师课时 */
    teachingLogClassTimes: number
    /** 助教课时 */
    assistantClassTimes: number
    /** 学费消耗 */
    stuTeachingLogCosts: number
  }

  /** Response for GetTeacherClassTimeStatisticsDetail */
  export interface GetTeacherClassTimeStatisticsDetailResponse {
    /** 教师id */
    teacherId: number
    /** 上课老师 */
    teacherName?: string
    /** 上课日期 */
    teachingLogDateTime?: string
    /** 上课校区名称 */
    schoolName?: string
    /** 班级名称 */
    className?: string
    /** 上课人数 */
    stuTeachingLogNumber: number
    /** 学员课时 */
    stuTeachingLogClassTimes: number
    /** 教师课时 */
    teachingLogClassTimes: number
    /** 助教课时 */
    assistantClassTimes: number
    /** 学费消耗 */
    stuTeachingLogCosts: number
    /** 科目 */
    subjectName?: string
    /** 课程类型 Enum 枚举类型 */
    lessonMode: 1 | 2
  }

  /** 课程列表 */
  export interface GetStuInfoLessonListResponse {
    /** 描述缺失 */
    stuEnrollList: StuEnrollListDto[]
    /** 描述缺失 */
    transInfo?: object
  }

  /** 描述缺失 */
  export interface StuEnrollListDto {
    /** 描述缺失 */
    stuFeeDocId: number
    /** 描述缺失 */
    beginDate?: string
    /** 描述缺失 */
    lessonId: number
    /** 课程名称 */
    lessonName?: string
    /** 课程类型   1：班课   2：一对一 */
    lessonMode: number
    /** 报名日期 */
    enrollat?: string
    /** 到期时间 */
    expiryDate?: string
    /** 学费账户状态,在读=1，转=2，退=3，停=4，结=5，复=6 */
    stuFeeDocStatus: number
    /** 1：按课时、2：按时间、3：按期 */
    feeMode: number
    /** 学费,默认为0 */
    tuition: number
    /** 总学费,默认为0 */
    totalTuition: number
    /** 课时,默认为0 */
    classTimes: number
    /** 总课时,默认为0 */
    totalClassTimes: number
    /** 已使用课时 */
    usedClasstimes: number
    /** 已使用学费 */
    usedTuition: number
    /** 描述缺失 */
    classNumber: number
    /** 描述缺失 */
    schoolName?: string
    /** 描述缺失 */
    stuFeeDocSchoolId: number
    /** 描述缺失 */
    stuEnrollListClassDtoList: StuEnrollListClassDto[]
    /** 描述缺失 */
    stuFeeDocUsedClasstimes: number
    /** 学费账户是否已升期 */
    isUped?: boolean
    /** 学费账户上欠费之和 */
    arrearageSum: number
    /** 仅有按期收费标准 */
    hasOnlyBySchedule?: boolean
    /** 是否显示停课按钮 */
    isShowResumeLesson?: boolean
    /** 赠送课时 */
    freeClassTimes: number
    /** 创建时间 */
    createdAt?: string
    /** 转出学费账户信息 */
    stuEnrollTransforStuFeeDoc: StuEnrollTransforStuFeeDocDto[]
  }

  /** 描述缺失 */
  export interface StuEnrollListClassDto {
    /** 描述缺失 */
    classId: number
    /** 班级 */
    studocId: number
    /** 学员档案Id */
    className?: string
    /** 教师姓名 */
    teacherName?: string
    /** 开班日期 */
    openDate?: string
    /** 结班日期 */
    closeDate?: string
    /** 在读、退费、转出、停课、结课 */
    stuDocStatus?: string
    /** 已使用课时 */
    usedClasstimes: number
    /** 已使用学费 */
    usedTuition: number
    /** 学员档案被删除 */
    isDeleted?: boolean
    /** 创建时间 */
    createdAt?: string
  }

  /** 转出班级信息 */
  export interface StuEnrollTransforStuFeeDocDto {
    /** 转入学费账户id */
    stuFeeDocId: number
    /** 转出学费账户id */
    transforStuFeeDocId: number
    /** 转出班级名称 */
    lessonName?: string
  }

  /** 描述缺失 */
  export interface GetSubStuFeeDocExpiryDateListResponse {
    /** 子账户Id */
    subStuFeeDocId: number
    /** 订单Id */
    orderNumber: number
    /** 课时数 */
    classTimes: number
    /** 创建时间 */
    createdTime?: string
    /** 过期时间 */
    expiryDate?: string
  }

  /** 设置学费账户升期 */
  export interface GetStuFeeDocUpPeriodInfoResponse {
    /** 当前学费账户Id */
    currentStuFeeDocId: number
    /** 上一期学费账户Id */
    lastStuFeeDocId: number
    /** 下一期学费账户Id */
    nextStuFeeDocId: number
    /** 上期课程名称 */
    lastLessonName?: string
    /** 下期课程名称 */
    nextLessonName?: string
    /** 下期课程名称 */
    nextLessonId: number
    /** 上一期课程选择列表 */
    lastPeriodInfos: StuFeeDocDto[]
    /** 下一期课程选择列表 */
    nextPeriodInfos: StuFeeDocDto[]
  }

  /** 学生档案账户 */
  export interface StuFeeDocDto {
    /** 学费账户ID */
    id: number
    /** 机构id,默认为0 */
    orgId: number
    /** 学员id */
    stuInfoId: number
    /** 校区id,默认为0 */
    schoolId: number
    /** 1：在读；2：转出；3：退费；4停课；5结课；6复课； */
    status: number
    /** 创建时间 */
    createdAt?: string
    /** 报名日期 */
    enrollAt?: string
    /** 是否新建 */
    isNew?: boolean
    /** 原fee字段，学费单价序列 */
    unitPrice?: string
    /** 学生档案账户：已用学费 */
    usedTuition: number
    /** 学生档案账户：未用学费 */
    tuition: number
    /** 学生档案账户：已用课时/天数 */
    usedClassTimes: number
    /** 学生档案账户：未用课时/天数 */
    classTimes: number
    /** 总课时 */
    totalClassTimes: number
    /** 总学费 */
    totalTuition: number
    /** 入班方式。按期的：1：正常报名；2：插班报名；3：正常转入；4：插班转入 */
    joinType: number
    /** 是否分班（学员报名课程后分班后） */
    hasStuDoc?: boolean
    /** 课程id,默认为0 */
    lessonId: number
    /** 课程名 */
    lessonName?: string
    /** 上课起算日期 */
    beginDate?: string
    /** 课时的到期时间 */
    expiryDate?: string
    /** 收费模式  1:按课时  2:按时间  3:按期 */
    mode: number
    /** 上一期的StufeeDocId */
    fromStufeeDocId: number
    /** 学费账户的创建来源  1：升期、2：转入、3：扩课、4：复课，默认为0：无 */
    createdFrom: number
    /** 是否已升期 */
    isUped?: boolean
    /** 导入的初始学费 */
    importTuition: number
    /** 导入的初始课时 */
    importClassTimes: number
    /** 排序 */
    orderBy: number
  }

  /** 停课 */
  export interface StopClassesResponse {
    /** 次数 */
    count: number
    /** 天数 */
    day: number
  }

  /** 复课信息变更 */
  export interface GetResumeLessonInfoResponse {
    /** 订单Id */
    orderNumber: number
    /** 开始时间 */
    beginDate?: string
    /** 结束时间 */
    endDate?: string
  }

  /** Response For  GetStuFeeDocTuitionCostById */
  export interface GetStuFeeDocTuitionCostByIdResponse {
    /** 学费变动记录统计信息 */
    info: TuitionCostStatisticsResponse
    /** 描述缺失 */
    totalCount: number
    /** 描述缺失 */
    currentIndex: number
    /** 描述缺失 */
    itemCount: number
    /** 描述缺失 */
    list: StuFeeDocTuitionCostListResponse[]
  }

  /** 学费变动记录统计信息 */
  export interface TuitionCostStatisticsResponse {
    /** 记录总数 */
    totalCount: number
    /** 变动总学费 */
    changedTuitionTotal: number
    /** 变动总课时 */
    changeClassTimesTotal: number
  }

  /** 学费变动记录列表 */
  export interface StuFeeDocTuitionCostListResponse {
    /** 变动id */
    changeId: number
    /** 变动日期 */
    changedAt?: string
    /** 变动学费 */
    changedTuition: number
    /** 变动课时 */
    changeClassTimes: number
    /** 变动原因，即类型 */
    tuitionCause?: string
    /** 指示跳转记录的详情页，0导入、乐高停课、乐高复课、结课（不需要跳转详），1 记上课、乐高消超，2 订单 */
    tuitionTypeForDetail: number
    /** 订单类型来指示跳转订单的详情页，0不需要跳转，   1 报名，2 账户余额变动，3 转课，4 停课，5 复课，6 结课，7 退费，8 教材杂费，9 积分，10 补费 */
    tuitionTranOrderType: number
  }

  /** 描述缺失 */
  export interface GetStuFeeDocWithStuInfoByIdResponse {
    /** 学员头像156 */
    headImgUrl156?: string
    /** 学员头像512 */
    headImgUrl512?: string
    /** 学员id */
    stuInfoId: number
    /** 学员姓名 */
    stuName?: string
    /** 校区名 */
    schoolName?: string
    /** 课程名 */
    lessonName?: string
    /** 课程类型，1 班课，2 一对一 Enum 枚举类型 */
    lessonMode: 1 | 2
  }

  /** 描述缺失 */
  export interface GetPhoneByStuInfoIdResponse {
    /** 学员id */
    stuInfoId: number
    /** 主要联系电话 */
    motherTel?: string
    /** 次要联系电话 */
    fatherTel?: string
    /** 其他联系电话 */
    otherTel?: string
    /** MotherTel字段所属关系 */
    motherTelRelationship: number
    /** fatherTel字段所属关系 */
    fatherTelRelationship: number
    /** otherTel字段所属关系 */
    otherTelRelationship: number
  }

  /** 根据学员Id返回学员详情 */
  export interface GetStuInfoDetailResponse {
    /** 学员详情数据 */
    stuInfoDetail: StuInfoDetailDto
    /** stuinfo扩展属性 */
    stuInfoExtend: StuInfoExtendDto
    /** 扩展属性配置 */
    extendConfigs: ExtendConfigDto[]
    /** 下拉项 */
    extendAttributeItems: ExtendAttributeItemsDto[]
    /** 所有预留字段和自定义字段 */
    orgExtendConfigShowns: OrgExtendConfigShownDto[]
  }

  /** 学员详情数据 */
  export interface StuInfoDetailDto {
    /** 描述缺失 */
    sphHome?: boolean
    /** 校区名字 */
    schoolName?: string
    /** 咨询课程1 */
    firstLessonClassName?: string
    /** 咨询课程2 */
    secondLessonClassName?: string
    /** 咨询课程3 */
    thirdLessonClassName?: string
    /** 渠道名 */
    channelName?: string
    /** 销售员员工姓名 */
    hrdocName?: string
    /** 是否删除 */
    deleted?: boolean
    /** 积分 */
    credit: number
    /** 显示用的账号名（账号名/未关联账号/已删除） */
    salesManViewName?: string
    /** 学员跟进人关系 */
    stuInfoFollowUpRelations: StuInfoFollowUpRelationDto[]
    /** 学员信息ID；  报名新增时，新增学员不需要此参数，选择已有学员需要此参数；  报名/复课编辑，必需要此属性，其它属性都不需要；  批量升期/批量续费时，需要此参数，其他属性不需要 */
    id: number
    /** 机构Id */
    orgId: number
    /** 学生姓名 */
    stuName?: string
    /** 性别 */
    sex?: string
    /** 生日 */
    birthDate?: string
    /** 主要联系电话 */
    motherTel?: string
    /** 次要联系电话 */
    fatherTel?: string
    /** 其他联系电话 */
    otherTel?: string
    /** 仅咨询/已报名；  报名新增时不需要传此参数，服务端重置此值为true（已报名）； */
    enrolled?: boolean
    /** 磁卡ID */
    cardId?: string
    /** 公立学校 */
    pubSchoolName?: string
    /** 学校年级班级 */
    pubSchoolGradeClass?: string
    /** 家庭地址 */
    homeAdd?: string
    /** 其他信息 */
    comment?: string
    /** 学员录入系统的业务时间，根据每个用户的不同情况，在录入时允许被修改；  报名新增时不需要传此参数； */
    addDate?: string
    /** 学员录入系统的真实时间，自动生成，不可被修改；  报名新增时不需要传此参数； */
    createdAt?: string
    /** 销售员更新时间；  报名新增时不需要传此参数； */
    salesmanEditDate?: string
    /** 备用字段1；  暂未使用； */
    cust1?: string
    /** 备用字段2；  暂未使用； */
    cust2?: string
    /** 备用字段3；  暂未使用； */
    cust3?: string
    /** 备用字段4；  暂未使用； */
    cust4?: string
    /** 备用字段5；  暂未使用； */
    cust5?: string
    /** 小头像地址，非必填 */
    headImgUrl156?: string
    /** 大头像地址，非必填 */
    headImgUrl512?: string
    /** 学员账户：余额；  报名新增时不需要传此参数； */
    remain: number
    /** 学员账户：杂费(已用钱，用于购买教材杂项)；  报名新增时不需要传此参数； */
    misc: number
    /** 学员账户：已用积分；  报名新增时不需要传此参数； */
    usedCredit: number
    /** 学员账户：未用积分；  报名新增时不需要传此参数； */
    unusedCredit: number
    /** 所属校区Id；  报名新增时不需要传此参数，新建学员服务端设置为订单的经办校区； */
    schoolId: number
    /** 咨询中录入的微信号 */
    weChatId?: string
    /** 跟进状态：1：待跟进、2：跟进中、3：已成交、4：已失效、5：已到访、6：已邀约、7：已试听；  报名新增时不需要传此参数，服务端设置为3（已成交）； */
    followUpState: number
    /** 编辑时间；  报名新增时不需要传此参数； */
    editDate?: string
    /** 是否新线索：0旧 false，1新 true；  报名新增时不需要传此参数； */
    isActive?: boolean
    /** 最近参与活动时间；  报名新增时不需要传此参数； */
    recentInteractiveAt?: string
    /** 行政区域编码；  报名新增时不需要传此参数； */
    districtId: number
    /** 销售员 */
    salesman?: string
    /** 销售员员工Id；  报名新增时不需要传此参数； */
    salesManHrDocId: number
    /** 销售来源；  报名新增时不需要传此参数； */
    salesway?: string
    /** 意向度；  报名新增时不需要传此参数，新建学员服务端设置为“？”； */
    interest?: string
    /** 标记；  报名新增时不需要传此参数； */
    marker?: string
    /** 归属(经办)校区Id；  报名新增时不需要传此参数，服务端设置为订单经办校区； */
    ascriptionSchoolId: number
    /** 员工id,默认0。销售员；  报名新增时不需要传此参数； */
    hrDocId: number
    /** 咨询方式：来电/来访/网络/其他；  报名新增时不需要传此参数； */
    method?: string
    /** 咨询课程ID；  报名新增时不需要传此参数； */
    lessonClassId: number
    /** 咨询课程2ID；  报名新增时不需要传此参数； */
    secondLessonClassId: number
    /** 咨询课程3ID；  报名新增时不需要传此参数； */
    thirdLessonClassId: number
    /** 经办人；  报名新增时不需要传此参数； */
    user?: string
    /** 渠道Id */
    channelId: number
    /** 学生来源标记  901：校宝9校宝秀(微店)，  1001：校宝10校宝秀(微店),  1002：移动咨询本快速新增,  1003：pc咨询本新增咨询,  1004：pc咨询本批量导入,  1005：
     * 办理中心新生报名,  1006：批量导入学员,  1007：校宝家系统报名；  报名新增时不需要传此参数； */
    registerWay: number
    /** 欠费金额(汇总学员相关的交易欠费金额)；  报名新增时不需要传此参数； */
    arrearage: number
    /** 0：默认值,无关  1：母亲  5：父亲  9：本人  13：其他  MotherTel字段所属关系 */
    motherTelRelationship: number
    /** 0：默认值,无关  1：母亲  5：父亲  9：本人  13：其他  fatherTel字段所属关系 */
    fatherTelRelationship: number
    /** 0：默认值,无关  1：母亲  5：父亲  9：本人  13：其他  otherTel字段所属关系 */
    otherTelRelationship: number
    /** 关注人数 */
    sphSubscribeCount: number
    /** 来源类型 */
    sourceType?: string
    /** 来源描述 */
    sourceName?: string
    /** 来源Id */
    sourceId: number
    /** 学费档案数量 */
    stuFeeDocCount: number
  }

  /** stuinfo扩展属性 */
  export interface StuInfoExtendDto {
    /** 扩展属性值id  报名时不需要此参数 */
    id: number
    /** 学员id  报名时不需要此参数,新增学员时取学员id。编辑学员此参数无用。 */
    stuInfoId: number
    /** 机构id  报名时不需要此参数,新增学员时取学员上的机构id。编辑学员此参数无用。 */
    orgId: number
    /** 身份证号 */
    identityCard?: string
    /** 学员的行业 */
    industry: number
    /** 学员的职业 */
    pofession: number
    /** 是否允许数据库营销 */
    dbmarketing: number
    /** 机构学员的档案号 */
    stuFileNumber?: string
    /** 小学学校 */
    primarySchool: number
    /** 初中学校 */
    juniorHighSchool: number
    /** 高中学校 */
    seniorHighSchool: number
    /** 民族 */
    nation: number
    /** 家长姓名 */
    parentName?: string
    /** 年级 */
    grade1: number
    /** 合同编号,过个合同编号之间用逗号分隔 */
    contractNumber?: string
    /** 是否参与保险 */
    joinedInsurance: number
    /** 段位 */
    taekwondoRank: number
    /** 幼儿园 */
    kindergarten: number
    /** QQ号码 */
    qqNumber?: string
    /** 毕业时间 */
    graduationTime?: string
    /** 毕业院校 */
    graduationSchool?: string
    /** 所学专业 */
    profession?: string
    /** 单位名称 */
    companyName?: string
    /** 最高学历 */
    highestEducation: number
  }

  /** 扩展属性信息 */
  export interface ExtendConfigDto {
    /** 主键 */
    id: number
    /** 机构Id  注：行业版二期停用此字段，原数据迁移到orgextendconfig。为兼容多个版本同时开发，取数据为0的为通用配置项。 */
    orgId: number
    /** 实体 */
    entity?: string
    /** 字段 */
    column?: string
    /** 列名 */
    columnName?: string
    /** 查询类型  0：不生成搜索或筛选  1：列表页搜索  2：列表页筛选 */
    filterType: number
    /** 是否启用，1：启用；0：不启用 */
    enable?: boolean
    /** 列表上是否默认显示，1：是；0：否； */
    isDefaultShow?: boolean
    /** 组件外观，1：文本；2：下拉框；3：数字，带增减按钮；4：带联想的下拉框 */
    columnType: number
    /** 是否可编辑，1(true)：是；0(false)：否； */
    editable?: boolean
    /** 最大字符长度 */
    maxLength: number
    /** 服务端验证函数名称，为空时不进行验证 */
    validateFunctionName?: string
    /** 是否作为导入模板的字段 */
    isExcelField?: boolean
    /** Excel模板列头备注内容 */
    excelComment?: string
    /** 是否为自定义字段，1(true)：是；0(false)：否； */
    isCustomField?: boolean
    /** 排序顺序 */
    sortNum: number
  }

  /** 扩展属性-下拉选项配置表 */
  export interface ExtendAttributeItemsDto {
    /** 描述缺失 */
    id: number
    /** 机构Id */
    orgId: number
    /** 扩展名称 */
    name?: string
    /** 实体表名 */
    entity?: string
    /** 字段 */
    column?: string
    /** 是否显示  默认为0 */
    isHidden?: boolean
  }

  /** 描述缺失 */
  export interface OrgExtendConfigShownDto {
    /** 机构ID */
    orgId: number
    /** 属性名 */
    column?: string
    /** 属性中文名 */
    columnName?: string
    /** 字段值(数字类型的下拉) */
    value?: string
    /** 字段值(字符类型的下拉) */
    columnValue?: string
    /** 0：未定义  1：文本框  2：(可编辑下拉项)下拉框  3：(数值)带上、下按钮增加、减少的整数文本框  4：(可编辑下拉项)带联想功能的下拉框  5：日期类型（可以手动输入）  6：(文本)支持远
     * 程搜索的下拉框  7：(可编辑下拉项)支持远程搜索的下拉框(只查询extendattributeitems)  8：文本域  组件外观 */
    columnType: number
    /** 最大字符长度 */
    maxLength: number
    /** 是否为自定义字段 */
    isCustomField?: boolean
    /** 1：固定字段  2：学员信息的预留字段  3：学员扩展信息的预留字段  4：自定义字段  固定字段，stuinfo上的预留字段，stuinfoextend上的预留字段，自定义字段 */
    columnSourceType: number
    /** 过滤类型： 1：搜索；2：筛选，0：不用' */
    siftType: number
    /** 是否必填 */
    required?: boolean
    /** 是否启用 */
    activate?: boolean
    /** 下拉框数据源集合 */
    dropDownListDataSource: ExtendAttributeItems[]
    /** 下拉框数据源URL */
    dropDownListDataSourceUrl?: string
    /** 排序 */
    sortNum: number
    /** 主键 */
    id: number
  }

  /** 描述缺失 */
  export interface StuInfoFollowUpRelationDto {
    /** 机构ID */
    orgId: number
    /** 咨询学员id */
    stuInfoId: number
    /** 销售员id */
    hrDocId: number
    /** 登录账号名 */
    userName?: string
    /** 员工类型 */
    followUpPeopleId: number
    /** 最新跟进时间 */
    followUpTime?: string
    /** 0未跟进,1 已跟进 */
    followUpStatus?: boolean
    /** 售前人员类型名称 */
    followUpPeopleName?: string
    /** 员工名称 */
    hrdocName?: string
    /** 是否在新增页面上有 */
    addConsult?: boolean
    /** 是否在编辑页面 */
    editFollowUp?: boolean
  }

  /** 扩展属性-下拉选项配置表 */
  export interface ExtendAttributeItems {
    /** 描述缺失 */
    id: number
    /** 机构Id */
    orgId: number
    /** 扩展名称 */
    name?: string
    /** 实体表名 */
    entity?: string
    /** 字段 */
    column?: string
    /** 是否显示  默认为0 */
    isHidden?: boolean
  }

  /** 学员信息 */
  export interface StuInfoDto {
    /** 学员信息ID；  报名新增时，新增学员不需要此参数，选择已有学员需要此参数；  报名/复课编辑，必需要此属性，其它属性都不需要；  批量升期/批量续费时，需要此参数，其他属性不需要 */
    id: number
    /** 机构Id */
    orgId: number
    /** 学生姓名 */
    stuName?: string
    /** 性别 */
    sex?: string
    /** 生日 */
    birthDate?: string
    /** 主要联系电话 */
    motherTel?: string
    /** 次要联系电话 */
    fatherTel?: string
    /** 其他联系电话 */
    otherTel?: string
    /** 仅咨询/已报名；  报名新增时不需要传此参数，服务端重置此值为true（已报名）； */
    enrolled?: boolean
    /** 磁卡ID */
    cardId?: string
    /** 公立学校 */
    pubSchoolName?: string
    /** 学校年级班级 */
    pubSchoolGradeClass?: string
    /** 家庭地址 */
    homeAdd?: string
    /** 其他信息 */
    comment?: string
    /** 学员录入系统的业务时间，根据每个用户的不同情况，在录入时允许被修改；  报名新增时不需要传此参数； */
    addDate?: string
    /** 学员录入系统的真实时间，自动生成，不可被修改；  报名新增时不需要传此参数； */
    createdAt?: string
    /** 销售员更新时间；  报名新增时不需要传此参数； */
    salesmanEditDate?: string
    /** 备用字段1；  暂未使用； */
    cust1?: string
    /** 备用字段2；  暂未使用； */
    cust2?: string
    /** 备用字段3；  暂未使用； */
    cust3?: string
    /** 备用字段4；  暂未使用； */
    cust4?: string
    /** 备用字段5；  暂未使用； */
    cust5?: string
    /** 小头像地址，非必填 */
    headImgUrl156?: string
    /** 大头像地址，非必填 */
    headImgUrl512?: string
    /** 学员账户：余额；  报名新增时不需要传此参数； */
    remain: number
    /** 学员账户：杂费(已用钱，用于购买教材杂项)；  报名新增时不需要传此参数； */
    misc: number
    /** 学员账户：已用积分；  报名新增时不需要传此参数； */
    usedCredit: number
    /** 学员账户：未用积分；  报名新增时不需要传此参数； */
    unusedCredit: number
    /** 所属校区Id；  报名新增时不需要传此参数，新建学员服务端设置为订单的经办校区； */
    schoolId: number
    /** 咨询中录入的微信号 */
    weChatId?: string
    /** 跟进状态：1：待跟进、2：跟进中、3：已成交、4：已失效、5：已到访、6：已邀约、7：已试听；  报名新增时不需要传此参数，服务端设置为3（已成交）； */
    followUpState: number
    /** 编辑时间；  报名新增时不需要传此参数； */
    editDate?: string
    /** 是否新线索：0旧 false，1新 true；  报名新增时不需要传此参数； */
    isActive?: boolean
    /** 最近参与活动时间；  报名新增时不需要传此参数； */
    recentInteractiveAt?: string
    /** 行政区域编码；  报名新增时不需要传此参数； */
    districtId: number
    /** 销售员 */
    salesman?: string
    /** 销售员员工Id；  报名新增时不需要传此参数； */
    salesManHrDocId: number
    /** 销售来源；  报名新增时不需要传此参数； */
    salesway?: string
    /** 意向度；  报名新增时不需要传此参数，新建学员服务端设置为“？”； */
    interest?: string
    /** 标记；  报名新增时不需要传此参数； */
    marker?: string
    /** 归属(经办)校区Id；  报名新增时不需要传此参数，服务端设置为订单经办校区； */
    ascriptionSchoolId: number
    /** 员工id,默认0。销售员；  报名新增时不需要传此参数； */
    hrDocId: number
    /** 咨询方式：来电/来访/网络/其他；  报名新增时不需要传此参数； */
    method?: string
    /** 咨询课程ID；  报名新增时不需要传此参数； */
    lessonClassId: number
    /** 咨询课程2ID；  报名新增时不需要传此参数； */
    secondLessonClassId: number
    /** 咨询课程3ID；  报名新增时不需要传此参数； */
    thirdLessonClassId: number
    /** 经办人；  报名新增时不需要传此参数； */
    user?: string
    /** 渠道Id */
    channelId: number
    /** 学生来源标记  901：校宝9校宝秀(微店)，  1001：校宝10校宝秀(微店),  1002：移动咨询本快速新增,  1003：pc咨询本新增咨询,  1004：pc咨询本批量导入,  1005：
     * 办理中心新生报名,  1006：批量导入学员,  1007：校宝家系统报名；  报名新增时不需要传此参数； */
    registerWay: number
    /** 欠费金额(汇总学员相关的交易欠费金额)；  报名新增时不需要传此参数； */
    arrearage: number
    /** 0：默认值,无关  1：母亲  5：父亲  9：本人  13：其他  MotherTel字段所属关系 */
    motherTelRelationship: number
    /** 0：默认值,无关  1：母亲  5：父亲  9：本人  13：其他  fatherTel字段所属关系 */
    fatherTelRelationship: number
    /** 0：默认值,无关  1：母亲  5：父亲  9：本人  13：其他  otherTel字段所属关系 */
    otherTelRelationship: number
    /** 关注人数 */
    sphSubscribeCount: number
    /** 来源类型 */
    sourceType?: string
    /** 来源描述 */
    sourceName?: string
    /** 来源Id */
    sourceId: number
    /** 学费档案数量 */
    stuFeeDocCount: number
  }

  /** 学员沟通记录 */
  export interface GetCommuListResponse {
    /** 描述缺失 */
    id: number
    /** 描述缺失 */
    orgId: number
    /** 描述缺失 */
    schoolId: number
    /** 描述缺失 */
    stuInfoId: number
    /** 描述缺失 */
    commuType?: string
    /** 沟通内容 */
    commuContent?: string
    /** 描述缺失 */
    commuResult?: string
    /** 沟通时间 */
    dateTime?: string
    /** 描述缺失 */
    user?: string
    /** 是否开启回访提醒 */
    isRemind?: boolean
    /** 提醒日期 */
    remindDate?: string
    /** 是否已回访 */
    isDone?: boolean
  }

  /** 学员沟通记录 */
  export interface GetCommuInfoResponse {
    /** 描述缺失 */
    id: number
    /** 描述缺失 */
    orgId: number
    /** 描述缺失 */
    schoolId: number
    /** 描述缺失 */
    stuInfoId: number
    /** 描述缺失 */
    commuType?: string
    /** 沟通内容 */
    commuContent?: string
    /** 描述缺失 */
    commuResult?: string
    /** 沟通时间 */
    dateTime?: string
    /** 描述缺失 */
    user?: string
    /** 是否开启回访提醒 */
    isRemind?: boolean
    /** 提醒日期 */
    remindDate?: string
    /** 是否已回访 */
    isDone?: boolean
  }

  /** 互动记录 */
  export interface GetInteractiveRecordListResponse {
    /** 描述缺失 */
    contentTemplateData?: string
    /** 描述缺失 */
    createdAt?: string
    /** 描述缺失 */
    introducerName?: string
    /** 描述缺失 */
    introducerPhone?: string
    /** 描述缺失 */
    sceneCreateUserName?: string
    /** 描述缺失 */
    sceneTitle?: string
    /** 描述缺失 */
    schoolPalOrgUserId: number
    /** 描述缺失 */
    schoolPalStuInfoId: number
  }

  /** 学员文件夹 */
  export interface GetStuInfoAttchmentListResponse {
    /** 描述缺失 */
    id: number
    /** 描述缺失 */
    stuinfoId: number
    /** 描述缺失 */
    orgId: number
    /** 描述缺失 */
    fileName?: string
    /** 描述缺失 */
    size: number
    /** 文件格式 */
    fileExtension?: string
    /** 描述缺失 */
    fileUrl?: string
    /** 是否在校宝家显示 */
    isShowOnSPH: number
    /** 描述缺失 */
    uploadedTime?: string
    /** 操作人HrdocId */
    uploader: number
    /** 操作人名字 */
    uploaderName?: string
    /** 学员名字 */
    stuName?: string
  }

  /** 咨询操作日志 */
  export interface GetConsultOperationLogListResponse {
    /** 主键Id */
    id: number
    /** 机构Id */
    orgId: number
    /** 描述缺失 */
    userId: number
    /** 机构用户名 */
    userName?: string
    /** 创建时间 */
    createdTime?: string
    /** 操作类型  1：销售员日志  2：学员详情日志  3：意向课程日志  4：试听记录日志 */
    operationType: number
    /** 操作内容 */
    content?: string
    /** 操作ID的类型，如：StuInfoID */
    revIdType?: string
    /** 操作ID */
    revId: number
    /** 操作ID集合，逗号隔开 */
    revIds?: string
  }

  /** 描述缺失 */
  export interface CheckStuInfoNameAndPhoneResponse {
    /** 描述缺失 */
    stuNameStatus: number
    /** 描述缺失 */
    motherTelStatus: number
    /** 描述缺失 */
    fatherTelStatus: number
    /** 描述缺失 */
    otherStatus: number
  }

  /** 描述缺失 */
  export interface GetLessonEnrollStuListDataResponse {
    /** 学费账户id */
    stuFeedocId: number
    /** 学员id */
    stuInfoId: number
    /** 学员姓名 */
    stuName?: string
    /** 电话 */
    phoneTel?: string
    /** 电话主人和学员的关系 */
    relationShip: number
    /** 在读班级数 */
    classCount: number
    /** 学费账户状态 */
    status: number
    /** 课程名 */
    lessonName?: string
    /** 课程Id */
    lessonId: number
    /** 校区 */
    schoolName?: string
    /** 是否升期 */
    isUp?: boolean
    /** 欠费金额(汇总学员相关的交易欠费金额) */
    arrearage: number
    /** 总学费 */
    totalTuition: number
    /** 实缴学费 */
    totalActualIncome: number
    /** 已用学费 */
    usedTuition: number
    /** 剩余学费 */
    tuition: number
    /** 课时有效期 */
    expiryDate?: string
    /** 课程开始时间 */
    beginDate?: string
    /** 收费模式 */
    feeMode: number
    /** 模式 班课/一对一 */
    mode: number
    /** 未用课时 */
    unusedClassTimes: number
    /** 未用时间（单位天） */
    unusedTime: number
    /** 购买时间（单位天） */
    allTime: number
    /** 购买课时 */
    allClassTimes: number
    /** 是否是校宝家 */
    sphHome?: boolean
    /** 是否有停课订单 */
    isHavaStopTranOrder?: boolean
    /** 相关课程是否只有按期 */
    isOnlyBySchedule?: boolean
    /** 教材杂费 详情 */
    itemData: ItemDetails[]
  }

  /** 教材明细 */
  export interface ItemDetails {
    /** 数量 */
    count: number
    /** 名称 */
    name?: string
    /** 是否领用 */
    isGet?: boolean
  }

  /** 描述缺失 */
  export interface GetLessonEnrollStuListStatisticsDataResponse {
    /** 学员统计 */
    stuInfoStatistics: number
    /** 分班数统计 */
    distributionClassStatistics: number
    /** 缴费金额统计 */
    moneyStatistics: number
  }

  /** 描述缺失 */
  export interface GetStudocAndClassListResponse {
    /** 学生档案id */
    studocId: number
    /** 学员id */
    stuInfoId: number
    /** 学员姓名 */
    stuName?: string
    /** 电话 */
    phoneTel?: string
    /** 关系 */
    relation: number
    /** 状态 */
    status?: string
    /** 课程名 */
    lessonName?: string
    /** 班级Id */
    classId: number
    /** 班级名字 */
    className?: string
    /** 校区 */
    schoolName?: string
    /** 教师姓名 */
    teacherName?: string
    /** 上课时段 */
    classTimeDescription?: string
    /** 分班日期 */
    addDate?: string
    /** 是否升期 */
    isUp?: boolean
    /** 是否是校宝家 */
    sphHome?: boolean
  }

  /** 描述缺失 */
  export interface GetStuInfoListDataResponse {
    /** 描述缺失 */
    id: number
    /** 学员名 */
    stuName?: string
    /** 性别 */
    sex?: string
    /** 联系人电话 */
    telPhone?: string
    /** 余额 */
    remain: number
    /** 生日 */
    birthDate?: string
    /** 磁卡 */
    cardID?: string
    /** 已经使用的积分 */
    unUsedCredit: number
    /** 其他信息 */
    comment?: string
    /** 微信号 */
    weChatId?: string
    /** 用于计算会员等级的积分（全部积分） */
    calcLevelCredit: number
    /** 是否星标 */
    isCollection?: boolean
    /** 校宝家是否关注 */
    sphHome?: boolean
    /** 公立学校 */
    pubSchoolName?: string
    /** 公立班级 */
    pubSchoolGradeClass?: string
    /** 居住区域 */
    homeAdd?: string
    /** 描述缺失 */
    identityCard?: string
    /** 描述缺失 */
    industry?: string
    /** 描述缺失 */
    pofession?: string
    /** 描述缺失 */
    dbmarketing?: string
    /** 描述缺失 */
    stuFileNumber?: string
    /** 小学学校 */
    primarySchool?: string
    /** 初中学校 */
    juniorHighSchool?: string
    /** 高中学校 */
    seniorHighSchool?: string
    /** 民族 */
    nation?: string
    /** 家长姓名 */
    parentName?: string
    /** 年级 */
    grade1?: string
    /** 合同编号,过个合同编号之间用逗号分隔 */
    contractNumber?: string
    /** 是否参与保险 */
    joinedInsurance?: string
    /** 段位 */
    taekwondoRank?: string
    /** 幼儿园 */
    kindergarten?: string
    /** QQ号码 */
    qqNumber?: string
    /** 毕业时间 */
    graduationTime?: string
    /** 毕业院校 */
    graduationSchool?: string
    /** 所学专业 */
    profession?: string
    /** 单位名称 */
    companyName?: string
    /** 最高学历 */
    highestEducation?: string
    /** 欠费金额 */
    arrearage: number
    /** 渠道 */
    channelName?: string
    /** MotherTel字段所属关系 */
    relationship: number
    /** 学员自定义字段数据集合 */
    stuInfoCustomDataList: StuinfoCustomData[]
    /** （积分等级图标）样式类名 */
    styleClassName?: string
  }

  /** 学员自定义字段数据 */
  export interface StuinfoCustomData {
    /** 字段名 */
    columnName?: string
    /** 自定义字段值 */
    value?: string
  }

  /** 描述缺失 */
  export interface GetStuInfoListStatisticsDataResponse {
    /** 欠款统计 */
    arrearageStatistics: number
    /** 余额统计 */
    remainStatistics: number
  }

  /** 描述缺失 */
  export interface DeleteStuInfosResponse {
    /** 成功数量 */
    succeedCount: number
    /** 失败数量 */
    failureCount: number
  }

  /** 描述缺失 */
  export interface BatchChangeResponse {
    /** 公立学校存在年级数量 */
    count: number
  }

  /** 描述缺失 */
  export interface SelectStuInfoFetchDataResponse {
    /** 学员Id */
    id: number
    /** 学员姓名 */
    name?: string
    /** 联系方式 */
    phone?: string
    /** 关系 */
    relationship: number
    /** 校区名称 */
    schoolName?: string
    /** 在读课程数 */
    readingLessonCount: number
    /** 性别 */
    sex?: string
    /** 余额 */
    remain: number
    /** 学号 */
    stuInfoNumber?: string
    /** 欠款 */
    arrearage: number
  }

  /** 描述缺失 */
  export interface GetChannelsResponse {
    /** 渠道名 */
    channelName?: string
    /** 渠道分类id */
    channelClassificationId: number
    /** 渠道id */
    id: number
    /** 【校宝秀微官网或微活动Id】 */
    schoolPalShowSceneId: number
    /** 【渠道分类英文名称】 */
    enName?: string
  }

  /** 描述缺失 */
  export interface GetChannelClassificationsResponse {
    /** 渠道分类名 */
    classificationName?: string
    /** id */
    id: number
  }

  /** 获取学员剩余积分 */
  export interface GetStuInfoUnusedCreditResponse {
    /** 学员剩余积分 */
    unusedCredit: number
  }

  /** 描述缺失 */
  export interface GetStuNameByCardResponse {
    /** 学员id */
    stuInfoId: number
    /** 学员名 */
    stuName?: string
  }

  /** Response for StudentSign */
  export interface StudentSignResponse {
    /** 头像 */
    headImgUrl512?: string
    /** 班级名 */
    className?: string
    /** 性别 */
    sex?: string
    /** 提示消息 */
    msg?: string
    /** 学员档案Id */
    stuDocId: number
    /** 学员Id */
    stuInfoId: number
    /** 考勤类型:"签退","上课" */
    signType?: string
    /** 指定学费账户的剩余课时(按期或按课时) */
    remainClassTimes: number
    /** 消耗课时 */
    consumeClassTimes: number
    /** 学费账户有效期（按课时） */
    expiryDate?: string
    /** 学员名 */
    stuName?: string
    /** 描述缺失 */
    feeMode: number
    /** 教师 */
    teacher?: string
    /** 是否手动选择日程 */
    isSelectClassSchedule?: boolean
  }

  /** 描述缺失 */
  export interface SwipeCardByStudentResponse {
    /** 学员就读班级排课信息 */
    classScheduleOfStudentList: ClassScheduleOfStudentDto[]
    /** 刷卡结果 Enum 枚举类型 */
    swipeCardResult: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
    /** 反馈消息内容 */
    feedbackMessage?: string
  }

  /** 学员就读班级排课信息 */
  export interface ClassScheduleOfStudentDto {
    /** 课程名称 */
    lessonName?: string
    /** 班级名称 */
    className?: string
    /** 教室 */
    classRoom?: string
    /** 老师 */
    teacherName?: string
    /** 上课时间段 开始时间 */
    periodStart?: string
    /** 上课时间段 结束时间 */
    periodEnd?: string
    /** 上课时间 */
    periodTime?: string
    /** 班级日程ID */
    classScheduleId: number
    /** 学员档案ID */
    stuDocId: number
    /** 描述缺失 */
    signedIn?: boolean
    /** 当前班级日程刷卡结果 Enum 枚举类型 */
    resultOfClassSchedule: 1 | 2 | 3 | 4 | 5 | 6
  }

  /** 判断是否允许删除/编辑学员上课记录 */
  export interface CheckDeleteStuTeachingLogResponse {
    /** 是否允许删除/编辑 */
    isAllow?: boolean
    /** 提示信息(不为空则做需提示) */
    message?: string
  }

  /** 判断是否允许删除/编辑学员上课记录 */
  export interface CheckEditStuTeachingLogResponse {
    /** 是否允许删除/编辑 */
    isAllow?: boolean
    /** 提示信息(不为空则做需提示) */
    message?: string
  }

  /** Response for GetTeachingLogListByClass */
  export interface GetTeachingLogsByClassResponse {
    /** 按班级上课记录统计 */
    info: TeachingLogByClassStatistics
    /** 描述缺失 */
    totalCount: number
    /** 描述缺失 */
    currentIndex: number
    /** 描述缺失 */
    itemCount: number
    /** 描述缺失 */
    list: TeachingLogsByClass[]
  }

  /** 按班级上课记录统计 */
  export interface TeachingLogByClassStatistics {
    /** 总记录数 */
    totalCount: number
    /** 教师总课时总计 */
    totalTeacherClassTimes: number
    /** 学员课时消耗总计 */
    totalStuClassTimes: number
    /** 学员学费消耗总计 */
    totalStuCost: number
  }

  /** 按班级上课记录列表 */
  export interface TeachingLogsByClass {
    /** 班级记上课id */
    id: number
    /** 该班级的上课日期 */
    dateTime?: string
    /** 课程类型 Enum 枚举类型 */
    lessonMode: 1 | 2
    /** 班级id */
    classId?: string
    /** 班级名称 */
    className?: string
    /** 课程名称 */
    lessonName?: string
    /** 教师名称 */
    teacherName?: string
    /** 助教名称 */
    assistantName?: string
    /** 实到学员数 */
    actualAttendanceCount: number
    /** 应到学员数 */
    shouldAttendanceCount: number
    /** 上课学生数量 */
    attendNumber: number
    /** 请假学生数量 */
    leaveNumber: number
    /** 旷课学生数量 */
    truantNumber: number
    /** 补课学生数量 */
    makeupNumber: number
    /** 教师课时 */
    teacherClassTime: number
    /** 该班级上课记录的学员总课时 */
    stuClassTimeTotal: number
    /** 该班级上课记录的学员总学费消耗 */
    stuCostTotal: number
    /** 上课校区 */
    schoolName?: string
    /** 科目名称 */
    subjectName?: string
    /** 上课内容 */
    lessonContent?: string
    /** 备注 */
    comment?: string
    /** 创建人 */
    addUser?: string
    /** 创建时间 */
    addDate?: string
  }

  /** Response for GetStuTeachingLogsByStuinfo */
  export interface GetStuTeachingLogsByStuInfoResponse {
    /** 按学员上课记录统计 */
    info: StuTeachingsByStuInfoStatistics
    /** 描述缺失 */
    totalCount: number
    /** 描述缺失 */
    currentIndex: number
    /** 描述缺失 */
    itemCount: number
    /** 描述缺失 */
    list: StuTeachingLogsByStuInfo[]
  }

  /** 按学员上课记录统计 */
  export interface StuTeachingsByStuInfoStatistics {
    /** 总记录数 */
    totalCount: number
    /** 总学费消耗 */
    totalStuCost: number
  }

  /** 按学员上课记录列表 */
  export interface StuTeachingLogsByStuInfo {
    /** 学员上课记录id */
    id: number
    /** 学员id */
    stuInfoId: number
    /** 班级id */
    classId: number
    /** 班级记上课id */
    teachingLogId: number
    /** 该班级的上课日期 */
    dateTime?: string
    /** 学员姓名 */
    stuName?: string
    /** 主要电话 */
    mainTel?: string
    /** 次要电话 */
    minorTel?: string
    /** 其他电话 */
    otherTel?: string
    /** 班级名称 */
    className?: string
    /** 上课校区 */
    schoolName?: string
    /** 课程名称 */
    lessonName?: string
    /** 科目名称 */
    subjectName?: string
    /** 考勤(上课)状态 */
    attendanceStatus?: string
    /** 课程类型 Enum 枚举类型 */
    lessonMode: 1 | 2
    /** 教师姓名 */
    teacherName?: string
    /** 助教姓名 */
    assistantName?: string
    /** 教师留言 */
    tComment?: string
    /** 学费消耗 */
    cost: number
    /** 课时消耗 */
    classTimes: number
  }

  /** 描述缺失 */
  export interface GetStuInfoClassTimeStatisticsResponse {
    /** 学员编号 */
    stuInfoId: number
    /** 学员姓名 */
    stuName?: string
    /** 应上课次 */
    stuNumber: number
    /** 学员课时 */
    stuClassTimes: number
    /** 学费消耗 */
    stuCost: number
  }

  /** Response for GetStuInfoClassTimeStatisticsDetail */
  export interface GetStuInfoClassTimeStatisticsDetailResponse {
    /** 学员姓名 */
    stuName?: string
    /** 上课日期 */
    date?: string
    /** 上课校区 */
    schoolName?: string
    /** 班级/一对一 Enum 枚举类型 */
    lessonMode: 1 | 2
    /** 班级名称 */
    className?: string
    /** 课程类别 */
    lessonClassName?: string
    /** 课程名称 */
    lessonName?: string
    /** 科目 */
    subjectName?: string
    /** 考勤状态 */
    attendanceStatus?: string
    /** 学员课时 */
    stuClassTimes: number
    /** 学费消耗 */
    stuCost: number
  }

  /** 刷卡记录 */
  export interface GetStuInfoSignListResponse {
    /** Id */
    id: number
    /** 刷卡时间 */
    dateTime?: string
    /** 班级名称 */
    className?: string
    /** 班级类型 */
    classMode?: string
    /** 课程类型 Enum 枚举类型 */
    lessonMode: 1 | 2
    /** 课程名称 */
    lessonName?: string
    /** 类型 */
    onOff?: string
    /** 周 */
    dayName?: string
  }

  /** 试听记录 */
  export interface GetTrialListResponse {
    /** 描述缺失 */
    id: number
    /** 办试听时间 */
    trialTime?: string
    /** 课程Id */
    lessonId: number
    /** 课程Id */
    lessonName?: string
    /** 活动名称 */
    activityName?: string
    /** 试听教师 */
    teacherList?: string
    /** 试听教室 */
    classroomList?: string
    /** 试听上课时间 */
    periodStart?: string
    /** 试听结束时间 */
    periodEnd?: string
    /** 试听反馈 */
    trialFeedback?: string
    /** 描述缺失 */
    trialUserId: number
    /** 试听操作人 */
    userName?: string
    /** 是否转化 0：未转化  1：已转化 */
    conversion: number
    /** 试听状态   0：进行中   1：已到课   2：未到课   3：已取消 */
    trialStatus: number
    /** 是否失效 */
    invalidClassSchedule?: boolean
    /** 试听活动类型   0：开班试听   1：插班试听 */
    trialType: number
    /** 日程Id */
    classScheduleId: number
    /** 试听状态展示文案 */
    trialStatusDescription?: string
  }

  /** 当前登录用户信息 */
  export interface UserInfoResponse {
    /** 用户id */
    userId: number
    /** 员工Id */
    hrDocId: number
    /** 用户名 */
    userName?: string
    /** 所属机构 */
    orgId: number
    /** 功能权限（权限专业化） Enum 枚举类型 */
    functionAuthoritys: Array<
      | 110010
      | 110020
      | 110030
      | 110040
      | 120010
      | 120020
      | 120030
      | 120040
      | 120050
      | 120060
      | 120070
      | 120073
      | 120075
      | 120080
      | 120082
      | 120090
      | 120091
      | 120100
      | 120110
      | 120120
      | 120130
      | 120140
      | 120150
      | 120160
      | 120170
      | 120180
      | 120190
      | 120200
      | 120210
      | 120220
      | 120230
      | 120240
      | 120250
      | 120260
      | 120270
      | 120280
      | 120290
      | 120300
      | 120310
      | 120320
      | 120330
      | 120340
      | 120350
      | 130010
      | 130020
      | 130023
      | 130024
      | 130025
      | 130026
      | 130027
      | 130028
      | 130030
      | 130032
      | 130033
      | 130035
      | 130040
      | 130041
      | 130045
      | 130050
      | 130060
      | 130070
      | 130080
      | 130090
      | 130100
      | 130110
      | 130120
      | 130130
      | 130140
      | 140010
      | 140012
      | 140015
      | 140020
      | 140025
      | 140030
      | 140035
      | 150010
      | 150020
      | 150030
      | 150035
      | 150040
      | 150050
      | 150060
      | 150065
      | 150070
      | 150080
      | 150090
      | 150100
      | 150110
      | 150120
      | 160010
      | 160020
      | 160030
      | 160040
      | 170011
      | 170012
      | 170013
      | 170014
      | 170015
      | 170016
      | 170017
      | 170020
      | 180010
      | 180020
      | 190010
      | 190020
      | 190025
      | 190030
      | 190035
      | 190040
      | 190045
      | 190047
      | 190050
      | 190060
      | 190065
      | 190067
      | 190070
      | 190080
      | 190090
      | 190095
      | 190100
      | 190105
      | 190110
      | 200010
      | 200020
      | 200030
      | 200031
      | 200033
      | 200035
      | 200036
      | 200037
      | 200040
      | 200041
      | 200060
      | 200070
      | 200080
      | 210010
      | 210020
      | 210022
      | 210024
      | 210025
      | 210026
      | 210028
      | 210030
      | 210040
      | 210050
      | 210060
      | 210080
      | 210085
      | 220010
      | 220011
      | 220012
      | 220020
      | 220021
      | 220030
      | 220033
      | 220034
      | 220040
      | 230010
      | 230020
      | 230030
      | 230040
      | 240010
      | 240020
      | 240030
      | 240040
      | 240050
      | 240060
      | 240070
      | 240080
      | 240090
      | 240100
      | 240110
      | 240120
      | 240130
      | 240140
      | 240150
      | 240160
      | 240170
      | 250010
      | 250020
      | 250030
      | 250031
      | 250040
      | 250050
      | 250060
      | 250070
      | 250080
      | 250110
      | 250120
      | 250900
      | 250905
      | 250910
      | 255080
      | 255090
      | 255100
      | 255110
      | 255120
      | 255130
      | 255200
      | 255210
      | 255220
      | 255230
      | 260010
      | 260020
      | 260030
      | 260040
      | 260050
      | 260060
      | 260070
      | 260080
      | 270015
      | 280010
      | 280020
      | 280030
      | 280035
      | 280040
      | 290010
      | 300020
      | 300030
      | 300040
      | 330010
      | 480010
      | 480030
      | 480040
      | 480050
      | 480060
      | 480070
      | 480080
      | 480090
      | 490010
      | 500010
      | 500020
      | 500030
      | 660010
      | 660020
      | 660030
      | 10010100
      | 10010200
      | 10010400
      | 10010500
      | 10010600
      | 10010700
    >
    /** 当前账号关联的员工姓名 */
    employeeName?: string
    /** 管辖校区 */
    schoolLimit?: string
    /** 是否是管理员 */
    isAdmin?: boolean
  }

  /** 个人中心 */
  export interface GetUserCenterResponse {
    /** 用户id */
    userId: number
    /** 是否没有机构 */
    isWithoutOrg?: boolean
    /** 是否是个人版 */
    isPersonal?: boolean
    /** 主题 */
    theme?: string
    /** 用户号码 */
    userTelephone?: string
    /** 当前账号关联的员工姓名 */
    employeeName?: string
    /** 绑定账号列表 */
    bindOrgUsers: BindOrgUsersResponse[]
    /** 手机登录的Id */
    signId: number
  }

  /** 绑定账号列表Respnose */
  export interface BindOrgUsersResponse {
    /** 管辖校区 */
    schoolLimitNames?: string
    /** 描述缺失 */
    id: number
    /** 描述缺失 */
    name?: string
    /** 描述缺失 */
    roleName?: string
    /** 描述缺失 */
    userId: number
    /** 描述缺失 */
    enable: number
    /** 描述缺失 */
    isVerifyPhone: number
    /** 描述缺失 */
    signId: number
    /** 描述缺失 */
    orgId: number
    /** 描述缺失 */
    ename?: string
    /** 描述缺失 */
    userName?: string
    /** 描述缺失 Enum 枚举类型 */
    level: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
    /** 描述缺失 */
    schoolName?: string
    /** 描述缺失 */
    crmver?: string
    /** 描述缺失 */
    enableTimeStart?: string
    /** 描述缺失 */
    enableTimeEnd?: string
    /** 描述缺失 */
    enableWeekDays?: string
    /** 描述缺失 */
    validdate?: string
    /** 描述缺失 */
    schoollimit?: string
  }
}
export default SchoolPalWebModelResponse
