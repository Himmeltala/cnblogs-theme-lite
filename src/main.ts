import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

// CSS
import "./style.scss";
import "./scss/common.scss";
import "element-plus/theme-chalk/dark/css-vars.css";
import "element-plus/dist/index.css";
import "highlight.js/styles/atom-one-dark.css";

import Directive from "./directive";
import { initLite } from "./config";

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

new Directive(app).parseCode();

app.use(router);
app.use(createPinia());

initLite(() => {
  app.mount("#app");
}, () => {
  // @ts-ignore
  window["__LITE_CONFIG__"].onLoaded = () => {
    app.mount("#app");
  };
});