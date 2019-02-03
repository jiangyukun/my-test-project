namespace SchoolPalWebAuthentication {
  /** 描述缺失 */
  export interface CurrentUser {
    /** 描述缺失 */
    userId?: number
    /** 描述缺失 */
    userName?: string
    /** 描述缺失 */
    orgId?: number
    /** 描述缺失 */
    orgName?: string
    /** 描述缺失 */
    theme?: string
    /** 描述缺失 Enum 枚举类型 */
    crmver: 1 | 2 | 3 | 4 | 5
    /** 描述缺失 */
    schoolLimit?: string
    /** 描述缺失 */
    sph?: string
    /** 描述缺失 */
    moduleCard?: boolean
    /** 描述缺失 */
    cardId?: string
    /** 描述缺失 */
    enableTimeStart?: string
    /** 描述缺失 */
    enableTimeEnd?: string
    /** 描述缺失 */
    tranLockUP?: boolean
    /** 描述缺失 */
    guideMode?: boolean
    /** 描述缺失 */
    modifyDate?: string
    /** 描述缺失 */
    smsSecurity?: boolean
    /** 描述缺失 */
    creditEnaleDate?: string
    /** 描述缺失 */
    creditLevelMode?: number
    /** 描述缺失 */
    creditLevel3?: string
    /** 描述缺失 */
    creditLevel2?: string
    /** 描述缺失 */
    creditLevel1?: string
    /** 描述缺失 */
    creditCalcRate?: number
    /** 描述缺失 */
    posPrintTimes?: string
    /** 描述缺失 */
    schoolName?: string
    /** 描述缺失 */
    smsOffWork?: string
    /** 描述缺失 */
    basicSMS?: boolean
    /** 描述缺失 */
    mmUserName?: string
    /** 描述缺失 */
    refundComment?: string
    /** 描述缺失 */
    classPermitComment?: string
    /** 描述缺失 */
    schoolNameShort?: string
    /** 描述缺失 */
    customQr?: string
    /** 描述缺失 */
    qrType?: number
    /** 描述缺失 */
    sphWechart?: boolean
    /** 描述缺失 */
    allClassQuery?: number
    /** 描述缺失 */
    allTransQuery?: number
    /** 描述缺失 */
    enableClassPush?: number
    /** 描述缺失 */
    enableTransPush?: boolean
    /** 描述缺失 */
    enableClass?: boolean
    /** 描述缺失 */
    enableTrans?: boolean
    /** 描述缺失 */
    enableTransQuery?: number
    /** 描述缺失 */
    enbaleStuSignOut?: boolean
    /** 描述缺失 */
    userSex?: string
    /** 描述缺失 */
    signMode?: string
    /** 描述缺失 */
    hqTel?: string
    /** 描述缺失 */
    voucherComment?: string
    /** 描述缺失 */
    qcTel?: string
    /** 描述缺失 */
    loginTime?: string
    /** 描述缺失 */
    branchUserDeskChart?: string
    /** 描述缺失 */
    branchUserEditDelTime?: number
    /** 描述缺失 */
    sysOpenTimeStart?: string
    /** 描述缺失 */
    sysOpenTimeEnd?: string
    /** 描述缺失 */
    workTimeStart?: string
    /** 描述缺失 */
    workTimeEnd?: string
    /** 描述缺失 */
    printBar?: string
    /** 描述缺失 */
    printQR?: string
    /** 描述缺失 */
    smsRefund?: string
    /** 描述缺失 */
    smsWelcomeNewStu?: string
    /** 描述缺失 */
    posSignPrint?: string
    /** 描述缺失 */
    smsStuSign?: string
    /** 描述缺失 */
    userPW?: string
    /** 描述缺失 */
    userTel?: string
    /** 描述缺失 */
    enableWeekdays?: string
    /** 描述缺失 */
    signUser: CurrentSignUser
    /** 描述缺失 */
    schoolShortName?: string
    /** 描述缺失 */
    sphApplyRemind?: boolean
    /** 描述缺失 */
    trialClassApplyRemind?: boolean
    /** 描述缺失 */
    stuCardTimeInterval?: number
    /** 描述缺失 */
    enableRemainQuery?: number
    /** 描述缺失 */
    enableSphQr?: boolean
    /** 描述缺失 */
    enableSphApply?: boolean
    /** 描述缺失 */
    hrdocId?: number
    /** 描述缺失 */
    employeeName?: string
    /** 描述缺失 */
    hrSchoolId?: number
    /** 描述缺失 Enum 枚举类型 */
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
    /** 描述缺失 */
    orgAppConfig: OrgApplicationConfig
    /** 描述缺失 */
    isAdmin?: boolean
    /** 描述缺失 */
    sendHomeworkNotice?: boolean
    /** 描述缺失 */
    commentHomeworkNotice?: boolean
    /** 描述缺失 */
    notAllowClassScheduleOverQuota?: boolean
    /** 描述缺失 */
    applicationmoduleIds?: number[]
    /** 描述缺失 */
    source?: number
    /** 描述缺失 */
    userCommonFunctions: UserCommonFunction[]
  }

  /** 描述缺失 */
  export interface CurrentSignUser {
    /** 描述缺失 */
    id?: number
    /** 描述缺失 */
    userName?: string
    /** 描述缺失 */
    nickName?: string
    /** 描述缺失 */
    defaultUserId?: number
    /** 描述缺失 */
    bindUserIds?: number[]
    /** 描述缺失 */
    password?: string
    /** 描述缺失 */
    orgId?: number
  }

  /** 描述缺失 */
  export interface OrgApplicationConfig {
    /** 描述缺失 */
    id?: number
    /** 描述缺失 */
    orgId?: number
    /** 描述缺失 */
    isOpenStuAccount?: boolean
    /** 描述缺失 */
    isSingleAccount?: boolean
    /** 描述缺失 */
    isTrackRemain?: boolean
    /** 描述缺失 */
    todaySettleUrl?: string
    /** 描述缺失 */
    hasSettleApplication?: boolean
    /** 描述缺失 */
    isHideItemTran?: boolean
    /** 描述缺失 */
    hasTeachingLogCost?: boolean
    /** 描述缺失 */
    hasCardSign?: boolean
    /** 描述缺失 */
    hasSMS?: boolean
    /** 描述缺失 */
    hasEnrollSelectSeat?: boolean
    /** 描述缺失 */
    hasNewEnrollsPage?: boolean
    /** 描述缺失 */
    isHideBulletinBoard?: boolean
    /** 描述缺失 */
    isHideOnlineService?: boolean
    /** 描述缺失 */
    isHideHelpCenter?: boolean
    /** 描述缺失 */
    isHideOperationBanner?: boolean
  }

  /** 描述缺失 */
  export interface UserCommonFunction {
    /** 描述缺失 */
    id?: number
    /** 描述缺失 */
    orgId?: number
    /** 描述缺失 */
    userId?: number
    /** 描述缺失 */
    commonFunctionId?: number
    /** 描述缺失 */
    orderBy?: number
    /** 描述缺失 */
    createdAt?: string
    /** 描述缺失 */
    lastUpdateAt?: string
  }
}
export default SchoolPalWebAuthentication
