import { ref } from "vue";
import { defineStore } from "pinia";

export const useCatalogStore = defineStore("catalogStore", () => {
  let _catalog = ref();

  function setCatalog(catalog: any) {
    _catalog.value = catalog;
  }

  return { catalog: _catalog, setCatalog };
});

export const useAnchorStore = defineStore("anchorStore", () => {
  let _anchor = ref(0);

  function setAnchor(anchor: number) {
    _anchor.value = anchor;
  }

  return { anchor: _anchor, setAnchor };
});
