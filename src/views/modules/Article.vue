<script setup lang="ts">
import { BlogType } from "@/types/data-type";
import { isOwner, blogApp } from "@/lite.config";
import { endLoading, startLoading, getSetting, nav } from "@/utils/common";
import { getLockedArticle, getIsUnlock, getArticle, getArticleProps, getPrevNext, getArticleVote, voteArticle } from "@/apis/remote-api";

startLoading();

const route = useRoute();
const router = useRouter();
const postId = `${route.params.id}`;
const article = ref(await getArticle(postId));
const isLocked = ref(false);
const props = await getArticleProps(postId);
const prevNext = await getPrevNext(postId);
const viewpoint = ref(await getArticleVote(postId));
const password = ref("");
const setting = getSetting();

if (!(article.value.content && article.value.text)) isLocked.value = true;

document.querySelector("title").innerText = `${article.value.text} - ${blogApp} - 博客园`;

endLoading();

async function submit() {
  const data = await getIsUnlock(password.value, postId + "");
  if (data) {
    article.value = await getLockedArticle(password.value, postId);
    isLocked.value = false;
  }
  ElMessage({
    message: data ? "密码输入正确！" : "密码错误！",
    grouping: true,
    type: data ? "success" : "error"
  });
}

async function vote(voteType: BlogType.VoteType) {
  const data = await voteArticle({ postId, isAbandoned: false, voteType });
  if (data) {
    if (data.isSuccess)
      if (voteType == "Bury") viewpoint.value.buryCount = viewpoint.value.buryCount + 1;
      else viewpoint.value.diggCount = viewpoint.value.diggCount + 1;
    ElMessage({
      message: data.message,
      grouping: true,
      type: data.isSuccess ? "success" : "error"
    });
  }
}
</script>

<template>
  <ContextMenu id="l-article" class="min-height">
    <Card :padding="setting.pages.article.padding" :margin="setting.pages.article.margin">
      <template v-if="!isLocked">
        <el-page-header :icon="null" @back="nav({ path: 'back', router })">
          <template #title>
            <div class="f-c-c">
              <i-ep-back />
            </div>
          </template>
          <template #content>
            <div class="l-pri-size">{{ article.text }}</div>
          </template>
        </el-page-header>
        <div class="l-article__tdesc l-sec-color f-c-s mt-4 l-fiv-size">
          <div class="f-c-c mr-4">
            <i-ep-clock class="mr-1" />
            <span>{{ article.date }}</span>
          </div>
          <div class="f-c-c mr-4">
            <i-ep-view class="mr-1" />
            <span>{{ article.view }}次阅读</span>
          </div>
          <div class="f-c-c mr-4">
            <i-ep-chat-line-square class="mr-1" />
            <span>{{ article.comm }}条评论</span>
          </div>
          <div v-if="isOwner" class="f-c-c hover" @click="nav({ path: 'https://i.cnblogs.com/EditPosts.aspx?postid=' + postId })">
            <i-ep-edit-pen class="mr-1" />
            <span>编辑</span>
          </div>
        </div>
        <div class="l-article__props l-sec-color mt-4">
          <div class="mb-4 flex-wrap f-c-s" v-if="props.sorts.length > 0">
            <div class="f-c-c l-fiv-size">
              <i-ep-folder-opened class="mr-1" />
              <span>分类：</span>
            </div>
            <div v-for="(item, index) in props.sorts" class="l-fiv-size" :class="{ 'mr-2': index !== props.sorts.length - 1 }" :key="index">
              <LTag line="dotted" hover round @click="nav({ path: '/sort/' + item.href, router })">
                {{ item.text }}
              </LTag>
            </div>
          </div>
          <div class="f-c-s flex-wrap" v-if="props.tags.length > 0">
            <div class="f-c-c l-fiv-size">
              <i-ep-price-tag class="mr-1" />
              <span>标签：</span>
            </div>
            <div v-for="(item, index) in props.tags" class="l-fiv-size" :class="{ 'mr-2': index !== props.tags.length - 1 }" :key="index">
              <LTag line="dotted" hover round @click="nav({ path: '/label/' + item.text, router })">
                {{ item.text }}
              </LTag>
            </div>
          </div>
        </div>
        <div class="l-article__content mt-8 l-thr-size" v-html="article.content" v-hljs v-catalog v-mathjax></div>
        <div class="divider"></div>
        <div class="l-article__bdesc l-sec-color f-c-e l-fiv-size">
          <div class="f-c-c mr-4">
            <i-ep-clock class="mr-1" />
            <span>{{ article.date }}</span>
          </div>
          <div class="f-c-c mr-4">
            <i-ep-view class="mr-1" />
            <span>{{ article.view }}次阅读</span>
          </div>
          <div class="f-c-c">
            <i-ep-chat-line-square class="mr-1" />
            <span>{{ article.comm }}条评论</span>
          </div>
        </div>
        <div class="l-article__prev-next mt-10 l-fiv-size">
          <div class="prev hover f-c-s mb-2" v-if="prevNext.prev.href">
            <i-ep-d-arrow-left />
            <a class="hover l-pri-color" :href="prevNext.prev.href"> 上一篇：{{ prevNext.prev.text }} </a>
          </div>
          <div class="next hover f-c-s" v-if="prevNext.next.href">
            <i-ep-d-arrow-right />
            <a class="hover l-pri-color" :href="prevNext.next.href"> 下一篇：{{ prevNext.next.text }} </a>
          </div>
        </div>
        <div class="l-article__viewpoint my-10 f-c-e">
          <div class="mr-5">
            <el-button plain @click="vote('Digg')">
              点赞 {{ viewpoint.diggCount }}
              <template #icon>
                <i-ep-caret-top />
              </template>
            </el-button>
          </div>
          <div>
            <el-button plain @click="vote('Bury')">
              反对 {{ viewpoint.buryCount }}
              <template #icon>
                <i-ep-caret-bottom />
              </template>
            </el-button>
          </div>
        </div>
        <Comment :post-id="postId" />
      </template>
      <template v-else class="modal fixed w-100vw h-100vh top-0 left-0 l-box-bg f-c-c z-9999">
        <el-form>
          <el-form-item label="密码：">
            <el-input show-password type="password" v-model="password" placeholder="输入博文阅读密码" />
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="submit">确定</el-button>
          </el-form-item>
        </el-form>
      </template>
    </Card>
    <template #title>随笔页样式设置</template>
    <template #content>
      <CodeStyleSetting />
      <BoxSetting :padding="setting.pages.article.padding" :margin="setting.pages.article.margin" />
    </template>
  </ContextMenu>
