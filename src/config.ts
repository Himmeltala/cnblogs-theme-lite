import $ from "jquery";

const DEV_EN: "dev" | "pro" = "pro";

function devEnv(env: "dev" | "pro") {
  return env === "dev";
}

const config = {
  api: {
    base: devEnv(DEV_EN) ? "/api" : "https://www.cnblogs.com/Enziandom"
  },
  router: {
    space: devEnv(DEV_EN) ? "" : "/Enziandom"
  },
  init: () => {
    $("body").append(`<div id="app"></div>`);
    $("html").attr("class", "dark");
  }
};

export default config;
