import $ from "jquery";
import { preLog, refactorObjectProperties, settingTempl } from "@/utils/common";
import { CustType } from "@/types/data-type";

export let __LITE_CONFIG__: CustType.ILite;
export let blogId = 0;
export let baseAPI = "";
export let blogApp = "";
export let isLogin = true;
export let isOwner = true;
export let userGuid = "";
export let isFollow = false;
export const pcDevice = !/iPhone|iPad|iPod|Android|IEMobile/.test(navigator.userAgent);

/**
 * 初始化博客重要变量，这些变量不能通过 head script 获取，在一些元素属性上。
 */
export function initLiteVars() {
  userGuid = $("#p_b_follow > a")?.attr("onclick")?.split("(")[1]?.split(")")[0]?.replaceAll("'", "") ?? "";
  isFollow = $("#p_b_follow > a")?.text() === "-取消关注" ?? false;
}

/**
 * 初始化自定义博客设置
 */
function initSetting() {
  const setting: CustType.ISetting = JSON.parse(localStorage.getItem(`l-${blogApp}-setting`));
  localStorage.setItem(`l-${blogApp}-setting`, JSON.stringify(refactorObjectProperties(setting, settingTempl)));

  $("html").attr("class", setting.theme.mode);
  $("html").css({
    "--l-theme-color": setting.theme.color,
    "--cabinet-width": `${setting.cabinet.width}rem`,
    "--content-width": `${setting.content.width}vw`,
    "--l-bg-filter": `${setting.background.filter}px`
  });
}

/**
 * 初始化 lite，所有工作准备完成之后，走回调函数，挂载 app。
 * @param dev 开发模式下直接挂载 app
 * @param pro 生产模式下，打包部署之后，给 window 注册一个函数，等待博客园资源加载完成之后再挂载 app。
 */
export function useLite(dev: Function, pro: Function) {
  $("body").append(`<div id="app"></div>`);
  $("body").append(`<div id="l-menu-container"></div>`);
  $("head").append(`<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/hack-font@3.3.0/build/web/hack-subset.css" />`);

  window.oncontextmenu = () => {
    return false;
  };

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
    // @ts-ignore
    __LITE_CONFIG__ = window["__LITE_CONFIG__"];
    initSetting();
    pro();
  } else if (import.meta.env.DEV) {
    blogId = import.meta.env.VITE_BLOG_ID;
    blogApp = import.meta.env.VITE_BLOG_APP;
    baseAPI = "/api";
    __LITE_CONFIG__ = {};
    initSetting();
    dev();
  }

  $("head").append(`<link rel="shortcut icon" href="${__LITE_CONFIG__.icon}">`);
  preLog("GitHub", "https://github.com/Himmelbleu/cnblogs-theme-lite");
  preLog("v1.4.7", "Powered By Himmelbleu using Vue3 & Vite.");
  console.warn(
    "[Lite Warn] 控制台报错或停留在 Loading 屏: 1. 清除浏览器缓存; 2. 打开F12，选择“应用程序”-“存储”-“本地存储”-“博客网址”，右键清除"
  );
}
