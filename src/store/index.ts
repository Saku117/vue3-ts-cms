import { createStore, useStore as useVuexStore } from "vuex"
import { systemApi } from "@/api"
import type { IRootState, IStoreType } from "@/interface/store/index"
import type { Store } from "vuex"
import user from "./user"
import system from "./system"
import dashboard from "./dashboard"
const store = createStore<IRootState>({
  state: () => {
    return {
      name: "wwx",
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  mutations: {
    SET_DEPARTMENT(state, list) {
      state.entireDepartment = list
    },
    SET_ROLE(state, list) {
      state.entireRole = list
    },
    SET_MENU(state, list) {
      state.entireMenu = list
    }
  },
  actions: {
    async getInitial({ commit }) {
      //1.请求部门和角色数据
      const {
        data: { list: departmentList }
      } = await systemApi.queryPageListData("/department/list", {
        offset: 0,
        size: 1000
      })
      const {
        data: { list: roleList }
      } = await systemApi.queryPageListData("/role/list", {
        offset: 0,
        size: 1000
      })
      const {
        data: { list: menuList }
      } = await systemApi.queryPageListData("/menu/list", {
        offset: 0,
        size: 1000
      })

      //2.保存数据
      commit("SET_DEPARTMENT", departmentList)
      commit("SET_ROLE", roleList)
      commit("SET_MENU", menuList)
    }
  },
  modules: {
    user,
    system,
    dashboard
  }
})
export function setupStore() {
  store.dispatch("user/loadLocalLogin")
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
