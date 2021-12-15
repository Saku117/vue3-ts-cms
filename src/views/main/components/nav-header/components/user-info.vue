<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      <el-avatar size="small"></el-avatar>
      {{ store.state.user.userInfo.name }}
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
        <el-dropdown-item divided>用户信息</el-dropdown-item>
        <el-dropdown-item>系统管理</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { useStore } from "vuex"
import cache from "@/utils/cache"
import { useRouter } from "vue-router"
const store = useStore()
const router = useRouter()
const handleLogout = () => {
  cache.deleteCache("token")
  router.push({ path: "/main" })

  // store.dispatch("logout")
}
</script>

<style lang="scss" scoped>
.el-dropdown-link {
  display: flex;
  align-items: center;
}
</style>
