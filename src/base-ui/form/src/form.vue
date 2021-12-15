<template>
  <div class="zm-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              :label="item.label"
              :rules="item.rules"
              :style="itemLayout"
              v-if="!item.isHidden"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  size="small"
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                ></el-input>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  size="small"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.title"
                    :label="option.title"
                    :value="option.value"
                    v-bind="item.otherOptions"
                  ></el-option>
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  size="small"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                >
                </el-date-picker>
              </template>
              <template v-else-if="item.type === 'tree'">
                <el-tree
                  :data="item.options"
                  show-checkbox
                  node-key="id"
                  props="{chilren:'label'}"
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                >
                </el-tree>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, defineEmits } from "vue"
import type { IFormItem } from "../types/index"
interface IModelValue {
  [index: string]: string
}
const props = withDefaults(
  defineProps<{
    formItems?: IFormItem[]
    labelWidth?: string
    colLayout?: any
    itemLayout?: any
    modelValue: IModelValue
  }>(),
  {
    formItems: () => [],
    labelWidth: "120px",
    colLayout: () => ({
      xl: 6, // >1920px 4个
      lg: 8,
      md: 12,
      sm: 24,
      xs: 24
    }),
    itemLayout: () => ({ padding: "10px 40px" })
  }
)
const emit = defineEmits(["update:modelValue"])

const handleValueChange = (value: any, field: string) => {
  emit("update:modelValue", { ...props.modelValue, [field]: value })
}

// const formData = ref({ ...props.modelValue })
// watch(
//   () => props.modelValue,
//   newVal => {
//     // console.log(newVal)
//     formData.value = { ...newVal }
//   }
// )
// watch(
//   formData,
//   newValue => {
//     emits("update:modelValue", newValue)
//   },
//   { deep: true }
// )
</script>

<style lang="scss" scoped>
.footer {
  text-align: right;
  padding-bottom: 10px;
  padding-right: 20px;
}
</style>
