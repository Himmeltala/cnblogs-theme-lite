<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ref, watch } from "vue";

const router = useRouter();
const route = useRoute();
let id = ref<string>();
let page = ref<string>();

id.value = route.params.id as string;
page.value = route.params.page as string;

watch(route, () => {
  id.value = route.params.id as string;
  page.value = route.params.page as string;
});
</script>

<template>
  <div class="category">
    <Common :type="'Category'" :id="id" :page="page" />
  </div>
</template>

<style scoped lang="scss">
</style>