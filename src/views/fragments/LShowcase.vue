<script setup lang="ts">
import {
  getSideBloggerInfo,
  getSideBlogInfo,
  getSideCateList,
  getSideTopList,
  getSideBlogRank
} from "@/utils/local-api";
import { nav } from "@/utils/route-helper";
import { __LITE_CONFIG__ } from "@/lite.config";

const side = __LITE_CONFIG__.side;
const router = useRouter();

const cl = getSideCateList();
const blogger = getSideBloggerInfo();
const blogInfo = getSideBlogInfo();
const toplist = getSideTopList();
const rank = getSideBlogRank();

const tabName = ref("随笔");
</script>

<template>
  <div
    id="l-showcase"
    class="noscroll fixed top-0 left-0 hd-100 ofw-auto w-60 px-2 bg-#1c1c1c z-999 box-border">
    <ShowcaseItem text="博客信息">
      <template #icon>
        <el-icon class="mr-1">
          <i-ep-house />
        </el-icon>
      </template>
      <div v-if="side?.avatar" class="flex items-center content-center justify-center my-5">
        <el-tooltip effect="dark" placement="right">
          <img
            class="h-20 w-20 rd-50 object-cover cursor-pointer"
            alt="FAILED"
            :src="side?.avatar" />
          <template #content>
            <div v-if="side?.signature" v-html="side.signature" />
            <div v-else>这个人很懒，什么也没有留下</div>
          </template>
        </el-tooltip>
      </div>
      <div class="item" v-for="(item, index) in blogger" :key="index">
        <div class="text hover" @click="nav(item.href)">
          <div v-if="index === 0">
            <el-icon>
              <i-ep-user-filled />
            </el-icon>
            昵称：{{ item.text }}
          </div>
          <div v-if="index === 1">
            <el-icon>
              <i-ep-clock />
            </el-icon>
            园龄：{{ item.text }}
          </div>
          <div v-if="index === 2">
            <el-icon>
              <i-ep-star-filled />
            </el-icon>
            粉丝：{{ item.text }}
          </div>
          <div v-if="index === 3">
            <el-icon>
              <i-ep-bell-filled />
            </el-icon>
            关注：{{ item.text }}
          </div>
        </div>
      </div>
      <el-tooltip effect="dark" placement="bottom">
        <template #content>
          <span
            :class="{ 'mr-3': index !== rank.length - 1 }"
            v-for="(item, index) in rank"
            :key="index">
            {{ item.text }} - {{ item.digg }}
          </span>
        </template>
        <div class="hover mb-3 fsz-0.9 cursor-pointer">
          <span
            :class="{ 'mr-2.5': index !== blogInfo.length - 1 }"
            v-for="(item, index) in blogInfo"
            :key="index">
            {{ item.text }} - {{ item.digg }}
          </span>
        </div>
      </el-tooltip>
    </ShowcaseItem>
    <el-tabs type="card" v-model="tabName">
      <el-tab-pane label="随笔" name="随笔">
        <template #label>
          <div class="fsz-0.9 flex content-center items-center justify-center">
            <el-icon class="mr-1">
              <i-ep-folder />
            </el-icon>
            <div>随笔</div>
          </div>
        </template>
        <div class="item" v-for="(item, index) in cl.cates" :key="index">
          <div class="text hover" @click="nav('/c/' + item.id, router)">
            {{ item.text }}
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="标签" name="标签">
        <template #label>
          <div class="fsz-0.9 flex content-center items-center justify-center">
            <el-icon class="mr-1">
              <i-ep-collection-tag />
            </el-icon>
            <div>标签</div>
          </div>
        </template>
        <div class="item" v-for="(item, index) in cl.tags" :key="index">
          <div class="text hover" @click="nav('/t/' + item.id, router)">
            {{ item.text }}
          </div>
        </div>
        <div class="item">
          <div class="text hover" @click="nav('/tags', router)">更多...</div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <ShowcaseItem text="阅读排行榜">
      <template #icon>
        <el-icon style="margin-right: 5px">
          <i-ep-d-caret />
        </el-icon>
      </template>
      <div class="item" v-for="(item, index) in toplist" :key="index">
        <div class="text hover" @click="nav('/e/' + item.id, router)">
          {{ item.text }}
        </div>
      </div>
    </ShowcaseItem>
  </div>
</template>

<style scoped lang="scss">
.item {
  --at-apply: my-2.5 fsz-0.9 break-all;

  .text {
    --at-apply: cursor-pointer;
  }
}
</style>
