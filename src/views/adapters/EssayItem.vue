<script setup lang="ts">
import { PropType } from "vue";
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
  <Card
    class="item p-4.5 mx-1.3"
    :class="{ 'mb-2.8': index !== data.length - 1 }"
    width="auto"
    v-if="!loading"
    v-for="(item, index) in data"
    :key="index">
    <div class="header flex content-center items-center justify-between">
      <el-image v-if="index % 2 !== 0 && item.surface" class="surface hrm-9 b-rd-3 wpe-25" :src="item.surface" fit="cover" />
      <div :class="{ 'wpe-100': !item.surface, 'wpe-73': item.surface }">
        <div class="headline hover fs-20 leh-1.4 lts-1 cursor-pointer break-all" @click="nav('/e/' + item.id)">
          {{ item.text }}
        </div>
        <div class="description c-#878787 py-2.8 leh-1.4 lts-0.6 break-all">{{ item.desc }}</div>
      </div>
      <el-image v-if="index % 2 === 0 && item.surface" class="surface hrm-9 b-rd-3 wpe-25" :src="item.surface" fit="cover" />
    </div>
    <div class="read flex content-center items-center justify-start mt-2.5 mb-2 fs-14">
      <el-icon>
        <i-ep-caret-right />
      </el-icon>
      <router-link class="hover m-l-0.5 b-b-1 b-b-dotted b-b-#cccccc" :to="'/e/' + item.id">阅读全文</router-link>
    </div>
    <EssayBottom align="flex-end" :data="{ date: item.date, comm: item.comm, digg: item.digg, view: item.view }" />
  </Card>
</template>
