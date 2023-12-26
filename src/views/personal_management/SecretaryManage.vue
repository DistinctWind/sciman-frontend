<script setup>
import {onMounted, ref} from "vue";
import {listSecretary} from "@/api/person/secretary";
import log from "@/utils/debug";

const secretaryData = ref([])
const currentPage = ref(1)
const secretaryCount = ref(10)
const pageSize = ref(10)
const queryParam = ref({
  nameFilter: '',
  page: 1,
  pageSize: 10
})
const query = async () => {
  const result = await listSecretary(queryParam.value)
  const response = result.data
  log(response)
  secretaryData.value = response.data.secretaries
  secretaryCount.value = response.data.total
}

onMounted(async () => {
  await query()
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
      <el-main>
        <el-table :data="secretaryData" border style="width: 100%">
          <el-table-column prop="employeeId" label="工号" width="180"/>
          <el-table-column prop="name" label="姓名"/>
          <el-table-column prop="gender" label="性别">
            <template #default="scope">
              <span v-if="scope.row.gender === 1">男</span>
              <span v-if="scope.row.gender === 2">女</span>
            </template>
          </el-table-column>
          <el-table-column prop="age" label="年龄"/>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button size="small" @click="modifyResearcherOf(scope.row)">修改</el-button>
              <el-button size="small" type="danger" @click="deleteResearcherOf(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination class="pagination" background layout="prev, pager, next"
                       v-model:current-page="currentPage"
                       v-model:total="secretaryCount"
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