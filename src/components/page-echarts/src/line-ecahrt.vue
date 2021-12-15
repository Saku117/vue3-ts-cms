<template>
  <div class="line-echart">
    <BaseEcahrt :options="options" />
  </div>
</template>

<script lang="ts" setup>
import { withDefaults, defineProps, computed } from "vue"
import BaseEcahrt from "@/base-ui/echart/src/base-ecahrt.vue"

// interface IDataType {
//   name: string
//   value: any
// }

const props = withDefaults(
  defineProps<{
    lineTitle: string
    xLabels: string[]
    values: any[]
  }>(),
  {
    lineTitle: "折线图"
  }
)

const options = computed(() => {
  return {
    title: {
      text: props.lineTitle
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985"
        }
      }
    },
    legend: {},
    toolbox: {
      feature: {
        // saveAsImage: {}
      }
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: props.xLabels
      }
    ],
    yAxis: [
      {
        type: "value"
      }
    ],
    series: [
      {
        name: "类别销量",
        type: "line",
        stack: "总数",
        areaStyle: {},
        emphasis: {
          focus: "series"
        },
        data: props.values
      }
    ]
  }
})
</script>

<style lang="scss" scoped></style>
