import { ref } from "vue";
import { defineStore } from "pinia";

export const useAnchorStore = defineStore("anchor", () => {
  let anchors = ref<any>();

  function setAnchors(anchors: any) {
    anchors.value = anchors;
  }

  return { anchors, setAnchors };
});