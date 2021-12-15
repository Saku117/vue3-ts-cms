<template>
  <div class="page-search">
    <zm-form v-bind="searchFormConfig" v-model="formData">
      <template #footer>
        <el-button type="primary" size="small" @click="handleQuery"
          >搜索</el-button
        >
        <el-button type="info" size="small" @click="handleReset"
          >重置</el-button
        >
      </template>
    </zm-form>
  </div>
</template>
<script lang="ts" setup>
import { withDefaults, defineProps, defineEmits, ref } from "vue"
import ZmForm from "@/base-ui/form"

const props = withDefaults(defineProps<{ searchFormConfig: any }>(), {})
const emit = defineEmits<{
  (e: "resetBtnClick"): void
  (e: "queryBtnClikc", queryInfo?: any): void
}>()
const formItems = props.searchFormConfig?.formItems ?? []
const formOriginData: any = {}

for (const item of formItems) {
  formOriginData[item.field] = ""
}
let formData = ref(formOriginData)

//重置按钮
const handleReset = () => {
  // console.log(formData.value)
  formData.value = formOriginData
  emit("resetBtnClick")
}

const handleQuery = () => {
  console.log(formData.value)
  emit("queryBtnClikc", formData.value)
}
</script>
<style lang="scss" scoped>
.page-search {
  background-color: #fff;
  padding-top: 30px;
}
</style>
