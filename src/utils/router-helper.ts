/**
 * Vue Router 工具，解析 url，跳转对应的 router
 *
 * @author Himmelbleu
 * @date 2022 年 12 月 1 日
 * @url https://www.cnblogs.com/Himmelbleu/#/
 */

import { blogApp } from "@/lite.config";
import { useAnchorStore } from "@/store";

export enum RouteName {
  Essay = "article",
  HOME = "home",
  Sort = "sort",
  TAGSORT = "label",
  TAGS = "tags",
  GALLERY = "gallery"
}

const routeReg = {
  Essays: /\/p\/\d+.html/g,
  Sort: /\/category\/\d+/g,
  TAGSORT: /\/tag\/[\w\s\u4e00-\u9fa5\n.\-|_]+/g,
  Tags: /\d/g,
  GALLERY: /\/gallery\/image/g
};

/**
 * 从评论链接点击进入时，获取其携带的评论锚点位置
 * @param URL 从评论点击过来的链接
 */
function setCommentAnchor(URL: string) {
  try {
    const anchor = URL.match(/#\/\d+/g)[0].split("#/")[1];
    if (anchor) {
      useAnchorStore().setAnchor(anchor);
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

  if (routeReg.Essays.test(URL)) {
    const postId = URL.match(routeReg.Essays)[0].split("/")[2].split(".")[0];
    setCommentAnchor(URL);
    nextParam = {
      name: RouteName.Essay,
      params: { id: postId }
    };
  } else if (routeReg.Sort.test(URL)) {
    const sortId = URL.match(routeReg.Sort)[0].split("/")[2].split(",")[0];
    nextParam = {
      name: RouteName.Sort,
      params: { id: sortId }
    };
  } else if (routeReg.TAGSORT.test(URL)) {
    const tag = decodeURI(URL).match(routeReg.TAGSORT)![0].split("/")[2];
    nextParam = {
      name: RouteName.TAGSORT,
      params: { tag }
    };
  } else if (routeReg.GALLERY.test(URL)) {
    nextParam = {
      name: RouteName.GALLERY
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
