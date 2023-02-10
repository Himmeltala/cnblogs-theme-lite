<script setup lang="ts">
import { PropType } from "vue";
import { CustType } from "@/types/data-type";
import { nav } from "@/helpers/route-helper";

defineProps({
  data: {
    type: Array as PropType<CustType.Jotting[]>,
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
        class="cover h-35 rd-2"
        :src="item.surface"
        fit="cover" />
      <div :class="{ 'w-100%': !item.surface, 'has-cover w-60%': item.surface }">
        <div
          class="hover mb-5 fsz-1.3 cursor-pointer"
          @click="nav({ path: '/p/' + item.id, router })">
          {{ item.text }}
        </div>
        <div class="l-thr-color" :class="{ 'mb-5': !item.surface }">{{ item.desc }}</div>
      </div>
      <el-image
        v-if="index % 2 === 0 && item.surface"
        class="cover h-35 rd-2"
        :src="item.surface"
        fit="cover" />
    </div>
    <div class="f-c-s mb-5 fsz-0.9">
      <el-icon>
        <i-ep-caret-right />
      </el-icon>
      <router-link class="hover l-pri-color ml-0.5 b-b-1 b-b-dotted p-b-0.3" :to="'/p/' + item.id">
        阅读全文
      </router-link>
    </div>
    <EssaySynopsis
      :align="'flex-end'"
      :data="{ date: item.date, comm: item.comm, digg: item.digg, view: item.view }" />
  </Card>
</template>

<style scoped lang="scss">
@include pc() {
  .cover {
    --at-apply: w-26%;
  }

  .has-cover {
    --at-apply: w-72%;
  }
}

@include mb() {
  .cover {
    --at-apply: w-38%;
  }

  .has-cover {
    --at-apply: w-60%;
  }
}
</style>
