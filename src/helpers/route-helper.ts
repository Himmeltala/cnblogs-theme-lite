/**
 * Vue Router 工具，解析 url，跳转对应的 router
 *
 * @author Himmelbleu
 * @date 2022 年 12 月 1 日
 * @url https://www.cnblogs.com/Himmelbleu/#/
 */

import { Router } from "vue-router";
import { blogApp } from "@/lite.config";
import { useAnchorStore } from "@/store";

export enum RouteName {
  ESSAY = "essay",
  HOME = "home",
  CATEGORY = "sort",
  TAGCOLL = "label",
  TAGS = "tags",
  GALLERY = "gallery"
}

const routeReg = {
  ESSAY: /\/p\/\d+.html/g,
  CATEGORY: /\/category\/\d+/g,
  TAGCOLL: /\/tag\/[\w\s\u4e00-\u9fa5\n.\-|_]+/g,
  Tags: /\d/g,
  GALLERY: /\/gallery\/image/g
};

/**
 * 从评论链接点击进入时，获取其携带的评论锚点位置
 * @param URL 从评论点击过来的链接
 */
function storeCommentAnchor(URL: string) {
  try {
    const anchor = URL.match(/#\/\d+/g)[0].split("#/")[1];
    if (anchor) {
      const { setAnchor } = useAnchorStore();
      setAnchor(parseInt(anchor));
    }
  } catch (e) {}
}

/**
 * 对原博客链接进行重写并提取重要信息。
 *
 * 比如文章页，地址是 https://www.cnblogs.com/Himmelbleu/p/11111.html。Vue Router 要的不是这样的 URL，而是 hash URL，
 * 提取该 URL 中重要信息，如随笔的 ID：11111，得到之后创建 guardNext，让 next 函数导入对应的路由组件。
 *
 * 如果进入的就是路由组件的 URL，则不需要进行上诉操作。
 *
 * @param next NavigationGuardNext
 * @returns 返回一个函数，在合适的时候执行，而非调用该函数就执行后续操作
 */
export function redirect(next: any): () => void {
  let nextParam: any;
  const URL = window.location.href;

  if (routeReg.ESSAY.test(URL)) {
    const id = URL.match(routeReg.ESSAY)[0].split("/")[2].split(".")[0];
    storeCommentAnchor(URL);
    nextParam = {
      name: RouteName.ESSAY,
      params: { id }
    };
  } else if (routeReg.CATEGORY.test(URL)) {
    const id = URL.match(routeReg.CATEGORY)[0].split("/")[2].split(",")[0];
    nextParam = {
      name: RouteName.CATEGORY,
      params: { id }
    };
  } else if (routeReg.TAGCOLL.test(URL)) {
    const tag = decodeURI(URL).match(routeReg.TAGCOLL)![0].split("/")[2];
    nextParam = {
      name: RouteName.TAGCOLL,
      params: { tag }
    };
  } else if (routeReg.GALLERY.test(URL)) {
    const tag = decodeURI(URL).match(routeReg.TAGCOLL)![0].split("/")[2];
    nextParam = {
      name: RouteName.GALLERY,
      params: { tag }
    };
  }

  return () => {
    if (nextParam) {
      push();
      next(nextParam);
    } else {
      next();
    }
  };
}

function push() {
  window.history.pushState("", "", `${window.location.protocol}//${window.location.host}/${blogApp}/#/`);
}

/**
 * 导航，传入 path 导航 Vue Router 路由组件；传入普通链接进行跳转；传入 back 对上级进行回跳。
 * @param params path：路径、router：导航路由组件时传递
 */
export function nav(params: { path: string; router?: Router }) {
  if (params.path === "back") {
    params.router.go(-1);
  } else {
    if (params.router) params.router.push(params.path);
    else window.open(params.path, "_blank");
  }
}
