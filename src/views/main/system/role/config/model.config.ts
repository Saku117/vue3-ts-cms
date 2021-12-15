import type { IForm } from "@/interface/views/index"

export const modelConfig: IForm = {
  formItems: [
    {
      field: "name",
      type: "input",
      label: "角色名",
      placeholder: "请输入角色名"
    },
    {
      field: "intro",
      type: "input",
      label: "角色介绍",
      placeholder: "请输入角色介绍"
    }
    // {
    //   field: "createTime",
    //   type: "datepicker",
    //   label: "创建时间",
    //   otherOptions: {
    //     startPlaceholder: "开始时间",
    //     endPlaceholder: "结束时间",
    //     type: "daterange"
    //   }
    // }
  ],
  colLayout: {
    span: 24
  },
  itemLayout: {
    padding: "0 0"
  },
  labelWidth: "80px"
}
