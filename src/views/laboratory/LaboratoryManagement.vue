<script setup>

import {onMounted, ref} from "vue";
import {listAllLaboratories} from "@/api/lab/laboratory";
import log from "@/utils/debug";

const labData = ref([])
onMounted(async () => {
  const response = await listAllLaboratories()
  labData.value = response.data.data
  log(labData)
})

</script>

<template>
  <div>
    <el-table :data="labData" border style="width: 100%">
      <el-table-column prop="id" label="实验室ID" width="180"/>
      <el-table-column prop="name" label="实验室名称" width="180"/>
      <el-table-column prop="orientation" label="实验室研究方向"/>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small">编辑{{scope.row.name}}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>

</style>