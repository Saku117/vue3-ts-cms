type NetConfigSuccessCode = 200 | "200"
// 请求基础地址
export const baseUrl = process.env.VUE_APP_API
// 配后端数据的接收方式application/json;charset=UTF-8 或 application/x-www-form-urlencoded;charset=UTF-8
export const contentType = "application/json;charset=UTF-8"
// 最长请求时间
export const requestTimeout = 10000
// 超时尝试次数
export const timeoutNum = 3
// 超时重新请求间隔
export const intervalTime = 1000
// 操作正常code
export const successCode: NetConfigSuccessCode[] = [200, "200"]
// 数据状态的字段名称
export const statusName = "code"
//状态信息的字段名
export const messageName = "msg"
