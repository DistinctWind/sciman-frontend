<script setup>
import {useRoute} from "vue-router";
import {computed, onMounted, reactive, ref} from "vue";
import {
  getOrganizationViewById,
  modifyOrganizationDetailData,
  modifyOrganizationPrincipleContact
} from "@/api/organization/organization";
import {iconStyle} from "@/components/iconStyle";
import {Aim, Avatar, Cellphone, ChatDotRound, Grid} from "@element-plus/icons-vue";
import {analysisResponse} from "@/utils/analysisResponse";

const route = useRoute()
const organizationId = computed(() => route.params.organizationId)
const data = reactive({
  id: 1,
  organizationName: "",
  address: "",
  principalContact: {
    id: 1,
    officePhoneNo: "",
    mobilePhoneNo: "",
    emailAddress: ""
  },
  secondaryContacts: [
    {
      id: 2,
      officePhoneNo: "",
      mobilePhoneNo: "",
      emailAddress: ""
    }
  ]
})

const query = async () => {
  const result = await getOrganizationViewById(organizationId.value)
  const response = result.data
  const keys = Object.keys(data)
  keys.forEach(key => {
    data[key] = response.data[key]
  })
}

onMounted(async () => {
  await query()
})

const principleContactModifyDialogVisible = ref(false)
const principleContactModifyDialogData = reactive({
  officePhoneNo: '',
  mobilePhoneNo: '',
  emailAddress: ''
})
const principleContactModify = () => {
  principleContactModifyDialogVisible.value = true
  const keys = Object.keys(principleContactModifyDialogData)
  keys.forEach(key => {
    principleContactModifyDialogData[key] = data.principalContact[key]
  })
}
const principleContactModifyConfirm = async () => {
  principleContactModifyDialogVisible.value = false
  const result = await modifyOrganizationPrincipleContact(data.id, principleContactModifyDialogData)
  const response = result.data
  analysisResponse(response)
  await query()
}

const organizationModifyDialogVisible = ref(false)
const organizationModifyDialogData = reactive({
  id: 1,
  organizationName: '',
  address: ''
})
const organizationModify = () => {
  organizationModifyDialogVisible.value = true
  const keys = Object.keys(organizationModifyDialogData)
  keys.forEach(key => {
    organizationModifyDialogData[key] = data[key]
  })
}
const organizationModifyConfirm = async () => {
  organizationModifyDialogVisible.value = false
  const result = await modifyOrganizationDetailData(organizationModifyDialogData)
  const response = result.data
  analysisResponse(response)
  await query()
}

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
      <template #extra>
        <el-button
            type="primary"
            @click="organizationModify">
          修改
        </el-button>
      </template>
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
      <template #extra>
        <el-button
            type="primary"
            @click="principleContactModify">
          修改
        </el-button>
      </template>
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
    <el-dialog v-model="principleContactModifyDialogVisible">
      <el-form label-width="100">
        <el-form-item label="办公电话">
          <el-input v-model="principleContactModifyDialogData.officePhoneNo"
                    :maxlength="9"
                    show-word-limit/>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="principleContactModifyDialogData.mobilePhoneNo"
                    :maxlength="11"
                    show-word-limit
          />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="principleContactModifyDialogData.emailAddress"
                    :maxlength="64"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="principleContactModifyDialogVisible = false">取消</el-button>
        <el-button type="success" @click="principleContactModifyConfirm">确定</el-button>
      </template>
    </el-dialog>
    <el-dialog v-model="organizationModifyDialogVisible">
      <el-form label-width="100">
        <el-form-item label="组织名称">
          <el-input v-model="organizationModifyDialogData.organizationName"
                    :maxlength="32"
                    show-word-limit/>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="organizationModifyDialogData.address"
                    :maxlength="128"
                    show-word-limit/>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="organizationModifyDialogVisible = false">取消</el-button>
        <el-button type="success" @click="organizationModifyConfirm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.margin-bottom {
  margin-bottom: 10px;
}
</style>