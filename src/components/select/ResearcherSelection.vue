<script setup>
import {onMounted, ref, watch} from "vue";
import {listAllResearcher} from "@/api/person/researcher";
import log from "@/utils/debug";

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])


const selectedOption = ref()
const options = ref([])
const fetchOptions = async () => {
  const result = await listAllResearcher()
  const response = result.data
  options.value = response.data
}

onMounted(async () => {
  await fetchOptions()
  selectedOption.value = props.modelValue
})

watch(()=>props.modelValue, (newVal) => {
  selectedOption.value = newVal
})

const handleSelect = () => {
  emit('update:modelValue', selectedOption.value)
  log(`selected option: ${selectedOption.value}`)
}
</script>

<template>
<div>
  <el-select v-model="selectedOption" @change="handleSelect" placeholder="输入研究员姓名或工号来进行筛选" filterable>
    <el-option v-for="r in options"
               :label="`[${r.employeeId}] ${r.name}`"
               :value="r.employeeId"
               :key="r.employeeId">

    </el-option>
  </el-select>
</div>
</template>

<style scoped>

</style>