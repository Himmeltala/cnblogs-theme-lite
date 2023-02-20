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
export const pcDevice = !/iPhone|iPad|iPod|Android|IEMobile/.test(navigator.userAgent);

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
      github: "https://github.com/Himmelbleu",
      cabinet: {
        avatar: "https://img0.baidu.com/it/u=331777869,3713462458&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
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
            svg: `<path d="M306.005333 117.632L444.330667 256h135.296l138.368-138.325333a42.666667 42.666667 0 0 1 60.373333 60.373333L700.330667 256H789.333333A149.333333 149.333333 0 0 1 938.666667 405.333333v341.333334a149.333333 149.333333 0 0 1-149.333334 149.333333h-554.666666A149.333333 149.333333 0 0 1 85.333333 746.666667v-341.333334A149.333333 149.333333 0 0 1 234.666667 256h88.96L245.632 177.962667a42.666667 42.666667 0 0 1 60.373333-60.373334zM789.333333 341.333333h-554.666666a64 64 0 0 0-63.701334 57.856L170.666667 405.333333v341.333334a64 64 0 0 0 57.856 63.701333L234.666667 810.666667h554.666666a64 64 0 0 0 63.701334-57.856L853.333333 746.666667v-341.333334A64 64 0 0 0 789.333333 341.333333zM341.333333 469.333333a42.666667 42.666667 0 0 1 42.666667 42.666667v85.333333a42.666667 42.666667 0 0 1-85.333333 0v-85.333333a42.666667 42.666667 0 0 1 42.666666-42.666667z m341.333334 0a42.666667 42.666667 0 0 1 42.666666 42.666667v85.333333a42.666667 42.666667 0 0 1-85.333333 0v-85.333333a42.666667 42.666667 0 0 1 42.666667-42.666667z"></path>`
          }
        ]
      },
      catalog: {
        level: true
      },
      graph: {
        alpha: 0.85,
        sides: 5,
        layer: 5,
        lineWidth: 1,
        textSize: 0.8,
        data: [
          { title: "CSS", star: 4 },
          { title: "Vue", star: 4 },
          { title: "Java", star: 3 },
          { title: "JS", star: 4 },
          { title: "TS", star: 3 }
        ]
      },
      links: [
        { href: "http://ts.xcatliu.com/index.html", text: "TypeScript 入门教程" },
        { href: "https://zh.javascript.info/", text: "现代 JavaScript 教程" },
        { href: "https://ts.yayujs.com/", text: "TypeScript 中文文档" },
        { href: "https://niceboybao.github.io/2019/03/05/others/books/", text: "前端免费高清电子书" },
        { href: "http://zhongguose.com/", text: "Chinese Colors" },
        { href: "https://www.webfx.com/tools/emoji-cheat-sheet/", text: "Emoji Cheat Sheet" }
      ],
      books: [
        {
          href: "https://wangdoc.com/es6/",
          text: "ECMAScript 6 教程",
          img: "http://t15.baidu.com/it/u=2492671040,2684713126&fm=224&app=112&f=JPEG?w=500&h=500",
          author: "阮一峰",
          rate: 5
        },
        {
          href: "https://baike.baidu.com/item/%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3JavaScript/19848692",
          text: "深入理解 JavaScript",
          img: "https://img3m1.ddimg.cn/85/1/11120396251-1_w_1.jpg",
          author: "[美]罗彻麦尔",
          rate: 4.5
        },
        {
          href: "https://baike.baidu.com/item/JavaScript%E6%9D%83%E5%A8%81%E6%8C%87%E5%8D%97%EF%BC%88%E5%8E%9F%E4%B9%A6%E7%AC%AC7%E7%89%88%EF%BC%89/57640300",
          text: "JavaScript 权威指南",
          img: "https://img3m0.ddimg.cn/13/17/22722790-1_w_33.jpg",
          author: "[美]弗兰纳根",
          rate: 4
        }
      ]
    };
    dev();
  }

  $("head").append(`<link rel="shortcut icon" href="${__LITE_CONFIG__.icon}">`);

  let themeMode = localStorage.getItem(`l-${blogApp}-theme-mode`);
  if (!themeMode) {
    themeMode = "dark";
    localStorage.setItem(`l-${blogApp}-theme-mode`, themeMode);
  }

  let themeColor = localStorage.getItem(`l-${blogApp}-theme-color`);
  if (!themeColor) {
    themeColor = "#409eff";
    localStorage.setItem(`l-${blogApp}-theme-color`, themeColor);
  }

  $("html").attr("class", themeMode);
  $("html").css({ "--l-theme-color": themeColor });
  preLog("Lite Theme v1.3.0", "Powered By Himmelbleu");
  preLog("GitHub", "https://github.com/Himmelbleu/cnblogs-theme-lite");
}
