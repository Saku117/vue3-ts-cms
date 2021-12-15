<template>
  <div class="dashboard">
    <!-- <div class="ref" ref="divRef"></div> -->
    <el-row :gutter="10">
      <el-col :span="8">
        <zm-card title="分类商品数量(饼图)">
          <template #content>
            <pie-echart :pie-data="categoryGoodsCount" />
          </template>
        </zm-card>
      </el-col>
      <el-col :span="8">
        <zm-card title="不同城市商品销量">
          <template #content>
            <map-echart :map-data="addressGoodsSale" />
          </template>
        </zm-card>
      </el-col>
      <el-col :span="8">
        <zm-card title="分类商品(玫瑰图)">
          <template #content>
            <rose-echart :rose-data="categoryGoodsCount" />
          </template>
        </zm-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="content-row">
      <el-col :span="12"
        ><zm-card title="分类商品的销量">
          <template #content>
            <line-echart v-bind="categoryGoodsSale" />
          </template> </zm-card
      ></el-col>
      <el-col :span="12"
        ><zm-card title="分类商品的收藏">
          <template #content>
            <bar-echart v-bind="categoryGoodsFavor" />
          </template>
        </zm-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
// import * as echarts from "echarts"
// import { BarChart } from "echarts/charts"
// import type { RefComponent } from "@/interface/commonType"
import { useStore } from "@/store"
import ZmCard from "@/base-ui/card"
import {
  PieEchart,
  RoseEchart,
  LineEchart,
  BarEchart,
  MapEchart
} from "@/components/page-echarts"
import { computed } from "vue"
const store = useStore()

store.dispatch("dashboard/getDashBoardDataAction")

const categoryGoodsCount = computed(() =>
  store.state.dashboard.categoryGoodsCount.map(item => {
    return {
      name: item.name,
      value: item.goodsCount
    }
  })
)
const categoryGoodsSale = computed(() => {
  const xLabels: string[] = []
  const values: any[] = []
  const categoryGoodsSale = store.state.dashboard.categoryGoodsSale
  for (const item of categoryGoodsSale) {
    xLabels.push(item.name)
    values.push(item.goodsCount)
  }
  return {
    xLabels,
    values
  }
})

const categoryGoodsFavor = computed(() => {
  const dataAxis: string[] = []
  const values: any[] = []
  const categoryGoodsFavor = store.state.dashboard.categoryCoodsFavor
  for (const item of categoryGoodsFavor) {
    dataAxis.push(item.name)
    values.push(item.goodsFavor)
  }
  return {
    dataAxis,
    values
  }
})

const addressGoodsSale = computed(() => {
  return store.state.dashboard.addressGoodsSale.map(item => {
    return {
      name: item.address,
      value: item.count
    }
  })
})
// const divRef = ref<RefComponent<HTMLElement>>(null)
// onMounted(() => {
//   const echartInstance = echarts.init(divRef.value as HTMLElement)
//   const options = {
//     title: {
//       text: "ECharts 入门示例"
//     },
//     tooltip: {},
//     xAxis: {
//       data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
//     },
//     yAxis: {},
//     series: [
//       {
//         name: "销量",
//         type: "bar",
//         data: [5, 20, 36, 10, 10, 20]
//       }
//     ]
//   }
//   echartInstance.setOption(options)
// })
</script>

<style scoped>
.dashboard {
  height: 500px;
}
.ref {
  height: 100%;
}

.content-row {
  margin-top: 20px;
}
</style>
