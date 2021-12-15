<template>
  <div class="login-container">
    <login-panel-component />
  </div>
</template>

<script lang="ts" setup>
import loginPanelComponent from "./components/login-panel.vue"
</script>

<style lang="scss" scoped>
.login-container {
  overflow: auto;
  height: 100%;
  background: url(../../assets/image/login-background.jpg) no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
