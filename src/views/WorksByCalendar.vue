<script setup lang="ts">
import { WorksApi } from "@/apis";

LiteUtils.startLoading();

const date = new Date();
const calendar = shallowRef(await WorksApi.getCalendar(`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`));
const dateModel = ref(date);

function findDate(data: any) {
  const date = data.day.replaceAll("-", "/");
  return calendar.value.includes(date);
}

watch(dateModel, async (newVal, oldVal) => {
  if (newVal.getMonth() !== oldVal.getMonth()) {
    calendar.value = await WorksApi.getCalendar(`${newVal.getFullYear()}/${newVal.getMonth() + 1}/${newVal.getDate()}`);
  }
});

onMounted(() => {
  LiteUtils.endLoading();
});
</script>

<template>
  <Card class="l-calendar min-height f-s-s flex-col">
    <el-calendar v-model="dateModel">
      <template #date-cell="{ data }">
        <div
          class="w-100% h-100%"
          @click="
            LiteUtils.Router.go({
              path: RouterConstants.Path.WORKS_BY_ARCHIVE('d', data.day),
              router: $router
            })
          "
          v-if="findDate(data)">
          <u>
            {{ data.day.split("-")[2] }}
          </u>
          <div class="mt-2 l-color-2 l-six-size">点击查看</div>
        </div>
        <span v-else>{{ data.day.split("-")[2] }}</span>
      </template>
    </el-calendar>
  </Card>
</template>

<style scoped lang="scss"></style>
