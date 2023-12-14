<script setup>
import {reactive} from "vue";
import log from "@/utils/debug";
import {loginVerify} from "@/api/login/login";

const form = reactive({
  username: '',
  password: '',
  expectedRole: 'admin',
})

const onLogin = async () => {
  const result = await loginVerify(form)
  const response = result.data
  log(response)
  if (response.code === 1) { // login successful

  }
}
</script>

<template>
<div class="back">
  <div>
    <h1>SCIMAN 科研管理系统</h1>
    <div class="block">
      <el-form :model="form" label-width="120px">
        <el-form-item label="用户名">
          <el-input v-model="form.username"/>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" show-password/>
        </el-form-item>
        <el-form-item label="角色">
          <el-radio-group v-model="form.expectedRole">
            <el-radio label="admin">管理员</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

</div>
</template>

<style scoped>
.back {
  user-select: none;
  position: relative;
  width: 100%;
  height: 100vh;
  text-align: center;
}

.block {
  margin: 0 auto;
  padding: 4% 10%;
  width: 70%;
  border-radius: 8px;
  box-shadow: 2px 2px 2px 2px #4d4d4875;
}

</style>