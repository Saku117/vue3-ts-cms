<template>
  <el-form :model="phoneForm" :rules="rules" ref="phoneRef">
    <el-form-item label="手机号" prop="phoneNumber">
      <el-input
        size="small"
        placeholder="请输入手机号"
        v-model="phoneForm.phoneNumber"
      ></el-input>
    </el-form-item>
    <el-form-item label="验证码" prop="code">
      <el-input
        size="small"
        placeholder="请输入验证码"
        v-model="phoneForm.code"
        class="width-120"
      ></el-input>
      <el-button type="primary" size="mini" @click="handleCode"
        >获取验证码</el-button
      >
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
import { ref, defineExpose, reactive } from "vue"
import type { RefComponent } from "@/interface/commonType"
import { ElForm, ElMessage } from "element-plus"
const phoneForm = reactive({
  phoneNumber: "",
  code: ""
})
const phoneRef = ref<RefComponent<InstanceType<typeof ElForm>>>(null)

const rules = reactive({
  phoneNumber: [{ required: true, trigger: "blur", message: "请输入手机号" }],
  code: [{ required: true, trigger: "blur", message: "请输入验证码" }]
})

const handleCode = () => {
  if (!phoneForm.phoneNumber) {
    ElMessage({
      message: "请输入手机号",
      type: "warning"
    })
    return false
  }
  console.log("yzm")
}

const loginAction = () => {
  phoneRef.value?.validate(valid => {
    if (!valid) return false
    console.log(`loginAction`)
  })
}

defineExpose({
  loginAction
})
</script>
<style scoped lang="scss">
:deep(.el-form-item__content) {
  display: flex;
  justify-content: space-between;
  text-align: center;
  height: 32px;
}

.width-120 {
  width: 120px !important;
}
</style>
