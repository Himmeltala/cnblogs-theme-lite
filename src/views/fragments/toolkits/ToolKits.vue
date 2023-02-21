<script setup lang="ts">
import { blogApp } from "@/lite.config";
import { useStorage } from "@vueuse/core";
import { useToolKitsSettingStore } from "@/store";
import { nav } from "@/utils/router-helper";
import { CustType } from "@/types/data-type";

const router = useRouter();
const { toolKitsSetting } = storeToRefs(useToolKitsSettingStore());
const settings = useStorage<CustType.Settings>(`l-${blogApp}-settings`, {});

function moveToTopNail() {
  document.querySelector("#top-nail").scrollIntoView();
}

function changeDayTime() {
  const html = document.querySelector("html");
  if (settings.value.themeMode === "dark") {
    html.className = "light";
    settings.value.themeMode = "light";
  } else {
    html.className = "dark";
    settings.value.themeMode = "dark";
  }
}
</script>

<template>
  <div id="toolkits" class="noselect fixed right-15 top-65vh fsz-1.2 z-99">
    <div class="relative">
      <div
        :class="{ 'show-0 l-box-bg': settings.openToolKits, 'close-0': !settings.openToolKits }"
        class="back-home absolute hover left-0 w-8 h-8 f-c-c rd-2"
        @click="nav({ path: 'back', router })">
        <i-ep-back />
      </div>
      <div
        :class="{ 'show-1 l-box-bg': settings.openToolKits, 'close-1': !settings.openToolKits }"
        class="back-top absolute hover left-0 w-8 h-8 f-c-c rd-2"
        @click="moveToTopNail">
        <i-ep-position />
      </div>
      <div
        :class="{ 'show-2 l-box-bg': settings.openToolKits, 'close-2': !settings.openToolKits }"
        @click="changeDayTime"
        class="daytime absolute hover left-0 w-8 h-8 f-c-c rd-2">
        <template v-if="settings.themeMode === 'light'">
          <i-ep-sunny />
        </template>
        <template v-else>
          <i-ep-moon />
        </template>
      </div>
      <div
        :class="{ 'show-3 l-box-bg': settings.openToolKits, 'close-3': !settings.openToolKits }"
        @click="toolKitsSetting = !toolKitsSetting"
        class="setting absolute hover left-0 w-8 h-8 f-c-c rd-2">
        <i-ep-setting class="rotate-setting" />
      </div>
      <div
        @click="settings.openToolKits = !settings.openToolKits"
        :class="{ 'show-toolkits': settings.openToolKits, 'close-toolkits': !settings.openToolKits }"
        class="kits-box absolute hover top-40 left-0 w-8 h-8 f-c-c l-box-bg rd-2">
        <i-ep-arrow-right />
      </div>
    </div>
  </div>
  <LiteSetting />
</template>

<style scoped lang="scss">
$show-top: 0;
$close-end: 10rem;

@for $index from 0 to 4 {
  @if $index != 0 {
    $show-top: $show-top + 2.5rem;
  }

  .show-#{$index} {
    animation: show-#{$index}-animation math.div($index, 10) + 0.2s ease-in;
    top: $show-top;
  }

  .close-#{$index} {
    animation: close-#{$index}-animation math.div($index, 10) + 0.2s ease-in;
    top: $close-end;
    z-index: -1;
  }

  @keyframes show-#{$index}-animation {
    $show-anime-top: 0;

    @for $i from 0 to 11 {
      @if $index == 0 {
        $show-anime-top: $close-end - $i * 1rem;
      } @else {
        $show-anime-top: $i * math.div($show-top, 10);
      }

      #{$i * 10%} {
        top: $show-anime-top;
      }
    }
  }

  @keyframes close-#{$index}-animation {
    @for $i from 0 to 11 {
      #{ $i * 10%} {
        top: $show-top + $i * math.div(($close-end - $show-top), 10);
      }
    }
  }
}

.show-toolkits {
  animation: show-toolkits-animation 0.3s ease-in;
  transform: rotate(0);
}

.close-toolkits {
  animation: close-toolkits-animation 0.3s ease-in;
  transform: rotate(180deg);
}

@keyframes show-toolkits-animation {
  @for $index from 0 to 10 {
    #{$index * 10%} {
      transform: rotate(180deg - $index * 18deg);
    }
  }
}

@keyframes close-toolkits-animation {
  @for $index from 0 to 10 {
    #{$index * 10%} {
      transform: rotate($index * 18deg);
    }
  }
}

.rotate-setting:hover {
  animation: 1.5s infinite rotate-setting-animation;
}

@keyframes rotate-setting-animation {
  @for $index from 0 to 10 {
    #{$index * 10%} {
      transform: rotate($index * 36deg);
    }
  }

  @for $index from 10 to 0 {
    #{$index * 10%} {
      transform: rotate($index * 36deg);
    }
  }
}
</style>
