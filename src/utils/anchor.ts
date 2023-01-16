/**
 * 制作随笔目录，以及点击目录跳转对应的标题
 *
 * @author Himmelbleu
 * @since 1.0
 * @date 2022 年 12 月 1 日
 * @url https://www.cnblogs.com/Himmelbleu/#/
 */

import $ from "jquery";
import { storeToRefs } from "pinia";
import { useAnchorStore } from "@/store";
import { __LITE_CONFIG__ } from "@/lite.config";

// 制作锚点，用在随笔页面
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

// 制作锚点事件（滑动页面、点击锚点进行跳转）
export function makeAnchorEvent(binding: any) {
  console.log(binding);
  $(`#anchor-${binding.id}`).on("click", e => {
    console.log("click");

    document.querySelector(`#${binding.id}`).scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  });
}

export function navor(top?: number) {
  $("#lite-content").animate({ scrollTop: top }, 200, "linear");
}

interface ContentScroll {
  (scrollTop?: number, bottomHeight?: number): void;
}

export function onContentScroll(atTop?: ContentScroll, atMiddle?: ContentScroll) {
  let times = false;
  let realChildHeight = 0;
  let inTop = 0;
  let inMiddle = 0;

  $("#lite-content").on("scroll", function (e) {
    const scrollTop = e.target.scrollTop;
    if (!times) {
      // @ts-ignore
      realChildHeight = e.target.firstChild.clientHeight - e.target.clientHeight;
      inTop = realChildHeight * 0.5;
      inMiddle = realChildHeight;
      times = true;
    }

    if (scrollTop <= inTop) {
      atTop && atTop(scrollTop, realChildHeight);
    } else if (scrollTop > inTop && scrollTop <= inMiddle) {
      atMiddle && atMiddle(scrollTop, realChildHeight);
    }
  });
}
