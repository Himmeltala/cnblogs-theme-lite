<script setup lang="ts">
function complete(asyncComp: any) {}

const lhidden = ref(true);
const rhidden = ref(true);

onMounted(() => {
  document
    .querySelector("#l-mask")
    .addEventListener("mouseover", () => (lhidden.value = !lhidden.value));
  document
    .querySelector("#r-mask")
    .addEventListener("mouseover", () => (rhidden.value = !rhidden.value));
});
</script>

<template>
  <GitHub />
  <Navigation />
  <div id="l-mask" :class="{ 'left-60': !lhidden }" class="hvh-100 fixed w-15 left-0 top-0"></div>
  <LShowcase :class="{ 'show-lcase': !lhidden, 'hidden-lcase': lhidden }" />
  <div id="lite-content" class="w-200 mt-20">
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
  <div id="r-mask" :class="{ 'right-60': !rhidden }" class="hvh-100 fixed w-15 right-0 top-0"></div>
  <RShowcase :class="{ 'show-rcase': !rhidden, 'hidden-rcase': rhidden }" />
  <ToolKits />
</template>

<style scoped lang="scss">
$quota: 10;

.show-lcase {
  animation: showlcase 0.2s ease-in;
  transform: translateX(0rem);
}

@keyframes showlcase {
  @for $i from 0 to $quota {
    #{$i * 10%} {
      transform: translateX(-15rem + ($i * 1.5rem));
    }
  }
}

.hidden-lcase {
  animation: hiddenlcase 0.2s ease-out;
  transform: translateX(-15rem);
}

@keyframes hiddenlcase {
  @for $i from 0 to $quota {
    #{$i * 10%} {
      transform: translateX($i * -1.5rem);
    }
  }
}

.show-rcase {
  animation: showrcase 0.2s ease-in;
  transform: translateX(0rem);
}

@keyframes showrcase {
  @for $i from 0 to $quota {
    #{$i * 10%} {
      transform: translateX(15rem + ($i * -1.5rem));
    }
  }
}

.hidden-rcase {
  animation: hiddenrcase 0.2s ease-out;
  transform: translateX(15rem);
}

@keyframes hiddenrcase {
  @for $i from 0 to $quota {
    #{$i * 10%} {
      transform: translateX($i * 1.5rem);
    }
  }
}
</style>
