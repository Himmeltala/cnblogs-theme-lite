<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import * as API from "../utils/api";
import * as DataType from "../types/data-type";
import { ArrowRight } from "@element-plus/icons-vue";

const route = useRoute();
let id: any = route.params.id;

let essay = ref<DataType.Essay>();
let comments = ref<Array<DataType.Comment>>();
let tagsCategroies = ref<any>({ categories: {}, tags: {} });

// comments.value = [
//   {
//     layer: "#1楼",
//     date: "2022-11-29 14:47",
//     author: "Enziandom",
//     body: "这只是一个测试评论......",
//     digg: " 支持(0) ",
//     burry: " 反对(0) ",
//     avatar: " https://pic.cnblogs.com/face/2271881/20221121232108.png "
//   },
//   {
//     layer: "#2楼",
//     date: "2022-11-29 15:21",
//     author: "Enziandom",
//     body: "这只是一个测试评论......",
//     digg: " 支持(0) ",
//     burry: " 反对(0) ",
//     avatar: " https://pic.cnblogs.com/face/2271881/20221121232108.png "
//   }
// ];

API.getEssay(id, (str: DataType.Essay) => {
  essay.value = str;
  API.getCommList({ postId: id }, (str: Array<DataType.Essay>) => {
    comments.value = str;
    API.getEssayTagsAndCategories(666252, id, str => {
      tagsCategroies.value = str;
    });
  });
});

let comment = ref<DataType.Comment>({ postId: id, parentCommentId: 0 });

function setComm() {
  API.setComm(comment.value, res => {
    console.log(res);
  });
}

let fontSize = ref(16);

function zoomIn() {
  fontSize.value >= 18 ? (fontSize.value = 16) : fontSize.value++;
}
</script>

<template>
  <div class="essay">
    <Card padding="20px 20px">
      <div class="title">{{ essay?.title }}</div>
      <div class="info">
        <div class="date">
          <el-icon><Clock /></el-icon>
          <span>
            {{ essay?.date }}
          </span>
        </div>
        <div class="view-count">
          <el-icon><View /></el-icon>
          <span>{{ essay?.viewCount }}次阅读</span>
        </div>
        <div class="comm-count">
          <el-icon><ChatLineSquare /></el-icon>
          <span>{{ essay?.commCount }}条评论</span>
        </div>
        <div class="zoom-in" @click="zoomIn">
          <el-icon><ZoomIn /></el-icon>
          <span>放大</span>
        </div>
      </div>
      <!-- <el-breadcrumb class="breadcrumb" :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }">
        <div class="crumb">
          <el-icon><House /></el-icon>
          <span class="tip">首页</span>
        </div>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <div class="crumb">
          <el-icon><Tickets /></el-icon>
          <span class="tip">正文</span>
        </div>
      </el-breadcrumb-item>
    </el-breadcrumb> -->
      <div class="labels">
        <div class="categories">
          <div class="caption">分类：</div>
          <div class="item" v-for="(item, index) in tagsCategroies.categories" :key="index">
            <el-tag class="mx-1" effect="light" :color="item.color">
              <span>
                {{ item.text }}
              </span>
            </el-tag>
          </div>
        </div>
        <div class="tags">
          <div class="caption">标签：</div>
          <div class="item" v-for="(item, index) in tagsCategroies.tags" :key="index">
            <el-tag class="mx-1" effect="light" :color="item.color">
              <span>
                {{ item.text }}
              </span>
            </el-tag>
          </div>
        </div>
      </div>
      <div class="content" :style="{ 'font-size': fontSize + 'px' }" v-parse-code v-html="essay?.content"></div>
      <!-- 评论 -->
      <div class="comment">
        <el-input v-model="comment.body" />
        <el-button @click="setComm">发送评论</el-button>
      </div>
      <div class="comments">
        <div class="item" v-for="(item, index) in comments" :key="index">
          <div class="row-1">
            <el-image class="image" style="width: 45px; height: 45px" :src="item.avatar" fit="fill" />
            <div class="col-1">
              <div class="row-1-1">{{ item.author }}</div>
              <div class="row-1-2">
                <div class="layer">
                  {{ item.layer }}
                </div>
                <div class="date">{{ item.date }}</div>
              </div>
            </div>
          </div>
          <div class="row-2">
            <div class="body">{{ item.body }}</div>
            <div>
              <div class="digg">
                <el-icon><CaretTop /></el-icon>
                <span>{{ item.digg }}</span>
              </div>
              <div class="burry">
                <el-icon><CaretBottom /></el-icon>
                <span>{{ item.burry }}</span>
              </div>
            </div>
          </div>
        </div>
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
  font-size: 21px !important;
}

h2 {
  font-size: 19px !important;
}

h3 {
  font-size: 18px !important;
}

h4 {
  font-size: 17px !important;
}

h5 {
  font-size: 17px !important;
}

h6 {
  font-size: 17px !important;
}
</style>

<style scoped lang="scss">
@import "../scss/mixins.scss";

.essay {
  color: #a7a7a7;

  .labels {
    font-size: 14px;
    margin-top: 10px;

    .item {
      margin-right: 4px;
      span {
        color: #e7e7e7;
      }
    }

    .item:last-child {
      margin-left: 0;
    }

    .categories {
      margin-bottom: 4px;
    }

    .categories,
    .tags {
      @include flex($justify: flex-start);
    }
  }

  .title {
    word-break: break-all;
    font-size: 24px;
  }

  .info {
    margin-top: 10px;
    @include flex($justify: flex-start);
  }

  .breadcrumb {
    margin-top: 10px;
  }

  .date,
  .comm-count,
  .view-count {
    margin-right: 10px;
  }

  .zoom-in {
    cursor: pointer;
  }

  .view-count,
  .zoom-in,
  .crumb,
  .comm-count {
    font-size: 14px;
    @include flex();
  }

  .comments {
    .item {
      margin-bottom: 15px;
    }

    .item:last-child {
      margin-bottom: 0px;
    }

    .row-1 {
      font-size: 14px;
      @include flex($justify: flex-start);

      .row-1-2 {
        color: var(--el-text-color-placeholder);
        margin-top: 2px;
        font-size: 13px;
        @include flex($justify: flex-start);

        .layer {
          @include flex($justify: flex-start);
          margin-right: 10px;
        }
      }

      .image {
        margin-right: 10px;
        border-radius: 6px;
      }
    }

    .row-2 {
      margin-left: 55px;

      .body {
        font-size: 16px;
        margin: 4px 0;
      }

      & > div + div {
        font-size: 13px;
        @include flex($justify: flex-end);
      }

      .digg {
        margin-right: 6px;
      }

      .digg,
      .burry {
        @include flex();
      }
    }
  }
}
</style>
