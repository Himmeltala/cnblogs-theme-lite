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

export function makeAnchor(dom: any) {
  const store = useAnchorStore();
  const title = $(dom).children("h1,h2,h3");
  const anchors = <any>[];

  let h1 = 0;
  let h2 = 0;
  let h3 = 0;
  let level = ``;

  $(title).each((i, e) => {
    const text = $(e).text();
    const id = $(e).attr("id");
    const type: string = $(e)[0].localName;
    const hasLevel = __LITE_CONFIG__.catalog?.level;
    let content = ``;
    level = `${text}`;

    if (type === "h1") {
      h1++;
      h2 = 0;
      h3 = 0;
      if (hasLevel) level = `${h1}.${text}`;
      content = `<div id="anchor-${id}" href="${id}" class="hover">${level}</div>`;
    } else if (type === "h2") {
      h2++;
      h3 = 0;
      if (hasLevel) level = `${h1}.${h2}.${text}`;
      content = `<div id="anchor-${id}" href="${id}" class="hover" style="margin-left: 10px">${level}</div>`;
    } else if (type === "h3") {
      h3++;
      if (hasLevel) level = `${h1}.${h2}.${h3}.${text}`;
      content = `<div id="anchor-${id}" href="${id}" class="hover" style="margin-left: 20px">${level}</div>`;
    }

    anchors.push({ id, text, type, content });
  });

  store.setAnchors(anchors);
}

export function makeAnchorEvent(binding: any) {
  $(`#anchor-${binding.id}`).on("click", e => {
    document.querySelector(`#${binding.id}`).scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest"
    });
  });
}
