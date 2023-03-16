<script setup lang="ts">
import { nav } from "@/utils/common";
import { useBaseAuthorData } from "@/store";
import { __LITE_CONFIG__, blogApp, isFollow, isOwner } from "@/lite.config";
import { follow, unfollow, getCabinetColumn, getCabinetTopList } from "@/apis/remote-api";

const cabinet = __LITE_CONFIG__.cabinet;
const store = useBaseAuthorData();
const searchVal = ref();
const tabActive = ref("first");
const baseCollActive = ref("1");
const topCollActive = ref("1");
const authorData = ref();
const masterData = ref();
const columnData = ref();
const topListData = ref();

store.$onAction(({ args }) => {
  authorData.value = args[0].author;
  masterData.value = args[0].master;
});

getCabinetColumn().then(res => {
  columnData.value = res;
});

getCabinetTopList().then(res => {
  topListData.value = res;
});

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
    <ExpandableBox text="博客信息" disabled>
      <template #icon>
        <i-ep-house />
      </template>
      <div v-if="cabinet?.avatar" class="f-c-c mb-5">
        <el-tooltip effect="dark" placement="right">
          <router-link to="/">
            <img class="h-25 w-25 cursor-pointer rd-50" alt="FAILED" :src="cabinet?.avatar" />
          </router-link>
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
      <div class="hover mb-4" v-if="authorData" v-for="(item, index) in authorData" :key="index" @click="nav({ path: item.href })">
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
      <div class="mb-4">
        <span class="mr-3" v-if="masterData" v-for="(item, index) in masterData" :key="index"> {{ item.text }} - {{ item.digg }} </span>
      </div>
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
      <el-tabs v-model="tabActive" stretch>
        <el-tab-pane label="博客常用项" name="first">
          <template v-if="columnData">
            <div class="mb-2" v-for="(item, index) in columnData.rankings" :key="index">{{ item.text }}</div>
            <router-link to="/calendar">
              <div class="my-4 f-c-s hover l-pri-color">
                <i-ep-calendar class="mr-2" />
                博客日历
              </div>
            </router-link>
            <el-collapse v-model="baseCollActive" accordion>
              <el-collapse-item v-if="columnData.essaySort.length">
                <template #title>
                  <i-ep-files class="mr-2" />
                  随笔分类
                </template>
                <div
                  class="hover"
                  :class="{ 'mb-1': index != columnData.essaySort.length - 1 }"
                  v-for="(item, index) in columnData.essaySort"
                  :key="index">
                  <router-link :to="'/sort/p/' + item.id">
                    {{ item.text }}
                  </router-link>
                </div>
              </el-collapse-item>
              <el-collapse-item v-if="columnData.essayArchive.length">
                <template #title>
                  <i-ep-collection class="mr-2" />
                  随笔档案
                </template>
                <div
                  class="hover"
                  :class="{ 'mb-1': index != columnData.essayArchive.length - 1 }"
                  v-for="(item, index) in columnData.essayArchive"
                  :key="index">
                  <router-link :to="'/archive/p/' + item.id">
                    {{ item.text }}
                  </router-link>
                </div>
              </el-collapse-item>
              <el-collapse-item v-if="columnData.articleSort.length">
                <template #title>
                  <i-ep-folder-opened class="mr-2" />
                  文章分类
                </template>
                <div
                  class="hover"
                  :class="{ 'mb-1': index != columnData.articleSort.length - 1 }"
                  v-for="(item, index) in columnData.articleSort"
                  :key="index">
                  <router-link :to="'/sort/a/' + item.id">
                    {{ item.text }}
                  </router-link>
                </div>
              </el-collapse-item>
              <el-collapse-item title="文章档案" v-if="columnData.articleArchive.length">
                <template #title>
                  <i-ep-management class="mr-2" />
                  文章档案
                </template>
                <div
                  class="hover"
                  :class="{ 'mb-1': index != columnData.articleArchive.length - 1 }"
                  v-for="(item, index) in columnData.articleArchive"
                  :key="index">
                  <router-link :to="'/archive/a/' + item.id">
                    {{ item.text }}
                  </router-link>
                </div>
              </el-collapse-item>
              <el-collapse-item title="标签分类" v-if="columnData.tagList.length">
                <template #title>
                  <i-ep-price-tag class="mr-2" />
                  标签分类
                </template>
                <div
                  class="hover"
                  :class="{ 'mb-1': index != columnData.tagList.length - 1 }"
                  v-for="(item, index) in columnData.tagList"
                  :key="index">
                  <router-link :to="'/mark/' + item.id">
                    {{ item.text }}
                  </router-link>
                </div>
                <div>
                  <router-link to="/marks">更多...</router-link>
                </div>
              </el-collapse-item>
              <el-collapse-item title="最新随笔" v-if="columnData.latestEssayList.length">
                <template #title>
                  <i-ep-document-remove class="mr-2" />
                  最新随笔
                </template>
                <div
                  class="hover"
                  :class="{ 'mb-4': index != columnData.latestEssayList.length - 1 }"
                  v-for="(item, index) in columnData.latestEssayList"
                  :key="index">
                  <router-link :to="'/p/' + item.id">
                    {{ item.text }}
                  </router-link>
                </div>
              </el-collapse-item>
              <el-collapse-item title="最新评论" v-if="columnData.latestComments.length">
                <template #title>
                  <i-ep-comment class="mr-2" />
                  最新评论
                </template>
                <div
                  :class="{ 'mb-4': index != columnData.latestComments.length - 1 }"
                  v-for="(item, index) in columnData.latestComments"
                  :key="index">
                  <div class="hover">
                    <router-link :to="'/p/' + item.id">
                      {{ item.title }}
                    </router-link>
                  </div>
                  <div class="pl-4">{{ item.content }}</div>
                  <div class="f-c-e mt-4">
                    <a class="hover" :href="'https://www.cnblogs.com/' + item.author" target="_blank">by {{ item.author }}</a>
                  </div>
                </div>
              </el-collapse-item>
              <el-collapse-item title="我的相册">
                <template #title>
                  <i-ep-picture class="mr-2" />
                  我的相册
                </template>
                <div :class="{ 'mb-2': index != columnData.albumn.length - 1 }" v-for="(item, index) in columnData.albumn" :key="index">
                  <router-link class="hover" :to="'/albumn/' + item.id">{{ item.text }}</router-link>
                </div>
              </el-collapse-item>
            </el-collapse>
          </template>
        </el-tab-pane>
        <el-tab-pane label="排行榜数据" name="second">
          <template v-if="topListData">
            <el-collapse v-model="topCollActive" accordion>
              <el-collapse-item title="评论排行榜">
                <template #title>
                  <i-ep-chat-square class="mr-2" />
                  评论排行榜
                </template>
                <div class="mb-2 hover" v-for="(item, index) in topListData.topComments">
                  <router-link :to="'/p/' + item.id">
                    {{ item.text }}
                  </router-link>
                </div>
              </el-collapse-item>
              <el-collapse-item>
                <template #title>
                  <i-ep-pointer class="mr-2" />
                  点赞排行榜
                </template>
                <div class="mb-2 hover" v-for="(item, index) in topListData.topDigg">
                  <router-link :to="'/p/' + item.id">
                    {{ item.text }}
                  </router-link>
                </div>
              </el-collapse-item>
              <el-collapse-item>
                <template #title>
                  <i-ep-view class="mr-2" />
                  阅读排行榜
                </template>
                <div class="mb-2 hover" v-for="(item, index) in topListData.topView">
                  <router-link :to="'/p/' + item.id">
                    {{ item.text }}
                  </router-link>
                </div>
              </el-collapse-item>
            </el-collapse>
          </template>
        </el-tab-pane>
      </el-tabs>
    </ExpandableBox>
  </div>
</template>
