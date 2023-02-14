import $ from "jquery";
import { preLog } from "@/utils/common";
import { CustType } from "@/types/data-type";

export let __LITE_CONFIG__: CustType.Lite;
export let blogId = 0;
export let baseAPI = "";
export let blogApp = "";
export let isLogin = true;
export let isOwner = true;
export let userGuid = "";
export let isFollow = false;

export function setLite() {
  userGuid = $("#p_b_follow > a")?.attr("onclick")?.split("(")[1]?.split(")")[0]?.replaceAll("'", "") ?? "";
  isFollow = $("#p_b_follow > a")?.text() === "-取消关注" ?? false;
}

export function useLite(dev?: Function, pro?: Function) {
  $("body").append(`<div id="app"></div>`);
  $("head").append(`<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/hack-font@3.3.0/build/web/hack-subset.css" />`);
  preLog("Lite Theme v1.0.5", "Powered By Himmelbleu");
  preLog("GitHub", "https://github.com/Himmelbleu/cnblogs-theme-lite");

  // @ts-ignore
  __LITE_CONFIG__ = window["__LITE_CONFIG__"];
  if (import.meta.env.PROD) {
    // @ts-ignore
    blogId = currentBlogId;
    // @ts-ignore
    blogApp = currentBlogApp;
    // @ts-ignore
    isLogin = isLogined;
    // @ts-ignore
    isOwner = isBlogOwner;
    baseAPI = `https://www.cnblogs.com/${blogApp}`;
    pro && pro();
  } else if (import.meta.env.DEV) {
    blogId = import.meta.env.VITE_BLOG_ID;
    blogApp = import.meta.env.VITE_BLOG_APP;
    baseAPI = "/api";
    __LITE_CONFIG__ = {
      github: "https://github.com/Himmelbleu",
      navor: {
        header: "CNBLOGS",
        navs: [
          {
            href: "https://i.cnblogs.com/posts/edit",
            text: "新随笔"
          },
          {
            href: "https://i.cnblogs.com/posts",
            text: "管理"
          },
          {
            href: "https://gitee.com/Himmelbleu",
            svg: `<path d="M512 1024C230.4 1024 0 793.6 0 512S230.4 0 512 0s512 230.4 512 512-230.4 512-512 512z m259.2-569.6H480c-12.8 0-25.6 12.8-25.6 25.6v64c0 12.8 12.8 25.6 25.6 25.6h176c12.8 0 25.6 12.8 25.6 25.6v12.8c0 41.6-35.2 76.8-76.8 76.8h-240c-12.8 0-25.6-12.8-25.6-25.6V416c0-41.6 35.2-76.8 76.8-76.8h355.2c12.8 0 25.6-12.8 25.6-25.6v-64c0-12.8-12.8-25.6-25.6-25.6H416c-105.6 0-188.8 86.4-188.8 188.8V768c0 12.8 12.8 25.6 25.6 25.6h374.4c92.8 0 169.6-76.8 169.6-169.6v-144c0-12.8-12.8-25.6-25.6-25.6z""></path>`
          },
          {
            href: "https://space.bilibili.com/7021686",
            img: "https://img2.baidu.com/it/u=1815834375,722540131&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=707"
          }
        ]
      }
    };
    dev && dev();
  }

  $("head").append(`<link rel="shortcut icon" href="${__LITE_CONFIG__.icon}">`);
  $("html").attr("class", __LITE_CONFIG__.theme?.mode ?? "dark");

  const storageItem = `l-${blogApp}-theme-color`;
  let themeColor = __LITE_CONFIG__.theme?.color ?? "#409eff";
  let storeThemeColor = localStorage.getItem(storageItem);
  if (storeThemeColor) themeColor = storeThemeColor;
  else localStorage.setItem(storageItem, themeColor);

  $("html").css({ "--l-theme-color": themeColor });
}
