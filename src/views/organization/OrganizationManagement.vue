<script setup>
import {onMounted, reactive, ref} from "vue";
import {addOrganization, deleteOrganization, listOrganization} from "@/api/organization/organization";
import log from "@/utils/debug";
import {useRouter} from "vue-router";
import {analysisResponse} from "@/utils/analysisResponse";

const router = useRouter()

const tableData = ref([])
const tableTotal = ref(10)
const queryParam = reactive({
  page: 1,
  pageSize: 10,
  nameFilter: ''
})

const query = async () => {
  const result = await listOrganization(queryParam)
  const response = result.data
  log(response)
  tableData.value = response.data.organizations
  tableTotal.value = response.data.total
}

onMounted(async () => {
  await query()
})

const queryOrganizationDetail = (organization) => {
  log(`querying organization detail of ${organization.id}`)
  router.push(`/organizationDetail/${organization.id}`)
}

const removeWarningDialogVisible = ref(false)
const removingOrganization = ref(null)
const removeButtonClicked = (organization) => {
  removingOrganization.value = organization
  removeWarningDialogVisible.value = true
}
const removeConfirm = async () => {
  const organization = removingOrganization.value
  log(`removing organization ${organization.id}`)
  const result = await deleteOrganization(organization.id)
  const response = result.data
  analysisResponse(response)
  await query()
  removeWarningDialogVisible.value = false
}

const insertDialogVisible = ref(false)
const insertDialogData = reactive({
  organizationName: '',
  address: '',
  principalContact: {
    officePhoneNo: '',
    mobilePhoneNo: '',
    emailAddress: ''
  }
})

const insert = async () => {
  insertDialogVisible.value = true
}

const insertConfirm = async () => {
  const result = await addOrganization(insertDialogData)
  const response = result.data
  analysisResponse(response)
  await query()
  insertDialogVisible.value = false
}
</script>

<template>
<div>
  <el-container>
    <el-header>
      <el-row>
        <el-row>
          <span style="margin-right: 10px">组织名</span>
          <el-input class="input" v-model="queryParam.nameFilter" @keyup.enter="query"/>
        </el-row>
        <div class="query">
          <el-button type="primary" @click="query">查询</el-button>
          <el-button type="success" @click="insert">新增</el-button>
        </div>
      </el-row>
    </el-header>
    <el-main>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="组织ID" width="100" />
        <el-table-column prop="organizationName" label="组织名" />
        <el-table-column prop="address" label="地址"/>
        <el-table-column prop="principalContact.officePhoneNo" label="组织负责人办公电话" width="100" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="queryOrganizationDetail(scope.row)">详情</el-button>
            <el-button size="small" type="danger" @click="removeButtonClicked(scope.row)">删除</el-button>
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
  <el-dialog v-model="removeWarningDialogVisible">
    <span>这会删除组织和所有的联系人，确定删除该组织吗？</span>
    <template #footer>
      <el-button @click="removeWarningDialogVisible = false">取消</el-button>
      <el-button type="danger" @click="removeConfirm">确定</el-button>
    </template>
  </el-dialog>
  <el-dialog v-model="insertDialogVisible">
    <el-form label-width="150px">
      <el-form-item label="组织名">
        <el-input v-model="insertDialogData.organizationName"/>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="insertDialogData.address"/>
      </el-form-item>
      <el-form-item label="组织负责人办公电话">
        <el-input v-model="insertDialogData.principalContact.officePhoneNo"/>
      </el-form-item>
      <el-form-item label="组织负责人手机号">
        <el-input v-model="insertDialogData.principalContact.mobilePhoneNo"/>
      </el-form-item>
      <el-form-item label="组织负责人邮箱">
        <el-input v-model="insertDialogData.principalContact.emailAddress"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="insertDialogVisible = false">取消</el-button>
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