<script setup lang="ts">
import { getEssay, getEssayTagsAndCategories, getPrevNext, getEssayVote, voteEssay } from "@/utils/api";
import { VoteType } from "@/types/data-type";
import { nav } from "@/utils/route-helper";
import { closeLoader } from "@/utils/loader";
import { __LITE_CONFIG__ } from "@/lite.config";

const route = useRoute();
const router = useRouter();
const postId = parseInt(String(route.params.id));

const essay = await getEssay(postId);
const tagscatoies = await getEssayTagsAndCategories(postId);
const prevNext = await getPrevNext(postId);
const essayVote = ref(await getEssayVote(postId));

closeLoader();

async function vote(voteType: VoteType) {
  const data = await voteEssay({ postId, isAbandoned: false, voteType });
  if (data) {
    if (data.isSuccess)
      if (voteType == "Bury") essayVote.value.buryCount = essayVote.value.buryCount + 1;
      else essayVote.value.diggCount = essayVote.value.diggCount + 1;
    ElMessage({ message: data.message, grouping: true, type: data.isSuccess ? "success" : "error" });
  }
}
</script>

<template>
  <div id="essay" class="color-#a7a7a7">
    <Card class="relative">
      <div>
        <el-page-header @back="nav('/', router)">
          <template #icon>
            <i-ep-arrow-left />
          </template>
          <template #content>
            <div class="leh-1.4 color-#a7a7a7 fsz-1.4 break-all">{{ essay.text }}</div>
          </template>
        </el-page-header>
        <div class="color-#878787 flex justify-start items-center content-center mt-4 fsz-0.9">
          <div class="flex justify-center items-center content-center mr-3">
            <el-icon class="mr-0.9">
              <i-ep-clock />
            </el-icon>
            <span>{{ essay.date }}</span>
          </div>
          <div class="flex justify-center items-center content-center mr-3">
            <el-icon class="mr-0.9">
              <i-ep-view />
            </el-icon>
            <span>{{ essay.view }}次阅读</span>
          </div>
          <div class="flex justify-center items-center content-center mr-3">
            <el-icon class="mr-0.9">
              <i-ep-chat-line-square />
            </el-icon>
            <span>{{ essay.comm }}条评论</span>
          </div>
          <div
            class="flex justify-center items-center content-center hover"
            v-if="__LITE_CONFIG__.isBlogOwner"
            @click="nav('https://i.cnblogs.com/EditPosts.aspx?postid=' + postId)">
            <el-icon class="mr-0.9">
              <i-ep-edit-pen />
            </el-icon>
            <span>编辑</span>
          </div>
        </div>
        <div class="color-#878787 mt-4 fsz-0.9">
          <div class="mb-1 flex justify-start items-center content-center" v-if="tagscatoies.categories.length > 0">
            <div class="flex justify-center items-center content-center">
              <el-icon class="mr-0.9">
                <i-ep-folder-opened />
              </el-icon>
              <span>分类：</span>
            </div>
            <div
              :class="{ 'mr-2': index !== tagscatoies.categories.length - 1 }"
              v-for="(item, index) in tagscatoies.categories"
              :key="index">
              <Tag @click="nav('/c/' + item.href, router)">
                {{ item.text }}
              </Tag>
            </div>
          </div>
          <div class="mb-1 flex justify-start items-center content-center" v-if="tagscatoies.tags.length > 0">
            <div class="flex justify-center items-center content-center">
              <el-icon class="mr-0.9">
                <i-ep-price-tag />
              </el-icon>
              <span>标签：</span>
            </div>
            <div
              :class="{ 'mr-2': index !== tagscatoies.tags.length - 1 }"
              v-for="(item, index) in tagscatoies.tags"
              :key="index">
              <Tag @click="nav('/t/' + item.text, router)">
                {{ item.text }}
              </Tag>
            </div>
          </div>
        </div>
        <div id="e-content" class="mt-4" v-parse-code="true" v-html="essay?.content" />
        <div class="divider"></div>
        <div class="color-#878787 flex justify-end items-center content-center fsz-0.9">
          <div class="flex justify-center items-center content-center mr-2">
            <el-icon class="mr-0.9">
              <i-ep-clock />
            </el-icon>
            <span>{{ essay.date }}</span>
          </div>
          <div class="flex justify-center items-center content-center mr-2">
            <el-icon class="mr-0.9">
              <i-ep-view />
            </el-icon>
            <span>{{ essay.view }}次阅读</span>
          </div>
          <div class="flex justify-center items-center content-center">
            <el-icon class="mr-0.9">
              <i-ep-chat-line-square />
            </el-icon>
            <span>{{ essay.comm }}条评论</span>
          </div>
        </div>
        <div class="prev-next fsz-0.9 mt-10">
          <div class="prev hover mb-2 flex justify-start items-center content-center" v-if="prevNext?.prev?.href">
            <el-icon>
              <i-ep-d-arrow-left />
            </el-icon>
            <a class="hover color-#a7a7a7" :href="prevNext.prev.href">上一篇：{{ prevNext.prev.text }}</a>
          </div>
          <div class="next hover flex justify-start items-center content-center" v-if="prevNext?.next?.href">
            <el-icon>
              <i-ep-d-arrow-right />
            </el-icon>
            <a class="hover color-#a7a7a7" :href="prevNext.next.href">下一篇：{{ prevNext.next.text }}</a>
          </div>
        </div>
        <div class="my-10 flex justify-end items-center content-center">
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
    </Card>
  </div>
