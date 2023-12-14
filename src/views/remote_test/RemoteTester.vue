<script setup>
import {ref} from "vue";
import log from "@/utils/debug";
import request from "@/utils/request";

const value = ref('')

function onClick1() {
  log('button clicked')
  request.get('/hello')
      .then((received) => {
        value.value = received.data
      })
}

</script>

<template>
  <div>
    <h1>Remote Tester!</h1>
    <p>received value = {{ value }}</p>

    <el-button @click="onClick1">Test</el-button>
  </div>
</template>

<style scoped>

</style>