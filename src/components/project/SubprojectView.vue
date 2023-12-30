<script setup>
import {ref, watch} from "vue";
import {getToday} from "@/utils/date";

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const data = ref([
  {
    id: 0,
    projectName: '',
    principalResearcherName: '',
    dueDate: getToday(),
    budget: 0,
    techDescription: '',
  }
])

watch(() => props.modelValue, (newVal) => {
  data.value = newVal
})

watch(data, (newVal) => {
  emit('update:modelValue', newVal)
})
</script>

<template>
<div>
<el-table :data="data" border>
  <el-table-column prop="id" label="项目ID" width="180"></el-table-column>
  <el-table-column prop="projectName" label="项目名称" width="180"></el-table-column>
  <el-table-column prop="principalResearcherName" label="负责人" width="180"></el-table-column>
  <el-table-column prop="dueDate" label="截止日期" width="180"></el-table-column>
  <el-table-column prop="budget" label="预算" width="180"></el-table-column>
  <el-table-column prop="techDescription" label="技术描述"></el-table-column>
</el-table>
</div>
</template>

<style scoped>

</style>