<template>
  <div class="label box-border px-2 py-1.3 rd-2 b-1 b-#5d5d5d b-dotted fsz-0.8">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.label {
  @include hover($border-color: all);
}
</style>
