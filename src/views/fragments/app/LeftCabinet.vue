<script setup lang="ts">
import * as LocalApi from "@/apis/local-api";
import * as RemoteApi from "@/apis/remote-api";
import { getSetting, nav } from "@/utils/common";
import { __LITE_CONFIG__, blogApp, isFollow, isOwner } from "@/lite.config";

const props = defineProps({
  disabled: {
    type: Boolean,
    default: true
  }
});

const setting = getSetting();
let authorData = ref(await RemoteApi.getAuthorData());
let masterData = ref(await RemoteApi.getMasterData());
let toplistData = ref(await RemoteApi.getCabinetTopList());
let columnData = ref(await RemoteApi.getCabinetColumn());

if (!setting.value.cabinet.remote) {
  authorData.value = LocalApi.getAuthorData();
  masterData.value = LocalApi.getMasterData();
  toplistData.value = LocalApi.getCabinetTopList();
  columnData.value = LocalApi.getCabinetColumn();
}

const cabinet = __LITE_CONFIG__.cabinet;
const router = useRouter();
const searchVal = ref();
const active1 = ref("1");
const active2 = ref("1");

function search() {
  window.open(`https://zzk.cnblogs.com/s?w=blog:${blogApp}%${searchVal.value}`, "__blank");
}

async function follow() {
  const data = await RemoteApi.follow();
  if (data) ElMessage({ message: "已经关注博主！", type: "success", grouping: true });
}

async function unfollow() {
  const data = await RemoteApi.unfollow();
  if (data) ElMessage({ message: "取消关注博主！", type: "success", grouping: true });
}

const left = computed(() => {
  return setting.value.cabinet.left.pin && setting.value.cabinet.position.break ? setting.value.cabinet.position.left + "vw" : 0;
});

const block = computed(() => {
  return !props.disabled && !setting.value.cabinet.left.pin;
});

const hidden = computed(() => {
  return props.disabled && !setting.value.cabinet.left.pin;
});

const fixed = computed(() => {
  return setting.value.cabinet.left.pin && !setting.value.cabinet.position.break;
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
      class="l-fiv-size"
      :class="{ 'l-box-bg px-2': !setting.card.open }"
      :padding="setting.cabinet.left.padding"
      :margin="setting.cabinet.left.margin">
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
          <div class="f-c-c mb-5" v-if="!isOwner">
            <el-popconfirm @confirm="unfollow" confirm-button-text="确定" cancel-button-text="取消" title="确定取消关注？">
              <template #reference>
                <el-button v-if="isFollow" type="danger" text bg> -取消关注 </el-button>
              </template>
            </el-popconfirm>
            <el-button @click="follow" v-if="!isFollow" type="primary" text bg> +关注博主 </el-button>
          </div>
          <div class="hover mb-3" v-for="(item, index) in authorData" :key="index" @click="nav({ path: item.href })">
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
              <span class="mr-3" v-for="(item, index) in columnData.rankings" :key="index"> {{ item.text }}</span>
            </template>
            <div class="mb-3">
              <span class="hover mr-3" v-for="(item, index) in masterData" :key="index"> {{ item.text }} - {{ item.digg }} </span>
            </div>
          </el-tooltip>
          <el-input clearable @keyup.enter="search" v-model="searchVal">
            <template #prefix>
              <i-ep-search />
            </template>
          </el-input>
        </ExpandableBox>
        <ExpandableBox text="博客数据" disabled>
          <template #icon>
            <i-ep-collection />
          </template>
          <el-collapse v-model="active1" accordion>
            <el-collapse-item title="随笔分类" v-if="columnData.essaySort.length">
              <div
                class="mb-1 hover"
                v-for="(item, index) in columnData.essaySort"
                :key="index"
                @click="nav({ path: '/sort/' + item.id, router })">
                {{ item.text }}
              </div>
            </el-collapse-item>
            <el-collapse-item title="随笔档案" v-if="columnData.essayArchive.length">
              <div
                class="mb-1 hover"
                v-for="(item, index) in columnData.essayArchive"
                :key="index"
                @click="nav({ path: '/sort/' + item.id, router })">
                <!-- @click="nav({ path: '/sort/' + item.id, router })"> -->
                {{ item.text }}
              </div>
            </el-collapse-item>
            <el-collapse-item title="标签分类" v-if="columnData.tagList.length">
              <div
                class="mb-1 hover"
                v-for="(item, index) in columnData.tagList"
                :key="index"
                @click="nav({ path: '/sort/tag/' + item.id, router })">
                {{ item.text }}
              </div>
              <div>
                <router-link to="/tags">更多...</router-link>
              </div>
            </el-collapse-item>
            <el-collapse-item title="文章分类" v-if="columnData.articleSort.length">
              <div
                class="mb-1 hover"
                v-for="(item, index) in columnData.articleSort"
                :key="index"
                @click="nav({ path: '/sort/' + item.id, router })">
                {{ item.text }}
              </div>
            </el-collapse-item>
            <el-collapse-item title="文章档案" v-if="columnData.articleArchive.length">
              <div
                class="mb-1 hover"
                v-for="(item, index) in columnData.articleArchive"
                :key="index"
                @click="nav({ path: '/sort/' + item.id, router })">
                <!-- @click="nav({ path: '/sort/' + item.id, router })"> -->
                {{ item.text }}
              </div>
            </el-collapse-item>
            <el-collapse-item title="最新随笔" v-if="columnData.latestEssayList.length">
              <div
                class="mb-4 hover"
                v-for="(item, index) in columnData.latestEssayList"
                :key="index"
                @click="nav({ path: '/p/' + item.id, router })">
                {{ item.text }}
              </div>
            </el-collapse-item>
            <el-collapse-item title="最新评论" v-if="columnData.latestComments.length">
              <div class="mb-4" v-for="(item, index) in columnData.latestComments" :key="index">
                <div class="hover" @click="nav({ path: '/p/' + item.id, router })">{{ item.title }}</div>
                <div class="pl-4">{{ item.content }}</div>
                <div class="f-c-e">
                  <a :href="'https://www.cnblogs.com/' + item.author" target="_blank">@{{ item.author }}</a>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </ExpandableBox>
      </div>
      <div class="noscroll ofw-auto h-4vh l-thr-color f-c wce-nowrap">
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
    <template #title> 左陈列柜设置 </template>
    <template #content>
      <el-collapse v-model="active2" accordion>
        <el-collapse-item title="统一设置">
          <div class="ml-4">
            <CabinetSetting />
          </div>
        </el-collapse-item>
        <el-collapse-item title="盒子模型">
          <div class="ml-4">
            <BoxSetting :padding="setting.cabinet.left.padding" :margin="setting.cabinet.left.margin" />
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
