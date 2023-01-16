<script setup lang="ts">
function complete(asyncComp: any) {}
</script>

<template>
  <GitHub />
  <!-- <Navigation /> -->
  <!-- <LShowcase /> -->
  <div id="lite-content" class="wvw-55">
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <KeepAlive :include="['Home']">
          <Suspense>
            <component @complete="complete" :is="Component" />
          </Suspense>
        </KeepAlive>
      </template>
    </RouterView>
  </div>
  <RShowcase />
  <ToolKits />
</template>
