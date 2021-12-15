import { useStore } from "@/store"
export function usePermission(pageName: string, handleName: string) {
  const store = useStore()
  const permissions = store.state.user.permissions
  const verifyPermission = `system:${pageName.toLocaleLowerCase()}:${handleName}`
  console.log(verifyPermission)
  return !!permissions.find(item => item === verifyPermission)
}
