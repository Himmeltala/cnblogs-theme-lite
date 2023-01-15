/* Import Vue */
import App from "@/App.vue";
import router from "@/router";
import { createApp } from "vue";
import { createPinia } from "pinia";

/* Import CSS */
// lite style
import "./style.scss";
// uno style
import "uno.css";

/* Import Lite */
import Directive from "./directive";
import { initLite } from "./lite.config";

/* Start */
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
