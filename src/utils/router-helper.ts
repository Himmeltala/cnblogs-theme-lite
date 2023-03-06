/**
 * Vue Router 工具，解析 url，跳转对应的 router
 *
 * @author Himmelbleu
 * @date 2022 年 12 月 1 日
 * @url https://www.cnblogs.com/Himmelbleu/#/
 */

import { blogApp } from "@/lite.config";
import { useAnchorStore } from "@/store";

export enum name {
  index = "index",
  essay = "essay",
  essayList = "essayList",
  essaySort = "essaySort",
  essayArchive = "essayArchive",
  article = "article",
  articleSort = "articleSort",
  articleArchive = "articleArchive",
  markSort = "markSort",
  marks = "marks",
  albumn = "albumn",
  albumnItem = "albunItem"
}

export type routePath = "/p/";

const regexp = {
  essayList: /\/p\/\d+.html/g,
  essaySort: /\/category\/\d+/g,
  essayArchive: /e/g,
  article: /article/g,
  articleSort: /sort/g,
  articleArchive: /archive/g,
  markSort: /\/tag\/[\w\s\u4e00-\u9fa5\n.\-|_]+/g,
  marks: /\d/g,
  albumn: /albumn/g,
  albumnItem: /\/gallery\/image\/\d+/g
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

  if (regexp.essayList.test(URL)) {
    const postId = URL.match(regexp.essayList)[0].split("/")[2].split(".")[0];
    setCommentAnchor(URL);
    nextParam = {
      name: name.essay,
      params: { id: postId }
    };
  } else if (regexp.essaySort.test(URL)) {
    const sortId = URL.match(regexp.essaySort)[0].split("/")[2].split(",")[0];
    nextParam = {
      name: name.essaySort,
      params: { id: sortId }
    };
  } else if (regexp.markSort.test(URL)) {
    const tag = decodeURI(URL).match(regexp.markSort)[0].split("/")[2];
    nextParam = {
      name: name.markSort,
      params: { tag }
    };
  } else if (regexp.albumnItem.test(URL)) {
    const id = URL.match(regexp.albumnItem)[0].split("/")[3];
    nextParam = {
      name: name.albumnItem,
      params: { id }
    };
  }

  return function () {
    if (nextParam && Object.keys(nextParam).length > 0) {
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
