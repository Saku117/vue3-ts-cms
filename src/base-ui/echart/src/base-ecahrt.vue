<template>
  <div class="base-echart">
    <div
      class="echart-content"
      ref="echartDivRef"
      :style="{ width: width, height: height }"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { withDefaults, defineProps, ref, onMounted, watchEffect } from "vue"
import { RefComponent } from "@/interface/commonType"
import useEchart from "../hooks/useEchart"
const echartDivRef = ref<RefComponent<HTMLElement>>(null)

const props = withDefaults(
  defineProps<{
    width?: string
    height?: string
    options: any
  }>(),
  {
    width: "100%",
    height: "360px"
  }
)
onMounted(() => {
  const { echartInstance, setOptions } = useEchart(
    echartDivRef.value as HTMLElement
  )
  // const echartInstance = echarts.init(echartDivRef.value as HTMLElement)
  // setOptions(props.options)
  window.addEventListener("resize", () => {
    echartInstance.resize()
  })

  watchEffect(() => {
    setOptions(props.options)
  })
})
</script>

<style lang="scss" scoped></style>
