import $ from "jquery";
import * as DataType from "./types/data-type";

const DEV_EN: "dev" | "pro" = "pro";

function devEnv(env: "dev" | "pro") {
  return env === "dev";
}

let __LITE_CONFIG__: DataType.LiteConfigType;

if (!devEnv(DEV_EN)) {
  // @ts-ignore
  __LITE_CONFIG__ = window["__LITE_CONFIG__"];
} else {
  __LITE_CONFIG__ = {
    currentBlogId: 666252,
    currentBlogApp: "Enziandom",
    side: {
      avatar: "https://img2.baidu.com/it/u=4193796664,2438723961&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
      signature: "Time tick away, dream faded away!"
    }
  };
}

const Config = {
  __LITE_CONFIG__,
  api: {
    base: devEnv(DEV_EN) ? "/api" : `https://www.cnblogs.com/${__LITE_CONFIG__.currentBlogApp}`
  },
  router: {
    space: devEnv(DEV_EN) ? "" : `/${__LITE_CONFIG__.currentBlogApp}`
  },
  init: () => {
    $("body").append(`<div id="app"></div>`);
    $("html").attr("class", "dark");
  }
};

export default Config;
