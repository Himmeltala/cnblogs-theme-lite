<script setup lang="ts">
import { useLoadingStore } from "@/store";

const store = useLoadingStore();
const { loading } = storeToRefs(store);
</script>

<template>
  <GitHub />
  <Navigator />
  <LeftSidebar />
  <div id="h-content" v-loading="loading">
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <Transition mode="out-in">
          <KeepAlive :include="['Home']">
            <Suspense>
              <component :is="Component" />
            </Suspense>
          </KeepAlive>
        </Transition>
      </template>
    </RouterView>
  </div>
  <RightSidebar />
</template>

<style scoped>
#h-content {
  width: 52.5vw;
  height: 90vh;
  top: 10vh;
  left: 23.8vw;
  overflow-x: hidden;
  position: absolute;
}
</style>
