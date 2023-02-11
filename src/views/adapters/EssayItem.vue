<script setup lang="ts">
import { PropType } from "vue";
import { CustType } from "@/types/data-type";
import { nav } from "@/helpers/route-helper";
import { getIsUnlock } from "@/utils/remote-api";

defineProps({
  data: {
    type: Array as PropType<CustType.Jotting[]>,
    required: true
  }
});

const password = ref("");
const essayId = ref("");
const dialog = ref(false);
const router = useRouter();

function openLocked(identifier: string) {
  dialog.value = !dialog.value;
  essayId.value = identifier;
}

async function submit() {
  const isUnlock = await getIsUnlock(password.value, essayId.value);
  if (isUnlock) {
    nav({ path: "/p/" + essayId.value, router });
    ElMessage({
      message: "密码输入正确！",
      grouping: true,
      type: "success"
    });
    dialog.value = !dialog.value;
  } else {
    ElMessage({
      message: "密码错误！",
      grouping: true,
      type: "error"
    });
  }
}
</script>

<template>
  <Card
    class="pb-4"
    :class="{ 'mb-6': index !== data.length - 1 }"
    v-for="(item, index) in data"
    :index="index"
    :length="data.length"
    :key="index">
    <div class="f-c-b" :class="{ 'mb-5': item.surface }">
      <el-image
        v-if="index % 2 !== 0 && item.surface"
        class="cover h-35 rd-2"
        :src="item.surface"
        fit="cover" />
      <div :class="{ 'w-100%': !item.surface, 'has-cover w-60%': item.surface }">
        <template v-if="!item.isLocked">
          <div
            class="hover mb-5 fsz-1.3 cursor-pointer"
            @click="nav({ path: '/p/' + item.id, router })">
            {{ item.text }}
          </div>
        </template>
        <template v-else>
          <div class="hover mb-5 fsz-1.3 cursor-pointer" @click="openLocked(item.id + '')">
            {{ item.text }}
          </div>
        </template>
        <div class="l-thr-color" :class="{ 'mb-5': !item.surface, 'f-c-s': item.isLocked }">
          {{ item.desc }}
          <i-ep-lock v-if="item.isLocked" />
        </div>
      </div>
      <el-image
        v-if="index % 2 === 0 && item.surface"
        class="cover h-35 rd-2"
        :src="item.surface"
        fit="cover" />
    </div>
    <div class="f-c-s mb-5 fsz-0.9">
      <el-icon>
        <i-ep-caret-right />
      </el-icon>
      <template v-if="!item.isLocked">
        <router-link
          class="hover l-pri-color ml-0.5 b-b-1 b-b-dotted p-b-0.3"
          :to="'/p/' + item.id">
          阅读全文
        </router-link>
      </template>
      <template v-else>
        <div
          @click="openLocked(item.id + '')"
          class="hover l-pri-color ml-0.5 b-b-1 b-b-dotted p-b-0.3">
          阅读全文
        </div>
      </template>
    </div>
    <EssaySynopsis
      :align="'flex-end'"
      :data="{ date: item.date, comm: item.comm, digg: item.digg, view: item.view }" />
  </Card>
  <el-dialog class="dialog" v-model="dialog" width="auto" align-center title="该博文需要密码">
    <el-form>
      <el-form-item label="密码：">
        <el-input show-password type="password" v-model="password" placeholder="输入博文阅读密码" />
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" @click="submit">确定</el-button>
        <el-button size="small" @click="dialog = !dialog">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style scoped lang="scss">
@include pc() {
  .cover {
    --at-apply: w-26%;
  }

  .has-cover {
    --at-apply: w-72%;
  }
}

@include mb() {
  .cover {
    --at-apply: w-38%;
  }

  .has-cover {
    --at-apply: w-60%;
  }
}
</style>
