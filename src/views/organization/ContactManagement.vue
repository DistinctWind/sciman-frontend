<script setup>
import {onMounted, reactive, ref} from "vue";
import log from "@/utils/debug";
import {getContactList} from "@/api/contact/contact";

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
</script>

<template>
  <div>
    <el-container>
      <el-header>
        <el-row>
          <el-row>
            <el-input class="input" v-model="queryParam.organizationId" @keyup.enter="query"/>
          </el-row>
          <div class="query">
            <el-button type="primary" @click="query">查询</el-button>
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
              <el-button size="small" @click="modifyStaffOf(scope.row)">修改</el-button>
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