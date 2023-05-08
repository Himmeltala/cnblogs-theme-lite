<script setup lang="ts">
import { WorksApi } from "@/apis";

LiteUtils.startLoading();

const route = useRoute();
let postId = route.params.id as string;
const works = shallowRef(await WorksApi.getWorks(postId));
const prevNext = shallowRef(await WorksApi.getPrevNext(postId));
const worksProps = shallowRef(await WorksApi.getProps(postId));
const viewPoint = shallowRef(await WorksApi.getViewPoint(postId));
const isLock = ref(false);
const pwd = ref("");
const localSetting = LiteUtils.getLocalSetting();

if (!(works.value.content && works.value.text)) isLock.value = true;
LiteUtils.setTitle(works.value.text);

onMounted(() => {
  const anchor = route.hash.match(/#.+/g);

  if (anchor) {
    setTimeout(() => {
      document.querySelector(`#${anchor[0].replace("#", "")}`).scrollIntoView();
    }, 500);
  }

  LiteUtils.endLoading();
});

async function submit() {
  const data = await WorksApi.isPassed(pwd.value, postId + "");
  if (data) {
    works.value = await WorksApi.getLockedWorks(pwd.value, postId);
    isLock.value = false;
  }
  ElMessage({ message: data ? "密码输入正确！" : "密码错误！", grouping: true, type: data ? "success" : "error" });
}

async function vote(voteType: BlogType.VoteType) {
  const data = await WorksApi.vote({ postId: parseInt(postId), isAbandoned: false, voteType });
  if (data) {
    if (data.isSuccess)
      if (voteType == "Bury") viewPoint.value.buryCount = viewPoint.value.buryCount + 1;
      else viewPoint.value.diggCount = viewPoint.value.diggCount + 1;
    ElMessage({ message: data.message, grouping: true, type: data.isSuccess ? "success" : "error" });
  }
}

watch(route, async () => {
  if (route.name === RouterConstants.Name.WORKS) {
    LiteUtils.startLoading();

    postId = `${route.params.id}`;
    works.value = await WorksApi.getWorks(postId);
    worksProps.value = await WorksApi.getProps(postId);
    prevNext.value = await WorksApi.getPrevNext(postId);
    viewPoint.value = await WorksApi.getViewPoint(postId);
    isLock.value = false;

    if (!(works.value.content && works.value.text)) isLock.value = true;
    LiteUtils.setTitle(works.value.text);
    LiteUtils.endLoading();
  }
});
</script>

<template>
  <ContextMenu id="l-works" class="min-height">
    <Card :padding="localSetting.pages.writing.padding" :margin="localSetting.pages.writing.margin">
      <template v-if="!isLock">
        <el-page-header :icon="null" @back="LiteUtils.Router.go({ path: 'back', router: $router })">
          <template #title>
            <div class="f-c-c">
              <i-ep-back />
            </div>
          </template>
          <template #content>
            <div class="l-size-6">{{ works.text }}</div>
          </template>
        </el-page-header>
        <div class="l-color-2 f-c-s mt-4 l-size-2">
          <div class="f-c-c mr-4">
            <i-ep-clock class="mr-1" />
            <span>{{ works.date }}</span>
          </div>
          <div class="f-c-c mr-4">
            <i-ep-view class="mr-1" />
            <span>{{ works.view }}次阅读</span>
          </div>
          <div class="f-c-c mr-4">
            <i-ep-chat-line-square class="mr-1" />
            <span>{{ works.comm }}条评论</span>
          </div>
          <div
            v-if="LiteConfig.isOwner"
            class="f-c-c hover"
            @click="LiteUtils.Router.go({ path: 'https://i.cnblogs.com/EditPosts.aspx?postid=' + postId })">
            <i-ep-edit-pen class="mr-1" />
            <span>编辑</span>
          </div>
        </div>
        <div class="l-color-2 mt-4">
          <div class="mb-4 flex-wrap f-c-s" v-if="worksProps.sorts.length > 0">
            <div class="f-c-c l-size-2">
              <i-ep-folder-opened class="mr-1" />
              <span>分类：</span>
            </div>
            <div v-for="(item, index) in worksProps.sorts" class="l-size-2" :class="{ 'mr-2': index !== worksProps.sorts.length - 1 }">
              <LTag
                line="dotted"
                hover
                round
                @click="LiteUtils.Router.go({ path: RouterConstants.Path.WORKS_BY_SORT(item.href), router: $router })">
                {{ item.text }}
              </LTag>
            </div>
          </div>
          <div class="f-c-s flex-wrap" v-if="worksProps.tags.length > 0">
            <div class="f-c-c l-size-2">
              <i-ep-price-tag class="mr-1" />
              <span>标签：</span>
            </div>
            <div v-for="(item, index) in worksProps.tags" class="l-size-2" :class="{ 'mr-2': index !== worksProps.tags.length - 1 }">
              <LTag
                line="dotted"
                hover
                round
                @click="LiteUtils.Router.go({ path: RouterConstants.Path.WORKS_BY_MARK(item.text), router: $router })">
                {{ item.text }}
              </LTag>
            </div>
          </div>
        </div>
        <div
          class="content mt-8 l-size-3"
          v-html="works.content"
          v-hljs="works.text"
          v-highslide="works.text"
          v-mathjax="works.text"
          v-catalog></div>
        <Highslide />
        <div class="divider flex-col"></div>
        <div class="l-color-2 f-c-e l-size-2">
          <div class="f-c-c mr-4">
            <i-ep-clock class="mr-1" />
            <span>{{ works.date }}</span>
          </div>
          <div class="f-c-c mr-4">
            <i-ep-view class="mr-1" />
            <span>{{ works.view }}次阅读</span>
          </div>
          <div class="f-c-c">
            <i-ep-chat-line-square class="mr-1" />
            <span>{{ works.comm }}条评论</span>
          </div>
        </div>
        <div class="mt-10 l-size-2">
          <div class="prev hover f-c-s mb-2" v-if="prevNext.prev.href">
            <i-ep-d-arrow-left />
            <a class="hover l-color-1" :href="prevNext.prev.href"> 上一篇：{{ prevNext.prev.text }} </a>
          </div>
          <div class="next hover f-c-s" v-if="prevNext.next.href">
            <i-ep-d-arrow-right />
            <a class="hover l-color-1" :href="prevNext.next.href"> 下一篇：{{ prevNext.next.text }} </a>
          </div>
        </div>
        <div class="my-10 f-c-e">
          <div class="mr-5">
            <el-button plain @click="vote('Digg')">
              点赞 {{ viewPoint.diggCount }}
              <template #icon>
                <i-ep-caret-top />
              </template>
            </el-button>
          </div>
          <div>
            <el-button plain @click="vote('Bury')">
              反对 {{ viewPoint.buryCount }}
              <template #icon>
                <i-ep-caret-bottom />
              </template>
            </el-button>
          </div>
        </div>
        <Comment :post-id="postId" />
      </template>
      <template v-else>
        <div class="modal fixed w-100vw h-100vh top-0 left-0 l-box-bg f-c-c z-9999">
          <el-form>
            <el-form-item label="密码：">
              <el-input show-password type="password" v-model="pwd" placeholder="输入博文阅读密码" />
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="primary" @click="submit">确定</el-button>
            </el-form-item>
          </el-form>
        </div>
      </template>
    </Card>
    <Catalog />
    <template #title>盒子模型设置</template>
    <template #content>
      <CodeStyleSetting />
      <BoxSetting :padding="localSetting.pages.writing.padding" :margin="localSetting.pages.writing.margin" />
    </template>
  </ContextMenu>
</template>

<style lang="scss">
code {
  margin: 0;
  --uno: rd-2 l-size-3;
  letter-spacing: 1.2px;
  color: var(--el-color-danger-light-3);
  font-family: var(--l-code-font-family);

  span {
    line-height: 1.6;
    font-family: var(--l-code-font-family);
  }
}

pre {
  --uno: rd-2;
  position: relative;

  .code-tools {
    position: absolute;
    top: 0.2rem;
    right: 0.2rem;
  }

  .modal {
    width: 100%;
    height: 3rem;
    position: absolute;
    bottom: 0;
    left: 0;
    background-image: linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, var(--l-code-hidden) 100%);
  }
}

a > code {
  color: var(--l-theme-color) !important;
}

#l-works {
  .content {
    z-index: 9;

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
      background-color: var(--l-blockquote-bg);
      color: var(--l-color-2);
      margin: 0;
      border: {
        radius: 0.25rem;
        left: {
          width: 0.3rem;
          color: var(--l-theme-color);
          style: solid;
        }
      }
      padding: {
        top: 0.8rem;
        bottom: 0.8rem;
      }

      p {
        margin: 0 !important;
        padding-left: 0.5rem;
      }
    }

    u {
      text-decoration: none;
      padding-bottom: 1px;
      border-bottom: 1px dotted var(--l-color-1);
    }

    a {
      color: var(--l-theme-color);
    }

    p {
      line-height: 1.7;
    }

    img {
      cursor: zoom-in;
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
        border: 1px dotted #464646;
        border-radius: 0.5rem;
      }
    }

    strong {
      font-weight: 600;
    }
  }
}
</style>
