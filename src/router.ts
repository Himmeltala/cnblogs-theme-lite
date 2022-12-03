import { createRouter, createWebHashHistory } from "vue-router";
import { redirect, reinstallUrl, RouteType } from "./utils/redirector";
import config from "./config";

const routes = [
  {
    name: RouteType.HOME,
    path: "/",
    component: () => import("./fragments/Home.vue")
  },
  {
    name: RouteType.ESSAY,
    path: "/e/:id",
    component: () => import("./fragments/essay/Essay.vue")
  },
  {
    name: RouteType.CATEGORY,
    path: "/c/:id/:page",
    component: () => import("./fragments/Home.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.name === RouteType.HOME) {
    let redirection = redirect(window.location.href);
    console.log(redirection);
    if (redirection?.type && redirection.type === RouteType.ESSAY) {
      window.history.pushState("", "", reinstallUrl(redirection, config));
      next({ name: RouteType.ESSAY, params: { id: redirection.text } });
    } else if (redirection?.type && redirection.type === RouteType.CATEGORY) {
      console.log('enter category page');
      window.history.pushState("", "", reinstallUrl(redirection, config));
      next({ name: RouteType.CATEGORY, params: { id: redirection.id, page: redirection.page } });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
