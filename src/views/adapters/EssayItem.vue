<script setup lang="ts">
import { PropType } from "vue";
import { CustType } from "@/types/data-type";
import { nav } from "@/helpers/route-helper";

defineProps({
  data: {
    type: Array as PropType<CustType.Essay[]>,
    required: true
  }
});

const router = useRouter();
</script>

<template>
  <Card
    class="pb-4"
    :class="{ 'mb-6': index !== data.length - 1 }"
    v-for="(item, index) in data"
    :index="index"
    :length="data.length"
    :key="index">
    <div class="f-c-b" :class="{ 'mb-5': item.surface }">
      <el-image
        v-if="index % 2 !== 0 && item.surface"
        class="h-35 rd-2 wd-25"
        :src="item.surface"
        fit="cover" />
      <div :class="{ 'wd-100': !item.surface, 'wd-73': item.surface }">
        <div class="hover mb-5 fsz-1.3 cursor-pointer" @click="nav('/e/' + item.id, router)">
          {{ item.text }}
        </div>
        <div class="thr-color" :class="{ 'mb-5': !item.surface }">{{ item.desc }}</div>
      </div>
      <el-image
        v-if="index % 2 === 0 && item.surface"
        class="h-35 rd-2 wd-25"
        :src="item.surface"
        fit="cover" />
    </div>
    <div class="f-c-s mb-5 fsz-0.9">
      <el-icon>
        <i-ep-caret-right />
      </el-icon>
      <router-link class="hover pri-color ml-0.5 b-b-1 b-b-dotted p-b-0.3" :to="'/e/' + item.id">
        阅读全文
      </router-link>
    </div>
    <EssaySynopsis
      :align="'flex-end'"
      :data="{ date: item.date, comm: item.comm, digg: item.digg, view: item.view }" />
  </Card>
</template>
