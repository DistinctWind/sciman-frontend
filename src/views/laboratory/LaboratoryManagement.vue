<script setup>

import {onMounted, reactive, ref} from "vue";
import log from "@/utils/debug";
import {listAllLabIntros} from "@/api/lab/laboratory";

const labData = ref([])
onMounted(async () => {
  const response = await listAllLabIntros()
  log(response.data)
  labData.value = response.data.data
})

const modifyLabDialogVisible = ref(false)
const labForm = reactive({
  id: -1,
  name: '',
  orientation: ''
})

const modifyLab = (row) => {
  log(row)
  modifyLabDialogVisible.value = true
  labForm.id = row.id
  labForm.name = row.name
  labForm.orientation = row.orientation
}

const modifyLabSubmit = () => {

}
</script>

<template>
  <div>
    <el-table :data="labData" border style="width: 100%">
      <el-table-column prop="id" label="实验室ID" width="180"/>
      <el-table-column prop="laboratoryName" label="实验室名称" width="180"/>
      <el-table-column prop="stuffName" label="主任"/>
      <el-table-column prop="secretaryName" label="秘书"/>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="modifyLab(scope.row)">编辑{{ scope.row.name }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="modifyLabDialogVisible">
      <el-form :model="labForm" label-width="120px">
        <el-form-item label="实验室ID">
          <el-input disabled v-model="labForm.id"/>
        </el-form-item>
        <el-form-item label="实验室名称">
          <el-input v-model="labForm.name"/>
        </el-form-item>
        <el-form-item label="实验室研究方向">
          <el-input v-model="labForm.orientation"
                    :rows="7"
                    type="textarea"
                    placeholder="研究方向介绍"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="modifyLabSubmit">
            提交
          </el-button>
          <el-button @click="modifyLabDialogVisible=false">
            取消
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<style scoped>

</style>