<template>
  <div class="menu">
    <page-content
      :content-table-config="contentTableConfig"
      page-name="MENU"
      add-button-name="添加菜单"
    >
    </page-content>
  </div>
</template>

<script lang="ts" setup>
import PageContent from "@/components/page-content"
import { contentTableConfig } from "./config/content.config"
</script>

<style scoped></style>
