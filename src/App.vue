<script setup lang="ts"></script>

<template>
  <div id="app-pack">
    <GitHub />
    <Navigator />
    <LeftSide />
    <div id="app-vessel">
      <router-view v-slot="{ Component }">
        <Transition name="fade">
          <KeepAlive :exclude="['Essay']">
            <component :is="Component" />
          </KeepAlive>
        </Transition>
      </router-view>
    </div>
    <RightSide />
  </div>
</template>

<style scoped>
#app-pack {
  width: 100vw;
  height: 100vh;
  z-index: 999;
  position: relative;
}

#app-vessel {
  width: 52.5vw;
  height: 90vh;
  top: 10vh;
  left: 23.8vw;
  position: absolute;
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
