import hyRequest from "@/service/request/index"
import type { IDataType } from "@/interface/api/index"
import type { IPageListData } from "@/interface/api/system"
export default {
  async queryPageListData(url: string, queryInfo: any) {
    const resp = await hyRequest.post<IDataType<IPageListData>>({
      url,
      data: queryInfo
    })
    return resp
  },
  /**
   * @description: 删除页面数据
   * @param {string} url
   * @author mengzijian
   * @date 2021-12-09 14:52:29
   */
  async deletePageData(url: string) {
    const resp = await hyRequest.delete<IDataType>({
      url
    })
    return resp
  },
  /**
   * @description:添加页面数据
   * @param {string} url
   * @param {Object} data
   * @author mengzijian
   * @date 2021-12-10 13:18:16
   */
  async createPageData(url: string, data: any) {
    const resp = await hyRequest.post<IDataType>({
      url,
      data
    })
    return resp
  },
  /**
   * @description:编辑页面数据
   * @param {string} url
   * @param {Object} data
   * @author mengzijian
   * @date 2021-12-10 13:18:16
   */
  async editPageData(url: string, data: any) {
    const resp = await hyRequest.request<IDataType>({
      url,
      data,
      method: "patch"
    })
    return resp
  }
}
