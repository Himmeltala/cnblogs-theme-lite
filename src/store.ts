import { ref } from "vue";
import { defineStore } from "pinia";
import { RouteName } from "./utils/route-helper";

export const useAnchorStore = defineStore("anchor", () => {
  let _anchors = ref<any>();

  function setAnchors(anchors: any) {
    _anchors.value = anchors;
  }

  return { anchors: _anchors, setAnchors };
});

export const useRouterStore = defineStore("router", () => {
  let _name = ref<RouteName>();

  function setName(name: RouteName) {
    _name.value = name;
  }

  return { name: _name, setName };
});