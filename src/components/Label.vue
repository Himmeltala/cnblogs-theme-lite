<template>
  <div class="l-label rd-2 b-1 b-#5d5d5d b-dotted">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.l-label {
  @include hover($border-color: all);
}
</style>
