<script setup>

import HeaderComponent from "@/components/HeaderComponent.vue";
import NavigateSideBar from "@/components/NavigateSideBar.vue";
</script>

<template>
<div>
  <el-container>
    <el-header style="padding: 0">
      <HeaderComponent/>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <NavigateSideBar/>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</div>
</template>

<style scoped>

</style>