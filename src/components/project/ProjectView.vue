<script setup>
import {ref, watch} from "vue";
import {Aim, Avatar, Calendar, Grid, Money} from "@element-plus/icons-vue";
import {iconStyle} from "@/components/iconStyle";

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const data = ref({
  projectId: null,
  mainResearcherName: null,
  name: null,
  beginDate: null,
  endDate: null,
  budget: null,
  clientOrganizationName: null
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
        title="项目信息"
        border>
      <template #extra>
        <el-button type="primary">编辑</el-button>
      </template>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle"><Grid /></el-icon>
            <span>项目编号</span>
          </div>
        </template>
        {{ data.projectId }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle"><Avatar /></el-icon>
            <span>负责人</span>
          </div>
        </template>
        {{ data.mainResearcherName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle"><Menu /></el-icon>
            <span>项目名称</span>
          </div>
        </template>
        {{ data.name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle"><Calendar /></el-icon>
            <span>开始日期</span>
          </div>
        </template>
        {{ data.beginDate }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle"><Calendar /></el-icon>
            <span>结束日期</span>
          </div>
        </template>
        {{ data.endDate }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle"><Money /></el-icon>
            <span>预算（元）</span>
          </div>
        </template>
        {{ data.budget }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle"><Aim /></el-icon>
            <span>委托方</span>
          </div>
        </template>
        {{ data.clientOrganizationName }}
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