import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("./fragments/Container.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
