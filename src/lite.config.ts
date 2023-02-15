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

/**
 * 初始化博客重要变量，这些变量不能通过 head script 获取，在一些元素属性上。
 */
export function initLiteVars() {
  userGuid = $("#p_b_follow > a")?.attr("onclick")?.split("(")[1]?.split(")")[0]?.replaceAll("'", "") ?? "";
  isFollow = $("#p_b_follow > a")?.text() === "-取消关注" ?? false;
}

/**
 * 初始化 lite，所有工作准备完成之后，走回调函数，挂载 app。
 * @param dev 开发模式下直接挂载 app
 * @param pro 生产模式下，打包部署之后，给 window 注册一个函数，等待博客园资源加载完成之后再挂载 app。
 */
export function useLite(dev: Function, pro: Function) {
  $("body").append(`<div id="app"></div>`);
  $("head").append(`<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/hack-font@3.3.0/build/web/hack-subset.css" />`);

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
    pro();
  } else if (import.meta.env.DEV) {
    blogId = import.meta.env.VITE_BLOG_ID;
    blogApp = import.meta.env.VITE_BLOG_APP;
    baseAPI = "/api";
    __LITE_CONFIG__ = {
      github: "https://github.com/Himmelbleu"
    };
    dev();
  }

  $("head").append(`<link rel="shortcut icon" href="${__LITE_CONFIG__.icon}">`);

  let themeMode = __LITE_CONFIG__.theme?.mode ?? "dark";
  let storeThemeMode: any = localStorage.getItem(`l-${blogApp}-theme-mode`);

  if (storeThemeMode) themeMode = storeThemeMode;
  else localStorage.setItem(`l-${blogApp}-theme-mode`, themeMode);

  let themeColor = __LITE_CONFIG__.theme?.color ?? "#409eff";
  let storeThemeColor = localStorage.getItem(`l-${blogApp}-theme-color`);

  if (storeThemeColor) themeColor = storeThemeColor;
  else localStorage.setItem(`l-${blogApp}-theme-color`, themeColor);

  $("html").attr("class", themeMode);
  $("html").css({ "--l-theme-color": themeColor });

  preLog("Lite Theme v1.0.5", "Powered By Himmelbleu");
  preLog("GitHub", "https://github.com/Himmelbleu/cnblogs-theme-lite");
}
