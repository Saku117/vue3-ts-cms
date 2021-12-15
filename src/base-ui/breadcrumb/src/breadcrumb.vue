<template>
  <el-breadcrumb separator="/">
    <template v-for="item in breadcrumbs" :key="item.name">
      <el-breadcrumb-item v-if="item.path" :to="{ path: item.path }">{{
        item.name
      }}</el-breadcrumb-item>
      <el-breadcrumb-item v-else>{{ item.name }}</el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { withDefaults, defineProps } from "vue"
import { IBreadcrumb } from "../types/index"
withDefaults(defineProps<{ breadcrumbs?: IBreadcrumb[] }>(), {
  breadcrumbs: () => []
})
</script>

<style lang="scss" scoped></style>
