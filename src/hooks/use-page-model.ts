import { ref } from "vue"
import type { RefComponent } from "@/interface/commonType"

type CallbackFn = (item?: any) => void
export function usePageModel(
  newCallBack?: CallbackFn,
  editCallBack?: CallbackFn
) {
  interface IPageModelRef {
    dialogVisible: boolean
  }
  const pageModelRef = ref<RefComponent<IPageModelRef>>(null)
  const defaultInfo = ref({})

  const handleNewData = () => {
    defaultInfo.value = {}
    pageModelRef.value!.dialogVisible = true
    newCallBack && newCallBack()
  }
  const handleEditData = (item: any) => {
    defaultInfo.value = { ...item }
    pageModelRef.value!.dialogVisible = true
    editCallBack && editCallBack(item)
  }
  return {
    defaultInfo,
    pageModelRef,
    handleNewData,
    handleEditData
  }
}
