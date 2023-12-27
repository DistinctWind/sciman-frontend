<script setup>
import CardView from "@/components/home/CardView.vue";
import {onMounted, reactive} from "vue";
import {getCount} from "@/api/count/count";
import log from "@/utils/debug";

const count = reactive({
  lab: 0,
  researcher: 0,
  secretary: 0,
  venue: 0
})

onMounted(async () => {
  const result = await getCount()
  const response = result.data
  log(response)
  count.lab = response.data.laboratory
  count.researcher = response.data.researcher
  count.secretary = response.data.secretary
  count.venue = response.data.venue
})
</script>

<template>
  <div class="dashboard">
    <CardView title="实验室" :count="count.lab"/>
    <CardView title="研究人员" :count="count.researcher"/>
    <CardView title="秘书" :count="count.secretary"/>
    <CardView title="办公场地" :count="count.venue"/>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  flex-wrap: wrap;
}
</style>