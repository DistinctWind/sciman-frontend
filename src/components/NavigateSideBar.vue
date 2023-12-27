<script setup>
import {
  House,
  Menu as IconMenu, Search, User, UserFilled, View,
} from '@element-plus/icons-vue'
</script>

<template>
  <div>
    <el-scrollbar style="height: 100%">
      <el-menu
          default-active="1"
      >
        <el-menu-item index="1" @click="$router.push('/home')">
          <el-icon>
            <House/>
          </el-icon>
          <span>仪表盘</span>
        </el-menu-item>
        <el-menu-item index="2" @click="$router.push('/laboratoryManagement')">
          <el-icon>
            <IconMenu/>
          </el-icon>
          <span>实验室管理</span>
        </el-menu-item>
        <el-sub-menu index="3">
          <template #title>
            <el-icon><UserFilled /></el-icon>
            <span>人事管理</span>
          </template>
          <el-menu-item index="3-1" @click="$router.push('/researcherManagement')">
            <el-icon><Search /></el-icon>
            <span>研究员管理</span>
          </el-menu-item>
          <el-menu-item index="3-2" @click="$router.push('/secretaryManagement')">
            <el-icon><User /></el-icon>
            <span>秘书管理</span>
          </el-menu-item>
          <el-menu-item index="3-4" @click="$router.push('/staffManagement')">
            <el-icon><View /></el-icon>
            <span>主任管理</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="4" @click="$router.push('/venueManagement')">
          <el-icon><House /></el-icon>
          <span>场地管理</span>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style scoped>

</style>