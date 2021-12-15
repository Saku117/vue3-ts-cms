<template>
  <div class="pie-echart">
    <BaseEcahrt :options="options" />
  </div>
</template>

<script lang="ts" setup>
import { withDefaults, defineProps, computed } from "vue"
import BaseEcahrt from "@/base-ui/echart/src/base-ecahrt.vue"

interface IDataType {
  name: string
  value: any
}

const props = withDefaults(
  defineProps<{
    pieData: IDataType[]
  }>(),
  {}
)

const options = computed(() => {
  return {
    title: {
      left: "center"
    },
    tooltip: {
      trigger: "item"
    },
    legend: {
      orient: "horizontal",
      left: "left"
    },
    series: [
      {
        name: "分类数据",
        type: "pie",
        radius: "50%",
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      }
    ]
  }
})
</script>

<style lang="scss" scoped></style>
