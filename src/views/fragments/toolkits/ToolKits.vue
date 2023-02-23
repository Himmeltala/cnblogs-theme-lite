<script setup lang="ts">
import { nav } from "@/utils/router-helper";
import { getSetting } from "@/utils/common";
import { useToolKitsSettingStore } from "@/store";

const setting = getSetting();
const router = useRouter();
const { toolKitsSetting } = storeToRefs(useToolKitsSettingStore());

function moveToTopNail() {
  document.querySelector("#l-nail").scrollIntoView();
}

function changeDayTime() {
  const html = document.querySelector("html");
  if (setting.value.themeMode === "dark") {
    html.className = "light";
    setting.value.themeMode = "light";
  } else {
    html.className = "dark";
    setting.value.themeMode = "dark";
  }
}
</script>

<template>
  <div id="toolkits" class="noselect fixed right-15 top-65vh fsz-1.2 z-1">
    <div class="relative">
      <Card
        :class="{ 'l-box-bg': !setting.themeCard.open, 'show-0': setting.openToolKits, 'close-0': !setting.openToolKits }"
        class="back-home absolute hover left-0 w-8 h-8 f-c-c rd-2"
        @click="nav({ path: 'back', router })">
        <i-ep-back />
      </Card>
      <Card
        :class="{ 'l-box-bg': !setting.themeCard.open, 'show-1': setting.openToolKits, 'close-1': !setting.openToolKits }"
        class="back-top absolute hover left-0 w-8 h-8 f-c-c rd-2"
        @click="moveToTopNail">
        <i-ep-position />
      </Card>
      <Card
        :class="{ 'l-box-bg': !setting.themeCard.open, 'show-2': setting.openToolKits, 'close-2': !setting.openToolKits }"
        @click="changeDayTime"
        class="daytime absolute hover left-0 w-8 h-8 f-c-c rd-2">
        <template v-if="setting.themeMode === 'light'">
          <i-ep-sunny />
        </template>
        <template v-else>
          <i-ep-moon />
        </template>
      </Card>
      <Card
        :class="{ 'l-box-bg': !setting.themeCard.open, 'show-3': setting.openToolKits, 'close-3': !setting.openToolKits }"
        @click="toolKitsSetting = !toolKitsSetting"
        class="setting absolute hover left-0 w-8 h-8 f-c-c rd-2">
        <i-ep-setting class="rotate-setting" />
      </Card>
      <Card
        @click="setting.openToolKits = !setting.openToolKits"
        :class="{ 'l-box-bg': !setting.themeCard.open, 'show-toolkits': setting.openToolKits, 'close-toolkits': !setting.openToolKits }"
        class="kits-box absolute hover top-40 left-0 w-8 h-8 f-c-c rd-2">
        <i-ep-arrow-right />
      </Card>
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
