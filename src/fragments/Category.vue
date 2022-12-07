<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { watch } from "vue";
import { $ref } from "vue/macros";

const router = useRouter();
const route = useRoute();
let id = $ref<string>();
let page = $ref<string>();

id = route.params.id as string;
page = route.params.page as string;

watch(route, () => {
  id = route.params.id as string;
  page = route.params.page as string;
});
</script>

<template>
  <div class="category">
    <Common :type="'Category'" :id="id" :page="page" />
  </div>
</template>

<style scoped lang="scss">
</style>