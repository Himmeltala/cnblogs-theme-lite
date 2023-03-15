<script setup lang="ts">
import { getCalendar, getDayArchive } from "@/apis/remote-api";
import { startLoading, endLoading, nav } from "@/utils/common";

startLoading();

const router = useRouter();
const date = new Date();
const calendar = ref(await getCalendar(`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDay()}`));
const calendarVal = ref(date);
const currMonth = ref(calendarVal.value.getMonth());

const findDate = (data: any) =>
  computed(() => {
    const date = data.day.replaceAll("-", "/");
    return !!calendar.value.find(el => el == date);
  });

watch(calendarVal, async () => {
  const newDate = `${calendarVal.value.getFullYear()}/${calendarVal.value.getMonth() + 1}/${calendarVal.value.getDay()}`;
  if (calendarVal.value.getMonth() != currMonth.value) {
    currMonth.value = calendarVal.value.getMonth();
    calendar.value = await getCalendar(newDate);
  }
  const res = await getDayArchive(newDate);
  console.log(res);
});

onMounted(() => {
  endLoading();
});
</script>

<template>
  <div class="l-calendar min-height">
    <el-calendar v-model="calendarVal">
      <!-- @click="nav({ path: '/', router })" -->
      <template #date-cell="{ data }">
        <div class="w-100% h-100%" v-if="findDate(data).value">
          <u>
            {{ data.day.split("-")[2] }}
          </u>
        </div>
        <span v-else>{{ data.day.split("-")[2] }}</span>
      </template>
    </el-calendar>
  </div>
</template>

<style scoped lang="scss"></style>
