<script setup>
import {ref, watch} from "vue";
import {iconStyle} from "@/components/iconStyle";
import {Grid} from "@element-plus/icons-vue";

const props = defineProps(['modelValue', 'title'])
const emit = defineEmits(['update:modelValue'])

const data = ref({
  employeeId: 0,
  laboratoryName: '',
  name: '',
  gender: 1,
  age: 0
})

watch(() => props.modelValue, (newVal) => {
  data.value = newVal
})

watch(data, (newVal) => {
  emit('update:modelValue', newVal)
})
</script>

<template>
  <div>
    <el-descriptions
        border
        :column="3"
        :title="props.title">
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <Grid/>
            </el-icon>
            <span>工号</span>
          </div>
        </template>
        {{ data.employeeId }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <Grid/>
            </el-icon>
            <span>姓名</span>
          </div>
        </template>
        {{ data.name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <Grid/>
            </el-icon>
            <span>性别</span>
          </div>

        </template>
        <span v-if="data.gender === 1">男</span>
        <span v-else>女</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <Grid/>
            </el-icon>
            <span>年龄</span>
          </div>
        </template>
        {{ data.age }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <Grid/>
            </el-icon>
            <span>所属实验室</span>
          </div>
        </template>
        {{ data.laboratoryName }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<style scoped>

</style>