import { createRouter, createWebHashHistory } from "vue-router";
import { compareUrl, parseUrlData, reviseUrl, RouteName } from "@/utils/route-helper";

const routes = [
  {
    name: RouteName.HOME,
    path: "/",
    component: () => import("./views/modules/Home.vue")
  },
  {
    name: RouteName.ESSAY,
    path: "/e/:id",
    component: () => import("./views/modules/Essay.vue")
  },
  {
    name: RouteName.CATEGORY,
    path: "/c/:id/:page",
    component: () => import("./views/modules/Category.vue")
  },
  {
    name: RouteName.TAG_PAGE,
    path: "/t/:tag",
    component: () => import("./views/modules/TagPage.vue")
  },
  {
    name: RouteName.TAGS,
    path: "/tags",
    component: () => import("./views/modules/MyTags.vue")
  },
  {
    name: RouteName.GALLERY,
    path: "/gallery",
    component: () => import("./views/modules/Gallery.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  let data = parseUrlData(window.location.href);
  if (to.name === RouteName.HOME) {
    if (compareUrl(data, RouteName.ESSAY)) {
      reviseUrl(`e/${data.text}`);
      next({ name: RouteName.ESSAY, params: { id: data.id } });
    } else if (compareUrl(data, RouteName.CATEGORY)) {
      reviseUrl(`c/${data.id}/${data.page}`);
      next({ name: RouteName.CATEGORY, params: { id: data.id, page: data.page } });
    } else if (compareUrl(data, RouteName.TAG_PAGE)) {
      reviseUrl(`t/${data.tag}`);
      next({ name: RouteName.TAG_PAGE, params: { tag: data.tag } });
    } else if (compareUrl(data, RouteName.GALLERY)) {
      reviseUrl(`gallery`);
      next({ name: RouteName.GALLERY });
    } else {
      next();
    }
  } else {
    if (compareUrl(data, RouteName.ESSAY)) {
      reviseUrl(`e/${data.text}`);
      next({ name: RouteName.ESSAY, params: { id: data.id } });
    } else {
      next();
    }
  }
});

export default router;
