<script setup lang="ts">
import { getSetting } from "@/utils/common";
import { __LITE_CONFIG__ } from "@/lite.config";

const props = defineProps({
  disabled: {
    type: Boolean,
    default: true
  }
});

const setting = getSetting();
const collapseActive = ref("1");

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
      <CabinetNav />
    </Card>
    <template #title> 左陈列柜设置 </template>
    <template #content>
      <el-collapse v-model="collapseActive" accordion>
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
