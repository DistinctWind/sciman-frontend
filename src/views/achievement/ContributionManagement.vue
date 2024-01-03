<script setup>
import {onMounted, reactive, ref, watch} from "vue";
import {addContribution, deleteContribution, listContribution} from "@/api/achievement/contribution";
import log from "@/utils/debug";
import AchievementSelection from "@/components/select/AchievementSelection.vue";
import {analysisResponse} from "@/utils/analysisResponse";
import ResearcherSelection from "@/components/select/ResearcherSelection.vue";

const tableData = ref([])
const tableTotal = ref(10)
const queryParam = reactive({
  page: 1,
  pageSize: 10,
  achievementId: 0
})

const query = async () => {
  const result = await listContribution(queryParam)
  const response = result.data
  log(response)
  tableData.value = response.data.contribution
  tableTotal.value = response.data.total
}

onMounted(async () => {
  await query()
})

watch(() => queryParam.achievementId, async () => {
  await query()
})

const del = async (contribution) => {
  const result = await deleteContribution(contribution.id)
  const response = result.data
  analysisResponse(response)
  await query()
}

const insertDialogVisible = ref(false)
const insertAchievementId = ref(0)
const insertResearcherId = ref(0)
const insert = () => {
  insertDialogVisible.value = true
  insertAchievementId.value = queryParam.achievementId
}

const insertConfirm = async () => {
  await addContribution({
    achievementId: insertAchievementId.value,
    researcherId: insertResearcherId.value
  })
  insertDialogVisible.value = false
  await query()
}
</script>

<template>
  <div>
    <el-container>
      <el-header>
        <el-row>
          <el-row>
            <span style="margin-right: 10px">成果</span>
            <AchievementSelection v-model="queryParam.achievementId" :nullable="true"/>
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
          <el-table-column prop="achievementName" label="成果名"/>
          <el-table-column prop="researcherName" label="参与人员"/>
          <el-table-column label="操作">
            <template #default="scope">
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
    <el-dialog v-model="insertDialogVisible">
      <el-form label-width="100">
        <el-form-item label="成果">
          <AchievementSelection v-model="insertAchievementId" :nullable="false"/>
        </el-form-item>
        <el-form-item label="参与人员">
          <ResearcherSelection v-model="insertResearcherId"
            v-model:achievement-id="insertAchievementId"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="insertDialogVisible = false">取消</el-button>
        <el-button type="success" @click="insertConfirm">确定</el-button>
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