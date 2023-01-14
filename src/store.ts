import { ref } from "vue";
import { defineStore } from "pinia";

export const useAnchorStore = defineStore("anchor", () => {
  let _anchors = ref<any>();

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

export const useLoadingStore = defineStore("loaing", () => {
  let _loading = ref(true);

  function setLoading(bool: boolean) {
    _loading.value = bool;
  }

  function convertLoading() {
    _loading.value = !_loading.value;
  }

  return { loading: _loading, setLoading, convertLoading };
});
