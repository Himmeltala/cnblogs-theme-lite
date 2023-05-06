<script setup lang="ts">
import { MenuApi } from "@/apis";

const props = defineProps({
  disabled: {
    type: Boolean,
    default: true
  }
});

const cabinet = LiteConfig.__LITE_CONFIG__.cabinet;
const searchVal = ref("");
const tabActive = ref("first");
const commonCollActive = ref("1");
const topListCollActive = ref("1");
const settingCollActive = ref("1");
const news = shallowRef();
const stats = shallowRef();
const columnList = shallowRef();
const topList = shallowRef();

MenuApi.getNews().then(res => {
  news.value = res;
});

MenuApi.getStats().then(res => {
  stats.value = res;
});

MenuApi.getColumn().then(res => {
  columnList.value = res;
});

MenuApi.getTopList().then(res => {
  topList.value = res;
});

function search() {
  window.open(`https://zzk.cnblogs.com/s?w=blog:${LiteConfig.blogApp}%${searchVal.value}`, "__blank");
}

async function subscribe() {
  const data = await MenuApi.follow();
  if (data) ElMessage({ message: "已经关注博主！", type: "success", grouping: true });
}

async function unsubscribe() {
  const data = await MenuApi.unfollow();
  if (data) ElMessage({ message: "取消关注博主！", type: "success", grouping: true });
}

const left = computed(() => {
  return LiteConfig.localSetting.cabinet.left.pin && LiteConfig.localSetting.cabinet.position.break
    ? LiteConfig.localSetting.cabinet.position.left + "vw"
    : 0;
});

const block = computed(() => {
  return !props.disabled && !LiteConfig.localSetting.cabinet.left.pin;
});

const hidden = computed(() => {
  return props.disabled && !LiteConfig.localSetting.cabinet.left.pin;
});

const fixed = computed(() => {
  return LiteConfig.localSetting.cabinet.left.pin && !LiteConfig.localSetting.cabinet.position.break;
});
</script>

