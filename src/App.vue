<script setup lang="ts"></script>

<template>
  <LeftSide />
  <router-view v-slot="{ Component }">
    <Transition name="fade">
      <component :is="Component" />
    </Transition>
  </router-view>
  <RightSide />
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
