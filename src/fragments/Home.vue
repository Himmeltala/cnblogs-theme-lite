<script setup lang="ts">
import Config from "../config";
import { ref } from "vue";

let board = Config.__LITE_CONFIG__.board;
let blur = ref(board?.blur ? board.blur : "1px");
</script>

<template>
  <div class="home">
    <div class="resume" v-if="board && board.display"
         :style="{'height': board.height ? board.height : '150px', 'color': board.color ? board.color: '#2b2b2b'}">
      <div class="modal"></div>
      <img loading="lazy" :src="board.bg ? board.bg : ''" alt="FAILED" />
      <div class="panel" :style="{'color': board.color ? board.color: '#2b2b2b'}">
        <div class="prime">
          <el-image
            style="width: 80px; height: 80px; border-radius: 50px" fit="cover" :src="board.avatar"></el-image>
          <div class="prime__packer">
            <div class="username" :style="{'color': board.color ? board.color: '#2b2b2b'}">
              <span class="text">{{ Config.__LITE_CONFIG__.blogName }}</span>
              <span class="tag">
                <el-tag :type="board.tag?.type ? board.tag.type : 'success'" effect="plain"
                        :color="board.tag?.color ? board.tag.color : 'rgb(57 66 53)'"
                        :round="board.tag?.round"> {{ board.tag?.text ? board.tag.text : "摸鱼中..." }} </el-tag>
              </span>
            </div>
            <div :style="{'color': board.color ? board.color: '#2b2b2b'}" v-if="board.signature" class="signature">签名：<span
              v-html="board.signature" /></div>
          </div>
        </div>
        <div :style="{'color': board.color ? board.color: '#2b2b2b'}" class="floating"
             v-if="board.floating && board.floating.length > 0">
          <div v-for="(item, index) in board.floating" :key="index">{{ item.label }}：{{ item.text }}</div>
        </div>
      </div>
    </div>
    <Common :type="'Home'" />
  </div>
</template>

<style scoped lang="scss">
@import "../scss/mixins.scss";

.resume {
  box-sizing: border-box;
  margin: 0 10px 12px 10px;
  position: relative;
  border-radius: 6px;

  .modal,
  .panel {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 6px;
  }

  .modal {
    backdrop-filter: saturate(50%) blur(v-bind(blur));
    background: rgba(36, 36, 36, 0.6);
  }

  .panel {
    color: #bcbcbc;
    padding: 15px;
    box-sizing: border-box;
    font-weight: 400;
    z-index: 999;

    .prime {
      @include flex($justify: flex-start);

      .prime__packer {
        margin-left: 15px;

        .username {
          margin-bottom: 4px;
          font-size: 20px;
          @include flex($justify: flex-start);

          .text {
            margin-right: 10px;
          }
        }

        .signature {
          font-size: 15px;
        }
      }
    }

    .floating {
      position: absolute;
      top: 15px;
      right: 15px;
      font-size: 15px;

      div {
        margin-bottom: 4px;
      }
    }
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 6px;
    object-fit: cover;
  }
}
</style>