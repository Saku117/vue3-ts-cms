import type { Module } from "vuex"
import type { IRootState } from "@/interface/store/index"
import type {
  ISystemStore,
  IGetPageListPayload,
  IDeletePageDataPayload,
  ICreatePageDataPayload,
  IEditPageDataPayload
} from "@/interface/store/system"
import { systemApi } from "@/api/index"
interface IPageURLMap {
  [index: string]: string
}
const pageURLMap: IPageURLMap = {
  USERS: "/users/list",
  ROLE: "/role/list",
  GOODS: "/goods/list",
  MENU: "/menu/list"
}

const system: Module<ISystemStore, IRootState> = {
  namespaced: true,
  state: {
    userList: [],
    userCount: 0,
    roleList: [],
    roleCount: 0,
    goodsList: [],
    goodsCount: 0,
    menuList: [],
    menuCount: 0
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        switch (pageName) {
          case "USERS":
            return state.userList
          case "ROLE":
            return state.roleList
          case "GOODS":
            return state.goodsList
          case "MENU":
            return state.menuList
        }
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        switch (pageName) {
          case "USERS":
            return state.userCount
          case "ROLE":
            return state.roleCount
          case "GOODS":
            return state.goodsCount
          case "MENU":
            return state.menuCount
        }
      }
    }
  },
  mutations: {
    SET_USERS_LIST(state, userList: any[]) {
      state.userList = userList
    },
    SET_USERS_COUNT(state, userCount: number) {
      state.userCount = userCount
    },
    SET_ROLE_LIST(state, roleList: any[]) {
      state.roleList = roleList
    },
    SET_ROLE_COUNT(state, roleCount: number) {
      state.roleCount = roleCount
    },
    SET_GOODS_LIST(state, goodsList: any[]) {
      state.goodsList = goodsList
    },
    SET_GOODS_COUNT(state, goodsCount: number) {
      state.goodsCount = goodsCount
    },
    SET_MENU_LIST(state, menuList: any[]) {
      state.menuList = menuList
    },
    SET_MENU_COUNT(state, menuCount: number) {
      state.menuCount = menuCount
    }
  },
  actions: {
    //页面数据获取操作
    async getPageListAction({ commit }, payload: IGetPageListPayload) {
      const { pageName } = payload
      const pageUrl = pageURLMap[pageName]
      console.log(pageName, pageUrl)
      const pageResult = await systemApi.queryPageListData(
        pageUrl,
        payload.queryInfo
      )
      console.log(payload, pageResult)
      const { list, totalCount } = pageResult.data
      console.log(pageName)
      commit(`SET_${pageName}_LIST`, list)
      commit(`SET_${pageName}_COUNT`, totalCount)
    },
    //页面数据删除操作
    async deletePageDataAction(context, payload: IDeletePageDataPayload) {
      //1.获取pageName和id
      const { pageName } = payload
      const { id } = payload
      const pageUrl = `/${pageName.toLocaleLowerCase()}/${id}`
      console.log(pageUrl)
      //2.删除网络请求
      await systemApi.deletePageData(pageUrl)
      //3.请求最新数据
      context.dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    //页面数据添加操作
    async createPageDataAction({ dispatch }, payload: ICreatePageDataPayload) {
      // 1.创建数据的请求
      const { pageName, data } = payload
      const pageUrl = `/${pageName.toLocaleLowerCase()}`
      await systemApi.createPageData(pageUrl, data)

      //3.请求最新数据
      dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    async editPageDataAction({ dispatch }, payload: IEditPageDataPayload) {
      // 1.创建数据的请求
      const { pageName, data, id } = payload
      const pageUrl = `/${pageName.toLocaleLowerCase()}/${id}`
      await systemApi.editPageData(pageUrl, data)
      //3.请求最新数据
      dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}

export default system
