<script setup lang="ts">
import { PropType } from "vue";

defineProps({
  data: {
    type: Object as PropType<{
      date: string;
      view: string;
      comm: string;
      digg: string;
    }>,
    required: true
  },
  align: {
    type: String as PropType<"flex-start" | "flex-end">,
    default: "flex-start"
  }
});
</script>

<template>
  <div class="flex content-center items-center fsz-0.9 color-#989898 break-all" :style="{ 'justify-content': align }">
    <div class="mr-2.5 flex content-center items-center justify-between">
      <el-icon class="mr-1">
        <i-ep-clock />
      </el-icon>
      <span>{{ data.date }}</span>
    </div>
    <div class="mr-2.5 flex content-center items-center justify-between">
      <el-icon class="mr-1">
        <i-ep-view />
      </el-icon>
      <span>{{ data.view }}</span>
    </div>
    <div class="mr-2.5 flex content-center items-center justify-between">
      <el-icon class="mr-1">
        <i-ep-chat-line-square />
      </el-icon>
      <span>{{ data.comm }}</span>
    </div>
    <div class="flex content-center items-center justify-between">
      <el-icon class="mr-1">
        <i-ep-star />
      </el-icon>
      <span> {{ data.digg }}</span>
    </div>
  </div>
</template>
