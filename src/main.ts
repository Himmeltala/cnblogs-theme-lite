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
import { useLite, setLite } from "./lite.config";

/* Start */
const app = createApp(App);

app.use(router);
app.use(createPinia());

useDirective(app);
useLite(
  () => app.mount("#app"),
  () =>
    // @ts-ignore
    (window["__LITE_CONFIG__"].onLoaded = () => {
      setLite();
      app.mount("#app");
    })
);
