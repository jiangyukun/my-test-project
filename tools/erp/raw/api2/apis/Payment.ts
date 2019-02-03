import service from './../../api/net'
import { AxiosPromise } from 'axios'
import SchoolPalWebModelRequest from './../types/SchoolPalWebModelRequest'
import ScpPaymentNotifyRequestModel = SchoolPalWebModelRequest.ScpPaymentNotifyRequestModel
import ScpPaymentNotifyResponseModel = SchoolPalWebModelRequest.ScpPaymentNotifyResponseModel

/** 从校宝云支付平台接收支付结果的接口 */
export const UpdatePaymentResult = (req: ScpPaymentNotifyRequestModel): AxiosPromise<ScpPaymentNotifyResponseModel> => {
  return service.post('/api2/Payment/UpdatePaymentResult', req)
}
