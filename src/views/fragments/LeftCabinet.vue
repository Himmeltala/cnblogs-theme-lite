<script setup lang="ts">
import { nav } from "@/utils/router-helper";
import { follow, unfollow } from "@/utils/remote-api";
import { __LITE_CONFIG__, blogApp, isFollow, isOwner } from "@/lite.config";
import {
  getSideBloggerInfo as lo1,
  getSideBlogInfo as lo2,
  getSideCateList as lo3,
  getSideBlogRank as lo4,
  getSideTopList as lo5
} from "@/utils/local-api";
import { getSideBloggerInfo as re1, getSideBlogInfo as re2, getSideCateList as re3, getSideTopList as re4 } from "@/utils/remote-api";
import { getSetting } from "@/utils/common";

const setting = getSetting();
let blogger: any;
let blogInfo: any;
let cates: any;
let toplist: any;

if (setting.value.cabinet.remote) {
  blogger = await re1();
  blogInfo = await re2();
  cates = await re3();
  toplist = await re4();
} else {
  blogger = lo1();
  blogInfo = lo2();
  cates = lo3();
  toplist = lo5();
}

const blogRank = lo4();
const cabinet = __LITE_CONFIG__.cabinet;
const router = useRouter();
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
  <ContextMenu :class="{ 'l-box-bg py-2 px-4': !setting.themeCard.open }" id="l-lcabinet" style="width: var(--cabinet-width)">
    <Card class="h-100vh fsz-0.9" :padding="true">
      <div class="noscroll ofw-auto h-96%">
        <ExpandableBox text="博客信息">
          <template #icon>
            <i-ep-house />
          </template>
          <div v-if="cabinet?.avatar" class="f-c-c mb-5">
            <el-tooltip effect="dark" placement="right">
              <img class="h-25 w-25 cursor-pointer rd-50" alt="FAILED" :src="cabinet?.avatar" />
              <template #content>
                <div v-if="cabinet?.signature" v-html="cabinet.signature" />
                <div v-else>这个人很懒，什么也没有留下</div>
              </template>
            </el-tooltip>
          </div>
          <div class="f-c-c mb-5" v-if="!isOwner">
            <el-popconfirm @confirm="unfocus" confirm-button-text="确定" cancel-button-text="取消" title="确定取消关注？">
              <template #reference>
                <el-button v-if="isFollow" type="danger" text bg> -取消关注 </el-button>
              </template>
            </el-popconfirm>
            <el-button @click="focus" v-if="!isFollow" type="primary" text bg> +关注博主 </el-button>
          </div>
          <div class="hover mb-3" v-for="(item, index) in blogger" :key="index" @click="nav({ path: item.href })">
            <div class="f-c-s" v-if="index === 0">
              <i-ep-user-filled class="mr-2" />
              昵称：{{ item.text }}
            </div>
            <div class="f-c-s" v-else-if="index === 1">
              <i-ep-clock class="mr-2" />
              园龄：{{ item.text }}
            </div>
            <div class="f-c-s" v-else-if="index === 2">
              <i-ep-star-filled class="mr-2" />
              粉丝：{{ item.text }}
            </div>
            <div class="f-c-s" v-else>
              <i-ep-bell-filled class="mr-2" />
              关注：{{ item.text }}
            </div>
          </div>
          <el-tooltip effect="dark" placement="bottom">
            <template #content>
              <span class="mr-3" v-for="(item, index) in blogRank" :key="index"> {{ item.text }} - {{ item.digg }} </span>
            </template>
            <div class="mb-3">
              <span class="hover mr-3" v-for="(item, index) in blogInfo" :key="index"> {{ item.text }} - {{ item.digg }} </span>
            </div>
          </el-tooltip>
          <el-input clearable @keyup.enter="search" v-model="searchVal">
            <template #prefix>
              <i-ep-search />
            </template>
          </el-input>
        </ExpandableBox>
        <ExpandableBox text="博客数据">
          <template #icon>
            <i-ep-collection />
          </template>
          <el-tabs stretch type="card" v-model="tabName">
            <el-tab-pane label="随笔" name="随笔">
              <div class="mb-3 hover" v-for="(item, index) in cates.cates" :key="index" @click="nav({ path: '/sort/' + item.id, router })">
                {{ item.text }}
              </div>
            </el-tab-pane>
            <el-tab-pane label="标签" name="标签">
              <div class="mb-3 hover" v-for="(item, index) in cates.tags" @click="nav({ path: '/label/' + item.id, router })" :key="index">
                {{ item.text }}
              </div>
              <div class="mb-3 hover" @click="nav({ path: '/labels', router })">更多...</div>
            </el-tab-pane>
            <el-tab-pane label="阅读排行榜" name="阅读排行榜">
              <div class="mb-3 hover" v-for="(item, index) in toplist" :key="index" @click="nav({ path: '/p/' + item.id, router })">
                {{ item.text }}
              </div>
            </el-tab-pane>
          </el-tabs>
        </ExpandableBox>
      </div>
      <div class="noscroll ofw-auto h-4% l-thr-color f-c wce-nowrap">
        <div class="hover mr-4" @click="nav({ path: 'https://www.cnblogs.com' })">博客园</div>
        <div class="hover mr-4" @click="nav({ path: '/', router })">首页</div>
        <div
          v-if="__LITE_CONFIG__.cabinet?.navs"
          v-for="(item, index) in __LITE_CONFIG__.cabinet.navs"
          :key="index"
          :class="{ 'mr-4': index !== __LITE_CONFIG__.cabinet.navs.length - 1 }"
          class="hover f-c-c">
          <div v-if="item.text" @click="nav({ path: item.href })">{{ item.text }}</div>
          <div class="f-c-c w-6 h-6" v-else>
            <svg
              v-if="(item.svg || item.img) && item.svg"
              @click="nav({ path: item.href })"
              class="w-6 h-6"
              fill="var(--l-thr-color)"
              viewBox="0 0 1024 1024"
              v-html="item.svg"></svg>
            <img v-else class="rd-50 w-6 h-6" alt="FAILED" @click="nav({ path: item.href })" :src="item.img" />
          </div>
        </div>
      </div>
    </Card>
    <template #title> 陈列柜设置 </template>
    <template #content>
      <CabinetSetting />
      <el-collapse>
        <el-collapse-item title="宽度设置">
          <WidthSetting />
        </el-collapse-item>
      </el-collapse>
    </template>
  </ContextMenu>
</template>

<style scoped lang="scss">
#l-lcabinet {
  transition: var(--l-transition);
}
</style>