</template>

<style lang="scss">
code {
  --at-apply: rd-2;
  background: var(--l-code-bg);
  color: var(--el-color-danger-light-3);
  padding: 0.15rem 0.4rem;
  margin: 0;
}

pre {
  --at-apply: rd-2;
  position: relative;

  .cblock {
    position: absolute;
    font-size: var(--l-fiv-size);
    color: #767676;
    padding: 4px;
    right: 0;
    top: 0;
  }

  .hight-code {
    height: 380px;
  }

  .hight-code-modal {
    width: 100%;
    height: 3rem;
    position: absolute;
    bottom: 0;
    left: 0;
    background-image: linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, var(--l-code-hidden) 100%);
  }

  .remove-hight-code-modal {
    display: none;
  }
}

#l-article {
  .l-article__content {
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

    blockquote {
      --at-apply: rd-1;
      color: var(--l-sec-color);
      background: var(--l-precode-bg);
      margin: 0;
      padding: {
        left: 0.5rem;
        top: 0.1rem;
        bottom: 0.1rem;
      }
      border: {
        left: {
          width: 0.3rem;
          color: var(--l-theme-color);
          style: solid;
        }
      }
    }

    u {
      text-decoration: none;
      padding-bottom: 1px;
      border-bottom: 1px dotted var(--l-pri-color);
    }

    a {
      color: var(--l-theme-color);
    }

    p {
      line-height: 1.7;
      margin: 0.7rem 0 !important;
    }

    ol,
    ul {
      li {
        line-height: 1.7;
      }

      li:last-child {
        margin-bottom: 0;
      }
    }

    table {
      th {
        font-weight: 600;
      }

      th,
      td {
        padding: 0.7rem 1.5rem;
        border: 1px dotted var(--l-divider-bg);
        border-radius: 0.5rem;
      }
    }

    strong {
      font-weight: 600;
    }
  }
}
</style>
