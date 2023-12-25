<script setup>
import {computed, onMounted, ref, watch} from "vue";
import {listAllResearcher, listResearcher} from "@/api/person/researcher";
import log from "@/utils/debug";

const researcherData = ref([])

const currentPage = ref(1)
const researcherCount = computed(() => researcherData.value.length)
const pageSize = ref(10)

const queryParam = ref({
  nameFilter: '',
  limitStart: 0,
  limitSize: 10
})

onMounted(async () => {
  const response = await listAllResearcher()
  researcherData.value = response.data.data
})

const query = async () => {
  log(queryParam.value)
  const result = await listResearcher(queryParam.value)
  const response = result.data
  log(response)
  researcherData.value = response.data
}

const handlePageChange = (page) => {
  log(page)
  log(`limitStart = ${(page - 1) * pageSize.value}`)
  log(`limitSize = ${pageSize.value}`)
  queryParam.value = {
    ...queryParam.value,
    limitStart: (page - 1) * pageSize.value,
    limitSize: pageSize.value
  }
  query()
}

watch(currentPage, (newVal, oldVal) => {
  log(`currentPage changed from ${oldVal} to ${newVal}`)
  handlePageChange(newVal)
})

</script>

<template>
  <div>
    <el-container>
      <el-header>
        <el-row>
          <el-row>
            <span style="margin-right: 10px">姓名</span>
            <el-input class="input" v-model="queryParam.nameFilter" @keyup.enter="query"/>
          </el-row>
          <el-button class="query" type="primary" @click="query">查询</el-button>
        </el-row>
      </el-header>
      <el-main class="el-main">
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
        <el-pagination class="pagination" background layout="prev, pager, next"
                       v-model:current-page="currentPage"
                       v-model:total="researcherCount"
                       v-model:page-size="pageSize"/>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.input {
  width: 250px;
  align-self: flex-start;
}

.query {
  align-self: flex-end;
}

.el-header .el-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-table {
  margin-bottom: 20px;
}

.el-pagination {
  margin-top: 20px;
}

.el-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>