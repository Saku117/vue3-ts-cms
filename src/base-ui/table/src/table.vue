<template>
  <div class="zm-table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table
      class="user-content"
      :data="listData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-bind="childrentProp"
    >
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        width="50"
        align="center"
      ></el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        align="center"
        label="id"
      ></el-table-column>
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
          <template #default="{ row }">
            <slot :name="propItem.slotName" :row="row">
              {{ propItem.prop ? row[propItem.prop] : "" }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          v-model:currentPage="page.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { withDefaults, defineProps, defineEmits, ref } from "vue"
import type { IChildrenProp } from "@/interface/views/index"
interface IPropItem {
  prop?: string
  label: string
  minWidth: string
  slotName?: string
}
interface IPage {
  currentPage: number
  pageSize: number
}

const props = withDefaults(
  defineProps<{
    listData: any[]
    propList: IPropItem[]
    showIndexColumn: boolean
    showSelectColumn: boolean
    showFooter?: boolean
    title: string
    listCount: number
    page: IPage
    childrentProp?: IChildrenProp
  }>(),
  {
    showIndexColumn: false,
    showSelectColumn: false,
    showFooter: true,
    listData: () => [],
    listCount: 0,
    childrentProp: () => ({})
  }
)
const ids = ref<string[]>([])
const emits = defineEmits<{
  (e: "selectionChange", ids: string[]): void
  (e: "update:page", page: IPage): void
}>()
const handleSelectionChange = (selection: any[]) => {
  ids.value = selection.map(item => item.name)
  console.log(ids.value)
  emits("selectionChange", ids.value)
}
//页码改变
const handleSizeChange = (pageSize: number) => {
  emits("update:page", { ...props.page, pageSize })
}
//当前页改变
const handleCurrentChange = (currentPage: number) => {
  emits("update:page", { ...props.page, currentPage })
}
</script>

<style scoped lang="scss">
.zm-table {
  background-color: #ffffff;
}

.header {
  display: flex;
  height: 45px;
  padding: 0 50px;
  justify-content: space-between;
  align-items: center;
  .title {
    font-size: 20px;
    font-weight: 700;
  }
  .handler {
    align-items: center;
  }
}
</style>
