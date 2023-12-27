<script setup>

import {coreInfo} from "@/store";
import {ref, watch} from "vue";
import log from "@/utils/debug";
import OrientationDialog from "@/components/laboratory/OrientationDialog.vue";

const {username, id, role} = coreInfo()

const debugInfo = [
  {username, id, role}
]

const tableColumns = [
  {prop: 'username', label: 'Username'},
  {prop: 'id', label: 'ID'},
  {prop: 'role', label: 'Role'}
]

const debugTarget = ref(true)
const labId = ref(1)

watch(debugTarget, (newVal) => {
  log(`debug target changed to ${newVal}`)
})
</script>

<template>
  <div>
    <el-table :data="debugInfo" style="width: 100%">
      <el-table-column v-for="column in tableColumns"
                       :key="column.prop"
                       :prop="column.prop"
                       :label="column.label"/>
    </el-table>
    <OrientationDialog v-model="debugTarget"
                       v-model:laboratory-id="labId"/>
  </div>
</template>

<style scoped>

</style>