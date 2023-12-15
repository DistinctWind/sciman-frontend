<script setup>
import {coreInfo, resetCoreInfo} from "@/store";
import {ArrowDown} from "@element-plus/icons-vue";
import {reactive, ref} from "vue";
import log from "@/utils/debug";
import {modifyPassword} from "@/api/login/login";
import {ElMessage} from "element-plus";

const {username, id} = coreInfo()

const modifyPasswordDialogVisible = ref(false)
const modifyPasswordForm = reactive({
  newPassword: ''
})
const modifyPasswordSubmit = async () => {
  log(modifyPasswordForm)
  modifyPasswordForm.id = id
  const result = await modifyPassword(modifyPasswordForm)
  log(result.data)
  if (result.data.code === 0) {
    modifyPasswordMessage.success()
  } else {
    modifyPasswordMessage.fail()
  }
}

const modifyPasswordMessage = {
  success: function () {
    modifyPasswordDialogVisible.value = false
    ElMessage({
      message: '密码修改成功',
      type: 'success'
    })
  },
  fail: function () {
    modifyPasswordDialogVisible.value = false
    ElMessage.error('密码修改失败，发生未知错误')
  }
}

const logout = () => {
  resetCoreInfo()
  ElMessage.success("用户退出")
}
</script>

<template>
  <div class="header">
    <div class="left">
      <span class="title">SCIMAN 科 研 管 理 系 统</span>
    </div>
    <div class="right">
      <el-dropdown>
        <span class="username" style="color: #a4b2e7">
          {{ username }}
          <el-icon><ArrowDown/></el-icon>
        </span>

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="modifyPasswordDialogVisible=true">
              <div>修改密码</div>
            </el-dropdown-item>
            <el-dropdown-item @click="logout">
              <div>退出登录</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <el-dialog
        v-model="modifyPasswordDialogVisible"
    >
      <el-form :model="modifyPasswordForm">
        <el-form-item label="新密码">
          <el-input v-model="modifyPasswordForm.newPassword"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="modifyPasswordSubmit">提交</el-button>
          <el-button @click="modifyPasswordDialogVisible=false">取消</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>
  </div>
</template>

<style scoped>
.header {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  user-select: none;
  background-color: #120d2a;
  color: #a4b2e7;
}

.left {
  display: flex;
  align-items: center;
  position: absolute;
  left: 0;
  align-self: center;
  height: 50%;
  padding: 10px;
}

.right {
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  align-self: center;
  height: 50%;
  padding: 10px;
}

.title {
  font-size: 1.5em;
  font-weight: bold;
}

</style>