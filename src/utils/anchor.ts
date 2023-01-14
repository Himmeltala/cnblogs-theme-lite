/**
 * 制作随笔目录，以及点击目录跳转对应的标题
 *
 * @author Himmelbleu
 * @since 1.0
 * @date 2022 年 12 月 1 日
 * @url https://www.cnblogs.com/Himmelbleu/#/
 */

import $ from "jquery";
import { useAnchorStore } from "@/store";
import { __LITE_CONFIG__ } from "@/lite.config";

const clasps: any = [];

export function makeAnchor(dom: string) {
  const anchorStore = useAnchorStore();
  const title = $(dom).children().not("p").not("table").not("img").not("ul").not("ol").not("pre");
  const anchors:any = [];

  let h1 = 0;
  let h2 = 0;
  let h3 = 0;
  let level = ``;

  $(title).each((i, e) => {
    const id = $(e).attr("id");
    const text = $(e).text();
    const top = $(e).offset()?.top;
    const type: string = $(e)[0].localName;
    const hasLevel = __LITE_CONFIG__.catalog?.level;
    let content = ``;
    level = `${text}`;

    if (type === "h1") {
      h1++;
      h2 = 0;
      h3 = 0;
      if (hasLevel) level = `${h1}.${text}`;
      content = `<a id="anchor-${id}" class="hover">${level}</a>`;
    } else if (type === "h2") {
      h2++;
      h3 = 0;
      if (hasLevel) level = `${h1}.${h2}.${text}`;
      content = `<a id="anchor-${id}" class="hover" style="margin-left: 10px">${level}</a>`;
    } else if (type === "h3") {
      h3++;
      if (hasLevel) level = `${h1}.${h2}.${h3}.${text}`;
      content = `<a id="anchor-${id}" class="hover" style="margin-left: 20px">${level}</a>`;
    }

    clasps.push({ id, top });
    anchors.push({ text, type, content });
  });

  let tempAnchor: any;

  $("#h-content").on("scroll", function (e) {
    const scrollTop = e.target.scrollTop;
    for (const item of clasps) {
      if (scrollTop >= item.top - 75 && scrollTop <= item.top) {
        let anchor = $(`#anchor-${item.id}`);
        if (tempAnchor) $(tempAnchor).removeClass("anchor-active");
        $(anchor).addClass("anchor-active");
        tempAnchor = anchor;
      }
    }
  });

  anchorStore.setAnchors(anchors);
}

export function setAnchorClick() {
  for (const item of clasps) {
    $(`#anchor-${item.id}`).on("click", e => {
      $("#h-content").animate({ scrollTop: item.top }, 800, "linear");
    });
  }
}
