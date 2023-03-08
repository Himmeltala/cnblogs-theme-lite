<script setup lang="ts">
import { getSetting, nav } from "@/utils/common";
import { __LITE_CONFIG__ } from "@/lite.config";

const props = defineProps({
  disabled: {
    type: Boolean,
    default: true
  }
});

const router = useRouter();
const setting = getSetting();
const collActive = ref("1");

const left = computed(() => {
  return setting.value.cabinet.left.pin && setting.value.cabinet.position.break ? setting.value.cabinet.position.left + "vw" : 0;
});

const block = computed(() => {
  return !props.disabled && !setting.value.cabinet.left.pin;
});

const hidden = computed(() => {
  return props.disabled && !setting.value.cabinet.left.pin;
});

const fixed = computed(() => {
  return setting.value.cabinet.left.pin && !setting.value.cabinet.position.break;
});
</script>

<template>
  <ContextMenu
    id="l-lcabinet"
    class="fixed top-0 left-0"
    :style="{ left: left }"
    :class="{ 'show-lcabinet z-4': block, 'hidden-lcabinet': hidden, 'fixed-lcabinet': fixed }"
    style="width: var(--cabinet-width)">
    <Card
      class="l-fiv-size"
      :class="{ 'l-box-bg px-2': !setting.card.open }"
      :padding="setting.cabinet.left.padding"
      :margin="setting.cabinet.left.margin">
      <CabinetMain />
      <div class="noscroll ofw-auto h-4vh l-thr-color f-c wce-nowrap">
        <div class="hover mr-4" @click="nav({ path: 'https://www.cnblogs.com' })">博客园</div>
        <div class="hover mr-4" @click="nav({ path: '/', router })">首页</div>
        <div
          v-if="__LITE_CONFIG__.cabinet?.navs"
          v-for="(item, index) in __LITE_CONFIG__.cabinet.navs"
          :key="index"
          :class="{ 'mr-4': index !== __LITE_CONFIG__.cabinet.navs.length - 1 }"
          class="hover f-c-c">
          <div v-if="item.text" @click="nav({ path: item.href })">{{ item.text }}</div>
          <div class="f-c-c w-6 h-6" v-else>
            <svg
              v-if="(item.svg || item.img) && item.svg"
              @click="nav({ path: item.href })"
              class="w-6 h-6"
              fill="var(--l-thr-color)"
              viewBox="0 0 1024 1024"
              v-html="item.svg"></svg>
            <img v-else class="rd-50 w-6 h-6" alt="FAILED" @click="nav({ path: item.href })" :src="item.img" />
          </div>
        </div>
      </div>
    </Card>
    <template #title> 左陈列柜设置 </template>
    <template #content>
      <el-collapse v-model="collActive" accordion>
        <el-collapse-item title="统一设置">
          <div class="ml-4">
            <CabinetSetting />
          </div>
        </el-collapse-item>
        <el-collapse-item title="盒子模型">
          <div class="ml-4">
            <BoxSetting :padding="setting.cabinet.left.padding" :margin="setting.cabinet.left.margin" />
          </div>
        </el-collapse-item>
      </el-collapse>
    </template>
  </ContextMenu>
</template>

<style scoped lang="scss">
$quota: 10;

#l-lcabinet {
  transition: var(--l-transition);
}

.fixed-lcabinet {
  left: calc(calc(var(--content-width) / 2) - calc(var(--cabinet-width) + 2rem)) !important;
}

.show-lcabinet {
  animation: showlcabinet 0.2s ease-in;
  transform: translateX(0);
}

@keyframes showlcabinet {
  @for $i from 0 to $quota {
    #{$i * 10%} {
      transform: translateX(calc(calc(-1 * var(--cabinet-width)) + calc($i * calc(var(--cabinet-width) / 10))));
    }
  }
}

.hidden-lcabinet {
  animation: hiddenlcabinet 0.2s ease-out;
  transform: translateX(calc(-1 * var(--cabinet-width)));
}

@keyframes hiddenlcabinet {
  @for $i from 0 to $quota {
    #{$i * 10%} {
      transform: translateX(calc($i * calc(calc(-1 * var(--cabinet-width)) / 10)));
    }
  }
}
</style>
