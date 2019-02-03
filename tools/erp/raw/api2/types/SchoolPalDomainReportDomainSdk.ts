namespace SchoolPalDomainReportDomainSdk {
  /** 描述缺失 */
  export interface SeriesData {
    /** 描述缺失 */
    name?: string
    /** 描述缺失 */
    type?: string
    /** 描述缺失 */
    data?: number[]
  }

  /** 描述缺失 */
  export interface UsedTuitionSummaryModel {
    /** 描述缺失 */
    averageUnitPrice?: number
    /** 描述缺失 */
    totalCount?: number
    /** 描述缺失 */
    currentIndex?: number
    /** 描述缺失 */
    itemCount?: number
    /** 描述缺失 */
    list: UsedTuitionSummaryItemModel[]
  }

  /** 描述缺失 */
  export interface UsedTuitionSummaryItemModel {
    /** 描述缺失 */
    categoryId?: string
    /** 描述缺失 */
    categoryName?: string
    /** 描述缺失 */
    shouldAttendanceCount?: number
    /** 描述缺失 */
    actualAttendanceCount?: number
    /** 描述缺失 */
    attendanceRate?: number
    /** 描述缺失 */
    classTime?: number
    /** 描述缺失 */
    tuition?: number
    /** 描述缺失 */
    averageUnitPrice?: number
    /** 描述缺失 */
    teacherClassTime?: number
  }

  /** 描述缺失 */
  export interface UsedTuitionDetailModel {
    /** 描述缺失 */
    teachingLogDateTime?: string
    /** 描述缺失 */
    schoolName?: string
    /** 描述缺失 */
    className?: string
    /** 描述缺失 */
    lessonName?: string
    /** 描述缺失 */
    teacherName?: string
    /** 描述缺失 */
    subjectName?: string
    /** 描述缺失 */
    lessonClassName?: string
    /** 描述缺失 */
    shouldAttendanceCount?: number
    /** 描述缺失 */
    actualAttendanceCount?: number
    /** 描述缺失 */
    teacherClassTime?: number
    /** 描述缺失 */
    assistantClassTime?: number
    /** 描述缺失 */
    stuClassTime?: number
    /** 描述缺失 */
    cost?: number
  }
}
export default SchoolPalDomainReportDomainSdk
