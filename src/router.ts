import { createRouter, createWebHashHistory } from "vue-router";
import { redirect, reinstallUrl, RouteName } from "./utils/route-helper";

const routes = [
  {
    name: RouteName.HOME,
    path: "/",
    component: () => import("./views/modules/home/Home.vue")
  },
  {
    name: RouteName.ESSAY,
    path: "/e/:id",
    component: () => import("./views/modules/essay/Essay.vue")
  },
  {
    name: RouteName.CATEGORY,
    path: "/c/:id/:page",
    component: () => import("./views/modules/home/Category.vue")
  },
  {
    name: RouteName.TAG_PAGE,
    path: "/t/:tag",
    component: () => import("./views/modules/home/TagPage.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// @ts-ignore
function allocateUrl(url?: any, route: string) {
  return url?.type && url.type === route;
}

router.beforeEach((to, from, next) => {
  if (to.name === RouteName.HOME) {
    let url = redirect(window.location.href);
    if (allocateUrl(url, RouteName.ESSAY)) {
      window.history.pushState("", "", reinstallUrl(`e/${url.text}`));
      next({ name: RouteName.ESSAY, params: { id: url.text } });
    } else if (allocateUrl(url, RouteName.CATEGORY)) {
      window.history.pushState("", "", reinstallUrl(`c/${url.id}/${url.page}`));
      next({ name: RouteName.CATEGORY, params: { id: url.id, page: url.page } });
    } else if (allocateUrl(url, RouteName.TAG_PAGE)) {
      window.history.pushState("", "", reinstallUrl(`t/${url.tag}`));
      next({ name: RouteName.TAG_PAGE, params: { tag: url.tag } });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
