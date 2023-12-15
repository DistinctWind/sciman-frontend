<script setup>
import {computed} from "vue";
import {useStore} from "vuex";
const store = useStore()
const username = computed(()=>store.state.username)
const id = computed(()=>store.state.id)
const role = computed(()=>store.state.role)
const debugInfo = [
  {username, id, role}
]
</script>

<template>
<div>
  <el-table :data="debugInfo" style="width: 100%">
    <el-table-column prop="username" label="Username"/>
    <el-table-column prop="id" label="Id"/>
    <el-table-column prop="role" label="Role"/>
  </el-table>
</div>
</template>

<style scoped>

</style>