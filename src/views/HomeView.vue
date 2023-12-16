<script setup>
import CardView from "@/components/home/CardView.vue";
import {onMounted, reactive} from "vue";
import {getCount} from "@/api/count/count";
import log from "@/utils/debug";

const count = reactive({
  lab: 0,
  researcher: 0,
  secretary: 0,
})

onMounted(async () => {
  const {data: response} = await getCount()
  log(response)
  count.lab = response.data.laboratory
  count.researcher = response.data.researcher
  count.secretary = response.data.secretary
})
</script>

<template>
  <div class="dashboard">
    <CardView title="实验室" :count="count.lab"/>
    <CardView title="研究人员" :count="count.researcher"/>
    <CardView title="秘书" :count="count.secretary"/>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  flex-wrap: wrap;
}
</style>