import hljs from "highlight.js";
import $ from "jquery";
import { makeAnchor } from "@/utils/anchor";

export default class Directive {
  private Vue;

  constructor(Vue: any) {
    this.Vue = Vue;
  }

  parseCode() {
    this.Vue.directive("parse-code", (el: any, binding: any) => {
      let blocks = $(el).find("pre code");

      $(blocks).each((i, elem) => {
        let lang = String(
          $(elem)
            .attr("class")
            ?.match(/(language-\w*){0,1}/g)
        )
          .split(",")[0]
          .split("-")[1]
          .toUpperCase();

        $(elem).parent().prepend(`<span class="code-type">${lang}</span>`);
        hljs.highlightElement(elem);
      });

      if (binding.value) {
        $(el)
          .find("img")
          .each((i, elem) => {
            $(elem).attr("class", "cust-img");
          });
        makeAnchor(el);
      }
    });
  }
}
