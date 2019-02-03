namespace SchoolPalWebModel {
  /** 描述缺失 */
  export interface PagedQueryBase {
    /** 描述缺失 */
    query?: string
    /** 描述缺失 */
    pageSize?: number
    /** 描述缺失 */
    pageIndex?: number
  }

  /** 描述缺失 */
  export interface ResponseResult {
    /** 描述缺失 */
    status?: boolean
    /** 描述缺失 */
    errorCode?: number
    /** 描述缺失 */
    errorMessage?: string
  }

  /** 图数据模型 */
  export interface SeriesDataModel {
    /** 图表项名称集合 */
    name?: string[]
    /** 数据集合 */
    seriesData: SeriesDataModelItem[]
  }

  /** 图表数据 */
  export interface SeriesDataModelItem {
    /** 柱形图名称 */
    name?: string
    /** 类型，bar */
    type?: string
    /** 数据 */
    data?: number[]
  }

  /** 描述缺失 */
  export interface StuinfoExtendSearchDto {
    /** 字段名 */
    columnName?: string
    /** 字段值 */
    value?: string
  }

  /** 样例代码 */
  export interface ValueModel {
    /** 姓名 */
    name?: string
    /** 年龄 */
    a?: number
  }

  /** 样例代码 */
  export interface ValueModels {
    /** 描述缺失 */
    list: ValueModel[]
  }
}
export default SchoolPalWebModel
