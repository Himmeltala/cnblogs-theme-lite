<script setup lang="ts"></script>

<template>
  <div class="right-side">
    <Card padding="1px 20px">
      <SideItem text="我的技术栈">
        <template #icon>
          <el-icon style="margin-right: 5px">
            <Aim />
          </el-icon>
        </template>
        <RadarMap />
      </SideItem>
    </Card>
  </div>
</template>

<style scoped lang="scss">
.right-side {
  color: #878787;
  position: absolute;
  top: 10vh;
  right: 10vw;
  width: 13.5vw;
  height: 90vh;
}
</style>
