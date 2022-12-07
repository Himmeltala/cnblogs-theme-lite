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
    github: "https://github.com/Enziandom",
    radar: {
      alpha: 0.85,
      sides: 6,
      layer: 5,
      lineWidth: 1,
      textSize: 14,
      fillColor: "#409eff",
      lineColor: "#A7A7A7",
      textColor: "#A7A7A7",
      data: [
        { title: "js", star: 4 },
        { title: "ts", star: 2 },
        { title: "html", star: 4 },
        { title: "css", star: 4 },
        { title: "vue", star: 4 },
        { title: "jq", star: 4 }
      ]
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