<template>
  <ContextMenu
    id="l-lcabinet"
    class="fixed top-0 left-0"
    :style="{ left: left }"
    :class="{ 'show-lcabinet z-4': block, 'hidden-lcabinet': hidden, 'fixed-lcabinet': fixed }"
    style="width: var(--cabinet-width)">
    <Card
      class="l-size-2"
      :class="{ 'l-box-bg px-2': !LiteConfig.localSetting.card.open }"
      :padding="LiteConfig.localSetting.cabinet.left.padding"
      :margin="LiteConfig.localSetting.cabinet.left.margin">
      <div class="noscroll overflow-auto h-100vh">
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
          <div class="f-c-c mb-4" v-if="!LiteConfig.isOwner">
            <el-popconfirm @confirm="unsubscribe" confirm-button-text="确定" cancel-button-text="取消" title="确定取消关注？">
              <template #reference>
                <el-button v-if="LiteConfig.isFollow" type="danger" text bg> -取消关注 </el-button>
              </template>
            </el-popconfirm>
            <el-button @click="subscribe" v-if="!LiteConfig.isFollow" type="primary" text bg> +关注博主 </el-button>
          </div>
          <div class="hover mb-4" v-if="news" v-for="(item, index) in news" @click="LiteUtils.Router.go({ path: item.href })">
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
            <span class="mr-3" v-if="stats" v-for="item in stats"> {{ item.text }} - {{ item.digg }} </span>
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
              <template v-if="columnList">
                <div class="mb-2" v-for="item in columnList.rankings">{{ item.text }}</div>
                <router-link :to="RouterPath.WORKS_BY_CALENDAR()">
                  <div class="my-4 f-c-s hover l-color-1">
                    <i-ep-calendar class="mr-2" />
                    博客日历
                  </div>
                </router-link>
                <el-collapse v-model="commonCollActive" accordion>
                  <el-collapse-item v-if="columnList.essaySort.length">
                    <template #title>
                      <i-ep-files class="mr-2" />
                      随笔分类
                    </template>
                    <div
                      class="hover"
                      :class="{ 'mb-1': index != columnList.essaySort.length - 1 }"
                      v-for="(item, index) in columnList.essaySort">
                      <router-link :to="RouterPath.WORKS_BY_SORT(item.id)">
                        {{ item.text }}
                      </router-link>
                    </div>
                  </el-collapse-item>
                  <el-collapse-item v-if="columnList.essayArchive.length">
                    <template #title>
                      <i-ep-collection class="mr-2" />
                      随笔档案
                    </template>
                    <div
                      class="hover"
                      :class="{ 'mb-1': index != columnList.essayArchive.length - 1 }"
                      v-for="(item, index) in columnList.essayArchive">
                      <router-link :to="RouterPath.WORKS_BY_ARCHIVE('p', item.id)">
                        {{ item.text }}
                      </router-link>
                    </div>
                  </el-collapse-item>
                  <el-collapse-item v-if="columnList.articleSort.length">
                    <template #title>
                      <i-ep-folder-opened class="mr-2" />
                      文章分类
                    </template>
                    <div
                      class="hover"
                      :class="{ 'mb-1': index != columnList.articleSort.length - 1 }"
                      v-for="(item, index) in columnList.articleSort">
                      <router-link :to="RouterPath.WORKS_BY_SORT(item.id)">
                        {{ item.text }}
                      </router-link>
                    </div>
                  </el-collapse-item>
                  <el-collapse-item title="文章档案" v-if="columnList.articleArchive.length">
                    <template #title>
                      <i-ep-management class="mr-2" />
                      文章档案
                    </template>
                    <div
                      class="hover"
                      :class="{ 'mb-1': index != columnList.articleArchive.length - 1 }"
                      v-for="(item, index) in columnList.articleArchive">
                      <router-link :to="RouterPath.WORKS_BY_ARCHIVE('a', item.id)">
                        {{ item.text }}
                      </router-link>
                    </div>
                  </el-collapse-item>
                  <el-collapse-item title="标签分类" v-if="columnList.tagList.length">
                    <template #title>
                      <i-ep-price-tag class="mr-2" />
                      标签分类
                    </template>
                    <div
                      class="hover"
                      :class="{ 'mb-1': index != columnList.tagList.length - 1 }"
                      v-for="(item, index) in columnList.tagList">
                      <router-link :to="RouterPath.WORKS_BY_MARK(item.id)">
                        {{ item.text }}
                      </router-link>
                    </div>
                    <div>
                      <router-link :to="RouterPath.MARK_LIST()">更多...</router-link>
                    </div>
                  </el-collapse-item>
                  <el-collapse-item title="最新随笔" v-if="columnList.latestEssayList.length">
                    <template #title>
                      <i-ep-document-remove class="mr-2" />
                      最新随笔
                    </template>
                    <div
                      class="hover"
                      :class="{ 'mb-4': index != columnList.latestEssayList.length - 1 }"
                      v-for="(item, index) in columnList.latestEssayList">
                      <router-link :to="RouterPath.WORKS(item.id)">
                        {{ item.text }}
                      </router-link>
                    </div>
                  </el-collapse-item>
                  <el-collapse-item title="最新评论" v-if="columnList.latestComments.length">
                    <template #title>
                      <i-ep-comment class="mr-2" />
                      最新评论
                    </template>
                    <div
                      :class="{ 'mb-4': index != columnList.latestComments.length - 1 }"
                      v-for="(item, index) in columnList.latestComments">
                      <div class="hover">
                        <router-link :to="RouterPath.WORKS(item.id)">
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
                    <div :class="{ 'mb-2': index != columnList.albumn.length - 1 }" v-for="(item, index) in columnList.albumn" :key="index">
                      <router-link class="hover" :to="'/albumn/' + item.id">{{ item.text }}</router-link>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </template>
            </el-tab-pane>
            <el-tab-pane label="排行榜数据" name="second">
              <template v-if="topList">
                <el-collapse v-model="topListCollActive" accordion>
                  <el-collapse-item title="评论排行榜">
                    <template #title>
                      <i-ep-chat-square class="mr-2" />
                      评论排行榜
                    </template>
                    <div class="mb-2 hover" v-for="item in topList.topComments">
                      <router-link :to="RouterPath.WORKS(item.id)">
                        {{ item.text }}
                      </router-link>
                    </div>
                  </el-collapse-item>
                  <el-collapse-item>
                    <template #title>
                      <i-ep-pointer class="mr-2" />
                      点赞排行榜
                    </template>
                    <div class="mb-2 hover" v-for="item in topList.topDigg">
                      <router-link :to="RouterPath.WORKS(item.id)">
                        {{ item.text }}
                      </router-link>
                    </div>
                  </el-collapse-item>
                  <el-collapse-item>
                    <template #title>
                      <i-ep-view class="mr-2" />
                      阅读排行榜
                    </template>
                    <div class="mb-2 hover" v-for="item in topList.topView">
                      <router-link :to="RouterPath.WORKS(item.id)">
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
    </Card>
    <template #title> 左陈列柜设置 </template>
    <template #content>
      <el-collapse v-model="settingCollActive" accordion>
        <el-collapse-item title="统一设置">
          <div class="ml-4">
            <CabinetSetting />
          </div>
        </el-collapse-item>
        <el-collapse-item title="盒子模型">
          <div class="ml-4">
            <BoxSetting :padding="LiteConfig.localSetting.cabinet.left.padding" :margin="LiteConfig.localSetting.cabinet.left.margin" />
          </div>
        </el-collapse-item>
      </el-collapse>
    </template>
  </ContextMenu>
</template>

<style scoped lang="scss">
$quota: 10;

#l-lcabinet {
  transition: var(--l-transition);
}

.fixed-lcabinet {
  left: calc(calc(var(--content-width) / 2) - calc(var(--cabinet-width) + 2rem)) !important;
}

.show-lcabinet {
  animation: showlcabinet 0.2s ease-in;
  transform: translateX(0);
}

@keyframes showlcabinet {
  @for $i from 0 to $quota {
    #{$i * 10%} {
      transform: translateX(calc(calc(-1 * var(--cabinet-width)) + calc($i * calc(var(--cabinet-width) / 10))));
    }
  }
}

.hidden-lcabinet {
  animation: hiddenlcabinet 0.2s ease-out;
  transform: translateX(calc(-1 * var(--cabinet-width)));
}

@keyframes hiddenlcabinet {
  @for $i from 0 to $quota {
    #{$i * 10%} {
      transform: translateX(calc($i * calc(calc(-1 * var(--cabinet-width)) / 10)));
    }
  }
}
</style>
