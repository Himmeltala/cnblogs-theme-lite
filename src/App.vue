<script setup lang="ts"></script>

<template>
  <GitHub />
  <Navigator />
  <LeftSide />
  <div class="container">
    <router-view v-slot="{ Component }">
      <Transition name="fade">
        <KeepAlive :exclude="['Essay']">
          <component :is="Component" />
        </KeepAlive>
      </Transition>
    </router-view>
  </div>
  <RightSide />
</template>

<style scoped>
.container {
  position: absolute;
  left: 23.8vw;
  top: 10vh;
  width: 52.5vw;
  height: 90vh;
  overflow-x: hidden;
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
