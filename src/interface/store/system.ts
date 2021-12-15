export interface ISystemStore {
  userList: any[]
  userCount: number
  roleList: any[]
  roleCount: number
  goodsList: any[]
  goodsCount: number
  menuList: any[]
  menuCount: number
}

export interface IGetPageListPayload {
  pageName: string
  queryInfo: {
    size: number
    offset: number
  }
}

export interface IDeletePageDataPayload {
  pageName: string
  id: number
}

export interface ICreatePageDataPayload {
  pageName: string
  data: any
}

export interface IEditPageDataPayload {
  pageName: string
  data: any
  id: number
}
