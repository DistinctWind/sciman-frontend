<script setup>
import {onMounted, ref, watch} from "vue";
import {listAllSecretary} from "@/api/person/secretary";
import log from "@/utils/debug";

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const selectedOption = ref()
const options = ref([])
const fetchOptions = async () => {
  const result = await listAllSecretary()
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
    <el-select v-model="selectedOption" @change="handleSelect" placeholder="秘书" filterable>
      <el-option v-for="s in options" :label="`[${s.employeeId}] ${s.name}`" :value="s.employeeId" :key="s.employeeId"></el-option>
    </el-select>
  </div>
</template>

<style scoped>

</style>