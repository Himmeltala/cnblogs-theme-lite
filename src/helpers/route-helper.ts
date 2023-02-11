/**
 * Vue Router 工具，解析 url，跳转对应的 router
 *
 * @author Himmelbleu
 * @since 1.0
 * @date 2022 年 12 月 1 日
 * @url https://www.cnblogs.com/Himmelbleu/#/
 */

import { Router } from "vue-router";
import { blogApp } from "@/lite.config";
import { useCommentsAnchorStore } from "@/store";

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

function storeCommentAnchor(URL: string) {
  try {
    const commentAnchor = URL.match(/#\/\d+/g)[0].split("#/")[1];
    if (commentAnchor) {
      const { setAnchor } = useCommentsAnchorStore();
      setAnchor(parseInt(commentAnchor));
    }
  } catch (e) {}
}

/**
 * 是否需要重写 URL，比如，文章页，原本博客圆的链接是 https://www.cnblogs.com/Himmelbleu/p/11111.html
 * 由于 Vue 的 Router，要正确导入路由组件，就必须对 URL 进行处理，匹配该链接是不是随笔路由组件，如果是就导入路由组件，
 * 并重写 URL 路径为正确的 Router 路径。
 *
 * 如果进入的是 Router 的 URL，就不需要进行上诉操作。
 *
 * @param next NavigationGuardNext
 * @returns 返回一个函数，在合适的时候执行，而非调用该函数就执行后续操作
 */
export function rewriteURL(next: any): () => void {
  let hub: any;
  const URL = window.location.href;

  if (routeReg.ESSAY.test(URL)) {
    const id = URL.match(routeReg.ESSAY)[0].split("/")[2].split(".")[0];
    storeCommentAnchor(URL);
    hub = {
      name: RouteName.ESSAY,
      params: { id },
      exerciser() {
        refactorURL(id);
      }
    };
  } else if (routeReg.CATEGORY.test(URL)) {
    const id = URL.match(routeReg.CATEGORY)[0].split("/")[2].split(",")[0];
    hub = {
      name: RouteName.CATEGORY,
      params: { id },
      exerciser() {
        refactorURL(id);
      }
    };
  } else if (routeReg.TAGCOLL.test(URL)) {
    const tag = decodeURI(URL).match(routeReg.TAGCOLL)![0].split("/")[2];
    hub = {
      name: RouteName.TAGCOLL,
      params: { tag },
      exerciser() {
        refactorURL(tag);
      }
    };
  } else if (routeReg.GALLERY.test(URL)) {
    const tag = decodeURI(URL).match(routeReg.TAGCOLL)![0].split("/")[2];
    hub = {
      name: RouteName.GALLERY,
      params: { tag },
      exerciser() {
        refactorURL(tag);
      }
    };
  }

  return () => {
    if (hub) {
      hub.exerciser();
      next(hub);
    } else {
      next();
    }
  };
}

function refactorURL(slice: string): void {
  const redirectUrl = `${window.location.protocol}//${window.location.host}/${blogApp}/#/${slice}`;
  window.history.pushState("", "", redirectUrl);
}

export function nav(params: { path: string; router?: Router }) {
  if (params.path === "back") {
    params.router.go(-1);
  } else {
    if (params.router) params.router.push(params.path);
    else window.open(params.path, "_blank");
  }
}
