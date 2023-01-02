import { ref } from "vue";
import { defineStore } from "pinia";

export const useAnchorStore = defineStore("anchor", () => {
  let _anchors = ref<any>();

  function setAnchors(anchors: any) {
    _anchors.value = anchors;
  }

  return { anchors: _anchors, setAnchors };
});