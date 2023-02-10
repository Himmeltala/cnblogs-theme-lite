import $ from "jquery";
import hljs from "highlight.js";
import { makeAnchor, makeAnchorEvent } from "@/utils/common";

export function useDirective(Vue: any) {
  Vue.directive("parse-code", {
    mounted(el: any) {
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

      // @ts-ignore
      window.MathJax.startup.promise = MathJax.startup.promise
        // @ts-ignore
        .then(() => window.MathJax.typesetPromise(document.querySelectorAll(".math")))
        .catch((err: any) => console.error(err));
    }
  });

  Vue.directive("anchor", {
    mounted(el: any) {
      makeAnchor(el);
    }
  });

  Vue.directive("anchor-events", {
    mounted(el: any, binding: any) {
      makeAnchorEvent(binding.value);
    }
  });
}
