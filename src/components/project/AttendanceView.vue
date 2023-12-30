<script setup>
import {ref, watch} from "vue";

const props = defineProps(['modelValue', 'title'])
const emit = defineEmits(['update:modelValue'])

const data = ref([
  {
    id: 0,
    researcherId: 0,
    researcherName: '',
    projectName: '',
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
  <el-table-column prop="id" label="参与ID" width="180"></el-table-column>
  <el-table-column prop="researcherId" label="工号" width="180"></el-table-column>
  <el-table-column prop="researcherName" label="姓名"></el-table-column>
</el-table>
</div>
</template>

<style scoped>

</style>