<script setup lang="ts">
import { getCabinetTopList } from "@/apis/remote-api";

const topList = ref();
const collapseActive = ref("1");

getCabinetTopList().then(res => {
  topList.value = res;
});
</script>

<template>
  <template v-if="topList">
    <el-collapse v-model="collapseActive" accordion>
      <el-collapse-item title="评论排行榜">
        <template #title>
          <i-ep-chat-square class="mr-2" />
          评论排行榜
        </template>
        <div class="mb-2 hover" v-for="(item, index) in topList.topComments">
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
        <div class="mb-2 hover" v-for="(item, index) in topList.topDigg">
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
        <div class="mb-2 hover" v-for="(item, index) in topList.topView">
          <router-link :to="'/p/' + item.id">
            {{ item.text }}
          </router-link>
        </div>
      </el-collapse-item>
    </el-collapse>
  </template>
</template>

<style scoped lang="scss"></style>
