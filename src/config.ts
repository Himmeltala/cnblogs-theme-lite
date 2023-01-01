import $ from "jquery";
import * as DataType from "./types/data-type";

const DEV_EN: "dev" | "pro" = "dev";

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
    graph: {
      alpha: 0.85,
      sides: 5,
      layer: 5,
      lineWidth: 1,
      textSize: 12,
      fillColor: "#409eff",
      strokeColor: "#A7A7A7",
      lineColor: "#A7A7A7",
      textColor: "#A7A7A7",
      data: [
        { title: "Css", star: 4 },
        { title: "Vue", star: 4 },
        { title: "Java", star: 3 },
        { title: "JS/TS", star: 4 },
        { title: "Android", star: 3 }
      ]
    },
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
