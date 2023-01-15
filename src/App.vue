<script setup lang="ts"></script>

<template>
  <GitHub />
  <Navigation />
  <LShowcase />
  <div id="h-content">
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
  <RShowcase />
  <ToolKits />
</template>

<style>
#h-content {
  width: 52.5vw;
  height: 90vh;
  top: 10vh;
  left: 23.8vw;
  overflow-x: hidden;
  position: absolute;
}
</style>
