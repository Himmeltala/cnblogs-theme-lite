<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ref, watch } from "vue";

const router = useRouter();
const route = useRoute();
let categoryId = ref<string>();
let categoryPage = ref<string>();

categoryId.value = route.params.id as string;
categoryPage.value = route.params.page as string;

watch(route, () => {
  categoryId.value = route.params.id as string;
  categoryPage.value = route.params.page as string;
});
</script>

<template>
  <div class="category">
    <Common :type="'Category'" :category-id="categoryId" :category-page="categoryPage" />
  </div>
</template>

<style scoped lang="scss">
</style>