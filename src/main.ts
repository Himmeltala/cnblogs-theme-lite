import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "@/App.vue";
import router from "@/router";

// CSS
import "uno.css";
import "./style.scss";
import "element-plus/theme-chalk/dark/css-vars.css";
import "element-plus/dist/index.css";
import "highlight.js/styles/atom-one-dark.css";

// Lite
import Directive from "./directive";
import { initLite } from "./lite.config";

const app = createApp(App);

app.use(router);
app.use(createPinia());
new Directive(app).parseCode();

initLite(
  () => {
    app.mount("#app");
  },
  () => {
    // @ts-ignore
    window["__LITE_CONFIG__"].onLoaded = () => {
      app.mount("#app");
    };
  }
);
