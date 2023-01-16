import { ref } from "vue";
import { defineStore } from "pinia";

export const useAnchorStore = defineStore("catalogAnchor", () => {
  let _anchors = ref();

  function setAnchors(anchors: any) {
    _anchors.value = anchors;
  }

  return { anchors: _anchors, setAnchors };
});

export const useCommentsAnchorStore = defineStore("commentsAnchor", () => {
  let _commentAnchor = ref(0);

  function setAnchor(commentAnchor: number) {
    _commentAnchor.value = commentAnchor;
  }

  return { commentAnchor: _commentAnchor, setAnchor };
});
