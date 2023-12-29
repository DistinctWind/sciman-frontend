<script setup>
import {useRoute} from "vue-router";
import {computed, onMounted} from "vue";
import log from "@/utils/debug";

const route = useRoute();
const projectId = computed(() => route.params.projectId)

onMounted(() => {
  log(route.params.projectId);
  // projectId.value = route.params.projectId
});
</script>

<template>
  <div>
    <h1>Project Detail</h1>
    <p>{{ projectId }}</p>
  </div>
</template>

<style scoped>

</style>