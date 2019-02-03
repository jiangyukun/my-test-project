namespace SchoolPalDomainSdk {
  /** 描述缺失 */
  export interface FeeStandard {
    /** 描述缺失 */
    id?: number
    /** 描述缺失 Enum 枚举类型 */
    mode: 1 | 2 | 3
    /** 描述缺失 */
    unitPrice?: number
    /** 描述缺失 Enum 枚举类型 */
    unit: 2 | 3 | 4 | 5 | 6 | 7
    /** 描述缺失 */
    count?: number
    /** 描述缺失 */
    orgId?: number
    /** 描述缺失 */
    lessonId?: number
    /** 描述缺失 Enum 枚举类型 */
    classMode: 1 | 2
    /** 描述缺失 */
    price?: number
    /** 描述缺失 */
    schoolId?: number
    /** 描述缺失 */
    schoolName?: string
  }

  /** 描述缺失 */
  export interface ClassRoom {
    /** 描述缺失 */
    id?: number
    /** 描述缺失 */
    name?: string
    /** 描述缺失 */
    schoolId?: number
    /** 描述缺失 */
    orgId?: number
    /** 描述缺失 */
    deleted?: boolean
    /** 描述缺失 */
    row?: number
    /** 描述缺失 */
    column?: number
    /** 描述缺失 */
    createdAt?: string
    /** 描述缺失 */
    creator?: number
  }

  /** 描述缺失 */
  export interface ClassroomInvalidSeat {
    /** 描述缺失 */
    id?: number
    /** 描述缺失 */
    orgId?: number
    /** 描述缺失 */
    classroomId?: number
    /** 描述缺失 */
    row?: number
    /** 描述缺失 */
    column?: number
  }

  /** 描述缺失 */
  export interface ClassExtend {
    /** 描述缺失 */
    id?: number
    /** 描述缺失 */
    orgId?: number
    /** 描述缺失 */
    classId?: number
    /** 描述缺失 */
    numToOpen?: number
  }

  /** 描述缺失 */
  export interface ClassTeacher {
    /** 描述缺失 */
    id?: number
    /** 描述缺失 */
    orgId?: number
    /** 描述缺失 */
    classId?: number
    /** 描述缺失 */
    teacherName?: string
    /** 描述缺失 Enum 枚举类型 */
    targetType: 0 | 1
    /** 描述缺失 */
    hrDocId?: number
  }

  /** 描述缺失 */
  export interface ExpenditureClassModel {
    /** 描述缺失 */
    expenditureItemList: ExpenditureItem[]
    /** 描述缺失 */
    id?: number
    /** 描述缺失 */
    orgId?: number
    /** 描述缺失 */
    orderId?: number
    /** 描述缺失 */
    type?: string
    /** 描述缺失 */
    expenditureClassName?: string
    /** 描述缺失 */
    isHidden?: boolean
    /** 描述缺失 */
    oldExpenditureClassID?: number
  }

  /** 描述缺失 */
  export interface ExpenditureItem {
    /** 描述缺失 */
    id?: number
    /** 描述缺失 */
    orgId?: number
    /** 描述缺失 */
    orderId?: number
    /** 描述缺失 */
    expenditureClassId?: number
    /** 描述缺失 */
    expenditureItemName?: string
    /** 描述缺失 */
    type?: string
    /** 描述缺失 */
    isHidden?: boolean
    /** 描述缺失 */
    oldExpenditureItemID?: number
    /** 描述缺失 */
    oldExpenditureClassID?: number
  }

  /** 描述缺失 */
  export interface Item {
    /** 描述缺失 */
    id?: number
    /** 描述缺失 */
    orgId?: number
    /** 描述缺失 */
    itemType?: string
    /** 描述缺失 */
    itemName?: string
    /** 描述缺失 */
    orderId?: number
    /** 描述缺失 */
    price?: number
    /** 描述缺失 */
    purchasePrice?: number
    /** 描述缺失 */
    hidden?: boolean
    /** 描述缺失 */
    creditExchange?: boolean
    /** 描述缺失 */
    creditPrice?: number
    /** 描述缺失 */
    lessonClassId?: number
  }

  /** 描述缺失 */
  export interface SchoolInfo {
    /** 描述缺失 */
    id?: number
    /** 描述缺失 */
    name?: string
  }

  /** 描述缺失 */
  export interface SubjectInfo {
    /** 描述缺失 */
    id?: number
    /** 描述缺失 */
    name?: string
  }

  /** 描述缺失 */
  export interface LessonExtendInfo {
    /** 描述缺失 */
    academicYear?: number
    /** 描述缺失 */
    termTrimester?: number
    /** 描述缺失 */
    discipline?: number
    /** 描述缺失 */
    grade?: number
  }

  /** 描述缺失 */
  export interface FeeStandardInfo {
    /** 描述缺失 Enum 枚举类型 */
    mode: 1 | 2 | 3
    /** 描述缺失 Enum 枚举类型 */
    unit: 2 | 3 | 4 | 5 | 6 | 7
    /** 描述缺失 */
    count?: number
    /** 描述缺失 */
    price?: number
    /** 描述缺失 */
    schoolId?: number
    /** 描述缺失 */
    schoolName?: string
  }

  /** 描述缺失 */
  export interface LessonItemPackageInfo {
    /** 描述缺失 */
    itemId?: number
    /** 描述缺失 */
    count?: number
    /** 描述缺失 */
    itemName?: string
  }

  /** 描述缺失 */
  export interface FeeStandardForUpdateInfo {
    /** 描述缺失 */
    id?: number
    /** 描述缺失 Enum 枚举类型 */
    mode: 1 | 2 | 3
    /** 描述缺失 Enum 枚举类型 */
    unit: 2 | 3 | 4 | 5 | 6 | 7
    /** 描述缺失 */
    count?: number
    /** 描述缺失 */
    price?: number
    /** 描述缺失 */
    schoolId?: number
    /** 描述缺失 */
    schoolName?: string
  }

  /** 描述缺失 */
  export interface LessonModel {
    /** 描述缺失 */
    lessonClassName?: string
    /** 描述缺失 */
    feeStandards: FeeStandardModel[]
    /** 描述缺失 */
    lessonSchools: LessonSchool[]
    /** 描述缺失 */
    lessonSubjects: LessonSubject[]
    /** 描述缺失 */
    lessonExtend: LessonExtend
    /** 描述缺失 */
    lessonItemPackages: LessonItemPackage[]
    /** 描述缺失 */
    id?: number
    /** 描述缺失 */
    orgId?: number
    /** 描述缺失 Enum 枚举类型 */
    mode: 1 | 2
    /** 描述缺失 */
    lessonClassId?: number
    /** 描述缺失 */
    lessonName?: string
    /** 描述缺失 */
    orderId?: number
    /** 描述缺失 */
    hidden?: boolean
    /** 描述缺失 */
    createdTime?: string
    /** 描述缺失 */
    remark?: string
    /** 描述缺失 */
    creator?: string
    /** 描述缺失 */
    modifier?: string
    /** 描述缺失 */
    modifiedTime?: string
    /** 描述缺失 */
    allSchool?: boolean
  }

  /** 描述缺失 */
  export interface FeeStandardModel {
    /** 描述缺失 */
    id?: number
    /** 描述缺失 Enum 枚举类型 */
    mode: 1 | 2 | 3
    /** 描述缺失 */
    unitPrice?: number
    /** 描述缺失 Enum 枚举类型 */
    unit: 2 | 3 | 4 | 5 | 6 | 7
    /** 描述缺失 */
    count?: number
    /** 描述缺失 */
    orgId?: number
    /** 描述缺失 */
    lessonId?: number
    /** 描述缺失 Enum 枚举类型 */
    classMode: 1 | 2
    /** 描述缺失 */
    price?: number
    /** 描述缺失 */
    schoolId?: number
    /** 描述缺失 */
    schoolName?: string
  }

  /** 描述缺失 */
  export interface LessonSchool {
    /** 描述缺失 */
    orgId?: number
    /** 描述缺失 */
    schoolId?: number
    /** 描述缺失 */
    lessonId?: number
    /** 描述缺失 */
    schoolName?: string
  }

  /** 描述缺失 */
  export interface LessonSubject {
    /** 描述缺失 */
    id?: number
    /** 描述缺失 */
    lessonId?: number
    /** 描述缺失 */
    subjectId?: number
    /** 描述缺失 */
    orgId?: number
    /** 描述缺失 */
    createdTime?: string
    /** 描述缺失 */
    subjectName?: string
  }

  /** 描述缺失 */
  export interface LessonExtend {
    /** 描述缺失 */
    id?: number
    /** 描述缺失 */
    orgId?: number
    /** 描述缺失 */
    lessonId?: number
    /** 描述缺失 */
    academicYear?: number
    /** 描述缺失 */
    termTrimester?: number
    /** 描述缺失 */
    discipline?: number
    /** 描述缺失 */
    grade2?: number
  }

  /** 描述缺失 */
  export interface LessonItemPackage {
    /** 描述缺失 */
    id?: number
    /** 描述缺失 */
    itemId?: number
    /** 描述缺失 */
    count?: number
    /** 描述缺失 */
    lessonId?: number
    /** 描述缺失 */
    orgId?: number
    /** 描述缺失 */
    itemName?: string
  }

  /** 描述缺失 */
  export interface TranOrder {
    /** 描述缺失 */
    id?: number
    /** 描述缺失 */
    orgId?: number
    /** 描述缺失 */
    orderNumber?: number
    /** 描述缺失 Enum 枚举类型 */
    type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
    /** 描述缺失 */
    createdTime?: string
    /** 描述缺失 */
    shouldPay?: number
    /** 描述缺失 */
    realPay?: number
    /** 描述缺失 */
    hrDocId?: number
    /** 描述缺失 */
    schoolId?: number
    /** 描述缺失 */
    creator?: string
    /** 描述缺失 */
    modifier?: string
    /** 描述缺失 */
    modifiedTime?: string
    /** 描述缺失 */
    salesSource?: string
    /** 描述缺失 */
    dealDate?: string
    /** 描述缺失 */
    stuInfoId?: number
    /** 描述缺失 */
    lastSnapshotId?: number
    /** 描述缺失 */
    remain?: number
    /** 描述缺失 */
    credit?: number
    /** 描述缺失 */
    arrearage?: number
    /** 描述缺失 Enum 枚举类型 */
    status: 1 | 2 | 3 | 4
    /** 描述缺失 */
    tranorderStuinfoStuname?: string
    /** 描述缺失 */
    tranorderSchoolName?: string
    /** 描述缺失 */
    tranorderHrdocName?: string
    /** 描述缺失 */
    tranorderStuinfoMaintel?: string
    /** 描述缺失 */
    tranorderStuinfoMinortel?: string
    /** 描述缺失 */
    tranorderStuinfoOthertel?: string
    /** 描述缺失 Enum 枚举类型 */
    tranorderStuinfoMaintelrelationship: 0 | 1 | 5 | 9 | 13
    /** 描述缺失 Enum 枚举类型 */
    tranorderStuinfoMinortelrelationship: 0 | 1 | 5 | 9 | 13
    /** 描述缺失 Enum 枚举类型 */
    tranorderStuinfoOthertelrelationship: 0 | 1 | 5 | 9 | 13
    /** 描述缺失 Enum 枚举类型 */
    sourceType: 1 | 2 | 3 | 4
    /** 描述缺失 */
    hasConfirmedDetail?: boolean
    /** 描述缺失 */
    lessonEnrollFeetranCount?: number
    /** 描述缺失 */
    expiryDate?: string
    /** 描述缺失 */
    isConfirm?: boolean
  }

  /** 描述缺失 */
  export interface ItemTran {
    /** 描述缺失 */
    id?: number
    /** 描述缺失 Enum 枚举类型 */
    tranType: 1 | 2 | 3 | 4
    /** 描述缺失 */
    stuInfoId?: number
    /** 描述缺失 */
    unitPrice?: number
    /** 描述缺失 */
    count?: number
    /** 描述缺失 */
    realAmount?: number
    /** 描述缺失 */
    purchasePrice?: number
    /** 描述缺失 */
    itemId?: number
    /** 描述缺失 */
    itemGot?: boolean
    /** 描述缺失 */
    itemGotTime?: string
    /** 描述缺失 */
    tranOrderId?: number
    /** 描述缺失 */
    orgId?: number
    /** 描述缺失 */
    comment?: string
    /** 描述缺失 */
    commentOuter?: string
    /** 描述缺失 */
    originalUnitPrice?: number
    /** 描述缺失 */
    arrearage?: number
    /** 描述缺失 */
    actualIncome?: number
    /** 描述缺失 */
    purchaseItemTranId?: number
    /** 描述缺失 */
    schoolId?: number
    /** 描述缺失 */
    lessonId?: number
    /** 描述缺失 */
    lessonClassId?: number
    /** 描述缺失 */
    itemtranLessonClassName?: string
    /** 描述缺失 */
    itemtranSchoolName?: string
    /** 描述缺失 */
    itemtranLessonName?: string
    /** 描述缺失 */
    itemtranItemName?: string
    /** 描述缺失 */
    remain?: number
    /** 描述缺失 */
    stuFeeDocId?: number
  }

  /** 描述缺失 */
  export interface ExtendConfig {
    /** 描述缺失 */
    id?: number
    /** 描述缺失 */
    orgId?: number
    /** 描述缺失 */
    entity?: string
    /** 描述缺失 */
    column?: string
    /** 描述缺失 */
    columnName?: string
    /** 描述缺失 Enum 枚举类型 */
    filterType: 0 | 1 | 2
    /** 描述缺失 */
    enable?: boolean
    /** 描述缺失 */
    isDefaultShow?: boolean
    /** 描述缺失 Enum 枚举类型 */
    columnType: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
    /** 描述缺失 */
    editable?: boolean
    /** 描述缺失 */
    maxLength?: number
    /** 描述缺失 */
    validateFunctionName?: string
    /** 描述缺失 */
    isExcelField?: boolean
    /** 描述缺失 */
    excelComment?: string
    /** 描述缺失 */
    isCustomField?: boolean
    /** 描述缺失 */
    sortNum?: number
  }
}
export default SchoolPalDomainSdk
