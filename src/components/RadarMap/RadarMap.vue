<script setup lang="ts">
import { onMounted } from "vue";
import { createRadar, calcSize } from "./index";
import Config from "../../config";

const vw = calcSize(13.5);

onMounted(() => {
  if (Config.__LITE_CONFIG__.radar) {
    createRadar(vw / 2);
  }
});
</script>

<template>
  <div class="radar__packer" v-if="Config.__LITE_CONFIG__.radar">
    <canvas id="radar" :width="vw" :height="vw"></canvas>
    <div id="floating"></div>
  </div>
</template>

<style scoped lang="scss">
.radar__packer {
  position: relative;
  width: inherit;
  height: 210px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;

  #radar {
    position: absolute;
    cursor: pointer;
  }

  #floating {
    position: absolute;
    display: none;
    white-space: nowrap;
    z-index: 999;
    transition: left 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s, top 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s;
    background-color: rgba(50, 50, 50, 0.85);
    color: var(--text-color);
    font: 14px / 21px "Microsoft YaHei";
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