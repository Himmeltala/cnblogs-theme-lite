<script setup lang="ts">
import { getCabinetColumn } from "@/apis/remote-api";

defineProps({
  isRemote: {
    type: Boolean,
    default: true
  }
});

const data = ref();

getCabinetColumn().then(res => {
  data.value = res;
});

const active = ref("1");
</script>

<template>
  <template v-if="data">
    <div class="mb-4" v-for="(item, index) in data.rankings" :key="index">{{ item.text }}</div>
    <el-collapse v-model="active" accordion>
      <el-collapse-item v-if="data.essaySort.length">
        <template #title>
          <i-ep-files class="mr-2" />
          随笔分类
        </template>
        <div class="hover" :class="{ 'mb-1': index != data.essaySort.length - 1 }" v-for="(item, index) in data.essaySort" :key="index">
          <router-link :to="'/p/sort/' + item.id">
            {{ item.text }}
          </router-link>
        </div>
      </el-collapse-item>
      <el-collapse-item v-if="data.essayArchive.length">
        <template #title>
          <i-ep-collection class="mr-2" />
          随笔档案
        </template>
        <div
          class="hover"
          :class="{ 'mb-1': index != data.essayArchive.length - 1 }"
          v-for="(item, index) in data.essayArchive"
          :key="index">
          <router-link :to="'/p/archive/' + item.id">
            {{ item.text }}
          </router-link>
        </div>
      </el-collapse-item>
      <el-collapse-item v-if="data.articleSort.length">
        <template #title>
          <i-ep-folder-opened class="mr-2" />
          文章分类
        </template>
        <div class="hover" :class="{ 'mb-1': index != data.articleSort.length - 1 }" v-for="(item, index) in data.articleSort" :key="index">
          <router-link :to="'/article/sort/' + item.id">
            {{ item.text }}
          </router-link>
        </div>
      </el-collapse-item>
      <el-collapse-item title="文章档案" v-if="data.articleArchive.length">
        <template #title>
          <i-ep-management class="mr-2" />
          文章档案
        </template>
        <div
          class="hover"
          :class="{ 'mb-1': index != data.articleArchive.length - 1 }"
          v-for="(item, index) in data.articleArchive"
          :key="index">
          <router-link :to="'/article/archive/' + item.id">
            {{ item.text }}
          </router-link>
        </div>
      </el-collapse-item>
      <el-collapse-item title="标签分类" v-if="data.tagList.length">
        <template #title>
          <i-ep-price-tag class="mr-2" />
          标签分类
        </template>
        <div class="hover" :class="{ 'mb-1': index != data.tagList.length - 1 }" v-for="(item, index) in data.tagList" :key="index">
          <router-link :to="'/mark/sort/' + item.id">
            {{ item.text }}
          </router-link>
        </div>
        <div>
          <router-link to="/marks">更多...</router-link>
        </div>
      </el-collapse-item>
      <el-collapse-item title="最新随笔" v-if="data.latestEssayList.length">
        <template #title>
          <i-ep-document-remove class="mr-2" />
          最新随笔
        </template>
        <div
          class="hover"
          :class="{ 'mb-4': index != data.latestEssayList.length - 1 }"
          v-for="(item, index) in data.latestEssayList"
          :key="index">
          <router-link :to="'/p/' + item.id">
            {{ item.text }}
          </router-link>
        </div>
      </el-collapse-item>
      <el-collapse-item title="最新评论" v-if="data.latestComments.length">
        <template #title>
          <i-ep-comment class="mr-2" />
          最新评论
        </template>
        <div :class="{ 'mb-4': index != data.latestComments.length - 1 }" v-for="(item, index) in data.latestComments" :key="index">
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
        <div :class="{ 'mb-2': index != data.albumn.length - 1 }" v-for="(item, index) in data.albumn" :key="index">
          <router-link class="hover" :to="'/albumn/' + item.id">{{ item.text }}</router-link>
        </div>
      </el-collapse-item>
    </el-collapse>
  </template>
</template>

<style scoped lang="scss"></style>
