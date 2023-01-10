<script setup lang="ts">
</script>

<template>
  <GitHub />
  <Navigator />
  <LeftSidebar />
  <div id="content">
    <router-view v-slot="{ Component }">
      <Transition name="fade">
        <KeepAlive :include="['Home']">
          <component :is="Component" />
        </KeepAlive>
      </Transition>
    </router-view>
  </div>
  <RightSidebar />
</template>

<style scoped>
#content {
  z-index: 999;
  width: 52.5vw;
  height: 90vh;
  top: 10vh;
  left: 23.8vw;
  overflow-x: hidden;
  position: absolute;
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
