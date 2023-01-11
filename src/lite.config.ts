import $ from "jquery";
import * as DataType from "@/types/data-type";

export let __LITE_CONFIG__: DataType.LiteConfigType;
export let BaseAPI = "";
export let Belongs = "";

export function initLite(dev?: Function, pro?: Function) {
  $("body").append(`<div id="app"></div>`);
  $("html").attr("class", "dark");
  // @ts-ignore
  __LITE_CONFIG__ = window["__LITE_CONFIG__"];
  if (import.meta.env.PROD) {
    // @ts-ignore
    __LITE_CONFIG__["currentBlogId"] = currentBlogId;
    // @ts-ignore
    __LITE_CONFIG__["currentBlogApp"] = currentBlogApp;
    // @ts-ignore
    __LITE_CONFIG__["isLogined"] = isLogined;
    // @ts-ignore
    __LITE_CONFIG__["isBlogOwner"] = isBlogOwner;
    Belongs = `/${__LITE_CONFIG__.currentBlogApp}`;
    BaseAPI = `https://www.cnblogs.com/${__LITE_CONFIG__.currentBlogApp}`;
    pro && pro();
  } else if (import.meta.env.DEV) {
    __LITE_CONFIG__ = {
      currentBlogId: import.meta.env.VITE_BLOG_ID,
      currentBlogApp: import.meta.env.VITE_BLOG_APP,
      navor: {
        header: "<span style='font-size: 20px'>CNBLOGS</span>",
        search: true,
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
      links: [
        { href: "http://ts.xcatliu.com/index.html", text: "TypeScript 入门教程" },
        { href: "https://zh.javascript.info/", text: "现代 JavaScript 教程" },
        { href: "https://ts.yayujs.com/", text: "TypeScript 中文文档" },
        {
          href: "https://niceboybao.github.io/2019/03/05/others/books/",
          text: "前端免费高清电子书"
        },
        { href: "http://zhongguose.com/", text: "Chinese Colors" },
        { href: "https://www.webfx.com/tools/emoji-cheat-sheet/", text: "Emoji Cheat Sheet" }
      ],
      books: [
        {
          href: "https://baike.baidu.com/item/%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3JavaScript/19848692",
          text: "深入理解 JavaScript",
          img: "http://img3m1.ddimg.cn/85/1/11120396251-1_w_1.jpg",
          author: "[美]罗彻麦尔",
          rate: 4.5
        },
        {
          href: "https://baike.baidu.com/item/JavaScript%E6%9D%83%E5%A8%81%E6%8C%87%E5%8D%97%EF%BC%88%E5%8E%9F%E4%B9%A6%E7%AC%AC7%E7%89%88%EF%BC%89/57640300",
          text: "JavaScript 权威指南",
          img: "http://img3m0.ddimg.cn/13/17/22722790-1_w_33.jpg",
          author: "[美]弗兰纳根",
          rate: 4
        }
      ]
    };
    BaseAPI = "/api";
    dev && dev();
  }
}
