import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.scss";
import "element-plus/theme-chalk/dark/css-vars.css";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import $ from "jquery";

$("#hljs-script").remove();
$("#highlighter-theme-atom-one-dark").remove();
$("#top_nav").remove();
$("#home").remove();
$("body").prepend(`<div id="app"></div>`);
$("head").prepend(`
  <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/hack-font@3/build/web/hack.css" />
  <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/hack-font@3/build/web/hack-subset.css" />
  <script type="module" crossorigin src="https://blog-static.cnblogs.com/files/blogs/666252/index.js"></script>
  <link rel="stylesheet" href="https://blog-static.cnblogs.com/files/blogs/666252/index.css">
`);
$("html").attr("class", "dark");

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.directive("parse-code", (el, bindig) => {
  let blocks = $(el).find("pre code");
  $(el)
    .find("img")
    .each((i, elem) => {
      $(elem).attr("class", "cust-img");
    });

  $(blocks).each((i, elem) => {
    $(elem)
      .parent()
      .prepend(`<span class="code-type">${$(elem).attr("class")?.split("language-")[1].toUpperCase()}</span>`);
    hljs.highlightElement(elem);
  });
});

app.use(router);
app.mount("#app");
