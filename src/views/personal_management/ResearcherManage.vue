<script setup>
import {onMounted, reactive, ref, watch} from "vue";
import {listResearcher, modifyResearcher, researcherDetail} from "@/api/person/researcher";
import log from "@/utils/debug";
import LaboratorySelection from "@/components/select/LaboratorySelection.vue";
import {analysisResponse} from "@/utils/analysisResponse";

const researcherData = ref([])

const currentPage = ref(1)
const researcherCount = ref(10)
const pageSize = ref(10)

const queryParam = ref({
  nameFilter: '',
  laboratoryNameFilter: '',
  page: 1,
  pageSize: 10
})

const query = async () => {
  log(queryParam.value)
  const result = await listResearcher(queryParam.value)
  const response = result.data
  log(response)
  researcherData.value = response.data.researchers
  researcherCount.value = response.data.total
}

onMounted(async () => {
  await query()
})

const handlePageChange = (page) => {
  log(page)
  log(`pageSize: ${pageSize.value}`)
  queryParam.value = {
    ...queryParam.value,
    page: page,
    pageSize: pageSize.value
  }
  query()
}

watch(currentPage, (newVal, oldVal) => {
  log(`currentPage changed from ${oldVal} to ${newVal}`)
  handlePageChange(newVal)
})

const modifyDialogVisible = ref(false)
const modifyDialogData = reactive({
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
  modifyDialogVisible.value = true
  const initialData = (await researcherDetail(researcher.employeeId)).data.data
  const { employeeId, laboratoryId, name, gender, title, age, orientation } = initialData
  log(initialData)

  modifyDialogData.employeeId = employeeId
  modifyDialogData.laboratoryId = laboratoryId
  modifyDialogData.name = name
  modifyDialogData.gender = String(gender)
  modifyDialogData.title = title
  modifyDialogData.age = age
  modifyDialogData.orientation = orientation
}

const confirmModify = async () => {
  log(modifyDialogData)
  modifyDialogVisible.value = false
  const result = await modifyResearcher(modifyDialogData)
  const response = result.data
  analysisResponse(response)
  await query()
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
          <el-button class="query" type="primary" @click="query">查询</el-button>
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
            </template>
          </el-table-column>
        </el-table>
        <el-pagination class="pagination" background layout="prev, pager, next"
                       v-model:current-page="currentPage"
                       v-model:total="researcherCount"
                       v-model:page-size="pageSize"/>
      </el-main>
    </el-container>
    <el-dialog v-model="modifyDialogVisible">
      <el-form :model="modifyDialogData" label-width="120px">
        <el-form-item label="工号">
          <el-input v-model="modifyDialogData.employeeId" disabled/>
        </el-form-item>
        <el-form-item label="所属实验室">
          <LaboratorySelection v-model="modifyDialogData.laboratoryId"/>
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
        <el-form-item label="职称">
          <el-input v-model="modifyDialogData.title"/>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="modifyDialogData.age"/>
        </el-form-item>
        <el-form-item label="研究方向">
          <el-input v-model="modifyDialogData.orientation"/>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="modifyDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmModify">
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