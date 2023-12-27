<script setup>
import {onMounted, reactive, ref} from "vue";
import log from "@/utils/debug";
import {listVenue} from "@/api/venue/venue";

const tableData = ref([])
const tableTotal = ref(10)
const queryParam = reactive({
  laboratoryNameFilter: '',
  addressFilter: '',
  page: 1,
  pageSize: 10
})

const query = async () => {
  log(queryParam)
  const result = await listVenue(queryParam)
  const response = result.data
  log(response)
  tableData.value = response.data.venue
  tableTotal.value = response.data.total
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
            <span style="margin-right: 10px">实验室</span>
            <el-input class="input" v-model="queryParam.laboratoryNameFilter" @keyup.enter="query"/>
          </el-row>
          <el-row>
            <span style="margin-right: 10px">地址</span>
            <el-input class="input" v-model="queryParam.addressFilter" @keyup.enter="query"/>
          </el-row>
          <div class="query">
            <el-button type="primary" @click="query">查询</el-button>
            <el-button type="success" @click="insert">新增</el-button>
          </div>
        </el-row>
      </el-header>
      <el-main class="el-main">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="id" label="场地编号" width="180"/>
          <el-table-column prop="laboratoryName" label="所属实验室" width="180"/>
          <el-table-column prop="area" label="面积（㎡）"/>
          <el-table-column prop="address" label="地址"/>
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
                       v-model:total="tableTotal"
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
          <el-input v-model="dialogData.age" oninput="value = value.replace(/\D/g, '')"/>
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