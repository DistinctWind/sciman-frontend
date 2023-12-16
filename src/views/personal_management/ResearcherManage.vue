<script setup>
import {onMounted, ref} from "vue";
import {listAllResearcher} from "@/api/person/researcher";

const researcherData = ref([])

onMounted(async () => {
  const response = await listAllResearcher()
  researcherData.value = response.data.data
})
</script>

<template>
<div>
  <el-table :data="researcherData" border style="width: 100%">
    <el-table-column prop="employeeId" label="工号" width="180"/>
    <el-table-column prop="laboratoryName" label="所属实验室" width="180"/>
    <el-table-column prop="name" label="姓名"/>
    <el-table-column prop="gender" label="性别"/>
    <el-table-column prop="age" label="年龄"/>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small" @click="scope.row">详情</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<style scoped>

</style>