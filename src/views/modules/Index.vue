<script setup lang="ts">
import { startLoading, endLoading, nav } from "@/utils/common";
import { blogApp, __LITE_CONFIG__, pcDevice } from "@/lite.config";
import { getAuthorData, getMasterData } from "@/apis/remote-api";
import { useBaseAuthorData } from "@/store";

startLoading();

const { setAuthorData } = useBaseAuthorData();

const author = await getAuthorData();
const master = await getMasterData();

setAuthorData({ author, master });

const router = useRouter();

onMounted(() => {
  endLoading();
});
</script>

<template>
  <Card class="l-index min-height">
    <div class="l-index__content">
      <div class="mb-6 f-s-c">
        <div class="w-40%">
          <div class="font-bold mb-2">{{ blogApp }} 的博客</div>
          <div v-if="!pcDevice">
            <img class="mb-4 w-25 h-25 rd-50" :src="__LITE_CONFIG__.cabinet.avatar" />
            <div class="l-fiv-size">
              <div class="mb-1">圆龄：{{ author[1].text }}</div>
              <div class="mb-1">粉丝：{{ author[2].text }}</div>
              <div class="mb-1">关注：{{ author[3].text }}</div>
              <div class="mb-1">随笔：{{ master[0].digg }}</div>
              <div class="mb-1">阅读：{{ master[3].digg }}</div>
            </div>
          </div>
          <div v-else class="f-c-s">
            <img class="mr-10 w-25 h-25 rd-50" :src="__LITE_CONFIG__.cabinet.avatar" />
            <div class="l-fiv-size">
              <div class="mb-1">圆龄：{{ author[1].text }}</div>
              <div class="mb-1">粉丝：{{ author[2].text }}</div>
              <div class="mb-1">关注：{{ author[3].text }}</div>
              <div class="mb-1">随笔：{{ master[0].digg }}</div>
              <div class="mb-1">阅读：{{ master[3].digg }}</div>
            </div>
          </div>
        </div>
        <div class="w-60%">
          <div class="mb-2 font-bold">个人简介</div>
          <div class="l-fiv-size" v-html="__LITE_CONFIG__.nameplate.intro"></div>
        </div>
      </div>
      <div class="mb-6">
        <div class="mb-2 font-bold">个人签名</div>
        <div class="l-fiv-size" v-html="__LITE_CONFIG__.cabinet.signature"></div>
      </div>
      <div v-if="pcDevice" class="f-s-b mb-6">
        <div class="w-50%">
          <div class="mb-2">
            <div class="mb-4 font-bold">个人标签</div>
            <div class="hobbies f-c-s flex-wrap">
              <LTag class="mr-2 mb-4" hover round v-for="(item, index) in __LITE_CONFIG__.nameplate.tags" :key="index">{{ item }}</LTag>
            </div>
          </div>
          <div class="mb-6">
            <div class="mb-2 font-bold">联系方式</div>
            <div class="f-s-s">
              <div class="mr-2" v-for="(item, index) in __LITE_CONFIG__.nameplate.connection" :key="index">
                <el-tooltip :content="item.name + ': ' + item.text">
                  <svg v-if="item.svg" class="w-6 h-6" viewBox="0 0 1024 1024" v-html="item.svg"></svg>
                  <template v-else>
                    <img class="rd-50 w-6 h-6" alt="FAILED" :src="item.img" />
                  </template>
                </el-tooltip>
              </div>
            </div>
          </div>
          <div>
            <div class="mb-2 font-bold">闲言碎语</div>
            <div class="l-fiv-size" v-html="__LITE_CONFIG__.nameplate.gossip"></div>
          </div>
        </div>
        <div class="w-48%">
          <div class="mb-6">
            <div class="font-bold">个人技能</div>
            <SkillGraph />
          </div>
          <div>
            <div class="mb-4 font-bold">我的相册</div>
            <div class="f-s-b flex-wrap">
              <div v-for="(item, i) in __LITE_CONFIG__.nameplate.photos" :key="i" style="width: 30%; height: 30%">
                <el-image v-if="i < 3" :src="item" :preview-src-list="__LITE_CONFIG__.nameplate.photos" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="mb-6">
          <div class="mb-4 font-bold">个人标签</div>
          <div class="hobbies f-c-s flex-wrap">
            <LTag class="mr-2 mb-4" hover round v-for="(item, index) in __LITE_CONFIG__.nameplate.tags" :key="index">{{ item }}</LTag>
          </div>
        </div>
        <div class="mb-6">
          <div class="mb-2 font-bold">联系方式</div>
          <div class="f-s-s">
            <div class="mr-2" v-for="(item, index) in __LITE_CONFIG__.nameplate.connection" :key="index">
              <el-tooltip :content="item.name + ': ' + item.text">
                <svg v-if="item.svg" class="w-6 h-6" viewBox="0 0 1024 1024" v-html="item.svg"></svg>
                <template v-else>
                  <img class="rd-50 w-6 h-6" alt="FAILED" :src="item.img" />
                </template>
              </el-tooltip>
            </div>
          </div>
        </div>
        <div class="mb-6">
          <el-button type="primary" @click="nav({ router, path: '/p/list' })">Get Started</el-button>
          <el-button text type="primary" @click="nav({ path: 'https://i.cnblogs.com/posts/edit' })">新建随笔</el-button>
          <el-button text type="primary" @click="nav({ path: 'https://i.cnblogs.com/posts' })">管理博客</el-button>
        </div>
        <div class="mb-6">
          <div class="mb-2 font-bold">闲言碎语</div>
          <div class="l-fiv-size" v-html="__LITE_CONFIG__.nameplate.gossip"></div>
        </div>
        <div class="mb-6">
          <div class="font-bold">个人技能</div>
          <SkillGraph />
        </div>
        <div class="mb-6">
          <div class="mb-4 font-bold">我的相册</div>
          <div class="f-s-b flex-wrap">
            <div v-for="(item, i) in __LITE_CONFIG__.nameplate.photos" :key="i" style="width: 30%; height: 30%">
              <el-image v-if="i < 3" :src="item" :preview-src-list="__LITE_CONFIG__.nameplate.photos" />
            </div>
          </div>
        </div>
      </div>
      <div v-if="pcDevice">
        <el-button type="primary" @click="nav({ router, path: '/p/list' })">Get Started</el-button>
        <el-button text type="primary" @click="nav({ path: 'https://i.cnblogs.com/posts/edit' })">新建随笔</el-button>
        <el-button text type="primary" @click="nav({ path: 'https://i.cnblogs.com/posts' })">管理博客</el-button>
      </div>
    </div>
  </Card>
</template>

<style scoped lang="scss"></style>
