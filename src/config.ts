import $ from "jquery";

// 是否开启开发模式
const DEV_EN: "dev" | "pro" = "dev";

// 判断当前环境
function devEnv(env: "dev" | "pro") {
  return env === "dev";
}

// Lite 主题配置
let __LITE_CONFIG__: {
  blogName?: string;
  blogId?: number;
  isLogined?: boolean;
  isBlogOwner?: boolean;
  board?: {
    signature?: string;
    tag?: string;
    qq?: string;
    email?: string;
    company?: string;
  },
  navs?: { href?: string; text?: string; svg?: string; img?: string; }[],
  github?: string;
  gitee?: string;
  bilibili?: string;
};

if (!devEnv(DEV_EN)) {
  // @ts-ignore
  __LITE_CONFIG__ = window["__LITE_CONFIG__"];
} else {
  // 处于开发模式下，需要把你的博客信息手动写到下面
  __LITE_CONFIG__ = {
    blogName: "Enziandom",
    github: "https://www.github.com/enziandom",
    gitee: "https://www.gitee.com/enziandom",
    bilibili: "https://space.bilibili.com/7021686",
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
        href: "https://gitee.com/Enziandom",
        svg: `<path d="M512 1024C230.4 1024 0 793.6 0 512S230.4 0 512 0s512 230.4 512 512-230.4 512-512 512z m259.2-569.6H480c-12.8 0-25.6 12.8-25.6 25.6v64c0 12.8 12.8 25.6 25.6 25.6h176c12.8 0 25.6 12.8 25.6 25.6v12.8c0 41.6-35.2 76.8-76.8 76.8h-240c-12.8 0-25.6-12.8-25.6-25.6V416c0-41.6 35.2-76.8 76.8-76.8h355.2c12.8 0 25.6-12.8 25.6-25.6v-64c0-12.8-12.8-25.6-25.6-25.6H416c-105.6 0-188.8 86.4-188.8 188.8V768c0 12.8 12.8 25.6 25.6 25.6h374.4c92.8 0 169.6-76.8 169.6-169.6v-144c0-12.8-12.8-25.6-25.6-25.6z""></path>`
      },
      {
        href: "https://space.bilibili.com/7021686",
        svg: `<path d="M306.005333 117.632L444.330667 256h135.296l138.368-138.325333a42.666667 42.666667 0 0 1 60.373333 60.373333L700.330667 256H789.333333A149.333333 149.333333 0 0 1 938.666667 405.333333v341.333334a149.333333 149.333333 0 0 1-149.333334 149.333333h-554.666666A149.333333 149.333333 0 0 1 85.333333 746.666667v-341.333334A149.333333 149.333333 0 0 1 234.666667 256h88.96L245.632 177.962667a42.666667 42.666667 0 0 1 60.373333-60.373334zM789.333333 341.333333h-554.666666a64 64 0 0 0-63.701334 57.856L170.666667 405.333333v341.333334a64 64 0 0 0 57.856 63.701333L234.666667 810.666667h554.666666a64 64 0 0 0 63.701334-57.856L853.333333 746.666667v-341.333334A64 64 0 0 0 789.333333 341.333333zM341.333333 469.333333a42.666667 42.666667 0 0 1 42.666667 42.666667v85.333333a42.666667 42.666667 0 0 1-85.333333 0v-85.333333a42.666667 42.666667 0 0 1 42.666666-42.666667z m341.333334 0a42.666667 42.666667 0 0 1 42.666666 42.666667v85.333333a42.666667 42.666667 0 0 1-85.333333 0v-85.333333a42.666667 42.666667 0 0 1 42.666667-42.666667z"></path>`
      }
    ]
  };
}

// 导出配置对象，在项目中使用
const Config = {
  __LITE_CONFIG__,
  api: {
    base: devEnv(DEV_EN) ? "/api" : `https://www.cnblogs.com/${__LITE_CONFIG__.blogName}`
  },
  router: {
    space: devEnv(DEV_EN) ? "" : `/${__LITE_CONFIG__.blogName}`
  },
  init: () => {
    $("body").append(`<div id="app"></div>`);
    $("html").attr("class", "dark");
  }
};

export default Config;
