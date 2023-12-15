<script setup>
import {coreInfo} from "@/store";

const {username} = coreInfo()
</script>

<template>
  <div class="header">
    <div class="left">
      <span class="title">SCIMAN 科 研 管 理 系 统</span>
    </div>
    <div class="right">
      <span class="username">{{username}}</span>
    </div>
  </div>
</template>

<style scoped>
.header {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  user-select: none;
  background-color: #120d2a;
  color: #a4b2e7;
}

.left {
  display: flex;
  align-items: center;
  position: absolute;
  left: 0;
  align-self: center;
  height: 50%;
  padding: 10px;
}

.right {
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  align-self: center;
  height: 50%;
  padding: 10px;
}

.title {
  font-size: 1.5em;
  font-weight: bold;
}

</style>