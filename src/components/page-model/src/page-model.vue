<template>
  <div class="page-model">
    <el-dialog
      v-model="dialogVisible"
      :title="modelName"
      width="30%"
      center
      destroy-on-close
    >
      <zm-form v-model="formData" v-bind="modelConfig"></zm-form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button size="medium" @click="handleCancel">取消</el-button>
          <el-button size="medium" type="primary" @click="handleSubmit"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, withDefaults, defineExpose, watch } from "vue"
import ZmForm from "@/base-ui/form"
import { useStore } from "vuex"
const store = useStore()
const props = withDefaults(
  defineProps<{
    modelConfig: any
    defaultInfo: any
    pageName: string
    modelName: string
    otherInfo: any
  }>(),
  {
    defaultInfo: () => ({}),
    otherInfo: () => ({})
  }
)
const formData = ref<any>({})
const dialogVisible = ref(false)
watch(
  () => props.defaultInfo,
  newValue => {
    for (const item of props.modelConfig.formItems) {
      formData.value[`${item.field}` as string] = newValue[`${item.field}`]
    }
  }
)

const handleSubmit = () => {
  // console.log("编辑")
  if (Object.keys(props.defaultInfo).length) {
    //编辑
    store.dispatch("system/editPageDataAction", {
      pageName: props.pageName,
      data: { ...formData.value, ...props.otherInfo },
      id: props.defaultInfo.id
    })
  } else {
    //新建
    store.dispatch("system/createPageDataAction", {
      pageName: props.pageName,
      data: { ...formData.value, ...props.otherInfo }
    })
  }
  dialogVisible.value = false
}
const handleCancel = () => {
  dialogVisible.value = false
}

defineExpose({
  dialogVisible
})
</script>

<style lang="scss" scoped></style>
