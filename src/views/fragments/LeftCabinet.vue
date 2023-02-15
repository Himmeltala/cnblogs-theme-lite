<script setup lang="ts">
import { nav } from "@/helpers/route-helper";
import { follow, unfollow } from "@/utils/remote-api";
import { getSideBloggerInfo, getSideBlogInfo, getSideCateList, getSideBlogRank, getSideTopList } from "@/utils/local-api";
import { __LITE_CONFIG__, blogApp, isFollow, isOwner } from "@/lite.config";

const cabinet = __LITE_CONFIG__.cabinet;
const router = useRouter();
const cates = getSideCateList();
const blogger = getSideBloggerInfo();
const blogInfo = getSideBlogInfo();
const toplist = getSideTopList();
const blogRank = getSideBlogRank();
const tabName = ref("随笔");
const searchVal = ref();

function search() {
  window.open(`https://zzk.cnblogs.com/s?w=blog:${blogApp}%${searchVal.value}`, "__blank");
}

async function focus() {
  const data = await follow();
  if (data) ElMessage({ message: "已经关注博主！", type: "success", grouping: true });
}

async function unfocus() {
  const data = await unfollow();
  if (data) ElMessage({ message: "取消关注博主！", type: "success", grouping: true });
}
</script>

<template>
  <div id="l-cabinet" class="fixed top-0 left-0 w-250px h-100vh px-2 z-999 l-box-bg">
    <div class="noscroll ofw-auto h-96%">
      <CabinetItem text="博客信息">
        <template #icon>
          <el-icon class="mr-1">
            <i-ep-house />
          </el-icon>
        </template>
        <div v-if="cabinet?.avatar" class="f-c-c my-5">
          <el-tooltip effect="dark" placement="right">
            <img class="h-25 w-25 cursor-pointer rd-50" alt="FAILED" :src="cabinet?.avatar" />
            <template #content>
              <div v-if="cabinet?.signature" v-html="cabinet.signature" />
              <div v-else>这个人很懒，什么也没有留下</div>
            </template>
          </el-tooltip>
        </div>
        <div class="f-c-c" v-if="!isOwner">
          <el-popconfirm @confirm="unfocus" confirm-button-text="确定" cancel-button-text="取消" title="确定取消关注？">
            <template #reference>
              <el-button v-if="isFollow" type="danger" text bg> -取消关注 </el-button>
            </template>
          </el-popconfirm>
          <el-button @click="focus" v-if="!isFollow" type="primary" text bg> +关注博主 </el-button>
        </div>
        <div class="item" v-for="(item, index) in blogger" :key="index">
          <div class="text hover" @click="nav({ path: item.href })">
            <div class="f-c-s" v-if="index === 0">
              <el-icon class="mr-2">
                <i-ep-user-filled />
              </el-icon>
              昵称：{{ item.text }}
            </div>
            <div class="f-c-s" v-else-if="index === 1">
              <el-icon class="mr-2">
                <i-ep-clock />
              </el-icon>
              园龄：{{ item.text }}
            </div>
            <div class="f-c-s" v-else-if="index === 2">
              <el-icon class="mr-2">
                <i-ep-star-filled />
              </el-icon>
              粉丝：{{ item.text }}
            </div>
            <div class="f-c-s" v-else>
              <el-icon class="mr-2">
                <i-ep-bell-filled />
              </el-icon>
              关注：{{ item.text }}
            </div>
          </div>
        </div>
        <el-tooltip effect="dark" placement="bottom">
          <template #content>
            <span :class="{ 'mr-3': index !== blogRank.length - 1 }" v-for="(item, index) in blogRank" :key="index">
              {{ item.text }} - {{ item.digg }}
            </span>
          </template>
          <div class="hover mb-3 fsz-0.9 cursor-pointer">
            <span :class="{ 'mr-2.5': index !== blogInfo.length - 1 }" v-for="(item, index) in blogInfo" :key="index">
              {{ item.text }} - {{ item.digg }}
            </span>
          </div>
        </el-tooltip>
        <el-input clearable @keyup.enter="search" v-model="searchVal">
          <template #prepend>搜索</template>
          <template #prefix>
            <el-icon @click="search">
              <i-ep-search />
            </el-icon>
          </template>
        </el-input>
      </CabinetItem>
      <CabinetItem text="博客数据">
        <template #icon>
          <el-icon class="mr-1">
            <i-ep-collection />
          </el-icon>
        </template>
        <el-tabs stretch type="card" v-model="tabName">
          <el-tab-pane label="随笔" name="随笔">
            <div class="item" v-for="(item, index) in cates.cates" :key="index">
              <div class="text hover" @click="nav({ path: '/sort/' + item.id, router })">
                {{ item.text }}
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="标签" name="标签">
            <div class="item" v-for="(item, index) in cates.tags" :key="index">
              <div class="text hover" @click="nav({ path: '/label/' + item.id, router })">
                {{ item.text }}
              </div>
            </div>
            <div class="item">
              <div class="text hover" @click="nav({ path: '/labels', router })">更多...</div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="阅读排行榜" name="阅读排行榜">
            <div class="item" v-for="(item, index) in toplist" :key="index">
              <div class="text hover" @click="nav({ path: '/p/' + item.id, router })">
                {{ item.text }}
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="推荐排行榜" name="推荐排行榜">
            <div class="item" v-for="(item, index) in toplist" :key="index">
              <div class="text hover" @click="nav({ path: '/p/' + item.id, router })">
                {{ item.text }}
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="评论排行榜" name="评论排行榜">
            <div class="item" v-for="(item, index) in toplist" :key="index">
              <div class="text hover" @click="nav({ path: '/p/' + item.id, router })">
                {{ item.text }}
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </CabinetItem>
    </div>
    <div class="noscroll ofw-auto f-c h-4%">
      <div class="hover mr-4 wce-nowrap" @click="nav({ path: 'https://www.cnblogs.com' })">博客园</div>
      <div class="hover mr-4 wce-nowrap" @click="nav({ path: '/', router })">首页</div>
      <div class="hover wce-nowrap" :class="{ 'mr-4': __LITE_CONFIG__.navor?.navs }" @click="nav({ path: '/', router })">标签</div>
      <div
        v-if="__LITE_CONFIG__.navor?.navs"
        v-for="(item, index) in __LITE_CONFIG__.navor.navs"
        :key="index"
        :class="{ 'mr-4': index !== __LITE_CONFIG__.navor.navs.length - 1 }"
        class="hover f-c-c wce-nowrap">
        <div v-if="item.text" @click="nav({ path: item.href })">{{ item.text }}</div>
        <div class="f-c-c w-6 h-6" v-else>
          <svg
            class="w-6 h-6"
            v-if="(item.svg || item.img) && item.svg"
            fill="var(--l-pri-color)"
            @click="nav({ path: item.href })"
            viewBox="0 0 1024 1024"
            v-html="item.svg"></svg>
          <img v-else class="rd-50 w-6 h-6" alt="FAILED" @click="nav({ path: item.href })" :src="item.img" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.item {
  --at-apply: my-3 fsz-0.9;

  .text {
    --at-apply: cursor-pointer;
  }
}
</style>
