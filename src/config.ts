import $ from "jquery";
import * as DataType from "./types/data-type";

export const DEV_EN: "dev" | "pro" = "pro";

export function devEnv(env: "dev" | "pro") {
  return env === "dev";
}

export let __LITE_CONFIG__: DataType.LiteConfigType;
export let BaseAPI = "";
export let Belongs = "";

export function initLite(dev?: Function, pro?: Function) {
  $("body").append(`<div id="app"></div>`);
  $("html").attr("class", "dark");
  // @ts-ignore
  __LITE_CONFIG__ = window["__LITE_CONFIG__"];
  if (!devEnv(DEV_EN)) {
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
  } else {
    __LITE_CONFIG__ = {
      currentBlogId: 666252,
      currentBlogApp: "Enziandom"
    };
    BaseAPI = "/api";
    dev && dev();
  }
}