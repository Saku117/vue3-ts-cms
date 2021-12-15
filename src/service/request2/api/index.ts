import commonUrl from "./url/common"
interface IUrlDict {
  [key: string]: {
    [key: string]: string
  }
}

const urlDict: IUrlDict = {
  common: commonUrl
}

const getUrl = (url: string): string => {
  try {
    if (url === "") throw new Error("请求路径为空")
    const [modelName, urlName] = url.split(".")
    if (!Object.keys(urlDict).includes(modelName))
      throw new Error("未获取到请求模块")
    const reqUrl = urlDict[modelName][urlName]
    if (!reqUrl) throw new Error("未获取到请求所需url")
    return reqUrl
  } catch (e) {
    console.log(e)
    return ""
  }
}

export default getUrl
