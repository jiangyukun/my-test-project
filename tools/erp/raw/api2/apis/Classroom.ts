import service from './../../api/net'
import { AxiosPromise } from 'axios'
import SchoolPalWebModelRequest from './../types/SchoolPalWebModelRequest'
import SchoolPalToolkitResponse from './../types/SchoolPalToolkitResponse'
import SchoolPalCloudServiceModel from './../types/SchoolPalCloudServiceModel'
import SchoolPalWebModelResponse from './../types/SchoolPalWebModelResponse'
import ClassroomQueryRequest = SchoolPalWebModelRequest.ClassroomQueryRequest
import ResponseResult = SchoolPalToolkitResponse.ResponseResult
import PageResult = SchoolPalCloudServiceModel.PageResult
import ClassroomQueryResponseItem = SchoolPalWebModelResponse.ClassroomQueryResponseItem

/** 查询当前机构下当前用户管辖校区的教室 */
export const Query = (
  query: ClassroomQueryRequest
): AxiosPromise<ResponseResult<PageResult<ClassroomQueryResponseItem[]>>> => {
  return service.post('/api2/Classroom/Query', query)
}
