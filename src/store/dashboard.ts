import type { Module } from "vuex"
import type { IRootState } from "@/interface/store/index"
import type { IDashBoardState } from "@/interface/store/dashboard"
import { dashboardApi } from "@/api/index"
const dashboardModule: Module<IDashBoardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryCoodsFavor: [],
      addressGoodsSale: []
    }
  },
  mutations: {
    SET_CATEGORY_COODS_COUNT(state, list) {
      state.categoryGoodsCount = list
    },
    SET_CATEGORY_COODS_SALE(state, list) {
      state.categoryGoodsSale = list
    },
    SET_CATEGORY_COODS_FAVOR(state, list) {
      state.categoryCoodsFavor = list
    },
    SET_ADDRESS_COODS_SALE(state, list) {
      state.addressGoodsSale = list
    }
  },
  actions: {
    async getDashBoardDataAction({ commit }) {
      const { data: categoryGoodsCount } =
        await dashboardApi.getCategoryGoodsCount()
      const { data: categoryGoodsSale } =
        await dashboardApi.getCategoryGoodsSale()
      const { data: categoryCoodsFavor } =
        await dashboardApi.getCategoryGoodsFavor()
      const { data: addressGoodsSale } =
        await dashboardApi.getAddressGoodsSale()
      commit("SET_CATEGORY_COODS_COUNT", categoryGoodsCount)
      commit("SET_CATEGORY_COODS_SALE", categoryGoodsSale)
      commit("SET_CATEGORY_COODS_FAVOR", categoryCoodsFavor)
      commit("SET_ADDRESS_COODS_SALE", addressGoodsSale)
    }
  }
}

export default dashboardModule
