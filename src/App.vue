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

const debounce = (fn, delay) => {
  let timer = null;
  return function () {
    let context = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  }
}
const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
  constructor(callback) {
    callback = debounce(callback, 16);
    super(callback);
  }
}
</script>

<style>
body {
  width: 100%;
  height: 100%;
  margin: 0;
}
</style>
