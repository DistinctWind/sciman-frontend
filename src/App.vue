<template>
  <router-view></router-view>
</template>

<script setup>

import {debug, debugTarget, loginAsAdmin} from "@/utils/debug";
import {onMounted} from "vue";
import router from "@/route";

onMounted(async () => {
  if (debug){
    await loginAsAdmin()
    await router.push(debugTarget)
  }
})

</script>

<style>
body {
  width: 100%;
  height: 100%;
  margin: 0;
}
</style>
