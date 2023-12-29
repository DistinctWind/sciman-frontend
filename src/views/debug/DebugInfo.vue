<script setup>

import {coreInfo} from "@/store";
import {onMounted, reactive, ref, watch} from "vue";
import log from "@/utils/debug";
import {getProjectDetailViewOfProjectId} from "@/api/project/project";
import {analysisResponse} from "@/utils/analysisResponse";
import OrganizationView from "@/components/project/OrganizationView.vue";

const {username, id, role} = coreInfo()

const debugInfo = [
  {username, id, role}
]

const tableColumns = [
  {prop: 'username', label: 'Username'},
  {prop: 'id', label: 'ID'},
  {prop: 'role', label: 'Role'}
]

const debugTarget = ref(true)
ref(1);
watch(debugTarget, (newVal) => {
  log(`debug target changed to ${newVal}`)
})

const projectDetailView = reactive({
  project: null,
  projectAttendances: null,
  subprojects: null,
  clientOrganization: null,
  coworkerOrganizations: null,
  mainResearcher: null
})

onMounted(async ()=>{
  const result = await getProjectDetailViewOfProjectId(1)
  const response = result.data
  analysisResponse(response)
  projectDetailView.clientOrganization = response.data.clientOrganization
  log(response)
})
</script>

<template>
  <div>
    <el-table :data="debugInfo" style="width: 100%">
      <el-table-column v-for="column in tableColumns"
                       :key="column.prop"
                       :prop="column.prop"
                       :label="column.label"/>
    </el-table>
    <OrganizationView v-model="projectDetailView.clientOrganization"/>
  </div>
</template>

<style scoped>

</style>