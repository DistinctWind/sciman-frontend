<script setup>
import {onMounted, reactive, ref} from "vue";
import {listStaff} from "@/api/person/staff";
import log from "@/utils/debug";

const staffData = ref([])
const staffCount = ref(10)
const queryParam = reactive({
  nameFilter: '',
  laboratoryFilter: '',
  page: 1,
  pageSize: 10
})

const query = async () => {
  const result = await listStaff(queryParam)
  const response = result.data
  log(response)
  staffData.value = response.data.staffs
  staffCount.value = response.data.total
}

onMounted(async () => {
  await query()
})
</script>

<template>
  <el-container>
    <el-header>
      <el-row>
        <el-row>
          <span style="margin-right: 10px">姓名</span>
          <el-input class="input" v-model="queryParam.nameFilter" @keyup.enter="query"/>
        </el-row>
        <el-row>
          <span style="margin-right: 10px">实验室</span>
          <el-input class="input" v-model="queryParam.laboratoryFilter" @keyup.enter="query"/>
        </el-row>
        <div class="query">
          <el-button type="primary" @click="query">查询</el-button>
          <el-button type="success" @click="insert">新增</el-button>
        </div>
      </el-row>
    </el-header>
    <el-main>
      <el-table :data="staffData" border style="width: 100%">
        <el-table-column prop="id" label="工号" width="180"/>
        <el-table-column prop="laboratoryName" label="实验室"/>
        <el-table-column prop="researcherName" label="主任"/>
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
                     v-model:total="staffCount"
                     v-model:page-size="queryParam.pageSize"
                     @size-change="query"
                     @current-change="query"
      />
    </el-main>
  </el-container>
  <el-dialog v-model="dataDialogVisible">
    <el-form :model="dialogData">
      <el-form-item label="工号" v-if="employeeIdVisible">
        <el-input v-model="dialogData.employeeId" disabled/>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="dialogData.name"/>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="dialogData.gender">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="dialogData.age" oninput="value=value.replace(/\D/g, '')"/>
      </el-form-item>
      <el-form-item label="聘用时间">
        <el-date-picker
            v-model="dialogData.employDate"
            type="date"
            placeholder="Pick a day"
        />
      </el-form-item>
      <el-form-item label="职务">
        <el-input v-model="dialogData.duty"/>
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