namespace SchoolPalCloudServiceModel {
  /** 描述缺失 */
  export interface PageResult<T0> {
    /** 描述缺失 */
    totalCount: number
    /** 描述缺失 */
    currentIndex: number
    /** 描述缺失 */
    itemCount: number
    /** 描述缺失 */
    list: T0
  }

  /** 描述缺失 */
  export interface PageArgument {
    /** 描述缺失 */
    pageIndex?: number
    /** 描述缺失 */
    pageSize?: number
  }
}
export default SchoolPalCloudServiceModel
