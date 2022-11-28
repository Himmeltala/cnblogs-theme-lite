import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("./fragments/Home.vue")
  },
  {
    path: "/essay/:id",
    component: () => import("./fragments/Essay.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
