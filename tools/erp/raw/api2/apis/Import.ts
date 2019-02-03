import service from './../../api/net'
import { AxiosPromise } from 'axios'

/** 获取导入模板 */
export const GetExcelTemplate = (type: number): AxiosPromise<null> => {
  return service.get('/api2/Import/GetExcelTemplate', { params: { type } })
}

/** 上传导入Excel */
export const ImportExcel = (importType: number, file: object): AxiosPromise<null> => {
  return service.post('/api2/Import/ImportExcel', { importType, file })
}
