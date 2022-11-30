<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Search } from "@element-plus/icons-vue";

const router = useRouter();

function nav(path: string, out?: boolean) {
  if (out) {
    window.open(path, "__blank");
  } else router.push(path);
}

let searchValue = ref("");

function search() {
  window.open(`https://zzk.cnblogs.com/s?w=blog:enziandom%${searchValue.value}`, "__blank");
}
</script>

<template>
  <div class="navigator">
    <div class="author" @click="nav('/')">Enziandom</div>
    <div class="menus">
      <div class="item search">
        <el-input v-model="searchValue" placeholder="输入查询关键字" />
        <el-button @click="search" :icon="Search" />
      </div>
      <div class="item cnblogs" @click="nav('https://www.cnblogs.com', true)">博客园</div>
      <div class="item home" @click="nav('/')">首页</div>
      <div class="item tags" @click="nav('/')">标签</div>
      <div class="item tags" @click="nav('https://i.cnblogs.com/posts/edit', true)">新随笔</div>
      <div class="item tags" @click="nav('https://i.cnblogs.com/posts', true)">管理</div>
      <svg
        @click="nav('https://space.bilibili.com/7021686', true)"
        t="1669739351541"
        class="icon item"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="3644"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="25"
        height="25">
        <path
          d="M306.005333 117.632L444.330667 256h135.296l138.368-138.325333a42.666667 42.666667 0 0 1 60.373333 60.373333L700.330667 256H789.333333A149.333333 149.333333 0 0 1 938.666667 405.333333v341.333334a149.333333 149.333333 0 0 1-149.333334 149.333333h-554.666666A149.333333 149.333333 0 0 1 85.333333 746.666667v-341.333334A149.333333 149.333333 0 0 1 234.666667 256h88.96L245.632 177.962667a42.666667 42.666667 0 0 1 60.373333-60.373334zM789.333333 341.333333h-554.666666a64 64 0 0 0-63.701334 57.856L170.666667 405.333333v341.333334a64 64 0 0 0 57.856 63.701333L234.666667 810.666667h554.666666a64 64 0 0 0 63.701334-57.856L853.333333 746.666667v-341.333334A64 64 0 0 0 789.333333 341.333333zM341.333333 469.333333a42.666667 42.666667 0 0 1 42.666667 42.666667v85.333333a42.666667 42.666667 0 0 1-85.333333 0v-85.333333a42.666667 42.666667 0 0 1 42.666666-42.666667z m341.333334 0a42.666667 42.666667 0 0 1 42.666666 42.666667v85.333333a42.666667 42.666667 0 0 1-85.333333 0v-85.333333a42.666667 42.666667 0 0 1 42.666667-42.666667z"
          p-id="3645"></path>
      </svg>
      <svg
        @click="nav('https://www.gitee.com/enziandom', true)"
        t="1669739310050"
        class="icon item"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2865"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="20"
        height="20">
        <path
          d="M512 1024C230.4 1024 0 793.6 0 512S230.4 0 512 0s512 230.4 512 512-230.4 512-512 512z m259.2-569.6H480c-12.8 0-25.6 12.8-25.6 25.6v64c0 12.8 12.8 25.6 25.6 25.6h176c12.8 0 25.6 12.8 25.6 25.6v12.8c0 41.6-35.2 76.8-76.8 76.8h-240c-12.8 0-25.6-12.8-25.6-25.6V416c0-41.6 35.2-76.8 76.8-76.8h355.2c12.8 0 25.6-12.8 25.6-25.6v-64c0-12.8-12.8-25.6-25.6-25.6H416c-105.6 0-188.8 86.4-188.8 188.8V768c0 12.8 12.8 25.6 25.6 25.6h374.4c92.8 0 169.6-76.8 169.6-169.6v-144c0-12.8-12.8-25.6-25.6-25.6z"
          p-id="2866"></path>
      </svg>
    </div>
  </div>
</template>

<style scoped lang="scss">
svg {
  fill: #a7a7a7;
  cursor: pointer;
}
</style>

<style scoped lang="scss">
@import "../scss/mixins.scss";

.navigator {
  box-sizing: border-box;
  padding: 10px 20px;
  position: fixed;
  left: 10vw;
  width: 80vw;
  height: 9vh;
  background-color: #252525;
  z-index: 999;
  // backdrop-filter: saturate(50%) blur(8px);
  border-radius: 0px 0px 6px 6px;
  @include flex($justify: space-between);

  @mixin mouse-hover {
    margin-right: 20px;
    cursor: pointer;
    word-break: break-all;
    transition: 0.3s;

    &:hover {
      color: var(--el-color-primary);
    }

    &:last-child {
      margin-right: 0;
    }
  }

  .author {
    @include flex();
    font-weight: 400;
    font-size: 22px;
    @include mouse-hover();
  }

  .menus {
    font-size: 17px;
    @include flex();

    .search {
      @include flex($wrap: nowrap);
    }

    .item {
      @include mouse-hover();
    }
  }
}
</style>
