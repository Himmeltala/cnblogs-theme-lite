import { createRouter, createWebHashHistory } from "vue-router";
import { redirect, RouteType } from "./utils/redirector";
import config from "./config";

const routes = [
  {
    name: "Home",
    path: "/",
    component: () => import("./fragments/Home.vue")
  },
  {
    name: "Essay",
    path: "/e/:id",
    component: () => import("./fragments/essay/Essay.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.name === "Home") {
    let redirection = redirect(window.location.href);
    if (redirection?.type && redirection.type === RouteType.ESSAY) {
      let url = `${window.location.protocol}//${window.location.host}${config.router.space}/#/e/${redirection.text}`;
      window.history.pushState("", "", url);
      next({ name: RouteType.ESSAY, params: { id: redirection.text } });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
