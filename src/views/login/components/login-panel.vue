<template>
  <div class="login-panel">
    <h2 class="login-panel-title">后台管理系统</h2>
    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span class="align-center">
            <el-icon><user /></el-icon>账号登录
          </span>
        </template>
        <login-account-component ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="align-center">
            <el-icon><iphone /></el-icon>手机登录
          </span>
        </template>
        <login-phone-component ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>

    <div class="login-panel-account-control">
      <el-checkbox v-model="isRemember">记住密码</el-checkbox>
      <el-link>忘记密码</el-link>
    </div>

    <el-button class="login-panel-login-btn" type="primary" @click="handleLogin"
      >立即登录</el-button
    >
  </div>
</template>
<script setup lang="ts">
import { User, Iphone } from "@element-plus/icons"
import { ref } from "vue"
import loginAccountComponent from "./login-account.vue"
import loginPhoneComponent from "./login-phone.vue"
import type { RefComponent } from "@/interface/commonType"
const isRemember = ref(true)
const currentTab = ref("account")

interface IloginAccount {
  loginAction: (isRemember: boolean) => void
}
interface IloginPhone {
  loginAction: () => void
}
const accountRef = ref<RefComponent<IloginAccount>>(null)
const phoneRef = ref<RefComponent<IloginPhone>>(null)
const handleLogin = () => {
  console.log("login", accountRef.value)
  currentTab.value === "account"
    ? accountRef.value?.loginAction(isRemember.value)
    : phoneRef.value?.loginAction()
}
</script>

<style scoped lang="scss">
.login-panel {
  width: 320px;
  text-align: center;
  background-color: #fff;
  padding: 10px 30px;
  margin-bottom: 150px;
  &-account-control {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &-login-btn {
    width: 100%;
    margin-top: 5px;
  }
}

.align-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
