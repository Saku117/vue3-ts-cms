import { createRouter, createWebHashHistory } from "vue-router"
import { firstMenu } from "@/utils/map-menus"
import type { RouteRecordRaw } from "vue-router"
import cache from "@/utils/cache"
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/main"
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue")
  },
  {
    path: "/main",
    name: "main",
    component: () => import("@/views/main/index.vue")
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: () => import("@/views/404/index.vue")
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

router.beforeEach(to => {
  if (to.path !== "/login") {
    const token = cache.getCache("token")
    if (!token) {
      return "/login"
    }
  }
  if (to.path === "/main") {
    return firstMenu.url
  }
})

export default router
