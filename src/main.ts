import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.scss";
import "element-plus/theme-chalk/dark/css-vars.css";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "highlight.js/styles/atom-one-dark.css";
import Directive from "./directive";
import Config from "./config";

Config.init();

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

const directive = new Directive(app);
directive.parseCode();

app.use(router);
app.mount("#app");
