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
import { useDirective } from "./directive";
import { useLite, initLiteVars, blogApp } from "./lite.config";

/* Start */
const app = createApp(App);

app.use(router);
app.use(createPinia());

useDirective(app);
useLite(
  () => app.mount("#app"),
  () => {
    const settings = JSON.parse(localStorage.getItem(`l-${blogApp}-settings`));
    if (settings.cabinet.remote == true) {
      initLiteVars();
      app.mount("#app");
    } else {
      // @ts-ignore
      window["__LITE_CONFIG__"].onLoaded = () => {
        initLiteVars();
        app.mount("#app");
      };
    }
  }
);
