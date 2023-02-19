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
        .each((i, ele) => {
          const height = $(ele).height();
          if (height > 380) {
            $(ele).addClass("hight-code");

            const click = $(`<div class="fsz-0.9 l-thr-color hover noselect">展开</div>`);
            const modal = $(`<div class="hight-code-modal f-c-c rd-2"></div>`);
            modal.prepend(click);

            click.on("click", () => {
              let counter = 9;
              let cHeight = 0;

              const interval = setInterval(() => {
                cHeight += height / 10;
                $(ele).height(cHeight);
                counter--;
                if (counter == 0) {
                  $(ele).height(height);
                  clearInterval(interval);
                  $(ele).removeClass("hight-code");
                  $(ele).removeClass("hight-code-modal");
                  modal.addClass("remove-hight-code-modal");
                }
              }, 10);
            });

            $(ele).parent().prepend(modal);
          }
          const lang = String(
            $(ele)
              .attr("class")
              ?.match(/(language-\w*){0,1}/g)
          )
            .split(",")[0]
            .split("-")[1]
            .toUpperCase();
          $(ele).parent().prepend(`<span class="cblock">${lang}</span>`);
          hljs.highlightElement(ele);
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
      const nodes = document.querySelectorAll(".math");

      if (MathJax && nodes.length > 0) {
        MathJax.startup.promise = MathJax.startup.promise.then(() => MathJax.typesetPromise(nodes)).catch((err: any) => console.error(err));
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

/**
 * 通过随笔 html，获取里面有多少个 h 标签，制作一个目录
 *
 * @param dom 随笔内容的 html
 */
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
      content = `<div id="catalog-${id}" class="hover">${item}</div>`;
    } else if (type === "h2") {
      h2++;
      h3 = 0;
      if (level) item = `${h1}.${h2}.${item}`;
      content = `<div id="catalog-${id}" class="hover" style="margin-left: 10px">${item}</div>`;
    } else if (type === "h3") {
      h3++;
      if (level) item = `${h1}.${h2}.${h3}.${item}`;
      content = `<div id="catalog-${id}" class="hover" style="margin-left: 20px">${item}</div>`;
    }

    catalog.push({ id, content });
  });

  store.setCatalog(catalog);
}

/**
 * 列表渲染目录项，获取目录对应文章中的标题，添加一个跳转位置的点击事件。
 *
 * @param item 目录项
 */
function makeAnchorEvent(item: any) {
  $(`#catalog-${item.id}`).on("click", e => {
    document.querySelector(`#${item.id}`).scrollIntoView();
  });
}
