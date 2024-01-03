<script setup>
import {onMounted, reactive, ref, watch} from "vue";
import {listAllResearcher} from "@/api/person/researcher";
import log from "@/utils/debug";

const props = defineProps(['modelValue', 'labId', 'achievementId'])
const emit = defineEmits(['update:modelValue', 'update:labId', 'update:achievementId'])

const selectedOption = ref()
const options = ref([])
const listParam = reactive({
  laboratoryId: 0,
  achievementId: 0
})
const fetchOptions = async () => {
  log(`listParam = ${JSON.stringify(listParam)}`)
  const result = await listAllResearcher(listParam)
  const response = result.data
  options.value = response.data
}

onMounted(async () => {
  selectedOption.value = props.modelValue
  listParam.laboratoryId = props.labId === undefined ? 0 : props.labId
  listParam.achievementId = props.achievementId === undefined ? 0 : props.achievementId
  await fetchOptions()
  if (options.value.length > 0) {
    selectedOption.value = options.value[0].employeeId
  }
})

watch(() => props.modelValue, (newVal) => {
  selectedOption.value = newVal
})

watch(() => props.labId, async (newVal) => {
  listParam.laboratoryId = newVal
  await fetchOptions()
})

watch(() => props.achievementId, async (newVal) => {
  listParam.achievementId = newVal
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