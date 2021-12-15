<template>
  <div class="nav-menu">
    <div class="logo">
      <img src="@/assets/logo.png" alt="logo" />
      <span class="title" v-if="!collapse">Vue3+TS</span>
    </div>
    <el-menu
      :default-active="defaultValue"
      class="el-menu-vertical"
      active-text-color="#ffd04b"
      background-color="#545c64"
      unique-opened
      :collapse="collapse"
    >
      <template v-for="item in userMenus" :key="item.id">
        <template v-if="item.type === 1">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon><d-caret /></el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.key">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleMenuItemClick(subitem)"
              >
                {{ subitem.name }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else-if="item.type === 2">
          <el-menu-item>
            <i v-if="item.icon" :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script lang="ts" setup>
import { computed, defineProps, ref } from "vue"
import { useStore } from "@/store/index"
import { DCaret } from "@element-plus/icons"
import { useRoute, useRouter } from "vue-router"
import cache from "@/utils/cache"
import { pathMaptoMenu } from "@/utils/map-menus"
// import { Location } from "@element-plus/icons"
const store = useStore()
const router = useRouter()
const route = useRoute()
const currentPath = route.path

const userMenus = computed(() => store.state.user.userMenus)
const { findMenu: menu } = pathMaptoMenu(userMenus.value, currentPath)
const defaultValue = ref(menu.id + "")
// store.dispatch("user/generateRoutes", store.user.userMenus)
defineProps<{
  collapse: boolean
}>()

const handleMenuItemClick = (item: any) => {
  cache.setCache("defaultActive", item.id)
  router.push({
    path: item.url ?? "/not-found"
  })
}
</script>

<style lang="scss" scoped>
.nav-menu {
  height: 100%;
  background-color: #001529;
  width: 200px;
  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    img {
      height: 100%;
      margin: 0 10px;
    }
    .title {
      // height: 100%;
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-sub-menu {
    width: 100% !important;
  }
  // .el-sub-menu {
  //   background-color: #001529 !important;
  .el-submenu-item {
    padding-left: 50px !important;
    background-color: #0c2135 !important;
  }
  //   .el-submenu-item:hover {
  //     color: #fff !important;
  //   }
  //   .el-menu-item.is-active {
  //     color: #fff !important;
  //     background-color: #0a60bd !important;
  //   }
  // }

  // .el-sub-menu.is-active > .el-sub-menu__title {
  //   color: #fff !important;
  //   background-color: #0a60bd !important;
  // }
  :deep(.el-sub-menu__title) {
    color: #fff;
    background-color: #001529 !important;
    text-align: center;
    span {
      padding-left: 10px;
    }
  }
  :deep(.el-menu-item.is-active) {
    background-color: #007fff !important;
    color: #fff;
  }
}
.el-menu {
  border-right: none !important;
}
.el-menu-verical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
