import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("./fragments/Home.vue")
  },
  {
    path: "/p/:id",
    component: () => import("./fragments/essay/Essay.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
