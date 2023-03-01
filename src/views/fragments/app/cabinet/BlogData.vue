<script setup lang="ts">
import { getCabinetColumn as localApi } from "@/apis/local-api";
import { getCabinetColumn as remoteApi } from "@/apis/remote-api";

const props = defineProps({
  isRemote: {
    type: Boolean,
    default: true
  }
});

let columnData = ref(await remoteApi());

if (!props.isRemote) {
  columnData.value = localApi();
}

const active = ref("1");
</script>

<template>
  <div class="mb-4" v-for="(item, index) in columnData.rankings" :key="index">{{ item.text }}</div>
  <el-collapse v-model="active" accordion>
    <el-collapse-item title="随笔分类" v-if="columnData.essaySort.length">
      <div
        :class="{ 'mb-1': index != columnData.essaySort.length - 1 }"
        class="hover"
        v-for="(item, index) in columnData.essaySort"
        :key="index">
        <router-link :to="'/essay/sort/' + item.id">
          {{ item.text }}
        </router-link>
      </div>
    </el-collapse-item>
    <el-collapse-item title="随笔档案" v-if="columnData.essayArchive.length">
      <div
        class="hover"
        :class="{ 'mb-1': index != columnData.essayArchive.length - 1 }"
        v-for="(item, index) in columnData.essayArchive"
        :key="index">
        <router-link :to="'/essay/archive/' + item.id">
          {{ item.text }}
        </router-link>
      </div>
    </el-collapse-item>
    <el-collapse-item title="文章分类" v-if="columnData.articleSort.length">
      <div
        class="hover"
        :class="{ 'mb-1': index != columnData.articleSort.length - 1 }"
        v-for="(item, index) in columnData.articleSort"
        :key="index">
        <router-link :to="'/article/sort/' + item.id">
          {{ item.text }}
        </router-link>
      </div>
    </el-collapse-item>
    <el-collapse-item title="文章档案" v-if="columnData.articleArchive.length">
      <div
        class="hover"
        :class="{ 'mb-1': index != columnData.articleArchive.length - 1 }"
        v-for="(item, index) in columnData.articleArchive"
        :key="index">
        <router-link :to="'/article/archive/' + item.id">
          {{ item.text }}
        </router-link>
      </div>
    </el-collapse-item>
    <el-collapse-item title="标签分类" v-if="columnData.tagList.length">
      <div
        class="hover"
        :class="{ 'mb-1': index != columnData.tagList.length - 1 }"
        v-for="(item, index) in columnData.tagList"
        :key="index">
        <router-link :to="'/mark/sort/' + item.id">
          {{ item.text }}
        </router-link>
      </div>
      <div>
        <router-link to="/marks">更多...</router-link>
      </div>
    </el-collapse-item>
    <el-collapse-item title="最新随笔" v-if="columnData.latestEssayList.length">
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
      <div :class="{ 'mb-2': index != columnData.albumn.length - 1 }" v-for="(item, index) in columnData.albumn" :key="index">
        <router-link class="hover" :to="'/albumn/' + item.id">{{ item.text }}</router-link>
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<style scoped lang="scss"></style>
