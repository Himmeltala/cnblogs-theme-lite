import $ from "jquery";
import hljs from "highlight.js";
import { makeAnchor, setAnchorClick } from "@/utils/anchor";

export default class Directive {
  private Vue;

  constructor(Vue: any) {
    this.Vue = Vue;
  }

  parseCode() {
    this.Vue.directive("parse-code", {
      mounted(el: any, binding: any) {
        // highlight format
        $(el)
          .find("pre code")
          .each((i, elem) => {
            let lang = String(
              $(elem)
                .attr("class")
                ?.match(/(language-\w*){0,1}/g)
            )
              .split(",")[0]
              .split("-")[1]
              .toUpperCase();
            $(elem).parent().prepend(`<span class="cblock">${lang}</span>`);
            hljs.highlightElement(elem);
          });

        if (binding.value) {
          makeAnchor(el);
        }
      },
      updated() {
        setAnchorClick();
      }
    });
  }
}
