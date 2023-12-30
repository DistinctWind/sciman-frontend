<script setup>
import {useRoute} from "vue-router";
import {computed, onMounted, reactive} from "vue";
import {getOrganizationViewById} from "@/api/organization/organization";
import {iconStyle} from "@/components/iconStyle";
import {Aim, Avatar, Cellphone, ChatDotRound, Grid} from "@element-plus/icons-vue";

const route = useRoute()
const organizationId = computed(() => route.params.organizationId)
const data = reactive({
  id: 1,
  organizationName: "鸿蒙科技有限公司",
  address: "北京市海淀区中关村大街1号",
  principalContact: {
    id: 1,
    officePhoneNo: "812345678",
    mobilePhoneNo: "13987654321",
    emailAddress: "john.doe@example.com"
  },
  secondaryContacts: [
    {
      id: 2,
      officePhoneNo: "823456789",
      mobilePhoneNo: "18876543210",
      emailAddress: "jane.smith@example.com"
    },
    {
      id: 4,
      officePhoneNo: "845678901",
      mobilePhoneNo: "16543210983",
      emailAddress: "mary.wilson@example.com"
    },
    {
      id: 7,
      officePhoneNo: "878901234",
      mobilePhoneNo: "13210987656",
      emailAddress: "michael.brown@example.com"
    },
    {
      id: 10,
      officePhoneNo: "801234567",
      mobilePhoneNo: "19876543219",
      emailAddress: "emily.chen@example.com"
    }
  ]
})

onMounted(async () => {
  const result = await getOrganizationViewById(organizationId.value)
  const response = result.data
  const keys = Object.keys(data)
  keys.forEach(key => {
    data[key] = response.data[key]
  })
})
</script>

<template>
  <div style="flex: 1">
    <el-button
        class="margin-bottom"
        @click="$router.back()">
      返回
    </el-button>
    <el-descriptions
        title="组织详情"
        :column="1"
        class="margin-bottom"
        border>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <Grid/>
            </el-icon>
            <span>组织ID</span>
          </div>
        </template>
        {{ data.id }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <Avatar/>
            </el-icon>
            <span>组织名称</span>
          </div>
        </template>
        {{ data.organizationName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <Menu/>
            </el-icon>
            <span>地址</span>
          </div>
        </template>
        {{ data.address }}
      </el-descriptions-item>
    </el-descriptions>
    <el-descriptions
        :column="1"
        title="负责人"
        class="margin-bottom"
        border>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <Aim/>
            </el-icon>
            <span>办公电话</span>
          </div>
        </template>
        {{ data.principalContact.officePhoneNo }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <Cellphone/>
            </el-icon>
            <span>手机号</span>
          </div>
        </template>
        {{ data.principalContact.mobilePhoneNo }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <ChatDotRound/>
            </el-icon>
            <span>邮箱</span>
          </div>
        </template>
        {{ data.principalContact.emailAddress }}
      </el-descriptions-item>
    </el-descriptions>
    <div class="margin-bottom">
      <h3>次要联系人列表</h3>
      <el-table :data="data.secondaryContacts" border>
        <el-table-column label="办公电话" prop="officePhoneNo"></el-table-column>
        <el-table-column label="手机号" prop="mobilePhoneNo"></el-table-column>
        <el-table-column label="邮箱" prop="emailAddress"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style scoped>
.margin-bottom {
  margin-bottom: 10px;
}
</style>