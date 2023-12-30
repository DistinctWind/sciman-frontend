<script setup>
import {onMounted, reactive, ref} from "vue";
import {listOrganization} from "@/api/organization/organization";
import log from "@/utils/debug";
import {useRouter} from "vue-router";

const router = useRouter()

const tableData = ref([])
const tableTotal = ref(10)
const queryParam = reactive({
  page: 1,
  pageSize: 10
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
</script>

<template>
<div>
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
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="组织ID" width="100" />
        <el-table-column prop="organizationName" label="组织名" />
        <el-table-column prop="address" label="地址"/>
        <el-table-column prop="principalContact.officePhoneNo" label="组织负责人办公电话" width="100" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="queryOrganizationDetail(scope.row)">详情</el-button>
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

</style>