<template>
  <div class="user">
    <page-search
      :search-form-config="searchFormConfig"
      @reset-btn-click="handleResetClick"
      @query-btn-clikc="handleQueryClick"
    />
    <page-content
      ref="pageContentRef"
      :content-table-config="contentTableConfig"
      pageName="USERS"
      add-button-name="添加用户"
      @add-btn-click="handleNewData"
      @edit-btn-click="handleEditData"
    ></page-content>
    <page-model
      pageName="USERS"
      :default-info="defaultInfo"
      ref="pageModelRef"
      :model-config="modelConfigComputed"
      model-name="新增用户"
    />
  </div>
</template>
<script lang="ts" setup>
import PageSearch from "@/components/page-search/src/page-search.vue"
import PageContent from "@/components/page-content"
import PageModel from "@/components/page-model"
import { searchFormConfig } from "./config/search.config"
import { contentTableConfig } from "./config/content.config"
import { modelConfig } from "./config/model.config"
import { usePageSearch } from "@/hooks/use-page-search"
import { usePageModel } from "@/hooks/use-page-model"
import { computed } from "vue"
import { useStore } from "@/store"
const { pageContentRef, handleQueryClick, handleResetClick } = usePageSearch()
const newCallback = () => {
  const passwordItem = modelConfig.formItems.find(
    item => item.field === "password"
  )
  passwordItem!.isHidden = false
}
const editCallback = () => {
  const passwordItem = modelConfig.formItems.find(
    item => item.field === "password"
  )
  passwordItem!.isHidden = true
}

const modelConfigComputed = computed(() => {
  const store = useStore()
  const departmentItem = modelConfig.formItems.find(
    item => item.field === "departmentId"
  )
  const roleItem = modelConfig.formItems.find(item => item.field === "roleId")
  console.log(roleItem)
  const entireDepartment = store.state.entireDepartment ?? []
  const entireRole = store.state.entireRole
  // departmentItem!.options = []
  departmentItem!.options = entireDepartment.map(item => {
    return {
      title: item.name,
      value: item.id
    }
  })
  roleItem!.options = entireRole.map(item => {
    return {
      title: item.name,
      value: item.id
    }
  })
  return modelConfig
})

const { defaultInfo, pageModelRef, handleNewData, handleEditData } =
  usePageModel(newCallback, editCallback)
</script>

<style scoped></style>
