import $ from "jquery";
import { useAnchorStore } from "@/store";

export function makeAnchor(dom: string) {
  const anchorStore = useAnchorStore();
  let h = $(dom).children()
    .not("p")
    .not("table")
    .not("img")
    .not("ul")
    .not("ol")
    .not("pre");
  let anchors = <any>[];
  let clasps = <any>[];

  let h1 = 0;
  let h2 = 0;
  let h3 = 0;

  $(h).each((i, e) => {
    let top = $(e).offset()?.top;
    let type: string = $(e)[0].localName;
    let text = $(e).attr("id");
    let content = ``;

    if (type === "h1") {
      h1++;
      h2 = 0;
      h3 = 0;
      content = `<a class="${text} anchor">${h1} ${text}</a>`;
    } else if (type === "h2") {
      h2++;
      h3 = 0;
      content = `<a class="${text} anchor" style="margin-left: 10px">${h1}.${h2} ${text}</a>`;
    } else if (type === "h3") {
      h3++;
      content = `<a class="${text} anchor" style="margin-left: 20px">${h1}.${h2}.${h3} ${text}</a>`;
    }

    clasps.push({ id: text, top });
    anchors.push({ text, type, content });
  });

  let lastAnchor: any;

  for (const item of clasps) {
    $(".side-item .catalog").find(`.${item.id}`).on("click", (e) => {
      $("#content").animate({ scrollTop: item.top }, 800, "linear");
    });
  }

  $("#content").on("scroll", function(e) {
    const scrollTop = e.target.scrollTop;
    for (const item of clasps) {
      if (scrollTop >= item.top - 75 && scrollTop <= item.top) {
        let anchor = $(".side-item .catalog").find(`.${item.id}`);
        if (lastAnchor) $(lastAnchor).removeClass("anchor-active");
        $(anchor).addClass("anchor-active");
        lastAnchor = anchor;
      }
    }
  });

  anchorStore.setAnchors(anchors);
}