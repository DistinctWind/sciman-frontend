<script setup>
import {reactive} from "vue";
import log, {debug} from "@/utils/debug";
import {loginVerify} from "@/api/login/login";
import {saveUserInfo} from "@/utils/storeage";
import {useRouter} from "vue-router";

const router = useRouter()
const form = reactive({
  username: '',
  password: '',
})

const onLogin = async () => {
  const result = await loginVerify(form)
  const response = result.data
  log(response)
  if (response.code === 0) { // login successful
    const info = {
      id: response.data.id,
      username: form.username,
      role: response.data.role
    }
    saveUserInfo(info)
    await router.push('/home')
  }
}

const onLoginAsAdmin = async () => {
  log('Login using admin account')
  const info = {
    username: 'admin',
    role: 'admin',
    id: 2
  }
  saveUserInfo(info)
  await router.push('/home')
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
        <el-form-item>
          <el-button type="primary" @click="onLogin">登录</el-button>
          <el-button v-if="debug"
              type="danger" @click="onLoginAsAdmin">[Debug]作为管理员登录</el-button>
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