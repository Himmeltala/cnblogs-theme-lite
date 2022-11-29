<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import * as API from "../utils/api";
import * as DataType from "../types/data-type";

const route = useRoute();
let id: any = route.params.id;

let essay = ref<DataType.Essay>();
let comments = ref<Array<DataType.Comment>>();

comments.value = [
  {
    layer: "#1楼",
    date: "2022-11-29 14:47",
    author: "Enziandom",
    body: "这只是一个测试评论......",
    digg: " 支持(0) ",
    burry: " 反对(0) ",
    avatar: " https://pic.cnblogs.com/face/2271881/20221121232108.png "
  },
  {
    layer: "#2楼",
    date: "2022-11-29 15:21",
    author: "Enziandom",
    body: "这只是一个测试评论......",
    digg: " 支持(0) ",
    burry: " 反对(0) ",
    avatar: " https://pic.cnblogs.com/face/2271881/20221121232108.png "
  },
  {
    layer: "#3楼",
    date: "2022-11-29 15:25",
    author: "Enziandom",
    body: "这只是一个评论",
    digg: " 支持(0) ",
    burry: " 反对(0) ",
    avatar: " https://pic.cnblogs.com/face/2271881/20221121232108.png "
  },
  {
    layer: "#4楼",
    date: "2022-11-29 15:37",
    author: "Enziandom",
    body: "1",
    digg: " 支持(0) ",
    burry: " 反对(0) ",
    avatar: " https://pic.cnblogs.com/face/2271881/20221121232108.png "
  },
  {
    layer: "#5楼",
    date: "2022-11-29 15:45",
    author: "Enziandom",
    body: "123",
    digg: " 支持(0) ",
    burry: " 反对(0) ",
    avatar: " https://pic.cnblogs.com/face/2271881/20221121232108.png "
  },
  {
    layer: "#6楼",
    date: "2022-11-29 15:45",
    author: "Enziandom",
    body: "123333",
    digg: " 支持(0) ",
    burry: " 反对(0) ",
    avatar: " https://pic.cnblogs.com/face/2271881/20221121232108.png "
  },
  {
    layer: "#7楼",
    date: "2022-11-29 15:46",
    author: "Enziandom",
    body: "测试评论哦！！！",
    digg: " 支持(0) ",
    burry: " 反对(0) ",
    avatar: " https://pic.cnblogs.com/face/2271881/20221121232108.png "
  },
  {
    layer: "#8楼",
    date: "2022-11-29 16:22",
    author: "Enziandom",
    body: "1111",
    digg: " 支持(0) ",
    burry: " 反对(0) ",
    avatar: " https://pic.cnblogs.com/face/2271881/20221121232108.png "
  },
  {
    layer: "#9楼",
    date: "2022-11-29 16:22",
    author: "Enziandom",
    body: "1111111",
    digg: " 支持(0) ",
    burry: " 反对(0) ",
    avatar: " https://pic.cnblogs.com/face/2271881/20221121232108.png "
  },
  {
    layer: "#10楼",
    date: "2022-11-29 16:22",
    author: "Enziandom",
    body: "1111",
    digg: " 支持(0) ",
    burry: " 反对(0) ",
    avatar: " https://pic.cnblogs.com/face/2271881/20221121232108.png "
  },
  {
    layer: "#11楼",
    date: "2022-11-29 16:22",
    author: "Enziandom",
    body: "11111",
    digg: " 支持(0) ",
    burry: " 反对(0) ",
    avatar: " https://pic.cnblogs.com/face/2271881/20221121232108.png "
  },
  {
    layer: "#12楼",
    date: "2022-11-29 16:22",
    author: "Enziandom",
    body: "1111111",
    digg: " 支持(0) ",
    burry: " 反对(0) ",
    avatar: " https://pic.cnblogs.com/face/2271881/20221121232108.png "
  },
  {
    layer: "#13楼",
    date: "2022-11-29 16:22",
    author: "Enziandom",
    body: "3333333333",
    digg: " 支持(0) ",
    burry: " 反对(0) ",
    avatar: " https://pic.cnblogs.com/face/2271881/20221121232108.png "
  }
];

API.getEssay(id, (str: DataType.Essay) => {
  essay.value = str;
  API.getCommList({ postId: id }, (str: Array<DataType.Essay>) => {
    // comments.value = str;
  });
});

let comment = ref<DataType.Comment>({ postId: id, parentCommentId: 0 });

function setComm() {
  API.setComm(comment.value, res => {
    console.log(res);
  });
}
</script>

<template>
  <div class="essay">
    <div class="title">{{ essay?.title }}</div>
    <div class="content" v-html="essay?.content"></div>
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
  </div>
</template>

<style scoped lang="scss">
@import "../scss/mixins.scss";

.essay {
  color: #a7a7a7;

  .title {
    font-size: 23px;
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
        margin-top: 2px;
        font-size: 12px;
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
