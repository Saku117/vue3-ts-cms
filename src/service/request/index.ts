import axios from "axios"
import type { AxiosInstance } from "axios"
import type { HYRequestInterceptors, HYRequestConfig } from "./type"
import { ElLoading } from "element-plus"
import type { ILoadingInstance } from "element-plus"
import cache from "@/utils/cache"
import { ElMessage } from "element-plus"
const DEAFULT_LOADING = false

class HYRequest {
  instance: AxiosInstance
  interceptors?: HYRequestInterceptors
  showLoading: boolean
  loading?: ILoadingInstance
  constructor(config: HYRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? DEAFULT_LOADING

    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptors,
      this.interceptors?.requestInterceptorsCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptors,
      this.interceptors?.responseInterceptorsCatch
    )
    this.instance.interceptors.request.use(
      config => {
        const token = cache.getCache("token")
        if (token) {
          config.headers ? (config.headers["Authorization"] = token) : ""
        }
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: "请求数据",
            background: "rgba(0,0,0,0.5)"
          })
        }
        return config
      },
      err => {
        console.log(err)
        return err
      }
    )

    this.instance.interceptors.response.use(
      res => {
        this.loading?.close()
        if (res.data.code !== 0) {
          ElMessage.error({
            message: `[${res.data.code}] : ${res.data.data}`
          })
        }
        return res.data
      },
      err => {
        this.loading?.close()
        return err
      }
    )
  }

  request<T>(config: HYRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config)
      }
      if (config.showLoading) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then(res => {
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors(res)
          }
          this.showLoading = DEAFULT_LOADING
          resolve(res)
        })
        .catch(err => {
          this.showLoading = DEAFULT_LOADING
          reject(err)
        })
    })
  }

  get<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "GET" })
  }
  post<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "POST" })
  }
  put<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PUT" })
  }
  delete<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" })
  }
}

export default new HYRequest({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000
})

// function IGet<O extends Record<string, unknown>, K extends keyof O>(
//   obj: O,
//   key: K
// ): O[K] {
//   return obj[key]
// }

// IGet({ name: "name", age: 10 }, "name")

// type Account = {
//   id: number
//   isEmployee: boolean
//   notes: string[]
// }

// type OptionsAccount = Partial<Account>
// type PickAccount = Pick<Account>
// type typeOptionAccount<T = Account> = {
//   [K in keyof T]?: T[K]
// }

// function isString(a: unknown): a is string {
//   return typeof a === "string"
// }

// isString("sss")

// declare global {
//   interface Array<T> {
//     zip<U>(list: U[]): [T, U][]
//   }
// }

// Array.prototype.zip = function <T, U>(this: T[], list: U[]): [T, U][] {
//   return this.map((v, k) => tuple(v, list[k]))
// }
