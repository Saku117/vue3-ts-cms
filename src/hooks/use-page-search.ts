import { ref } from "vue"
import type { RefComponent } from "@/interface/commonType"
export function usePageSearch() {
  interface IPageContent {
    getPageData: (queryInfo?: any) => void
  }
  // import list from "@/components/list/index.vue"
  const pageContentRef = ref<RefComponent<IPageContent>>(null)
  const handleResetClick = () => {
    pageContentRef.value?.getPageData()
  }

  const handleQueryClick = (queryInfo?: any) => {
    pageContentRef.value?.getPageData(queryInfo)
  }

  return { pageContentRef, handleQueryClick, handleResetClick }
}
