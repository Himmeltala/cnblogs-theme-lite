import { createRouter, createWebHashHistory } from "vue-router";
import { redirect, reinstallUrl, RouteName } from "./utils/redirector";

const routes = [
  {
    name: RouteName.HOME,
    path: "/",
    component: () => import("./fragments/Common.vue")
  },
  {
    name: RouteName.ESSAY,
    path: "/e/:id",
    component: () => import("./fragments/essay/Essay.vue")
  },
  {
    name: RouteName.CATEGORY,
    path: "/c/:id/:page",
    component: () => import("./fragments/Common.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.name === RouteName.HOME) {
    let url = redirect(window.location.href);
    if (url?.type && url.type === RouteName.ESSAY) {
      window.history.pushState("", "", reinstallUrl(url));
      next({ name: RouteName.ESSAY, params: { id: url.text } });
    } else if (url?.type && url.type === RouteName.CATEGORY) {
      window.history.pushState("", "", reinstallUrl(url));
      next({ name: RouteName.CATEGORY, params: { id: url.id, page: url.page } });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
