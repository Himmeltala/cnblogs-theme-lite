<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { getEssay } from "../utils/api";

const route = useRoute();

let id: any = route.params.id;
let essay = ref<{
  title: "";
  content: "";
}>();

getEssay(id, (str: any) => {
  console.log(str);

  essay.value = str;
});
</script>

<template>
  <div class="essay">
    <div class="title">{{ essay?.title }}</div>
    <div class="content" v-html="essay?.content"></div>
  </div>
</template>

<style scoped lang="scss">
.essay {
  color: #a7a7a7;
}
</style>
