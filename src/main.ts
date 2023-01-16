/* Import Vue */
import App from "@/App.vue";
import router from "@/router";
import { createApp } from "vue";
import { createPinia } from "pinia";

/* Import CSS */
// uno style
import "uno.css";
// lite style
import "./style.scss";

/* Import Lite */
import Directive from "./directive";
import { initLite } from "./lite.config";

/* Start */
const app = createApp(App);

app.use(router);
app.use(createPinia());

const dir = new Directive(app);
dir.parseCode();
dir.makeAnchor();

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
