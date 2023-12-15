<script setup>

import {useStore} from "vuex";
import {computed} from "vue";

const store = useStore()
const username = computed(() => store.state.username)
const id = computed(() => store.state.id)
const role = computed(() => store.state.role)

const debugInfo = [
  {username, id, role}
]

const tableColumns = [
  {prop: 'username', label: 'Username'},
  {prop: 'id', label: 'ID'},
  {prop: 'role', label: 'Role'}
]
</script>

<template>
  <div>
    <el-table :data="debugInfo" style="width: 100%">
      <el-table-column v-for="column in tableColumns"
                       :key="column.prop"
                       :prop="column.prop"
                       :label="column.label"/>
    </el-table>
  </div>
</template>

<style scoped>

</style>