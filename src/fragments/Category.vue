<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { watch } from "vue";
import { $ref } from "vue/macros";
import * as DataType from "../types/data-type";
import * as RemoteApi from "../utils/api";
import { RouteName } from "../utils/route-helper.js";

const router = useRouter();
const route = useRoute();

let id = $ref<string>();
let page = $ref<string>();
let categories = $ref<Array<DataType.Essay>>();
let label = $ref<string>();

id = route.params.id as string;
page = route.params.page as string;

watch(route, () => {
  id = route.params.id as string;
  page = route.params.page as string;

  RemoteApi.getCategories(id, true, 1, res => {
    label = res.label;
    categories = res.list;
  });
});
</script>

<template>
  <div class="category">
    <Common :type="RouteName.CATEGORY" :id="id" :page="page" />
  </div>
</template>

<style scoped lang="scss">
</style>