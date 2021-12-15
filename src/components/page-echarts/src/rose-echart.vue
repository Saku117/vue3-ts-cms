<template>
  <div class="rose-echart">
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
    roseData: IDataType[]
  }>(),
  {}
)

const options = computed(() => {
  return {
    // legend: {
    //   top: "bottom"
    // },
    toolbox: {
      show: true,
      feature: {
        // mark: { show: true },
        // dataView: { show: true, readOnly: false },
        // restore: { show: true },
        // saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: "Nightingale Chart",
        type: "pie",
        radius: [10, 160],
        center: ["50%", "50%"],
        roseType: "area",
        itemStyle: {
          borderRadius: 8
        },
        data: props.roseData
      }
    ]
  }
})
</script>

<style lang="scss" scoped></style>
