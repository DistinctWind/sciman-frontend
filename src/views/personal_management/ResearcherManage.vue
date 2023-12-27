<script setup>
import {onMounted, reactive, ref} from "vue";
import {
  deleteResearcher,
  insertResearcher,
  listResearcher,
  modifyResearcher,
  researcherDetail
} from "@/api/person/researcher";
import log from "@/utils/debug";
import LaboratorySelection from "@/components/select/LaboratorySelection.vue";
import {analysisResponse} from "@/utils/analysisResponse";

const researcherData = ref([])
const researcherCount = ref(10)
const queryParam = reactive({
  nameFilter: '',
  laboratoryNameFilter: '',
  page: 1,
  pageSize: 10
})

const query = async () => {
  log(queryParam)
  const result = await listResearcher(queryParam)
  const response = result.data
  log(response)
  researcherData.value = response.data.researchers
  researcherCount.value = response.data.total
}

onMounted(async () => {
  await query()
})

const employeeIdVisible = ref(true)
const dataDialogVisible = ref(false)
const dialogData = reactive({
  employeeId: 0,
  laboratoryId: 0,
  name: '',
  gender: 1,
  title: '',
  age: 0,
  orientation: '',
})

const modifyResearcherOf = async (researcher) => {
  // log(researcher)
  employeeIdVisible.value = true
  dataDialogVisible.value = true
  const initialData = (await researcherDetail(researcher.employeeId)).data.data
  const {employeeId, laboratoryId, name, gender, title, age, orientation} = initialData
  log(initialData)

  dialogData.employeeId = employeeId
  dialogData.laboratoryId = laboratoryId
  dialogData.name = name
  dialogData.gender = String(gender)
  dialogData.title = title
  dialogData.age = age
  dialogData.orientation = orientation
}

const deleteResearcherOf = async (researcher) => {
  const result = await deleteResearcher(researcher.employeeId)
  const response = result.data
  analysisResponse(response)
  await query()
}

const confirm = async () => {
  log(dialogData)
  dataDialogVisible.value = false
  let result = null
  if (employeeIdVisible.value) {
    result = await modifyResearcher(dialogData)
  } else {
    result = await insertResearcher(dialogData)
  }
  const response = result.data
  analysisResponse(response)
  await query()
}

const insert = async () => {
  dataDialogVisible.value = true
  employeeIdVisible.value = false
  const keys = Object.keys(dialogData)
  keys.forEach(key => {
    dialogData[key] = ''
  })
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
          <el-row>
            <span style="margin-right: 10px">实验室</span>
            <el-input class="input" v-model="queryParam.laboratoryNameFilter" @keyup.enter="query"/>
          </el-row>
          <div class="query">
            <el-button type="primary" @click="query">查询</el-button>
            <el-button type="success" @click="insert">新增</el-button>
          </div>
        </el-row>
      </el-header>
      <el-main class="el-main">
        <el-table :data="researcherData" border style="width: 100%">
          <el-table-column prop="employeeId" label="工号" width="180"/>
          <el-table-column prop="laboratoryName" label="所属实验室" width="180"/>
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
        <el-pagination class="pagination" background
                       :page-sizes="[5, 10, 20]"
                       layout="sizes, prev, pager, next, total"
                       v-model:current-page="queryParam.page"
                       v-model:total="researcherCount"
                       v-model:page-size="queryParam.pageSize"
                       @size-change="query"
                       @current-change="query"/>
      </el-main>
    </el-container>
    <el-dialog v-model="dataDialogVisible">
      <el-form :model="dialogData" label-width="120px">
        <el-form-item label="工号" v-if="employeeIdVisible">
          <el-input v-model="dialogData.employeeId" disabled/>
        </el-form-item>
        <el-form-item label="所属实验室">
          <LaboratorySelection v-model="dialogData.laboratoryId"/>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="dialogData.name"/>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="dialogData.gender">
            <el-radio label="1">男</el-radio>
            <el-radio label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="职称">
          <el-input v-model="dialogData.title"/>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="dialogData.age"/>
        </el-form-item>
        <el-form-item label="研究方向">
          <el-input v-model="dialogData.orientation"/>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dataDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirm">
          确认
        </el-button>
      </span>
      </template>
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