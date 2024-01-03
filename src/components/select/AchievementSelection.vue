<script setup>
import {computed, onMounted, ref, watch} from "vue";
import log from "@/utils/debug";
import {listAllAchievement} from "@/api/achievement/achievement";

const props = defineProps(['modelValue', 'nullable'])
const emit = defineEmits(['update:modelValue'])

const nullable = computed(() => props.nullable === undefined ? true : props.nullable)

const selectedOption = ref(1)
const options = ref([])

const fetchOptions = async () => {
  const result = await listAllAchievement()
  const response = result.data
  options.value = response.data
}

onMounted(async () => {
  await fetchOptions()
  selectedOption.value = props.modelValue
  if (!nullable.value && options.value.length > 0) {
    selectedOption.value = options.value[0].id
  }
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
    <el-select v-model="selectedOption" @change="handleSelect" placeholder="项目" filterable>
      <el-option v-if="nullable" label="All" :value="0" :key="0"></el-option>
      <el-option v-for="s in options" :label="`[${s.id}] ${s.name}`" :value="s.id" :key="s.id"></el-option>
    </el-select>
  </div>
</template>

<style scoped>

</style>