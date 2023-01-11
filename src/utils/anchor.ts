import $ from "jquery";
import { useAnchorStore } from "@/store";
import { __LITE_CONFIG__ } from "@/lite.config";

export function makeAnchor(dom: string) {
  const anchorStore = useAnchorStore();
  let h = $(dom).children().not("p").not("table").not("img").not("ul").not("ol").not("pre");
  let anchors = <any>[];
  let clasps = <any>[];

  let h1 = 0;
  let h2 = 0;
  let h3 = 0;
  let level = ``;

  $(h).each((i, e) => {
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
      content = `<a class="${id} anchor hover">${level}</a>`;
    } else if (type === "h2") {
      h2++;
      h3 = 0;
      if (hasLevel) level = `${h1}.${h2}.${text}`;
      content = `<a class="${id} anchor hover" style="margin-left: 10px">${level}</a>`;
    } else if (type === "h3") {
      h3++;
      if (hasLevel) level = `${h1}.${h2}.${h3}.${text}`;
      content = `<a class="${id} anchor hover" style="margin-left: 20px">${level}</a>`;
    }

    clasps.push({ id, top });
    anchors.push({ text, type, content });
  });

  let lastAnchor: any;

  for (const item of clasps) {
    $(".catalog")
      .find(`.${item.id}`)
      .on("click", e => {
        $("#content").animate({ scrollTop: item.top }, 800, "linear");
      });
  }

  $("#content").on("scroll", function (e) {
    const scrollTop = e.target.scrollTop;
    for (const item of clasps) {
      if (scrollTop >= item.top - 75 && scrollTop <= item.top) {
        let anchor = $(".catalog").find(`.${item.id}`);
        if (lastAnchor) $(lastAnchor).removeClass("anchor-active");
        $(anchor).addClass("anchor-active");
        lastAnchor = anchor;
      }
    }
  });

  anchorStore.setAnchors(anchors);
}
