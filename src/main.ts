import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.scss";
import "element-plus/theme-chalk/dark/css-vars.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

// import $ from "jquery";
// $("head").empty();
// $("body").empty();
// $("body").prepend(`<div id="app"></div>`);
// $("head").prepend(`
//   <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/hack-font@3/build/web/hack.css" />
//   <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/hack-font@3/build/web/hack-subset.css" />
//   <script type="module" crossorigin src="https://blog-static.cnblogs.com/files/blogs/666252/index.js"></script>
//   <link rel="stylesheet" href="https://blog-static.cnblogs.com/files/blogs/666252/index.css">
// `);
// $("html").attr("class", "dark");

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.directive("parse-code", (el, bindig) => {
  let blocks = el.querySelectorAll("pre code");
  let imgs = el.querySelectorAll("img");
  blocks.forEach((block: any) => {
    hljs.highlightBlock(block);
  });
});

app.use(router);
app.mount("#app");
