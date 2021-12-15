<template>
  <div class="goods">
    <page-content
      :content-table-config="contentTableConfig"
      page-name="GOODS"
      add-button-name="添加商品"
    >
      <template #image="scope">
        <el-image
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
        ></el-image>
      </template>
      <template #oldPrice="scope"> ${{ scope.row.oldPrice }} </template>
    </page-content>
  </div>
</template>

<script lang="ts" setup>
import PageContent from "@/components/page-content"
import { contentTableConfig } from "./config/content.config"
</script>

<style scoped></style>
