import * as echarts from "echarts"
import ChinaMapData from "../data/china.json"

echarts.registerMap("china", ChinaMapData)

export default function (el: HTMLElement) {
  const echartInstance = echarts.init(el)
  const setOptions = (options: echarts.EChartsOption) => {
    echartInstance.setOption(options)
  }
  const updateResize = () => {
    echartInstance.resize()
  }
  return {
    echartInstance,
    setOptions,
    updateResize
  }
}
