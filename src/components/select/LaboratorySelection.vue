<script setup>
import {onMounted, ref, watch} from "vue";
import {listAllLaboratories} from "@/api/lab/laboratory";
import log from "@/utils/debug";

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const selectedOption = ref()
const options = ref([])
const fetchOptions = async () => {
  const result = await listAllLaboratories()
  const response = result.data
  options.value = response.data
}

onMounted(async () => {
  await fetchOptions()
  selectedOption.value = props.modelValue
})

watch(()=>props.modelValue, (newVal) => {
  // log(`modelValue changed from ${oldVal} to ${newVal}`)
  selectedOption.value = newVal
})

const handleSelect = () => {
  emit('update:modelValue', selectedOption.value)
  log(`selected option: ${selectedOption.value}`)
}

</script>

<template>
  <div>
    <el-select v-model="selectedOption" @change="handleSelect" placeholder="实验室" filterable>
      <el-option v-for="lab in options" :label="lab.name" :value="lab.id" :key="lab.id"></el-option>
    </el-select>
  </div>
</template>

<style scoped>

</style>