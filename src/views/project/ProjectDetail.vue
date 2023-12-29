<script setup>
import {useRouter} from "vue-router";
import {computed} from "vue";

const router = useRouter()

const projectId = computed(() => {
  return router.currentRoute.value.params.projectId
})
</script>

<template>
<div>
  <h1>Project Detail</h1>
  <p>{{projectId}}</p>
</div>
</template>

<style scoped>

</style>