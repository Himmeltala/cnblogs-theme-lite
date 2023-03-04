<script setup lang="ts">
import { getSetting, nav } from "@/utils/common";
import { __LITE_CONFIG__, blogApp, isFollow, isOwner } from "@/lite.config";
import { follow, unfollow, getAuthorData, getMasterData } from "@/apis/remote-api";

const cabinet = __LITE_CONFIG__.cabinet;
const setting = getSetting();
const searchVal = ref();
const authorData = ref(await getAuthorData());
const masterData = ref(await getMasterData());
const tabActiveName = ref("first");

function search() {
  window.open(`https://zzk.cnblogs.com/s?w=blog:${blogApp}%${searchVal.value}`, "__blank");
}

async function subscribe() {
  const data = await follow();
  if (data) ElMessage({ message: "已经关注博主！", type: "success", grouping: true });
}

async function unsubscribe() {
  const data = await unfollow();
  if (data) ElMessage({ message: "取消关注博主！", type: "success", grouping: true });
}
</script>

<template>
  <div class="noscroll ofw-auto h-96vh">
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
      <div class="f-c-c mb-4" v-if="!isOwner">
        <el-popconfirm @confirm="unsubscribe" confirm-button-text="确定" cancel-button-text="取消" title="确定取消关注？">
          <template #reference>
            <el-button v-if="isFollow" type="danger" text bg> -取消关注 </el-button>
          </template>
        </el-popconfirm>
        <el-button @click="subscribe" v-if="!isFollow" type="primary" text bg> +关注博主 </el-button>
      </div>
      <template v-if="authorData">
        <div class="hover mb-4" v-for="(item, index) in authorData" :key="index" @click="nav({ path: item.href })">
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
      </template>
      <template v-if="masterData">
        <div class="mb-4">
          <span class="mr-3" v-for="(item, index) in masterData" :key="index"> {{ item.text }} - {{ item.digg }} </span>
        </div>
      </template>
      <el-input clearable @keyup.enter="search" v-model="searchVal">
        <template #prefix>
          <i-ep-search />
        </template>
      </el-input>
    </ExpandableBox>
    <ExpandableBox text="博客数据" disabled>
      <template #icon>
        <i-ep-data-analysis />
      </template>
      <el-tabs v-model="tabActiveName" stretch>
        <el-tab-pane label="博客常用项" name="first">
          <BlogData :is-remote="setting.cabinet.remote" />
        </el-tab-pane>
        <el-tab-pane label="排行榜数据" name="second">
          <TopData />
        </el-tab-pane>
      </el-tabs>
    </ExpandableBox>
  </div>
</template>

<style scoped lang="scss"></style>
