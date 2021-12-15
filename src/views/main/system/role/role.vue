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
      pageName="ROLE"
      add-button-name="添加角色"
      @add-btn-click="handleNewData"
      @edit-btn-click="handleEditData"
    ></page-content>
    <page-model
      ref="pageModelRef"
      pageName="ROLE"
      :model-config="modelConfig"
      :default-info="defaultInfo"
      model-name="新增角色"
      :other-info="otherInfo"
    >
      <el-tree
        ref="elTreeRef"
        v-model="otherInfo"
        @check="handleCheckChange"
        :data="menuList"
        show-checkbox
        node-key="id"
        :props="{ children: 'children', label: 'name', disabled: 'none' }"
      >
      </el-tree>
    </page-model>
  </div>
</template>
<script lang="ts" setup>
import { useStore } from "@/store"
import PageSearch from "@/components/page-search/src/page-search.vue"
import PageContent from "@/components/page-content"
import PageModel from "@/components/page-model"
import { searchFormConfig } from "./config/search.config"
import { contentTableConfig } from "./config/content.config"
import { modelConfig } from "./config/model.config"
// import list from "@/components/list/index.vue"
import { usePageSearch } from "@/hooks/use-page-search"
import { usePageModel } from "@/hooks/use-page-model"
import { computed, ref, nextTick } from "vue"
import { getMenuLeafKeys } from "@/utils/map-menus"
import { RefComponent } from "@/interface/commonType"
import { ElTree } from "element-plus"

const elTreeRef = ref<RefComponent<InstanceType<typeof ElTree>>>(null)

const { pageContentRef, handleQueryClick, handleResetClick } = usePageSearch()
const editCallBack = (item: any) => {
  const leafKeys = getMenuLeafKeys(item.menuList)
  nextTick(() => {
    elTreeRef.value?.setCheckedKeys(leafKeys, false)
  })
}

const { defaultInfo, pageModelRef, handleNewData, handleEditData } =
  usePageModel(undefined, editCallBack)

const store = useStore()
const menuList = computed(() => store.state.entireMenu)
const otherInfo = ref({})
const handleCheckChange = (data1: any, data2: any) => {
  const { checkedKeys, halfCheckedKeys } = data2
  const menuList = [...checkedKeys, ...halfCheckedKeys]
  otherInfo.value = { menuList }
}
</script>

<style scoped></style>
