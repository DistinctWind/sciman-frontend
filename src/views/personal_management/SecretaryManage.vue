<script setup>
import {onMounted, reactive, ref} from "vue";
import {listSecretary} from "@/api/person/secretary";
import log from "@/utils/debug";
import {getToday} from "@/utils/date";

const secretaryData = ref([])
const secretaryCount = ref(10)
const queryParam = reactive({
  nameFilter: '',
  page: 1,
  pageSize: 10
})
const query = async () => {
  const result = await listSecretary(queryParam)
  const response = result.data
  log(response)
  secretaryData.value = response.data.secretaries
  secretaryCount.value = response.data.total
}

onMounted(async () => {
  await query()
})

const modifyDialogVisible = ref(false)
const modifyDialogData = reactive({
  employeeId: 0,
  name: '',
  gender: 0,
  age: 0,
  employDate: getToday(),
  duty: '',
})
const modifySecretaryOf = async (secretary) => {
  log(secretary)
  modifyDialogVisible.value = true
}
const deleteSecretaryOf = async (secretary) => {
  log(secretary)
}
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
              <el-button size="small" @click="modifySecretaryOf(scope.row)">修改</el-button>
              <el-button size="small" type="danger" @click="deleteSecretaryOf(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination class="pagination" background
                       :page-sizes="[5, 10, 20]"
                       layout="sizes, prev, pager, next, total"
                       v-model:current-page="queryParam.page"
                       v-model:total="secretaryCount"
                       v-model:page-size="queryParam.pageSize"
                       @size-change="query"
                       @current-change="query"
        />
      </el-main>
    </el-container>
    <el-dialog v-model="modifyDialogVisible">
      <el-form :model="modifyDialogData">
        <el-form-item label="工号">
          <el-input v-model="modifyDialogData.employeeId" disabled/>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="modifyDialogData.name"/>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="modifyDialogData.gender">
            <el-radio label="1">男</el-radio>
            <el-radio label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="聘用时间">
          <el-date-picker
              v-model="modifyDialogData.employDate"
              type="date"
              placeholder="Pick a day"
          />
        </el-form-item>
        <el-form-item label="职务">
          <el-input v-model="modifyDialogData.duty"/>
        </el-form-item>
      </el-form>
    </el-dialog>
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