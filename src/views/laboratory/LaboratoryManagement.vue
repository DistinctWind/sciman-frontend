<script setup>
import {onMounted, reactive, ref} from "vue";
import log from "@/utils/debug";
import {listLaboratory} from "@/api/lab/laboratory";
import {getSecretaryIdOfLabId} from "@/api/person/secretary";
import SecretarySelection from "@/components/select/SecretarySelection.vue";

const tableData = ref([])
const tableTotal = ref(10)
const queryParam = reactive({
  page: 1,
  pageSize: 10,
  laboratoryNameFileter: ''
})

const query = async () => {
  log(queryParam)
  const result = await listLaboratory(queryParam)
  const response = result.data
  tableData.value = response.data.laboratory
  tableTotal.value = response.data.total
}

onMounted(async () => {
  await query()
})

const modifySecretaryDialogVisible = ref(false)
const modifySecretaryDialogData = reactive({
  laboratoryId: '',
  laboratoryName: '',
  secretaryId: ''
})

const modifySecretary = async (lab) => {
  modifySecretaryDialogVisible.value = true
  modifySecretaryDialogData.laboratoryName = lab.laboratoryName
  modifySecretaryDialogData.laboratoryId = lab.id
  modifySecretaryDialogData.secretaryId = (await getSecretaryIdOfLabId(lab.id)).data.data

}
</script>

<template>
  <div>
    <el-container>
      <el-header>
        <el-row>
          <el-row>
            <span style="margin-right: 10px">实验室名称</span>
            <el-input class="input" v-model="queryParam.laboratoryNameFilter" @keyup.enter="query"/>
          </el-row>
          <div class="query">
            <el-button type="primary" @click="query">查询</el-button>
            <el-button type="success" @click="insert">新增</el-button>
          </div>
        </el-row>
      </el-header>
      <el-main class="el-main">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="id" label="实验室ID" width="180"/>
          <el-table-column prop="laboratoryName" label="实验室名称" width="180"/>
          <el-table-column prop="stuffName" label="主任"/>
          <el-table-column prop="secretaryName" label="秘书"/>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button size="small" @click="modifySecretary(scope.row)">修改秘书</el-button>
              <el-button size="small" type="danger" @click="deleteVenueOf(scope.row)">删除</el-button>
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
    <el-dialog v-model="modifySecretaryDialogVisible">
      <el-form :model="modifySecretaryDialogData" label-width="120px">
        <el-form-item label="实验室ID">
          <el-input v-model="modifySecretaryDialogData.laboratoryId" disabled/>
        </el-form-item>
        <el-form-item label="实验室名称">
          <el-input v-model="modifySecretaryDialogData.laboratoryName" disabled/>
        </el-form-item>
        <el-form-item label="秘书">
          <SecretarySelection v-model="modifySecretaryDialogData.secretaryId"/>
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