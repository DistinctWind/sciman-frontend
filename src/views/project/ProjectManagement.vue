<script setup>
import {onMounted, reactive, ref} from "vue";
import {listProject} from "@/api/project/project";
import log from "@/utils/debug";
import {useRouter} from "vue-router";
import {notImplemented} from "@/utils/implementattion";

const tableData = ref([])
const tableTotal = ref(0)
const queryParam = reactive({
  page: 1,
  pageSize: 10,
  projectNameFilter: '',
  mainResearcherNameFilter: ''
})

const query = async () => {
  const result = await listProject(queryParam)
  const response = result.data
  log(response)
  tableData.value = response.data.projects
  tableTotal.value = response.data.total
}

onMounted(async () => {
  await query()
})

const router = useRouter()
const showDetailOf = (project) => {
  router.push(`/projectDetail/${project.projectId}`)
}
</script>

<template>
  <div>
    <el-container>
      <el-header>
        <el-row>
          <el-row>
            <span style="margin-right: 10px">项目名</span>
            <el-input class="input" v-model="queryParam.projectNameFilter" @keyup.enter="query"/>
          </el-row>
          <el-row>
            <span style="margin-right: 10px">负责人</span>
            <el-input class="input" v-model="queryParam.mainResearcherNameFilter" @keyup.enter="query"/>
          </el-row>
          <div class="query">
            <el-button type="primary" @click="query">查询</el-button>
            <el-button type="success" @click="notImplemented">新增</el-button>
          </div>
        </el-row>
      </el-header>
      <el-main>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="projectId" label="项目编号" width="100"/>
          <el-table-column prop="name" label="项目名"/>
          <el-table-column prop="mainResearcherName" label="项目负责人"/>
          <el-table-column prop="beginDate" label="开始日期"/>
          <el-table-column prop="endDate" label="结束日期"/>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button size="small" @click="showDetailOf(scope.row)">详情</el-button>
              <el-button size="small" type="danger" @click="notImplemented">删除</el-button>
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