<script setup>
import {ref, watch} from "vue";

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
        column="1"
        border>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <span>项目编号</span>
          </div>
        </template>
        {{ data.projectId }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <span>负责人</span>
          </div>
        </template>
        {{ data.mainResearcherName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <span>项目名称</span>
          </div>
        </template>
        {{ data.name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <span>开始日期</span>
          </div>
        </template>
        {{ data.beginDate }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <span>结束日期</span>
          </div>
        </template>
        {{ data.endDate }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <span>预算（元）</span>
          </div>
        </template>
        {{ data.budget }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
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