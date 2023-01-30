<script setup lang="ts">
import {
  getSideBloggerInfo,
  getSideBlogInfo,
  getSideCateList,
  getSideBlogRank,
  getSideTopList
} from "@/utils/local-api";
import { nav } from "@/helpers/route-helper";
import { follow, unfollow } from "@/utils/remote-api";
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
  <div id="l-cabinet" class="fixed top-0 left-0 w-px-250 h-vh-100 px-2 z-999 bg-color">
    <div class="content noscroll ofw-auto">
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
          <el-popconfirm
            @confirm="unfocus"
            confirm-button-text="确定"
            cancel-button-text="取消"
            title="确定取消关注？">
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
            <span
              :class="{ 'mr-3': index !== blogRank.length - 1 }"
              v-for="(item, index) in blogRank"
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
              <div class="text hover" @click="nav({path: '/p/' + item.id, router})">
                {{ item.text }}
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </CabinetItem>
    </div>
    <div class="navigation noscroll ofw-auto f-c">
      <NavItem :nav="nav" :router="router" :navor="__LITE_CONFIG__.navor" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@media screen and (min-width: 1000px) {
  .navigation {
    display: none;
  }

  .content {
    --at-apply: h-%-100;
  }
}

@media screen and (max-width: 1000px) {
  .navigation {
    --at-apply: h-%-5;
  }

  .content {
    --at-apply: h-%-95;
  }
}

.item {
  --at-apply: my-3 fsz-0.9;

  .text {
    --at-apply: cursor-pointer;
  }
}
</style>
