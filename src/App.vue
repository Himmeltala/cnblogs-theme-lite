<script setup lang="ts">
import LeftSide from "./fragments/LeftSide.vue";
import RightSide from "./fragments/RightSide.vue";
</script>

<template>
  <div class="App">
    <LeftSide />
    <router-view />
    <RightSide />
  </div>
</template>

<style scoped></style>
