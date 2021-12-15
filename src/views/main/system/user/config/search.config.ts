import { IForm } from "@/base-ui/form"

export const searchFormConfig: IForm = {
  labelWidth: "120px",
  itemLayout: {
    padding: "10px 40px"
  },
  // colLayout: {
  //   span: 8
  // },
  formItems: [
    {
      field: "id",
      type: "input",
      label: "id",
      placeholder: "请输入id"
    },
    {
      field: "name",
      type: "input",
      label: "用户名",
      placeholder: "请输入用户名"
    },
    {
      field: "realname",
      type: "input",
      label: "真实姓名",
      placeholder: "请输入真实姓名"
    },
    {
      field: "cellphone",
      type: "input",
      label: "电话号码",
      placeholder: "请输入电话号码"
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
  ]
}
