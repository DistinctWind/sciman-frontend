<script setup>
import {onMounted, reactive, ref, watch} from "vue";
import log from "@/utils/debug";
import {getAchievementList} from "@/api/achievement/achievement";
import ProjectSelection from "@/components/select/ProjectSelection.vue";

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