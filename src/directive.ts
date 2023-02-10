import $ from "jquery";
import hljs from "highlight.js";
import { makeAnchor, makeAnchorEvent } from "@/utils/common";

export function useDirective(Vue: any) {
  Vue.directive("hljs", {
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
    }
  });

  Vue.directive("mathjax", {
    mounted(el: any) {
      // @ts-ignore
      const MathJax = window.MathJax;
      const mathDom = document.querySelectorAll(".math");

      if (MathJax && mathDom.length > 0) {
        MathJax.startup.promise = MathJax.startup.promise
          .then(() => MathJax.typesetPromise(mathDom))
          .catch((err: any) => console.error(err));
      }
    }
  });

  Vue.directive("anchor", {
    mounted(el: any) {
      makeAnchor(el);
    }
  });

  Vue.directive("anchor-event", {
    mounted(el: any, binding: any) {
      makeAnchorEvent(binding.value);
    }
  });
}
