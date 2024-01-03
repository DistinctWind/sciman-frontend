<script setup>
import {onMounted, ref, watch} from "vue";
import {listAllResearcher} from "@/api/person/researcher";
import log from "@/utils/debug";

const props = defineProps(['modelValue', 'labId'])
const emit = defineEmits(['update:modelValue', 'update:labId'])

const selectedOption = ref()
const options = ref([])
const labId = ref()
const fetchOptions = async () => {
  log(`fetching options for lab ${labId.value}`)
  const result = await listAllResearcher(labId.value)
  const response = result.data
  options.value = response.data
}

onMounted(async () => {
  selectedOption.value = props.modelValue
  labId.value = props.labId
  await fetchOptions()
  if (options.value.length > 0) {
    selectedOption.value = options.value[0].employeeId
  }
})

watch(()=>props.modelValue, (newVal) => {
  selectedOption.value = newVal
})

watch(()=>props.labId, async (newVal) => {
  labId.value = newVal
  await fetchOptions()
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