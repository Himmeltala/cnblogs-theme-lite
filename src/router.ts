import { createRouter, createWebHashHistory } from "vue-router";
import { redirect, RouteName } from "@/utils/router-helper";

const routes = [
  {
    name: RouteName.HOME,
    path: "/",
    component: () => import("./views/modules/Home.vue")
  },
  {
    name: RouteName.ESSAY,
    path: "/p/:id",
    component: () => import("./views/modules/Essay.vue")
  },
  {
    name: RouteName.CATEGORY,
    path: "/sort/:id",
    component: () => import("./views/modules/Category.vue")
  },
  {
    name: RouteName.TAGCOLL,
    path: "/label/:tag",
    component: () => import("./views/modules/TagColl.vue")
  },
  {
    name: RouteName.TAGS,
    path: "/labels",
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
