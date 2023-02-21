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
      <i-ep-clock class="mr-1" />
      {{ data.date }}
    </div>
    <div class="mr-3 f-c-c">
      <i-ep-view class="mr-1" />
      {{ data.view }}
    </div>
    <div class="mr-3 f-c-c">
      <i-ep-chat-line-square class="mr-1" />
      {{ data.comm }}
    </div>
    <div class="f-c-c">
      <i-ep-star class="mr-1" />
      {{ data.digg }}
    </div>
  </div>
</template>
