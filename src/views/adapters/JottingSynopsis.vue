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
  <div class="f-c fsz-0.9 l-sec-color" :style="{ 'justify-content': align }">
    <div class="mr-3 f-c-c">
      <el-icon class="mr-1">
        <i-ep-clock />
      </el-icon>
      <span>{{ data.date }}</span>
    </div>
    <div class="mr-3 f-c-c">
      <el-icon class="mr-1">
        <i-ep-view />
      </el-icon>
      <span>{{ data.view }}</span>
    </div>
    <div class="mr-3 f-c-c">
      <el-icon class="mr-1">
        <i-ep-chat-line-square />
      </el-icon>
      <span>{{ data.comm }}</span>
    </div>
    <div class="f-c-c">
      <el-icon class="mr-1">
        <i-ep-star />
      </el-icon>
      <span> {{ data.digg }}</span>
    </div>
  </div>
</template>
