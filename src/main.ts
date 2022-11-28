import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.css";

import $ from "jquery";
$("body").prepend(`<div id="app"></div>`);
$("head").append(`
  <script type="module" crossorigin src="https://blog-static.cnblogs.com/files/blogs/666252/index.js"></script>
  <link rel="stylesheet" href="https://blog-static.cnblogs.com/files/blogs/666252/index.css">
`);

createApp(App).use(router).mount("#app");
