<template>
  <div class="page-content">
    <zm-table
      class="user-content"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
      :list-count="dataCount"
      :list-data="dataList"
    >
      <template #headerHandler>
        <el-button
          size="small"
          type="primary"
          v-if="isCreate"
          @click="handleAdd"
        >
          {{ addButtonName }}
        </el-button>
      </template>

      <template #status="scope"
        ><el-button
          size="mini"
          :type="scope.row.enable ? 'success' : 'danger'"
          >{{ scope.row.enable ? "启用" : "禁用" }}</el-button
        ></template
      >
      <template #createAt="scope">
        {{ $filters.formatTime(scope.row.createAt) }}
      </template>
      <template #updateAt="scope">
        {{ $filters.formatTime(scope.row.createAt) }}
      </template>

      <template #handler="scope">
        <div class="handle-btns">
          <el-button
            size="mini"
            type="warning"
            v-if="isUpdate"
            @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            v-if="isDelete"
            @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </div>
      </template>
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"> </slot>
        </template>
      </template>
      <!-- <template ></template> -->
    </zm-table>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  withDefaults,
  defineProps,
  defineExpose,
  defineEmits,
  ref,
  watch
} from "vue"
import { useStore } from "@/store"
// import { contentTableConfig } from "@/views/main/system/user/config/content.config"
import ZmTable from "@/base-ui/table"
import { IContentTableConfig } from "@/interface/views/index"
import { usePermission } from "@/hooks/use-permission"
const pageInfo = ref({
  currentPage: 1,
  pageSize: 10
})
watch(pageInfo, () => getPageData())
const props = withDefaults(
  defineProps<{
    contentTableConfig: IContentTableConfig
    pageName: string
    addButtonName: string
  }>(),
  {
    // contentTableConfig: () => ({})
  }
)
const emits = defineEmits<{
  (e: "editBtnClick", item: any): void
  (e: "addBtnClick"): void
}>()
// console.log(props.contentTableConfig)
const store = useStore()

const isCreate = usePermission(props.pageName, "create")
const isUpdate = usePermission(props.pageName, "update")
const isDelete = usePermission(props.pageName, "delete")
const isQuery = usePermission(props.pageName, "query")

//获取页面数据
const getPageData = (queryInfo = {}) => {
  if (!isQuery) return false
  store.dispatch("system/getPageListAction", {
    pageName: props.pageName,
    queryInfo: {
      offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
      size: pageInfo.value.pageSize,
      ...queryInfo
    }
  })
}
getPageData()
// const ListName = `${props.pageName.toLocaleLowerCase()}List`

const dataList = computed(() =>
  store.getters[`system/pageListData`](props.pageName)
)
const dataCount = computed(() =>
  store.getters[`system/pageListCount`](props.pageName)
)

const otherPropSlots = props.contentTableConfig.propList.filter(item => {
  if (item.slotName === "status") return false
  if (item.slotName === "createAt") return false
  if (item.slotName === "updateAt") return false
  if (item.slotName === "handler") return false
  return true
})

//删除操作
const handleDelete = (item: any) => {
  console.log(item)
  store.dispatch("system/deletePageDataAction", {
    pageName: props.pageName,
    id: item.id
  })
}
//添加操作
const handleAdd = () => {
  emits("addBtnClick")
}
const handleEdit = (item: any) => {
  emits("editBtnClick", item)
}
defineExpose({
  getPageData
})
</script>

<style lang="scss" scoped>
.page-content {
  margin: 20px 0;
}
</style>
