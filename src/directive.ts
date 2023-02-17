import $ from "jquery";
import hljs from "highlight.js";
import { useCatalogStore } from "@/store";
import { __LITE_CONFIG__ } from "@/lite.config";

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
  Vue.directive("catalog", {
    mounted(el: any) {
      makeAnchor(el);
    }
  });

  /**
   * 制作目录锚点的点击事件
   */
  Vue.directive("cateve", {
    mounted(el: any, binding: any) {
      makeAnchorEvent(binding.value);
    }
  });
}

function makeAnchor(dom: any) {
  const store = useCatalogStore();
  const title = $(dom).children("h1,h2,h3");
  const catalog = <any>[];

  let h1 = 0;
  let h2 = 0;
  let h3 = 0;
  let item = ``;

  $(title).each((i, e) => {
    const id = $(e).attr("id");
    const type: string = $(e)[0].localName;
    const level = __LITE_CONFIG__.catalog?.level;
    let content = ``;
    item = `${$(e).text()}`;

    if (type === "h1") {
      h1++;
      h2 = 0;
      h3 = 0;
      if (level) item = `${h1}.${item}`;
      content = `<div id="anchor-${id}" class="hover">${item}</div>`;
    } else if (type === "h2") {
      h2++;
      h3 = 0;
      if (level) item = `${h1}.${h2}.${item}`;
      content = `<div id="anchor-${id}" class="hover" style="margin-left: 10px">${item}</div>`;
    } else if (type === "h3") {
      h3++;
      if (level) item = `${h1}.${h2}.${h3}.${item}`;
      content = `<div id="anchor-${id}" class="hover" style="margin-left: 20px">${item}</div>`;
    }

    catalog.push({ id, content });
  });

  store.setCatalog(catalog);
}

function makeAnchorEvent(catalogItem: any) {
  $(`#anchor-${catalogItem.id}`).on("click", e => {
    document.querySelector(`#${catalogItem.id}`).scrollIntoView();
  });
}
