import SchoolPalWebModelRequest from './SchoolPalWebModelRequest'
import StuInfos = SchoolPalWebModelRequest.StuInfos
namespace SchoolPalWebModelRequestClassManage {
  /** 分班入参 */
  export interface AssignClassRequest {
    /** 班级Id */
    classId?: number
    /** 学员集合 */
    stuInfoList: StuInfos[]
    /** 课程Id */
    lessonId?: number
    /** 当前班级的schollId */
    schoolId?: number
  }

  /** 删除学员档案 */
  export interface DeleteStuDocRequest {
    /** 班级Id */
    classId?: number
    /** StuDocId */
    stuDocId?: number
    /** StuInfoId */
    stuInfoId?: number
  }
}
export default SchoolPalWebModelRequestClassManage
