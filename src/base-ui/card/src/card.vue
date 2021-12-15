<!--
 * @description
!-->
<template>
  <div class="zm-card">
    <el-card style="height: 100%">
      <template #header>
        <div class="card-header">
          <span>{{ title }}</span>
          <!-- <el-button class="button" type="text">操作按钮</el-button> -->
        </div>
      </template>
      <div class="card-content">
        <slot name="content"></slot>
      </div>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { withDefaults, defineProps } from "vue"

withDefaults(
  defineProps<{
    title: string
  }>(),
  {
    title: "卡片名称"
  }
)
</script>
<style scoped lang="scss">
.zm-card {
  width: 100%;
  height: 100%;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

// /dee/ .el-card__body {
//   height: 100%;
// }
</style>
