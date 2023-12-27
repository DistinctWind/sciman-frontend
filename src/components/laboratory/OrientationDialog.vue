<script setup>
import {onMounted, ref, watch} from "vue";
import {getOrientationOfLabId} from "@/api/lab/laboratory";
import log from "@/utils/debug";

const props = defineProps(['modelValue', 'laboratoryId'])
const emit = defineEmits(['update:modelValue'])

const dialogVisible = ref(false)
const laboratoryId = ref('')

const orientation = ref('')

const query = async () => {
  const result = await getOrientationOfLabId(laboratoryId.value)
  const response = result.data
  log(response)
  orientation.value = response.data
}

watch(()=>props.modelValue, (newVal) => {
  dialogVisible.value = newVal
})

watch(()=>props.laboratoryId, async (newVal) => {
  laboratoryId.value = newVal
  await query()
})

watch(()=>dialogVisible.value, (newVal) => {
  emit('update:modelValue', newVal)
})

onMounted(async () => {
  laboratoryId.value = props.laboratoryId
  dialogVisible.value = props.modelValue
  await query()
})
</script>

<template>
<div>
  <el-dialog v-model="dialogVisible">
    <h1>实验室研究方向</h1>
    {{orientation}}
  </el-dialog>
</div>
</template>

<style scoped>

</style>