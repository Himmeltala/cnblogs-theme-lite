import { createRouter, createWebHashHistory } from "vue-router";
import { redirect, name } from "@/utils/router-helper";

const routes = [
  {
    name: name.index,
    path: "/",
    component: () => import("./views/modules/Index.vue")
  },
  {
    name: name.essay,
    path: "/p/:id",
    component: () => import("./views/modules/Essay.vue")
  },
  {
    name: name.essayList,
    path: "/p/list",
    component: () => import("./views/modules/EssayList.vue")
  },
  {
    name: name.essaySort,
    path: "/p/sort/:id",
    component: () => import("./views/modules/EssaySort.vue")
  },
  {
    name: name.essayArchive,
    path: "/p/archive/:date",
    component: () => import("./views/modules/EssayArchive.vue")
  },
  {
    name: name.article,
    path: "/article/:id",
    component: () => import("./views/modules/Article.vue")
  },
  {
    name: name.articleSort,
    path: "/article/sort/:id",
    component: () => import("./views/modules/ArticleSort.vue")
  },
  {
    name: name.articleArchive,
    path: "/article/archive/:date",
    component: () => import("./views/modules/ArticleArchive.vue")
  },
  {
    name: name.markSort,
    path: "/mark/sort/:tag",
    component: () => import("./views/modules/MarkSort.vue")
  },
  {
    name: name.marks,
    path: "/marks",
    component: () => import("./views/modules/Marks.vue")
  },
  {
    name: name.albumn,
    path: "/albumn/:id",
    component: () => import("./views/modules/Albumn.vue")
  },
  {
    name: name.albumnItem,
    path: "/album/item/:id",
    component: () => import("./views/modules/AlbumnItem.vue")
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
