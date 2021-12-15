import { IUserState } from "./user"
import { ISystemStore } from "./system"
import { IDashBoardState } from "./dashboard"
export interface IRootState {
  name: string
  entireDepartment: any[]
  entireRole: any[]
  entireMenu: any[]
}

export interface IRootWithModule {
  user: IUserState
  system: ISystemStore
  dashboard: IDashBoardState
}

export type IStoreType = IRootState & IRootWithModule
