<script setup lang="ts">
</script>

<template>
  <div id="app-pack">
    <GitHub />
    <Navigator />
    <LeftSidebar />
    <div id="app-vessel">
      <router-view v-slot="{ Component }">
        <template v-if="Component">
          <Transition name="fade">
            <KeepAlive :exclude="['Essay', 'Category', 'MyTags', 'TagPage']">
              <Suspense>
                <component :is="Component" />
                <template #fallback>
                  Loading...
                </template>
              </Suspense>
            </KeepAlive>
          </Transition>
        </template>
      </router-view>
    </div>
    <RightSidebar />
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
