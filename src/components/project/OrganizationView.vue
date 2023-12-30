<script setup>
import {ref, watch} from "vue";
import {Aim, Avatar, Cellphone, ChatDotRound, Grid} from "@element-plus/icons-vue";
import {iconStyle} from "@/components/iconStyle";

const props = defineProps(['modelValue', 'title'])
const emit = defineEmits(['update:modelValue'])

const data = ref({
  id: 0,
  organizationName: 'null',
  address: 'null',
  principalContact: 'null',
  secondaryContacts: 'null'
})

watch(() => props.modelValue, (newVal) => {
  data.value = newVal
})

watch(data, (newVal) => {
  emit('update:modelValue', newVal)
})
</script>

<template>
  <div>
    <el-descriptions
        :column="1"
        :title="props.title"
        border>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle"><Grid /></el-icon>
            <span>组织编号</span>
          </div>
        </template>
        {{ data.id }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle"><Avatar /></el-icon>
            <span>组织名称</span>
          </div>
        </template>
        {{ data.organizationName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle"><Menu /></el-icon>
            <span>地址</span>
          </div>
        </template>
        {{ data.address }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle"><Aim /></el-icon>
            <span>负责人办公电话</span>
          </div>
        </template>
        {{ data.principalContact.officePhoneNo }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle"><Cellphone /></el-icon>
            <span>负责人手机号</span>
          </div>
        </template>
        {{ data.principalContact.mobilePhoneNo }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle"><ChatDotRound /></el-icon>
            <span>负责人邮箱</span>
          </div>
        </template>
        {{ data.principalContact.emailAddress }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<style scoped>
.cell-item {
  display: flex;
  align-items: center;
}
</style>