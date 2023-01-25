<template>
  <div class="label rd-2 b-1 b-#5d5d5d b-dotted">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.label {
  @include hover($border-color: all);
}
</style>
