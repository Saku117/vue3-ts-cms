<template>
  <div class="bar-echart">
    <BaseEcahrt :options="options" />
  </div>
</template>

<script lang="ts" setup>
import { withDefaults, defineProps, computed } from "vue"
import BaseEcahrt from "@/base-ui/echart/src/base-ecahrt.vue"
import * as echarts from "echarts"

const props = withDefaults(
  defineProps<{
    dataAxis: string[]
    values: any[]
  }>(),
  {}
)

const options = computed(() => {
  return {
    xAxis: {
      data: props.dataAxis,
      axisLabel: {
        inside: true,
        color: "#fff"
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      z: 10
    },
    yAxis: {
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: "#999"
      }
    },
    dataZoom: [
      {
        type: "inside"
      }
    ],
    series: [
      {
        type: "bar",
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#83bff6" },
            { offset: 0.5, color: "#188df0" },
            { offset: 1, color: "#188df0" }
          ])
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#2378f7" },
              { offset: 0.7, color: "#2378f7" },
              { offset: 1, color: "#83bff6" }
            ])
          }
        },
        data: props.values
      }
    ]
  }
})
</script>

<style lang="scss" scoped></style>