</template>

<style lang="scss">
h1,
h2,
h3 {
  font-weight: 400 !important;
}

h1 {
  font-size: 1.3rem !important;
}

h2 {
  font-size: 1.2rem !important;
}

h3 {
  font-size: 1.1rem !important;
}

h4 {
  font-size: 1rem !important;
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
    --at-apply: fsz-0.95 box-border break-all rd-2;
    font-family: Consolas, Monaco, Andale Mono, Ubuntu Mono, monospace !important;
    font-weight: 300;
    margin: 0 !important;
    background-color: #2b2b2b !important;

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
      line-height: 1.3;
      letter-spacing: 0.7px;
      word-break: break-all;
    }
  }
}

code {
  --at-apply: fsz-0.9 box-border break-all rd-2;
  font-family: Consolas, Monaco, Andale Mono, Ubuntu Mono, monospace !important;
  font-weight: 300;
  background: #2e2e2e;
  color: var(--el-color-danger-light-3);
  padding: 0.15rem 0.4rem;
  margin: 0 0.4rem;
}

.cblock {
  --at-apply: fsz-0.8 absolute;
  box-sizing: border-box;
  padding: 4px;
  color: #6d6d6d;
  font-weight: 400;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial,
    sans-serif !important;
  right: 4px;
  top: 0;
}

#e-content {
  --at-apply: fsz-1;

  img {
    border-radius: 6px;
    max-width: 100%;
    object-fit: cover;
  }

  @mixin font() {
    word-break: break-all;
    @include font-space();
    @content;
  }

  a {
    color: #a7a7a7;
    padding-bottom: 1px;
    border-bottom: 1px dotted #a7a7a7;

    @include hover() {
      border-bottom-color: var(--el-color-primary);
    }
  }

  p {
    margin: 8px 0 !important;
    @include font();
  }

  ol,
  ul {
    li {
      @include font();
    }

    li:last-child {
      margin-bottom: 0;
    }
  }

  table {
    padding: 10px;
    box-sizing: border-box;

    th,
    td {
      padding: 8px 13px;
      border-bottom: 1px solid var(--el-border-color-lighter);
    }

    tbody {
      tr:nth-child(even) {
        background-color: #2b2b2b;
      }
    }
  }
}
</style>
