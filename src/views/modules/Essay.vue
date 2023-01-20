<script setup lang="ts">
import { BlogType } from "@/types/data-type";
import { closeLoader } from "@/utils/common";
import { nav } from "@/helpers/route-helper";
import { isOwner } from "@/lite.config";
import {
  getEssay,
  getEssayCatesAndTags,
  getPrevNext,
  getEssayVote,
  voteEssay
} from "@/utils/remote-api";

const route = useRoute();
const router = useRouter();
const postId = parseInt(String(route.params.id));

const essay = await getEssay(postId);
const catesTags = await getEssayCatesAndTags(postId);
const prevNext = await getPrevNext(postId);
const essayVote = ref(await getEssayVote(postId));

closeLoader();

async function vote(voteType: BlogType.VoteType) {
  const data = await voteEssay({ postId, isAbandoned: false, voteType });
  if (data) {
    if (data.isSuccess)
      if (voteType == "Bury") essayVote.value.buryCount = essayVote.value.buryCount + 1;
      else essayVote.value.diggCount = essayVote.value.diggCount + 1;
    ElMessage({
      message: data.message,
      grouping: true,
      type: data.isSuccess ? "success" : "error"
    });
  }
}
</script>

<template>
  <div id="lite-essay">
    <div class="fsz-1.4">{{ essay.text }}</div>
    <div class="sec-color f-c-s mt-4 fsz-0.9">
      <div class="f-c-c mr-3">
        <el-icon class="mr-0.9">
          <i-ep-clock />
        </el-icon>
        <span>{{ essay.date }}</span>
      </div>
      <div class="f-c-c mr-3">
        <el-icon class="mr-0.9">
          <i-ep-view />
        </el-icon>
        <span>{{ essay.view }}次阅读</span>
      </div>
      <div class="f-c-c mr-3">
        <el-icon class="mr-0.9">
          <i-ep-chat-line-square />
        </el-icon>
        <span>{{ essay.comm }}条评论</span>
      </div>
      <div
        v-if="isOwner"
        class="f-c-c hover"
        @click="nav('https://i.cnblogs.com/EditPosts.aspx?postid=' + postId)">
        <el-icon class="mr-0.9">
          <i-ep-edit-pen />
        </el-icon>
        <span>编辑</span>
      </div>
    </div>
    <div class="sec-color mt-4 fsz-0.9">
      <div class="mb-2 f-c-s" v-if="catesTags.cates.length > 0">
        <div class="f-c-c">
          <el-icon class="mr-0.9">
            <i-ep-folder-opened />
          </el-icon>
          <span>分类：</span>
        </div>
        <div
          :class="{ 'mr-2': index !== catesTags.cates.length - 1 }"
          v-for="(item, index) in catesTags.cates"
          :key="index">
          <Tag @click="nav('/c/' + item.href, router)">
            {{ item.text }}
          </Tag>
        </div>
      </div>
      <div class="f-c-s" v-if="catesTags.tags.length > 0">
        <div class="f-c-c">
          <el-icon class="mr-0.9">
            <i-ep-price-tag />
          </el-icon>
          <span>标签：</span>
        </div>
        <div
          :class="{ 'mr-2': index !== catesTags.tags.length - 1 }"
          v-for="(item, index) in catesTags.tags"
          :key="index">
          <Tag @click="nav('/t/' + item.text, router)">
            {{ item.text }}
          </Tag>
        </div>
      </div>
    </div>
    <div id="e-content" class="mt-8" v-html="essay?.content" v-parse-code v-anchor />
    <div class="divider"></div>
    <div class="sec-color f-c-e fsz-0.9">
      <div class="f-c-c mr-2">
        <el-icon class="mr-0.9">
          <i-ep-clock />
        </el-icon>
        <span>{{ essay.date }}</span>
      </div>
      <div class="f-c-c mr-2">
        <el-icon class="mr-0.9">
          <i-ep-view />
        </el-icon>
        <span>{{ essay.view }}次阅读</span>
      </div>
      <div class="f-c-c">
        <el-icon class="mr-0.9">
          <i-ep-chat-line-square />
        </el-icon>
        <span>{{ essay.comm }}条评论</span>
      </div>
    </div>
    <div class="prev-next fsz-0.9 mt-10">
      <div class="prev hover mb-2 f-c-s" v-if="prevNext.prev.href">
        <el-icon>
          <i-ep-d-arrow-left />
        </el-icon>
        <a class="hover pri-color" :href="prevNext.prev.href">上一篇：{{ prevNext.prev.text }}</a>
      </div>
      <div class="next hover f-c-s" v-if="prevNext.next.href">
        <el-icon>
          <i-ep-d-arrow-right />
        </el-icon>
        <a class="hover pri-color" :href="prevNext.next.href">下一篇：{{ prevNext.next.text }}</a>
      </div>
    </div>
    <div class="my-10 f-c-e">
      <div class="digg mr-5">
        <el-button plain @click="vote('Digg')">
          <span class="fsz-0.9"> 点赞 {{ essayVote.diggCount }} </span>
          <template #icon>
            <i-ep-caret-top />
          </template>
        </el-button>
      </div>
      <div class="bury">
        <el-button plain @click="vote('Bury')">
          <span class="fsz-0.9"> 反对 {{ essayVote.buryCount }} </span>
          <template #icon>
            <i-ep-caret-bottom />
          </template>
        </el-button>
      </div>
    </div>
    <Comments :post-id="postId" />
  </div>
