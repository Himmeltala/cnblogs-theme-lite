/**
 * Vue Router 工具，解析 url，跳转对应的 router
 *
 * @author Himmelbleu
 * @date 2022 年 12 月 1 日
 */

import { useAnchorStore } from "@/store";

export const routes = [
  {
    name: RouterConstants.Name.INDEX,
    path: RouterConstants.Path.INDEX(),
    component: () => import("@/views/Index.vue")
  },
  {
    name: RouterConstants.Name.WORKS,
    path: RouterConstants.Path.WORKS(),
    component: () => import("@/views/Works.vue")
  },
  {
    name: RouterConstants.Name.WORKS_BY_MARK,
    path: RouterConstants.Path.WORKS_BY_MARK(),
    component: () => import("@/views/WorksByMark.vue")
  },
  {
    name: RouterConstants.Name.WORKS_BY_SORT,
    path: RouterConstants.Path.WORKS_BY_SORT(),
    component: () => import("@/views/WorksBySort.vue")
  },
  {
    name: RouterConstants.Name.WORKS_BY_ARCHIVE,
    path: RouterConstants.Path.WORKS_BY_ARCHIVE(),
    component: () => import("@/views/WorksByArchive.vue")
  },
  {
    name: RouterConstants.Name.WORKS_BY_CALENDAR,
    path: RouterConstants.Path.WORKS_BY_CALENDAR(),
    component: () => import("@/views/WorksByCalendar.vue")
  },
  {
    name: RouterConstants.Name.MARK_LIST,
    path: RouterConstants.Path.MARK_LIST(),
    component: () => import("@/views/MarkList.vue")
  },
  {
    name: RouterConstants.Name.ALBUMN,
    path: RouterConstants.Path.ALBUMN(),
    component: () => import("@/views/Albumn.vue")
  },
  {
    name: RouterConstants.Name.ALBUMN_ITEM,
    path: RouterConstants.Path.ALBUMN_ITEM(),
    component: () => import("@/views/AlbumnItem.vue")
  }
];

/**
 * 针对于博客园的路由匹配规则
 */
const RoutingRules = [
  {
    regex: RouterConstants.Regx.WORKS,
    name: RouterConstants.Name.WORKS,
    params: { id: LiteUtils.Text.split(window.location.href, RouterConstants.Regx.WORKS, [2, 0], ["/", "."]) },
    before: addWorksAnchors
  },
  {
    regex: RouterConstants.Regx.WORKS_BY_SORT,
    name: RouterConstants.Name.WORKS_BY_SORT,
    params: { id: LiteUtils.Text.split(window.location.href, RouterConstants.Regx.WORKS_BY_SORT, [2, 0], ["/", "."]) }
  },
  {
    regex: RouterConstants.Regx.WORKS_BY_MARK,
    name: RouterConstants.Name.WORKS_BY_MARK,
    params: { tag: LiteUtils.Text.split(decodeURI(window.location.href), RouterConstants.Regx.WORKS_BY_MARK, [2], ["/"]) }
  },
  {
    regex: RouterConstants.Regx.ALBUMN_ITEM,
    name: RouterConstants.Name.ALBUMN_ITEM,
    params: { id: LiteUtils.Text.split(window.location.href, RouterConstants.Regx.ALBUMN_ITEM, [3], ["/"]) }
  },
  {
    regex: RouterConstants.Regx.ARTICLES,
    name: RouterConstants.Name.WORKS,
    params: { id: LiteUtils.Text.split(window.location.href, RouterConstants.Regx.ARTICLES, [2, 0], ["/", "."]) }
  }
];

/**
 * 从评论链接点击进入时，获取其携带的评论锚点位置
 */
function addWorksAnchors(URL: string) {
  const result = /#\/\d+/g.exec(URL);
  if (result !== null) {
    const anchor = result[0].split("#/")[1];
    useAnchorStore().setAnchor(anchor);
  }
}

function push() {
  window.history.pushState("", "", `${window.location.protocol}//${window.location.host}/${LiteConfig.blogApp}/#/`);
}

/**
 * 对原博客链接进行重写并提取重要信息。
 *
 * 比如，https://www.cnblogs.com/Himmelbleu/p/11111.html。要对该地址进行转换，得到一个 Vue Router 认识的 hash URL，
 * 需要该地址中 11111，即作品的 ID，通过 blogRoutingRules 博客园路由匹配规则获取。
 *
 * @param next NavigationGuardNext
 */
export function redirect(next: NavigationGuardNext) {
  const matched = RoutingRules.find(rules => rules.regex.test(window.location.href));

  if (matched) {
    matched.before && matched.before(window.location.href);
    push();
    next({
      name: matched.name,
      params: matched.params
    });
  } else next();
}
