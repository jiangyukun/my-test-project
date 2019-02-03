namespace SchoolPalCloudMarketingSDKModel {
  /** 描述缺失 */
  export interface ReqMarketingSolutionSearchDto {
    /** 描述缺失 */
    OrgId?: number
    /** 描述缺失 */
    Starttime?: string
    /** 描述缺失 */
    Endtime?: string
    /** 描述缺失 */
    Status?: number[]
    /** 描述缺失 */
    Promotiontype?: number[]
    /** 描述缺失 */
    Scopes: Scope[]
    /** 描述缺失 */
    PageIndex?: number
    /** 描述缺失 */
    PageSize?: number
    /** 描述缺失 */
    MarketingsolutionName?: string
  }

  /** 描述缺失 */
  export interface Scope {
    /** 描述缺失 */
    ScopeType?: number
    /** 描述缺失 */
    ScopeId?: number
  }

  /** 描述缺失 */
  export interface ResMarketingSolutionDto {
    /** 描述缺失 */
    TotalCount?: number
    /** 描述缺失 */
    Data: MarketingsolutionBo[]
    /** 描述缺失 */
    State?: boolean
    /** 描述缺失 */
    Code?: string
    /** 描述缺失 */
    Message?: string
  }

  /** 描述缺失 */
  export interface MarketingsolutionBo {
    /** 描述缺失 */
    MarketingsolutionId?: number
    /** 描述缺失 */
    Name?: string
    /** 描述缺失 */
    Promotiontype?: number
    /** 描述缺失 */
    Status?: number
    /** 描述缺失 */
    Starttime?: string
    /** 描述缺失 */
    Endtime?: string
  }
}
export default SchoolPalCloudMarketingSDKModel
