import { createRouter, createWebHashHistory } from "vue-router";
import { compareUrl, parseUrlData, reviseUrl, RouteName } from "@/helpers/route-helper";

const routes = [
  {
    name: RouteName.HOME,
    path: "/",
    component: () => import("./views/modules/Home.vue")
  },
  {
    name: RouteName.JOTTING,
    path: "/p/:id",
    component: () => import("./views/modules/Jotting.vue")
  },
  {
    name: RouteName.CATEGORY,
    path: "/category/:id",
    component: () => import("./views/modules/Category.vue")
  },
  {
    name: RouteName.TAGCOLL,
    path: "/tag/:tag",
    component: () => import("./views/modules/TagColl.vue")
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
  const data = parseUrlData(window.location.href);
  if (to.name === RouteName.HOME) {
    if (compareUrl(data, RouteName.JOTTING)) {
      reviseUrl(`p/${data.text}`);
      next({ name: RouteName.JOTTING, params: { id: data.id } });
    } else if (compareUrl(data, RouteName.CATEGORY)) {
      reviseUrl(`category/${data.id}/${data.page}`);
      next({ name: RouteName.CATEGORY, params: { id: data.id, page: data.page } });
    } else if (compareUrl(data, RouteName.TAGCOLL)) {
      reviseUrl(`tag/${data.tag}`);
      next({ name: RouteName.TAGCOLL, params: { tag: data.tag } });
    } else if (compareUrl(data, RouteName.GALLERY)) {
      reviseUrl(`gallery`);
      next({ name: RouteName.GALLERY });
    } else {
      next();
    }
  } else {
    if (compareUrl(data, RouteName.JOTTING)) {
      reviseUrl(`jotting/${data.text}`);
      next({ name: RouteName.JOTTING, params: { id: data.id } });
    } else {
      next();
    }
  }
});

export default router;
