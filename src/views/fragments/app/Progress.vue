<template>
  <div id="l-progress" class="z-99 fixed left-0 top-0 w-100vw">
    <div class="l-pro__track absolute top-0">
      <div class="l-pro__bar rd-2"></div>
    </div>
  </div>
</template>

<style lang="scss">
#l-progress {
  height: 0.15rem;

  .l-pro__bar,
  .l-pro__track {
    height: 100%;
    background: var(--l-theme-color);
  }

  .l-pro__bar.bar-active {
    animation: active-animation 3s infinite ease-in-out;
    width: 3rem;
  }

  .l-pro__track.track-active {
    animation: track-active-animation 4s infinite ease-in;
  }

  @keyframes active-animation {
    @for $index from 0 to 10 {
      #{$index * 10%} {
        width: 3rem + $index * 0.2rem;
      }
    }
  }

  @keyframes track-active-animation {
    @for $index from 0 to 25 {
      #{$index * 4%} {
        left: $index * 4vw;
      }
    }
  }

  .l-pro__bar.static {
    width: 0vw;
  }

  .l-pro__track.static {
    left: 0;
  }
}
</style>
