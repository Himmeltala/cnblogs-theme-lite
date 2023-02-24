<script setup lang="ts">
import { isLogin } from "@/lite.config";
import { nav } from "@/utils/router-helper";
import { getCommentCount, getCommentList } from "@/utils/remote-api";
import { useAnchorStore } from "@/store";

const props = defineProps({
  postId: { type: Number, required: true }
});

const level = ref(null);
const { anchor } = storeToRefs(useAnchorStore());
const count = ref(await getCommentCount(props.postId));
const index = ref(count.value);
const comments = ref(await getCommentList(props.postId, index.value, anchor.value));

watch(level, () => {
  document.querySelector(`#level-${anchor.value}`).scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "nearest"
  });
  anchor.value = 0;
});

async function paginationChange() {
  comments.value = await getCommentList(props.postId, index.value);
}

function onPost(response: any) {
  comments.value = response.comments;
  count.value = response.count;
}

function onReFinish(response: any) {
  comments.value = response.comments;
  count.value = response.count;
}

function onEdFinish(response: any) {
  comments.value = response.comments;
  count.value = response.count;
}
</script>

<template>
  <div class="comment">
    <PostComment :post-id="postId" @on-post="onPost" />
    <h3>评论列表</h3>
    <div class="mt-10" v-if="isLogin && comments?.length">
      <div class="clearfix mb-12" v-for="(item, index) in comments" :key="index">
        <div class="f-c-s">
          <el-image class="mr-4 rd-50 w-14 h-14" :src="item.avatar" fit="fill" />
          <div>
            <div class="hover cursor-pointer" @click="nav({ path: item.space })">
              {{ item.author }}
            </div>
            <div class="l-fiv-size l-sec-color mt-2 f-c-c">
              <div :id="'level-' + item.commentId" class="mr-2">
                <span v-if="anchor === item.commentId" ref="level">{{ item.layer }}</span>
                <span v-else>{{ item.layer }}</span>
              </div>
              <div>{{ item.date }}</div>
            </div>
          </div>
        </div>
        <div class="mt-4 relative" style="margin-left: 4.5rem">
          <textarea class="z--1 opacity-0 absolute top-0 left-0" :id="'upload-img-' + index" />
          <div class="c-content" v-html="item.content" v-hljs />
        </div>
        <el-dropdown v-show="!item.isEditingUpdate && !item.isEditingReplay" class="float-right more-item f-c-e">
          <span class="hover">
            <i-ep-more class="l-fiv-size l-sec-color hover" />
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <DiggComment :comment="item" :post-id="postId" />
              </el-dropdown-item>
              <el-dropdown-item>
                <BuryComment :comment="item" :post-id="postId" />
              </el-dropdown-item>
              <el-dropdown-item>
                <DeleteComment :comment="item" :comments="comments" :post-id="postId" :index="index" />
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <EditComment @on-finish="onEdFinish" :post-id="postId" :index="index" :comment="item" />
        <ReplayComment @on-finish="onReFinish" :post-id="postId" :index="index" :comment="item" />
      </div>
      <div class="mt-10 f-c-e" v-if="!comments?.length">
        <el-pagination
          @current-change="paginationChange"
          layout="prev, pager, next"
          v-model:current-page="index"
          v-model:page-count="count" />
      </div>
    </div>
    <el-empty v-else-if="isLogin && !comments?.length" description="来一条友善的评论吧~" />
    <el-empty v-else-if="!isLogin" description="你没有登录或没有申请博客权限~" />
  </div>
</template>

<style lang="scss">
.c-content {
  line-height: 1.7;

  a {
    padding-bottom: 1px;
    border-bottom: 1px dotted var(--pri-text-color);
    @include hover($border-color: bottom);
  }
}
</style>

<style scoped lang="scss">
@include pc() {
  .more-item {
    --at-apply: w-5%;
  }
}

@include mb() {
  .more-item {
    --at-apply: w-10%;
  }
}
</style>
