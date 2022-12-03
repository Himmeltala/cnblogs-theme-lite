import hljs from "highlight.js";
import $ from "jquery";

export default class Directive {
  private Vue;

  constructor(Vue: any) {
    this.Vue = Vue;
  }

  mathJax(MathJax: any) {
    if (!MathJax) this.mathJax(MathJax);
    MathJax.startup.promise
      .then(() => {
        return MathJax.typesetPromise();
      })
      .catch((err: any) => console.error(`MathJax render failed => ${err}`));
  }

  parseCode() {
    this.Vue.directive("parse-code", (el: any, bindig: any) => {
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

      if (bindig.value) {
        $(el)
          .find("img")
          .each((i, elem) => {
            $(elem).attr("class", "cust-img");
          });
      }

      let MathJax: any = window.MathJax;
      this.mathJax(MathJax);
    });
  }
}
