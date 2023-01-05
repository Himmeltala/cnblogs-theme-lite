<script setup lang="ts">
import { PropType } from "vue";
import { useRouter } from "vue-router";
import * as DataType from "@/types/data-type";

defineProps({
  loading: {
    type: Boolean,
    default: true
  },
  data: {
    type: Array as PropType<DataType.Essay[]>,
    required: true
  }
});

const router = useRouter();

function nav(path: string, out?: boolean) {
  if (out) window.open(path, "_blank");
  else router.push(path);
}
</script>

<template>
  <div class="essay">
    <Card class="item"
          v-if="!loading"
          width="auto"
          padding="15px 25px"
          v-for="(item, index) in data" :key="index"
    >
      <div class="header">
        <el-image v-if="index % 2 !== 0 && item.surface" class="cover" :src="item.surface" fit="cover" />
        <div class="header__middle" :class="{ 'nocover': !item.surface }">
          <div class="title" @click="nav('/e/' + item.id)">{{ item.text }}</div>
          <div class="desc">{{ item.desc }}</div>
        </div>
        <el-image v-if="index % 2 === 0 && item.surface" class="cover" :src="item.surface" fit="cover" />
      </div>
      <div class="browse">
        <el-icon>
          <i-ep-caret-right />
        </el-icon>
        <router-link :to="'/e/' + item.id">阅读全文</router-link>
      </div>
      <EssayBottom
        align="flex-end"
        :data="{date: item.date, comm: item.comm, digg: item.digg, view: item.view}"
      />
    </Card>
  </div>
</template>

<style scoped lang="scss">
.essay {
  .item:nth-child(1) {
    margin: 0 10px 12px 10px;
  }

  .item {
    padding: 15px 25px;
    margin: 12px 10px 12px 10px;

    .cover {
      border-radius: 6px;
      width: 25%;
      height: 150px;
    }

    .nocover {
      width: 100% !important;
    }

    .header {
      @include flex($justify: space-between);

      .header__middle {
        width: 73%;

        .title {
          cursor: pointer;
          font-size: 20px;
          letter-spacing: 1px;

          @include ahover();
        }

        .desc {
          color: #878787;
          padding: 10px 0 10px 0;
          font-size: 16px;
          letter-spacing: 0.6px;
        }

        .title,
        .desc {
          word-break: break-all;
          line-height: 1.4;
        }
      }

      .cover {
        border-radius: 6px;
        width: 25%;
        height: 160px;
      }
    }

    .browse {
      font-size: 14px;
      @include flex($justify: flex-start);
      margin: 15px 0 5px 0;

      a {
        margin-left: 3px;
        border-bottom: 1px dotted #cccccc;

        @include ahover() {
          border-bottom: 1px dotted var(--el-color-primary);
        }
      }

      .bottom {
        font-size: 14px;
        @include flex($justify: flex-end);
      }
    }
  }
}
</style>