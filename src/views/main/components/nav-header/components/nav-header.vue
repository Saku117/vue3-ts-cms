<template>
  <div class="nav-header">
    <el-icon size="30" @click="handleFoldClick">
      <Expand v-if="!isExpend" />
      <fold v-else />
    </el-icon>
    <div class="nav-header-content">
      <zm-breadcrumb :breadcrumbs="breadcrumbs" />
      <user-info />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Fold, Expand } from "@element-plus/icons"
import { ref, defineEmits, computed } from "vue"
import { useStore } from "vuex"
import { useRoute } from "vue-router"
import UserInfo from "./user-info.vue"
import { patheMapBreadcrumbs } from "@/utils/map-menus"
import ZmBreadcrumb from "@/base-ui/breadcrumb"
const isExpend = ref(true)
const store = useStore()

const breadcrumbs = computed(() => {
  const route = useRoute()
  const currentPath = route.path
  const userMenus = computed(() => store.state.user.userMenus)
  return patheMapBreadcrumbs(userMenus.value, currentPath)
})

const emits = defineEmits(["expendChange"])
const handleFoldClick = () => {
  isExpend.value = !isExpend.value
  emits("expendChange", isExpend.value)
}
</script>

<style lang="scss" scoped>
.nav-header {
  display: flex;
  align-items: center;
  width: 100%;
  &-content {
    margin-left: 30px;
    // height: 48px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
