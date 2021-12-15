import { IContentTableConfig } from "@/interface/views/index"

const propList = [
  { prop: "name", label: "菜单名称", minWidth: "200" },
  { prop: "type", label: "类型", minWidth: "60" },
  { prop: "url", label: "菜单URL", minWidth: "100" },
  { prop: "permission", label: "按钮权限", minWidth: "100" },
  { prop: "status", label: "状态", minWidth: "120", slotName: "status" },
  {
    prop: "createAt",
    label: "创建时间",
    minWidth: "220",
    slotName: "createAt"
  },
  {
    prop: "updateAt",
    label: "更新时间",
    minWidth: "220",
    slotName: "updateAt"
  },
  { label: "操作", minWidth: "250", slotName: "handler" }
]

const childrentProp = {
  rowKey: "id",
  treeProp: {
    children: "children"
  }
}
// const showIndexColumn = ref(true)
// const showSelectColumn = ref(true)
// const title = ref("用户列表")

export const contentTableConfig: IContentTableConfig = {
  title: "菜单列表",
  showSelectColumn: false,
  showIndexColumn: false,
  showFooter: false,
  propList,
  childrentProp
}
