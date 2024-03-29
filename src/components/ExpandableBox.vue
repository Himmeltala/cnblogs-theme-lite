<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    required: false
  }
});

const localSetting = LiteUtils.getLocalSetting();
const title = `${props.text}`;

if (!localSetting.value.cabinet.toggles[title]) {
  localSetting.value.cabinet.toggles[title] = {
    open: true,
    show: true
  };
}

const content = ref();
const height = ref();

function toggleClose() {
  content.value.style.height = `${0}px`;
  localSetting.value.cabinet.toggles[title].open = !localSetting.value.cabinet.toggles[title].open;
}

function toggleOpen() {
  content.value.style.height = `${height.value}px`;
  localSetting.value.cabinet.toggles[title].open = !localSetting.value.cabinet.toggles[title].open;
}

function toggle() {
  if (localSetting.value.cabinet.toggles[title]?.open) {
    toggleClose();
  } else {
    toggleOpen();
  }
}

function initHeight() {
  height.value = content.value.offsetHeight;

  if (!props.disabled) {
    if (!localSetting.value.cabinet.toggles[title]?.open) {
      content.value.style.height = `${0}px`;
    } else {
      content.value.style.height = `${height.value}px`;
    }
  }
}

onMounted(() => {
  initHeight();
});
</script>

<template>
  <div class="l-expbox mb-6 l-thr-color" v-show="localSetting.cabinet.toggles[title]?.show">
    <div class="l-expbox__title headtip mb-4 f-c-b l-size-5">
      <div class="f-c-s">
        <div class="f-c-c mr-1">
          <slot name="icon" />
        </div>
        {{ text }}
      </div>
      <div
        v-if="!disabled"
        @click="toggle"
        class="f-c-c opacity-70 hover"
        :class="{
          'arrow-up': !localSetting.cabinet.toggles[title]?.open,
          'arrow-down': localSetting.cabinet.toggles[title]?.open
        }">
        <div class="arrow f-c-c">
          <i-ep-arrow-down />
        </div>
      </div>
    </div>
    <div ref="content" class="l-expbox__content">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.arrow {
  transform: scale(0, 0);
}

.l-expbox__title:hover .arrow {
  transform: scale(1, 1);
}

.arrow-up {
  animation: arrow-up-animation 0.3s ease-in;
  transform: rotate(180deg);
}

.arrow-down {
  animation: arrow-down-animation 0.3s ease-in;
  transform: rotate(0deg);
}

@keyframes arrow-up-animation {
  @for $index from 0 to 10 {
    #{$index * 10%} {
      transform: rotate($index * 18deg);
    }
  }
}

@keyframes arrow-down-animation {
  @for $index from 0 to 10 {
    #{$index * 10%} {
      transform: rotate(180deg - $index * 18deg);
    }
  }
}

.l-expbox__content {
  overflow: hidden;
  transition: var(--l-animation-effect);
}
</style>
