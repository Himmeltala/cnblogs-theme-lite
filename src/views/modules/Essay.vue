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
  <div id="l-jotting">
    <div class="fsz-1.5">{{ essay.text }}</div>
    <div class="l-sec-color f-c-s mt-4 fsz-0.8">
      <div class="f-c-c mr-4">
        <el-icon class="mr-1">
          <i-ep-clock />
        </el-icon>
        <span>{{ essay.date }}</span>
      </div>
      <div class="f-c-c mr-4">
        <el-icon class="mr-1">
          <i-ep-view />
        </el-icon>
        <span>{{ essay.view }}次阅读</span>
      </div>
      <div class="f-c-c mr-4">
        <el-icon class="mr-1">
          <i-ep-chat-line-square />
        </el-icon>
        <span>{{ essay.comm }}条评论</span>
      </div>
      <div
        v-if="isOwner"
        class="f-c-c hover"
        @click="nav({ path: 'https://i.cnblogs.com/EditPosts.aspx?postid=' + postId })">
        <el-icon class="mr-1">
          <i-ep-edit-pen />
        </el-icon>
        <span>编辑</span>
      </div>
    </div>
    <div class="l-sec-color mt-4">
      <div class="mb-2 f-c-s" v-if="catesTags.cates.length > 0">
        <div class="f-c-c fsz-1">
          <el-icon class="mr-1">
            <i-ep-folder-opened />
          </el-icon>
          <span>分类：</span>
        </div>
        <div
          v-for="(item, index) in catesTags.cates"
          class="fsz-0.8"
          :class="{ 'mr-2': index !== catesTags.cates.length - 1 }"
          :key="index">
          <Label class="px-2 py-1.5" @click="nav({ path: '/sort/' + item.href, router })">
            {{ item.text }}
          </Label>
        </div>
      </div>
      <div class="f-c-s" v-if="catesTags.tags.length > 0">
        <div class="f-c-c fsz-1">
          <el-icon class="mr-1">
            <i-ep-price-tag />
          </el-icon>
          <span>标签：</span>
        </div>
        <div
          v-for="(item, index) in catesTags.tags"
          class="fsz-0.8"
          :class="{ 'mr-2': index !== catesTags.tags.length - 1 }"
          :key="index">
          <Label class="px-2 py-1.5" @click="nav({ path: '/label/' + item.text, router })">
            {{ item.text }}
          </Label>
        </div>
      </div>
    </div>
    <div id="p-content" class="mt-8 fsz-1.1" v-html="essay?.content" v-hljs v-anchor v-mathjax />
    <div class="divider" />
    <div class="l-sec-color f-c-e fsz-0.8">
      <div class="f-c-c mr-4">
        <el-icon class="mr-1">
          <i-ep-clock />
        </el-icon>
        <span>{{ essay.date }}</span>
      </div>
      <div class="f-c-c mr-4">
        <el-icon class="mr-1">
          <i-ep-view />
        </el-icon>
        <span>{{ essay.view }}次阅读</span>
      </div>
      <div class="f-c-c">
        <el-icon class="mr-1">
          <i-ep-chat-line-square />
        </el-icon>
        <span>{{ essay.comm }}条评论</span>
      </div>
    </div>
    <div class="prev-next mt-10 fsz-0.9">
      <div class="prev hover f-c-s mb-2" v-if="prevNext.prev.href">
        <el-icon>
          <i-ep-d-arrow-left />
        </el-icon>
        <a class="hover l-pri-color" :href="prevNext.prev.href">
          上一篇：{{ prevNext.prev.text }}
        </a>
      </div>
      <div class="next hover f-c-s" v-if="prevNext.next.href">
        <el-icon>
          <i-ep-d-arrow-right />
        </el-icon>
        <a class="hover l-pri-color" :href="prevNext.next.href">
          下一篇：{{ prevNext.next.text }}
        </a>
      </div>
    </div>
    <div class="my-10 f-c-e">
      <div class="mr-5">
        <el-button plain @click="vote('Digg')">
          <span class="fsz-0.9"> 点赞 {{ essayVote.diggCount }} </span>
          <template #icon>
            <i-ep-caret-top />
          </template>
        </el-button>
      </div>
      <div>
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
  font-size: 1.5rem !important;
}

h2 {
  font-size: 1.4rem !important;
}

h3 {
  font-size: 1.3rem !important;
}

h4 {
  font-size: 1.2rem !important;
}

h5 {
  font-size: 1.1rem !important;
}

h6 {
  font-size: 1rem !important;
}

pre {
  border-radius: 6px;
  position: relative;

  code {
    background: var(--l-precode-bg) !important;

    &::-webkit-scrollbar {
      display: none;
      height: 0.4rem;
    }

    &:hover::-webkit-scrollbar {
      display: block;
    }

    &,
    span {
      --at-apply: fsz-1;
      font-family: Hack, monospace;
      @include font-space($spacing: 0.5px);
    }
  }
}

code {
  --at-apply: rd-2;
  background: var(--l-code-bg);
  color: var(--el-color-danger-light-3);
  padding: 0.15rem 0.4rem;
  margin: 0;
}

.cblock {
  --at-apply: fsz-0.8 absolute;
  padding: 4px;
  color: #767676;
  right: 4px;
  top: 0;
}

blockquote {
  --at-apply: rd-1 l-sec-color;
  margin: 0;
  background: var(--l-precode-bg);
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

#p-content {
  u {
    text-decoration: none;
    padding-bottom: 1px;
    border-bottom: 1px solid var(--l-pri-color);
  }

  a {
    padding-bottom: 1px;
    border-bottom: 1px dotted var(--l-pri-color);
    @include hover($border-color: bottom);
  }

  p {
    @include font-space($spacing: 1px !important, $line: 1.7 !important);
    margin: 0.7rem 0 !important;
  }

  ol,
  ul {
    li {
      @include font-space($spacing: 1px !important, $line: 1.7 !important);
    }

    li:last-child {
      margin-bottom: 0;
    }
  }

  table {
    --at-apply: fsz-1;
    padding: 10px;
    box-sizing: border-box;

    th {
      font-weight: 600 !important;
    }

    th,
    td {
      padding: 8px 13px;
      border-bottom: 1px solid var(--l-divider-bg);
    }

    th,
    tr:nth-child(odd) {
      background-color: var(--l-precode-bg);
    }

    tr:nth-child(even) {
      background-color: var(--l-code-bg);
    }
  }
}
</style>
