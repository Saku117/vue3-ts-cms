import type { Module } from "vuex"
import type { IRootState } from "@/interface/store/index"
import type { IUserState } from "@/interface/store/user"
import cache from "@/utils/cache"
import { loginApi } from "@/api"
import { mapMenusToRoutes, mapMenusToPermissions } from "@/utils/map-menus"
import router from "@/router"
const user: Module<IUserState, IRootState> = {
  namespaced: true,
  state: {
    token: cache.getCache("token") || "",
    userInfo: {},
    userMenus: [],
    permissions: []
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
    },
    SET_USER_MENUS(state, userMenus) {
      state.userMenus = userMenus

      console.log("注册动态路由")

      // userMenus => routes
      const routes = mapMenusToRoutes(userMenus)
      console.log(routes)
      // 将routes => router.main.children
      routes.forEach(route => {
        router.addRoute("main", route)
      })

      //获取用户按钮权限
      const permissions = mapMenusToPermissions(userMenus)
      state.permissions = permissions
      // console.log(permissions)
    }
  },
  actions: {
    async login({ commit, dispatch }, payload) {
      const { username, password } = payload
      //1.登录功能
      const loginResult = await loginApi.login(username, password)
      const { id, token } = loginResult.data
      commit("SET_TOKEN", token)
      if (token) {
        cache.setCache("token", token)
        dispatch("getInitial", null, { root: true })
      }

      //2.获取用户信息
      const userInfoResult = await loginApi.queryUserInfoById(id)
      const userInfo = userInfoResult.data
      commit("SET_USER_INFO", userInfo)
      cache.setCache("userInfo", userInfo)
      //3.获取权限菜单
      const menusResult = await loginApi.queryMenusByRoleId(userInfo.role.id)
      const userMenus = menusResult.data
      commit("SET_USER_MENUS", userMenus)
      cache.setCache("userMenus", userMenus)
    },

    loadLocalLogin({ commit, dispatch }) {
      const token = cache.getCache("token")
      if (token) {
        commit("SET_TOKEN", token)
        dispatch("getInitial", null, { root: true })
      }

      const userInfo = cache.getCache("userInfo")
      if (token) {
        commit("SET_USER_INFO", userInfo)
      }
      const userMenus = cache.getCache("userMenus")
      if (token) {
        commit("SET_USER_MENUS", userMenus)
      }
    }
  }
}

export default user
