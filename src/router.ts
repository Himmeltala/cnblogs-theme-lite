import { createRouter, createWebHashHistory } from "vue-router";
import { redirect, RouteName } from "@/utils/router-helper";

const routes = [
  {
    name: RouteName.HOME,
    path: "/",
    component: () => import("./views/modules/Home.vue")
  },
  {
    name: RouteName.Essay,
    path: "/p/:id",
    component: () => import("./views/modules/Essay.vue")
  },
  {
    name: RouteName.Sort,
    path: "/sort/:id",
    component: () => import("./views/modules/Sort.vue")
  },
  {
    name: RouteName.TAGSORT,
    path: "/sort/tag/:tag",
    component: () => import("./views/modules/TagSort.vue")
  },
  {
    name: RouteName.TAGS,
    path: "/tags",
    component: () => import("./views/modules/Tags.vue")
  },
  {
    name: RouteName.GALLERY,
    path: "/gallery",
    component: () => import("./views/modules/Gallery.vue")
  }
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { el: "#app", top: 0, behavior: "smooth" };
    }
  }
});

router.beforeEach((to, from, next) => {
  redirect(next)();
});

export default router;
