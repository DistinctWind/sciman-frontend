<script setup>
import {onMounted, reactive, ref} from "vue";
import {getStaffDetail, listStaff} from "@/api/person/staff";
import log from "@/utils/debug";
import {getToday} from "@/utils/date";

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

const dataDialogVisible = ref(false)
const dialogData = reactive({
  id: 0,
  researcherId: 0,
  laboratoryId: 0,
  laboratoryNameView: '',
  dueDate: getToday(),
})
const modifyStaffOf = async (staff) => {
  dataDialogVisible.value = true
  const initialData = (await getStaffDetail(staff.id)).data.data
  const initialKeys = Object.keys(initialData)
  initialKeys.forEach(key => {
    dialogData[key] = initialData[key]
  })
  dialogData.laboratoryNameView = `[${dialogData.laboratoryId}] ${staff.laboratoryName}`
}

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
        </div>
      </el-row>
    </el-header>
    <el-main>
      <el-table :data="staffData" border style="width: 100%">
        <el-table-column prop="id" label="主任ID" width="180" disabled/>
        <el-table-column prop="laboratoryName" label="实验室" disabled/>
        <el-table-column prop="researcherName" label="主任"/>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="modifyStaffOf(scope.row)">修改</el-button>
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
    <el-form :model="dialogData" label-width="100">
      <el-form-item label="主任ID">
        <el-input v-model="dialogData.id" disabled/>
      </el-form-item>
      <el-form-item label="实验室">
        <el-input v-model="dialogData.laboratoryNameView" disabled/>
      </el-form-item>
      <el-form-item label="主任">

      </el-form-item>
      <el-form-item label="任期">
        <el-date-picker
            v-model="dialogData.dueDate"
            type="date"
            placeholder="Pick a day"
        />
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