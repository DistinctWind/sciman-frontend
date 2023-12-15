<script setup>
import {computed} from "vue";
import {useStore} from "vuex";
const store = useStore()

const username = computed(() => store.state.username)
const id = computed(() => store.state.id)
const role = computed(() => store.state.role)
</script>

<template>
<div>
  <p>username = {{username}}</p>
  <p>id = {{id}}</p>
  <p>role = {{role}}</p>
</div>
</template>

<style scoped>

</style>