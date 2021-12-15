import hyRequest from "@/service/request/index"
import type { IDataType } from "@/interface/api/index"

enum DashboardAPI {
  categoryGoodsCount = "/goods/category/count",
  categoryGoodsSale = "/goods/category/sale",
  categoryCoodsFavor = "/goods/category/favor",
  addressGoodsSale = "/goods/address/sale"
}

export default {
  async getCategoryGoodsCount() {
    const resp = await hyRequest.get<IDataType>({
      url: DashboardAPI.categoryGoodsCount
    })
    return resp
  },

  async getCategoryGoodsSale() {
    const resp = await hyRequest.get<IDataType>({
      url: DashboardAPI.categoryGoodsSale
    })
    return resp
  },

  async getCategoryGoodsFavor() {
    const resp = await hyRequest.get<IDataType>({
      url: DashboardAPI.categoryCoodsFavor
    })
    return resp
  },

  async getAddressGoodsSale() {
    const resp = await hyRequest.get<IDataType>({
      url: DashboardAPI.addressGoodsSale
    })
    return resp
  }
}
