<script setup>
import {useRoute} from "vue-router";
import {computed, onMounted, reactive} from "vue";
import log from "@/utils/debug";
import ProjectView from "@/components/project/ProjectView.vue";
import OrganizationView from "@/components/project/OrganizationView.vue";
import {getProjectDetailViewOfProjectId} from "@/api/project/project";
import ResearcherView from "@/components/person/ResearcherView.vue";

const route = useRoute();
const projectId = computed(() => route.params.projectId)
const projectDetailData = reactive({
  project: {
    projectId: 0,
    mainResearcherName: "",
    name: "",
    beginDate: "",
    endDate: "",
    budget: 0,
    clientOrganizationName: ""
  },
  projectAttendances: [
    {
      id: 0,
      researcherId: 0,
      researcherName: "",
      projectName: ""
    },
  ],
  subprojects: [
    {
      id: 0,
      projectName: "",
      principalResearcherName: "",
      dueDate: "",
      budget: 0,
      techDescription: ""
    },
  ],
  clientOrganization: {
    id: 0,
    organizationName: "",
    address: "",
    principalContact: {
      id: 0,
      officePhoneNo: "",
      mobilePhoneNo: "",
      emailAddress: ""
    },
    secondaryContacts: [
      {
        id: 0,
        officePhoneNo: "",
        mobilePhoneNo: "",
        emailAddress: ""
      },
    ]
  },
  coworkerOrganizations: [
    {
      id: 0,
      organizationName: "",
      address: "",
      principalContact: {
        id: 0,
        officePhoneNo: "",
        mobilePhoneNo: "",
        emailAddress: ""
      },
      secondaryContacts: [
        {
          id: 0,
          officePhoneNo: "",
          mobilePhoneNo: "",
          emailAddress: ""
        },
      ]
    }
  ],
  mainResearcher: {
    employeeId: 0,
    laboratoryName: "",
    name: "",
    gender: 0,
    age: 0
  }
})

onMounted(async () => {
  const result = await getProjectDetailViewOfProjectId(projectId.value)
  const response = result.data
  log(response)
  const keys = Object.keys(projectDetailData)
  keys.forEach(key => {
    projectDetailData[key] = response.data[key]
  })
});
</script>

<template>
  <div>
    <el-row :gutter="10" align="bottom" style="margin-bottom: 10px">
      <el-col :span="12">
        <ProjectView v-model="projectDetailData.project"/>
      </el-col>
      <el-col :span="12">
        <OrganizationView v-model="projectDetailData.clientOrganization"
                          title="项目委托方"/>
      </el-col>
    </el-row>

    <el-row>
      <ResearcherView v-model="projectDetailData.mainResearcher"
                      title="项目负责人"/>
    </el-row>
  </div>
</template>

<style scoped>

</style>