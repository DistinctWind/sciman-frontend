<script setup>
import CardView from "@/components/home/CardView.vue";
import {onMounted, reactive} from "vue";
import {getCount} from "@/api/count/count";
import log from "@/utils/debug";

const count = reactive({
  laboratory: 0,
  researcher: 0,
  secretary: 0,
  venue: 0,
  organization: 0,
  project: 0,
  contact: 0,
  achievement: 0,
})

onMounted(async () => {
  const result = await getCount()
  const response = result.data.data
  log(response)

  const keys = Object.keys(count)
  keys.forEach(key => {
    count[key] = response[key]
  })
})
</script>

<template>
  <div class="dashboard">
    <CardView title="实验室" :count="count.laboratory"/>
    <CardView title="研究人员" :count="count.researcher"/>
    <CardView title="秘书" :count="count.secretary"/>
    <CardView title="办公场地" :count="count.venue"/>
    <CardView title="外部单位" :count="count.organization"/>
    <CardView title="项目" :count="count.project"/>
    <CardView title="联系人" :count="count.contact"/>
    <CardView title="科研成果" :count="count.achievement"/>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  flex-wrap: wrap;
}
</style>