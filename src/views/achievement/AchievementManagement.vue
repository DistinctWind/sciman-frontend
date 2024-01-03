<script setup>
import {onMounted, reactive, ref, watch} from "vue";
import log from "@/utils/debug";
import {
  addAchievement,
  deleteAchievement,
  getAchievementDetail,
  getAchievementList,
  modifyAchievement
} from "@/api/achievement/achievement";
import ProjectSelection from "@/components/select/ProjectSelection.vue";
import {analysisResponse} from "@/utils/analysisResponse";
import {getToday} from "@/utils/date";

const tableData = ref([])
const tableTotal = ref(10)
const queryParam = reactive({
  page: 1,
  pageSize: 10,
  nameFilter: '',
  projectId: 0,
})

const query = async () => {
  const result = await getAchievementList(queryParam)
  const response = result.data
  log(response)
  tableData.value = response.data.achievement
  tableTotal.value = response.data.total
}

onMounted(async () => {
  await query()
})

watch(() => queryParam.projectId, async () => {
  await query()
})

const modifyDialogVisible = ref(false)
const modifyDialogData = reactive({
  id: 0,
  name: '',
  achieveDate: '',
  rankingFactor: 0,
  classification: 0,
})
const modify = async (achievement) => {
  modifyDialogVisible.value = true
  const result = await getAchievementDetail(achievement.id)
  const response = result.data
  const keys = Object.keys(modifyDialogData)
  keys.forEach(key => {
    modifyDialogData[key] = response.data[key]
  })
}

const modifyDialogConfirm = async () => {
  modifyDialogVisible.value = false
  const result = await modifyAchievement(modifyDialogData)
  const response = result.data
  analysisResponse(response)
  await query()
}

const del = async (achievement) => {
  const result = await deleteAchievement(achievement.id)
  const response = result.data
  analysisResponse(response)
  await query()
}

const insertDialogVisible = ref(false)
const insertDialogData = reactive({
  name: '',
  projectId: 1,
  achieveDate: getToday(),
  rankingFactor: 0,
  classification: 1
})
const insert = () => {
  insertDialogVisible.value = true
}

const insertDialogConfirm = async () => {
  insertDialogVisible.value = false
  const result = await addAchievement(insertDialogData)
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
            <span style="margin-right: 10px">成果名</span>
            <el-input class="input" v-model="queryParam.nameFilter" @keyup.enter="query"/>
          </el-row>
          <el-row>
            <span style="margin-right: 10px">项目</span>
            <ProjectSelection v-model="queryParam.projectId" :nullable="true"/>
          </el-row>
          <div class="query">
            <el-button type="primary" @click="query">查询</el-button>
            <el-button type="success" @click="insert">插入</el-button>
          </div>
        </el-row>
      </el-header>
      <el-main>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="id" label="ID" width="50"/>
          <el-table-column prop="name" label="成果名"/>
          <el-table-column prop="projectName" label="所属项目"/>
          <el-table-column prop="achieveDate" label="达成时间"/>
          <el-table-column prop="rankingFactor" label="排名"/>
          <el-table-column prop="classification" label="分类">
            <template #default="scope">
              <span v-if="scope.row.classification === 1">发明专利</span>
              <span v-if="scope.row.classification === 2">实用新型专利</span>
              <span v-if="scope.row.classification === 3">外观专利</span>
              <span v-if="scope.row.classification === 4">论文</span>
              <span v-if="scope.row.classification === 5">软件著作权</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button size="small" @click="modify(scope.row)">修改</el-button>
              <el-button size="small" type="danger" @click="del(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination class="pagination" background
                       :page-sizes="[5, 10, 20]"
                       layout="sizes, prev, pager, next, total"
                       v-model:current-page="queryParam.page"
                       v-model:total="tableTotal"
                       v-model:page-size="queryParam.pageSize"
                       @size-change="query"
                       @current-change="query"
        />
      </el-main>
    </el-container>
    <el-dialog v-model="modifyDialogVisible">
      <el-form>
        <el-form-item label="成果名">
          <el-input v-model="modifyDialogData.name"/>
        </el-form-item>
        <el-form-item label="达成时间">
          <el-date-picker v-model="modifyDialogData.achieveDate"
                          value-format="YYYY-MM-DD"
                          type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="排名">
          <el-input-number v-model="modifyDialogData.rankingFactor" :min="0" :max="1" :step="0.01"/>
        </el-form-item>
        <el-form-item label="分类">
          <el-radio-group v-model="modifyDialogData.classification">
            <el-radio :label="1">发明专利</el-radio>
            <el-radio :label="2">实用新型专利</el-radio>
            <el-radio :label="3">外观专利</el-radio>
            <el-radio :label="4">论文</el-radio>
            <el-radio :label="5">软件著作权</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="modifyDialogVisible = false">取消</el-button>
        <el-button type="success" @click="modifyDialogConfirm">确定</el-button>
      </template>
    </el-dialog>
    <el-dialog v-model="insertDialogVisible">
      <el-form>
        <el-form-item label="成果名">
          <el-input v-model="insertDialogData.name"/>
        </el-form-item>
        <el-form-item label="项目">
          <ProjectSelection v-model="insertDialogData.projectId" :nullable="false"/>
        </el-form-item>
        <el-form-item label="达成时间">
          <el-date-picker v-model="insertDialogData.achieveDate"
                          value-format="YYYY-MM-DD"
                          type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="排名">
          <el-input-number v-model="insertDialogData.rankingFactor" :min="0" :max="1" :step="0.01"/>
        </el-form-item>
        <el-form-item label="分类">
          <el-radio-group v-model="insertDialogData.classification">
            <el-radio :label="1">发明专利</el-radio>
            <el-radio :label="2">实用新型专利</el-radio>
            <el-radio :label="3">外观专利</el-radio>
            <el-radio :label="4">论文</el-radio>
            <el-radio :label="5">软件著作权</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="insertDialogVisible = false">取消</el-button>
        <el-button type="success" @click="insertDialogConfirm">确定</el-button>
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