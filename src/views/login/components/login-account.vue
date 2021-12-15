<template>
  <el-form :rules="rules" :model="userform" ref="formRef">
    <el-form-item label="账号" prop="username">
      <el-input
        size="small"
        placeholder="请输入账号"
        v-model="userform.username"
      ></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        size="small"
        placeholder="请输入密码"
        type="password"
        v-model="userform.password"
      ></el-input>
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
import { ElForm } from "element-plus"
import { reactive, defineExpose, ref } from "vue"
import localCache from "@/utils/cache"
import type { RefComponent } from "@/interface/commonType"
import { useStore } from "vuex"
import { useRouter } from "vue-router"

const store = useStore()
const router = useRouter()
const rules = reactive({
  username: [
    { required: true, trigger: "blur", message: "请输入账号" },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: "用户名必须是5-10个数字或字母",
      trigger: "blur"
    }
  ],
  password: [
    { required: true, trigger: "blur", message: "请输入密码" },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: "密码必须是3位以上",
      trigger: "blur"
    }
  ]
})

const userform = reactive({
  username: localCache.getCache("username") ?? "",
  password: localCache.getCache("password") ?? ""
})

const formRef = ref<RefComponent<InstanceType<typeof ElForm>>>(null)

const loginAction = (isRemember: boolean) => {
  formRef.value?.validate(valid => {
    if (!valid) return false
    //1.判断是否需要记住密码
    if (isRemember) {
      //本地缓存
      localCache.setCache("username", userform.username)
      localCache.setCache("password", userform.password)
    } else {
      localCache.deleteCache("username")
      localCache.deleteCache("password")
    }
    store.dispatch("user/login", { ...userform }).then(() => {
      router.push("/main")
    })
  })
}

defineExpose({
  loginAction
})
</script>
<style scoped lang="scss"></style>
