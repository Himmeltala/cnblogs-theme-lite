import $ from "jquery";
import hljs from "highlight.js";
import { makeAnchor, makeAnchorEvent } from "@/utils/common";

/**
 * 注册自定义指令
 *
 * @param Vue 传入 Vue 对象
 */
export function useDirective(Vue: any) {
  /**
   * 对 pre code 代码进行格式化
   */
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

  /**
   * 对指定元素下的标签进行数学公式格式化
   */
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

  /**
   * 制作目录锚点
   */
  Vue.directive("anchor", {
    mounted(el: any) {
      makeAnchor(el);
    }
  });

  /**
   * 制作目录锚点的点击事件
   */
  Vue.directive("anchor-event", {
    mounted(el: any, binding: any) {
      makeAnchorEvent(binding.value);
    }
  });
}
