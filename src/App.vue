<template>
  <div class="app-container">
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script lang="ts" setup>
// import { ref } from "vue"
import { ElConfigProvider } from "element-plus"
import zhCn from "element-plus/lib/locale/lang/zh-cn"

// const locale = ref(zhCn)
</script>

<style lang="scss">
.app-container {
  height: 100%;
}
</style>
