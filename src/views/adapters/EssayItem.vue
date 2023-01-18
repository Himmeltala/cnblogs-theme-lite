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
  <Card v-for="(item, index) in data" :index="index" :length="data.length" :key="index">
    <div class="header flex content-center items-center justify-between">
      <el-image
        v-if="index % 2 !== 0 && item.surface"
        class="surface h-9 rd-3 wd-25"
        :src="item.surface"
        fit="cover" />
      <div :class="{ 'wd-100': !item.surface, 'wd-73': item.surface }">
        <div
          class="headline hover mb-5 fsz-1.3 leh-1.4 lts-0.1 cursor-pointer break-all"
          @click="nav('/e/' + item.id, router)">
          {{ item.text }}
        </div>
        <div class="description c-#878787 mb-5 leh-1.4 lts-0.1 break-all">{{ item.desc }}</div>
      </div>
      <el-image
        v-if="index % 2 === 0 && item.surface"
        class="surface hr-9 rd-3 wd-25"
        :src="item.surface"
        fit="cover" />
    </div>
    <div class="read flex content-center items-center justify-start mb-5 fsz-0.9">
      <el-icon>
        <i-ep-caret-right />
      </el-icon>
      <router-link
        class="hover color-#a7a7a7 ml-0.5 b-b-1 b-b-dotted b-b-#cccccc"
        :to="'/e/' + item.id">
        阅读全文
      </router-link>
    </div>
    <EssaySynopsis
      :align="'flex-end'"
      :data="{ date: item.date, comm: item.comm, digg: item.digg, view: item.view }" />
  </Card>
</template>
