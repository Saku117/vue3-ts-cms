import type { AxiosRequestConfig, AxiosResponse } from "axios"

interface HYRequestInterceptors<T = AxiosResponse> {
  requestInterceptors?: (
    config: AxiosRequestConfig<{ headers: any }>
  ) => AxiosRequestConfig
  requestInterceptorsCatch?: (err: any) => any
  responseInterceptors?: (res: T) => T
  responseInterceptorsCatch?: (err: any) => any
}

interface HYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: HYRequestInterceptors<T>
  showLoading?: boolean
}

export { HYRequestInterceptors, HYRequestConfig }
