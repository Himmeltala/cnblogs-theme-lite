<script setup lang="ts">
import { isLogin } from "@/lite.config";
import { nav } from "@/helpers/route-helper";
import { deleteComment, getCommentCount, getCommentList, voteComment } from "@/utils/remote-api";
import { useCommentsAnchorStore } from "@/store";
import { BlogType, CustType } from "@/types/data-type";

const props = defineProps({
  postId: { type: Number, required: true }
});

const level = ref(null);
const { commentAnchor } = storeToRefs(useCommentsAnchorStore());
const form = ref<CustType.Comment>({
  postId: props.postId,
  parentCommentId: 0,
  content: ""
});
const comments = ref<CustType.Comment[]>();
const commentCount = ref(1);
const currentIndex = ref(0);

async function fetchComment(
  f: boolean,
  y?: { message?: string; success?: (res: any) => void },
  n?: { message?: string; error?: () => void }
) {
  if (f) {
    const count = await getCommentCount(props.postId);
    commentCount.value = count;
    currentIndex.value = count;
    const comms = await getCommentList(props.postId, currentIndex.value, commentAnchor.value);
    if (y && y.success) {
      y.success(comms);
      if (y.message) ElMessage({ message: y.message, grouping: true, type: "success" });
    }
  } else {
    if (n) {
      n.error && n.error();
      if (n.message) ElMessage({ message: n.message, grouping: true, type: "error" });
    }
  }
}

fetchComment(true, {
  success: res => {
    comments.value = res;

    // comments.value = [
    //   {
    //     postId: 1,
    //     isEditingReplay: false,
    //     isEditingUpdate: false,
    //     content: "Hello",
    //     date: "2023-2-12 23:06",
    //     digg: "支持(1)",
    //     bury: "反对(1)",
    //     layer: "1楼",
    //     author: "HimmelbleuA"
    //   },
    //   {
    //     postId: 2,
    //     isEditingReplay: false,
    //     isEditingUpdate: false,
    //     content: "Hello",
    //     date: "2023-2-12 23:06",
    //     digg: "支持(1)",
    //     bury: "反对(1)",
    //     layer: "2楼",
    //     author: "HimmelbleuB"
    //   }
    // ];
  }
});

watch(level, () => {
  document.querySelector(`#level-${commentAnchor.value}`).scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "nearest"
  });
  commentAnchor.value = 0;
});

async function paginationChange() {
  comments.value = await getCommentList(props.postId, currentIndex.value);
}

async function confirmDeleteComment(comment: CustType.Comment, index: number) {
  const data = await deleteComment({
    commentId: comment.commentId,
    pageIndex: currentIndex.value - 1,
    parentId: props.postId
  });
  if (data) {
    comments.value?.splice(index, 1);
    ElMessage({ message: "删除评论成功！", grouping: true, type: "success" });
  } else {
    ElMessage({ message: "这不是你的评论，没有权限删除！", grouping: true, type: "error" });
  }
  console.log(data);
}

async function voteComm(comment: CustType.Comment, voteType: BlogType.VoteType) {
  const data = await voteComment({
    isAbandoned: false,
    commentId: comment.commentId,
    postId: props.postId,
    voteType: voteType
  });
  if (data.isSuccess) {
    if (voteType == "Bury") comment.bury = comment.bury! + 1;
    else comment.digg = comment.digg! + 1;
  }
  ElMessage({
    message: data.message,
    grouping: true,
    type: data.isSuccess ? "success" : "error"
  });
}

function onPost(response: any) {
  comments.value = response.comments;
  commentCount.value = response.count;
}

function onReFinish(response: any) {
  comments.value = response.comments;
  commentCount.value = response.count;
}

function onEdFinish(response: any) {
  comments.value = response.comments;
  commentCount.value = response.count;
}
</script>

<template>
  <div class="comments">
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
            <div class="fsz-0.8 l-sec-color mt-2 f-c-c">
              <div :id="'level-' + item.commentId" class="mr-2">
                <span v-if="commentAnchor === item.commentId" ref="level">{{ item.layer }}</span>
                <span v-else>{{ item.layer }}</span>
              </div>
              <div>{{ item.date }}</div>
            </div>
          </div>
        </div>
        <div class="mt-4 relative" style="margin-left: 4.5rem">
          <textarea class="z--1 opacity-0 absolute top-0 left-0" :id="'upload-img-' + index" />
          <div class="c-content" v-html="item.content" v-hljs />
          <ReplayComment @on-finish="onReFinish" :post-id="postId" :index="index" :comment="item" />
          <EditComment @on-finish="onEdFinish" :post-id="postId" :index="index" :comment="item" />
          <!-- <div
            v-show="!item.isEditingUpdate && !item.isEditingReplay"
            class="hover mr-4 f-c-e"
            @click="voteComm(item, 'Digg')">
            <el-icon class="mr-1">
              <i-ep-caret-top />
            </el-icon>
            <span>{{ item.digg }}</span>
          </div>
          <div
            v-show="!item.isEditingUpdate && !item.isEditingReplay"
            class="hover mr-4 f-c-e"
            @click="voteComm(item, 'Bury')">
            <el-icon class="mr-1">
              <i-ep-caret-bottom />
            </el-icon>
            <span>{{ item.bury }}</span>
          </div>
          <div v-show="!item.isEditingUpdate && !item.isEditingReplay" class="mr-3">
            <el-popconfirm
              confirm-button-text="确定"
              cancel-button-text="取消"
              title="确定删除该评论？"
              @confirm="confirmDeleteComment(item, index)">
              <template #reference>
                <div class="hover f-c-e">
                  <el-icon class="mr-1">
                    <i-ep-delete />
                  </el-icon>
                  <span>删除</span>
                </div>
              </template>
            </el-popconfirm>
          </div> -->
        </div>
      </div>
      <div class="mt-10 f-c-e" v-if="!comments?.length">
        <el-pagination
          @current-change="paginationChange"
          layout="prev, pager, next"
          v-model:current-page="currentIndex"
          v-model:page-count="commentCount" />
      </div>
    </div>
    <el-empty v-else-if="isLogin && !comments?.length" description="来一条友善的评论吧~" />
    <el-empty v-else-if="!isLogin" description="你没有登录或没有申请博客权限~" />
  </div>
</template>

<style lang="scss">
.c-content {
  @include font-space();

  a {
    padding-bottom: 1px;
    border-bottom: 1px dotted var(--pri-text-color);
    @include hover($border-color: bottom);
  }
}
</style>
