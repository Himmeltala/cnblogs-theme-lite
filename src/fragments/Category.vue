<script setup lang="ts">
import { useRoute, useRouter } from "_vue-router@4.1.6@vue-router";

const router = useRouter();
const route = useRoute();

let categoryId: any = route.params.id;
let categoryPage: any = route.params.page;
</script>

<template>
  <div class="category">
    <Common :type="'Category'" :category-id="categoryId" :category-page="categoryPage" />
  </div>
</template>

<style scoped lang="scss">
</style>