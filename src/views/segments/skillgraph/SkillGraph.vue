<script setup lang="ts">
import { useSkillGraph } from "./index";

const localSetting = LiteUtils.getLocalSetting();

watch(localSetting, (val, old) => {
  if (val.theme.color != old.theme.color) {
    useSkillGraph(110, localSetting.value.theme.color, LiteConfig.__LITE_CONFIG__.graph);
  }
});

onMounted(() => {
  if (LiteConfig.__LITE_CONFIG__.graph) {
    useSkillGraph(110, localSetting.value.theme.color, LiteConfig.__LITE_CONFIG__.graph);
  }
});
</script>

<template>
  <div class="skillgraph" v-if="LiteConfig.__LITE_CONFIG__.graph">
    <canvas id="graph" width="220" height="220"></canvas>
    <div id="floating"></div>
  </div>
</template>

<style scoped lang="scss">
.skillgraph {
  width: inherit;
  height: 210px;
  display: flex;
  position: relative;
  box-sizing: border-box;
  justify-content: center;

  #graph {
    cursor: pointer;
    position: absolute;
  }

  #floating {
    position: absolute;
    display: none;
    white-space: nowrap;
    z-index: 2;
    transition: left 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s, top 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s;
    background-color: var(--l-box-bg);
    padding: 10px;
    pointer-events: none;

    border: {
      style: solid;
      width: 0;
      color: rgb(51, 51, 51);
      radius: 10px;
    }
  }
}
</style>