</template>

<style lang="scss">
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 400 !important;
}

h1 {
  font-size: 1.4rem !important;
}

h2 {
  font-size: 1.3rem !important;
}

h3 {
  font-size: 1.2rem !important;
}

h4 {
  font-size: 1.1rem !important;
}

h5 {
  font-size: 1rem !important;
}

h6 {
  font-size: 1rem !important;
}

pre {
  border-radius: 6px;
  position: relative;
  box-sizing: border-box;

  code {
    --at-apply: fsz-1 box-border rd-2;
    font-family: Consolas, Monaco, Andale Mono, Ubuntu Mono, monospace !important;
    font-weight: 300;
    margin: 0 !important;
    background-color: var(--precode-bg-color) !important;

    &::-webkit-scrollbar {
      display: none;
      width: 3px;
      height: 3px;
    }

    &:hover::-webkit-scrollbar {
      display: block;
      width: 3px;
      height: 3px;
    }

    &,
    span {
      line-height: 1.4;
    }
  }
}

code {
  --at-apply: fsz-0.9 box-border rd-2;
  font-weight: 300;
  background: var(--code-bg-color);
  color: var(--el-color-danger-light-3);
  padding: 0.15rem 0.4rem;
  margin: 0;
}

.cblock {
  --at-apply: fsz-0.8 absolute;
  box-sizing: border-box;
  padding: 4px;
  color: #767676;
  font-weight: 400;
  right: 4px;
  top: 0;
}

blockquote {
  --at-apply: box-border rd-1 sec-color;
  margin: 0;
  background-color: var(--precode-bg-color);
  padding: {
    left: 0.5rem;
    top: 0.1rem;
    bottom: 0.1rem;
  }
  border: {
    left: {
      width: 0.3rem;
      color: #409eff;
      style: solid;
    }
  }
}

#e-content {
  a {
    padding-bottom: 1px;
    border-bottom: 1px dotted var(--pri-text-color);
    @include hover($border-color: bottom);
  }

  p {
    margin: 1.2rem 0 !important;
    @include font-space();
  }

  ol,
  ul {
    li {
      @include font-space();
    }

    li:last-child {
      margin-bottom: 0;
    }
  }

  table {
    padding: 10px;
    box-sizing: border-box;

    th {
      font-weight: 600 !important;
    }

    th,
    td {
      padding: 8px 13px;
      border-bottom: 1px solid var(--divider-color);
    }

    th,
    tr:nth-child(odd) {
      background-color: var(--precode-bg-color);
    }

    tr:nth-child(even) {
      background-color: var(--code-bg-color);
    }
  }
}
</style>
