<script setup>
import {
  ColdDrink,
  Grid, HotWater,
  House, InfoFilled,
  Menu as IconMenu, OfficeBuilding, Search, User, UserFilled, View,
} from '@element-plus/icons-vue'
import {useStore} from "vuex";
import {computed} from "vue";
import {notImplemented} from "@/utils/implementattion";

const store = useStore()
const role = computed(() => store.state.role)
const isAdmin = computed(() => role.value === 'admin')
</script>

<template>
  <div>
    <el-scrollbar style="height: 100%">
      <el-menu
          default-active="1"
      >
        <el-menu-item index="1" @click="$router.push('/home')" v-if="isAdmin">
          <el-icon>
            <House/>
          </el-icon>
          <span>仪表盘</span>
        </el-menu-item>
        <el-menu-item index="2" @click="$router.push('/laboratoryManagement')" v-if="isAdmin">
          <el-icon>
            <IconMenu/>
          </el-icon>
          <span>实验室管理</span>
        </el-menu-item>
        <el-sub-menu index="3" v-if="isAdmin">
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
        <el-menu-item index="4" @click="$router.push('/venueManagement')" v-if="isAdmin">
          <el-icon><House /></el-icon>
          <span>场地管理</span>
        </el-menu-item>
        <el-sub-menu index="5">
          <template #title>
            <el-icon><Grid /></el-icon>
            <span>项目管理</span>
          </template>
          <el-menu-item index="5-1" @click="$router.push('/projectManagement')">
            <el-icon><InfoFilled /></el-icon>
            <span>项目详情</span>
          </el-menu-item>
          <el-menu-item index="5-2" @click="notImplemented">
            <el-icon><ColdDrink /></el-icon>
            <span>子项目管理</span>
          </el-menu-item>
          <el-menu-item index="5-3" @click="notImplemented">
            <el-icon><ColdDrink /></el-icon>
            <span>项目参与人员</span>
          </el-menu-item>
          <el-menu-item index="5-4" @click="notImplemented">
            <el-icon><ColdDrink /></el-icon>
            <span>项目合作方管理</span>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="6">
          <template #title>
            <el-icon><OfficeBuilding /></el-icon>
            <span>组织管理</span>
          </template>
          <el-menu-item index="6-1" @click="$router.push('/organizationManagement')">
            <template #title>
              <el-icon><InfoFilled /></el-icon>
              <span>组织详情</span>
            </template>
          </el-menu-item>
          <el-menu-item index="6-2" @click="$router.push('/contactManagement')">
            <template #title>
              <el-icon><UserFilled /></el-icon>
              <span>组织联系人</span>
            </template>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="7">
          <template #title>
            <el-icon><HotWater /></el-icon>
            <span>科研成果管理</span>
          </template>
          <el-menu-item index="7-1" @click="$router.push('/achievementManagement')">
            <template #title>
              <el-icon><InfoFilled /></el-icon>
              <span>科研成果详情</span>
            </template>
          </el-menu-item>
          <el-menu-item index="7-2" @click="$router.push('/contributionManagement')">
            <template #title>
              <el-icon><ColdDrink /></el-icon>
              <span>科研成果贡献</span>
            </template>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style scoped>

</style>