import $ from "jquery";

const config = {
  api: {
    // base: "/api"
    base: "https://www.cnblogs.com/Enziandom"
  },
  router: {
    space: "/Enziandom"
    // space: ""
  },
  init: () => {
    $("#hljs-script").remove();
    $("#highlighter-theme-atom-one-dark").remove();
    $("#top_nav").remove();
    $("#home").remove();
    $("body").append(`<div id="app"></div>`);
    $("head > link").remove();
    $("head").prepend(`
      <link rel="stylesheet" href="https://blog-static.cnblogs.com/files/blogs/666252/index.css" />
    `);
    $("html").attr("class", "dark");
  }
};

export default config;
