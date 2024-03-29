<script setup>
import {onMounted, reactive, ref, watch} from "vue";
import log from "@/utils/debug";
import {
  deleteContact,
  getContactDetail,
  getContactList,
  insertContactByOrgId,
  modifyContact
} from "@/api/contact/contact";
import OrganizationSelection from "@/components/select/OrganizationSelection.vue";
import {analysisResponse} from "@/utils/analysisResponse";

const tableData = ref([])
const tableTotal = ref(10)
const queryParam = reactive({
  page: 1,
  pageSize: 10,
  organizationId: 1
})

const query = async () => {
  const result = await getContactList(queryParam)
  const response = result.data
  log(response)
  tableData.value = response.data.contact
  tableTotal.value = response.data.total
}

onMounted(async () => {
  await query()
})

watch(() => queryParam.organizationId, async () => {
  await query()
})

const dataDialogVisible = ref(false)
const dialogData = reactive({
  id: 0,
  officePhoneNo: '',
  mobilePhoneNo: '',
  emailAddress: '',
})
const idVisible = ref(true)

const modify = async (contact) => {
  dataDialogVisible.value = true
  idVisible.value = true
  const initialData = (await getContactDetail(contact.id)).data.data
  const updateKeys = Object.keys(initialData)
  updateKeys.forEach(key => {
    if (dialogData[key] !== undefined) {
      dialogData[key] = initialData[key]
    }
  })
}

const confirm = async () => {
  dataDialogVisible.value = false
  let result = null
  if (idVisible.value) {
    result = await modifyContact(dialogData)
  } else {
    result = await insertContactByOrgId(dialogData, queryParam.organizationId)
  }
  const response = result.data
  analysisResponse(response)
  await query()
}

const del = async (contact) => {
  const result = await deleteContact(contact.id)
  const response = result.data
  analysisResponse(response)
  await query()
}

const insert = async () => {
  dataDialogVisible.value = true
  idVisible.value = false
  const keys = Object.keys(dialogData)
  keys.forEach(key => {
    dialogData[key] = ''
  })
}

</script>

<template>
  <div>
    <el-container>
      <el-header>
        <el-row>
          <el-row>
            <span style="margin-right: 10px">组织</span>
            <OrganizationSelection class="input" v-model="queryParam.organizationId"/>
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
          <el-table-column prop="officePhoneNo" label="办公电话"/>
          <el-table-column prop="mobilePhoneNo" label="移动电话"/>
          <el-table-column prop="emailAddress" label="邮件地址"/>
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
    <el-dialog v-model="dataDialogVisible">
      <el-form :model="dialogData" label-width="100">
        <el-form-item v-if="idVisible" label="ID">
          <el-input v-model="dialogData.id" disabled/>
        </el-form-item>
        <el-form-item label="办公电话">
          <el-input v-model="dialogData.officePhoneNo"
                    :maxlength="9"
                    show-word-limit/>
        </el-form-item>
        <el-form-item label="移动电话">
          <el-input v-model="dialogData.mobilePhoneNo"
                    :maxlength="11"
                    show-word-limit/>
        </el-form-item>
        <el-form-item label="邮件地址">
          <el-input v-model="dialogData.emailAddress"
                    :maxlength="64"
                    show-word-limit/>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dataDialogVisible=false">取消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
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