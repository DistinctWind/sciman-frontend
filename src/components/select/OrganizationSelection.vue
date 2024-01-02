<script setup>
import {onMounted, ref, watch} from "vue";
import log from "@/utils/debug";
import {listAllOrganizationName} from "@/api/organization/organization";

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const selectedOption = ref()
const options = ref([])

const fetchOptions = async () => {
  const result = await listAllOrganizationName()
  const response = result.data
  options.value = response.data
}

onMounted(async () => {
  await fetchOptions()
  selectedOption.value = props.modelValue
})

watch(() => props.modelValue, (newVal) => {
  selectedOption.value = newVal
})

const handleSelect = () => {
  emit('update:modelValue', selectedOption.value)
  log(`selected option: ${selectedOption.value}`)
}
</script>

<template>
<div>
  <el-select v-model="selectedOption" @change="handleSelect" placeholder="组织" filterable>
    <el-option v-for="org in options" :label="`[${org.id}] ${org.organizationName}`" :value="org.id" :key="org.id"></el-option>
  </el-select>
</div>
</template>

<style scoped>

</style>