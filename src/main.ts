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
import config from "./config";

config.init();

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
