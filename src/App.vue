<script setup lang="ts"></script>

<template>
  <LeftSide />
  <div class="view">
    <router-view v-slot="{ Component }">
      <Transition name="fade">
        <component :is="Component" />
      </Transition>
    </router-view>
  </div>
  <RightSide />
</template>

<style scoped>
.view {
  position: absolute;
  left: 10vw;
  top: 0;
  width: 80vw;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
