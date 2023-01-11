<script setup lang="ts"></script>

<template>
  <div class="card mx-1.3 p-4.5">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.card {
  box-sizing: border-box;
  background-color: #252525;
  border-radius: 6px;
}
</style>
