export interface IChildrenProp {
  rowKey: string | number
  treeProp: {
    children: string
  }
}

export interface IContentTableConfig {
  title: string
  showIndexColumn: boolean
  showSelectColumn: boolean
  showFooter?: boolean
  propList: any[]
  childrentProp?: IChildrenProp
}

type IFormType = "input" | "password" | "select" | "datepicker"

interface IOption {
  title: string
  value: any
}

export interface IFormItem {
  field: string
  type: IFormType
  label: string
  rules?: any[]
  placeholder?: any
  options?: IOption[]
  otherOptions?: any
  isHidden?: boolean
}

export interface IForm {
  labelWidth?: string
  itemLayout?: any
  colLayout?: any
  formItems: IFormItem[]
}
