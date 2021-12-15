import hyRequest from "@/service/request/index"
import type { IDataType } from "@/interface/api/index"
import type { ILoginResult } from "@/interface/api/login"

enum LoginAPI {
  AccountLogin = "/login",
  LoginUserInfo = "/users/",
  UserMenus = "/role/" //用法：role/${id}/menu
}

export default {
  /**
   * @description: 登录接口
   * @param {String} name
   * @param {String} password
   * @author mengzijian
   * @date 2021-11-22 16:11:12
   */
  async login(name: string, password: string) {
    const url = LoginAPI.AccountLogin
    const data = {
      name,
      password
    }
    const resp = await hyRequest.request<IDataType<ILoginResult>>({
      url,
      method: "POST",
      data
    })
    return resp
  },
  /**
   * @description:获取用户信息
   * @param {number} id 用户ID
   * @author mengzijian
   * @date 2021-11-23 10:53:12
   */
  async queryUserInfoById(id: number) {
    const url = LoginAPI.LoginUserInfo + id
    const resp = await hyRequest.get<IDataType>({
      url
    })
    return resp
  },
  /**
   * @description 获取菜单
   * @param {number} id 权限ID
   * @returns
   */
  async queryMenusByRoleId(id: number) {
    const url = LoginAPI.UserMenus + id + "/menu"
    const resp = await hyRequest.get<IDataType>({
      url
    })
    return resp
  }
}
