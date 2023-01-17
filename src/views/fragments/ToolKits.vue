<script setup lang="ts"></script>

<template>
  <div id="toolkits" class="fixed right-3.5 wvw-2.5 tpv-85">
    <div class="kit hover">
      <el-tooltip effect="dark" content="工具箱" placement="left-start"> Hello </el-tooltip>
    </div>
  </div>
</template>

<style scoped lang="scss">
.kit {
  --at-apply: flex justify-center items-center content-center bg-#252525 w-8 h-8 p-1 rd-2;

  .kit-icon {
    --at-apply: w-5 h-5;
  }
}

.arrow-from-top-to-down {
  animation: arrowup 0.3s linear;
  transform: rotate(0deg);
}

.arrow-from-down-to-top {
  animation: arrowdown 0.3s linear;
  transform: rotate(180deg);
}

// from top to down
@keyframes arrowdown {
  0% {
    transform: rotate(0);
  }

  20% {
    transform: rotate(30deg);
  }

  40% {
    transform: rotate(60deg);
  }

  60% {
    transform: rotate(90deg);
  }

  80% {
    transform: rotate(150deg);
  }

  100% {
    transform: rotate(180deg);
  }
}

// from down to top
@keyframes arrowup {
  0% {
    transform: rotate(180deg);
  }

  20% {
    transform: rotate(150deg);
  }

  40% {
    transform: rotate(90deg);
  }

  60% {
    transform: rotate(60deg);
  }

  80% {
    transform: rotate(30deg);
  }

  100% {
    transform: rotate(0);
  }
}
</style>
