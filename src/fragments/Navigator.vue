<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import Config from "../config";

const router = useRouter();

function nav(path: string, out?: boolean) {
  if (out) window.open(path, "__blank");
  else router.push(path);
}

let input = ref("");

function search() {
  window.open(`https://zzk.cnblogs.com/s?w=blog:${Config.__LITE_CONFIG__.blogName}%${input.value}`, "__blank");
}

let navor = Config.__LITE_CONFIG__.navor;
</script>

<template>
  <div class="navigator"
       :style="{'justify-content': navor?.displayName ? 'space-between': 'flex-end'}">
    <div v-show="navor?.displayName" class="author" @click="nav('/')">
      {{ Config.__LITE_CONFIG__.blogName }}
    </div>
    <div class="menus">
      <div v-if="navor?.displaySearch" class="item search">
        <el-input @keyup.enter="search" v-model="input" class="w-50 m-2" placeholder="输入查询关键字">
          <template #prefix>
            <el-icon @click="search">
              <Search />
            </el-icon>
          </template>
        </el-input>
      </div>
      <div class="item" @click="nav('https://www.cnblogs.com', true)">博客园</div>
      <div class="item" @click="nav('/')">首页</div>
      <div class="item" @click="nav('/')">标签</div>
      <div v-if="navor?.navs" class="item navs"
           v-for="(item, index) in navor.navs" :key="index">
        <div class="text" v-if="item.text" @click="nav(item.href, true)">{{ item.text }}</div>
        <div class="icon" v-else>
          <svg
            v-if="(item.svg || item.img) && item.svg"
            @click="nav(item.href, true)"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            v-html="item.svg">
          </svg>
          <img alt="FAILED" v-else @click="nav(item.href, true)"
               style="width: 25px; height: 25px; object-fit: cover; border-radius: 50px"
               :src="item.img" />
        </div>
      </div>
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
  border-radius: 0 0 6px 6px;
  @include flex();

  .author {
    font-weight: 400;
    font-size: 30px;
    @include flex();
    @include ahover();
  }

  .menus {
    font-size: 17px;
    @include flex();

    .search {
      @include flex($wrap: nowrap);
    }

    .navs {
      @include flex();

      .icon {
        @include flex();
      }
    }

    .item {
      margin-right: 20px;
      @include ahover();

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
