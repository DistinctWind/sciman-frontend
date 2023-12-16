<script setup>
const prop = defineProps({
  title: String,
  count: Number
})
</script>

<template>
  <el-card class="show-card">
    <template #header>
      <span class="title">{{prop.title}}</span>
    </template>
    <span class="number">{{prop.count}}</span>
  </el-card>
</template>

<style scoped>
.title {
  font-size: large;
}
.number {
  font-size: xx-large;
  font-weight: bold;
}
.show-card {
  width: 250px;
  margin: 10px;
}
</style>