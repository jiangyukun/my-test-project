import service from './../../api/net'
import { AxiosPromise } from 'axios'
import SchoolPalToolkitResponse from './../types/SchoolPalToolkitResponse'
import ResponseResult = SchoolPalToolkitResponse.ResponseResult

/** 灰度身份认证 */
export const CheckVersion = (): AxiosPromise<null> => {
  return service.get('/api2/ExpressAuth/CheckVersion')
}

/**  */
export const Redirect = (): AxiosPromise<ResponseResult<string>> => {
  return service.get('/api2/ExpressAuth/Redirect')
}
