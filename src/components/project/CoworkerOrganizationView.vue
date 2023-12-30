<script setup>
import {ref, watch} from "vue";

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const data = ref([
  {
    id: 0,
    organizationName: '',
    address: '',
    principalContact: {
      officePhoneNo: '',
    }
  }
])

watch(() => props.modelValue, (newVal) => {
  data.value = newVal
})

watch(data, (newVal) => {
  emit('update:modelValue', newVal)
})
</script>

<template>
  <div>
    <el-table :data="data" border>
      <el-table-column prop="id" label="组织ID" width="180"></el-table-column>
      <el-table-column prop="organizationName" label="组织名称" width="180"></el-table-column>
      <el-table-column prop="address" label="地址" width="180"></el-table-column>
      <el-table-column prop="principalContact.officePhoneNo" label="办公电话" width="180"></el-table-column>
    </el-table>
  </div>
</template>

<style scoped>

</style>