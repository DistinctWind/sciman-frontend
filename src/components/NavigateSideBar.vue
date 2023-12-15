<script setup>
import {
  House,
  Menu as IconMenu,
} from '@element-plus/icons-vue'
</script>

<template>
  <div class="side">
    <el-scrollbar style="height: 100%">
      <el-menu
          default-active="1"
      >
        <el-menu-item index="1" @click="this.$router.push('/home')">
          <el-icon>
            <House/>
          </el-icon>
          <span>主页</span>
        </el-menu-item>
        <el-menu-item index="2" @click="this.$router.push('/laboratoryManagement')">
          <el-icon>
            <IconMenu/>
          </el-icon>
          <span>实验室管理</span>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style scoped>

</style>