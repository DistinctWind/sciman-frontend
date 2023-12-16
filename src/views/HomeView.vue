<script setup>
import CardView from "@/components/home/CardView.vue";
import {reactive} from "vue";

const count = reactive({
  lab: 0,
  researcher: 0,
  secretary: 0,
})
</script>

<template>
  <div class="dashboard">
    <CardView title="实验室" :count="count.lab"/>
    <CardView title="研究人员" :count="count.researcher"/>
    <CardView title="秘书" :count="count.researcher"/>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  flex-wrap: wrap;
}
</style>