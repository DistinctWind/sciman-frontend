<script setup>
import {computed, onMounted, ref, watch} from "vue";
import {listAllProjects} from "@/api/project/project";
import log from "@/utils/debug";

const props = defineProps(['modelValue', 'nullable'])
const emit = defineEmits(['update:modelValue'])

const selectedOption = ref(1)
const options = ref([])

const fetchOptions = async () => {
  const result = await listAllProjects()
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

const nullable = computed(() => props.nullable === undefined ? true : props.nullable)

</script>

<template>
<div>
  <el-select v-model="selectedOption" @change="handleSelect" placeholder="项目" filterable>
    <el-option v-if="nullable" label="All" :value="0" :key="0"></el-option>
    <el-option v-for="s in options" :label="`[${s.projectId}] ${s.name}`" :value="s.projectId" :key="s.projectId"></el-option>
  </el-select>
</div>
</template>

<style scoped>

</style>