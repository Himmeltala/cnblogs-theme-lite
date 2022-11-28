<script setup lang="ts"></script>

<template>
  <div class="card">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.card {
  color: #a7a7a7;
  padding: 10px 20px;
  margin-bottom: 10px;
  background-color: #252525;
  border-radius: 6px;
}
</style>
