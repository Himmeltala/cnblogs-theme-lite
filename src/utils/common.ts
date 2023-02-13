/**
 * 提供常用工具
 *
 * @author Himmelbleu
 * @date 2022 年 12 月 1 日
 * @url https://www.cnblogs.com/Himmelbleu/#/
 */

import $ from "jquery";
import { useAnchorStore } from "@/store";
import { __LITE_CONFIG__ } from "@/lite.config";

/**
 * 关闭 loading 屏
 */
export function closeLoader() {
  $(".light-loading, .dark-loading").fadeOut();
}

/**
 * 打开博客园上传图片的窗口
 */
function openWindow(w: string, t: number, i: number, r: number) {
  const left = (screen.width - t) / 2 - r;
  const top = (screen.height - i) / 2 - r;
  const hatch = window.open(w, "_blank", `width=${t},height=${i},toolbars=0,resizable=1,left=${left},top=${top}`);
  hatch!.focus();
}

/**
 * 打开博客园上传图片的 API，上传完成之后，图片路径要回显到 textarea 上。
 *
 * @param el 图片上传成功之后返回的链接赋值给 textarea 元素。
 * @param onUploaded 选择符合规则的本地图片之后，小窗关闭返回一个图片连接到 el textarea 元素中，获取 focus 得到图片链接该回调函数可向上传递该链接。
 */
export function openImageUploadWindow(el: string, onUploaded: (img: string) => void) {
  try {
    const elem = $(`#${el}`);
    elem.focus(() => {
      const imgUrl = elem.val() + "";
      onUploaded ? onUploaded(imgUrl.replace("[img]", "![](").replace("[/img]", ")")) : "";
      elem.val("");
    });
    const w = `${location.protocol}//upload.cnblogs${location.hostname.substring(
      location.hostname.lastIndexOf(".")
    )}/imageuploader/upload?host=www.cnblogs.com&editor=0#${el}`;
    document.domain = `cnblogs.${location.hostname.substring(
      location.hostname.lastIndexOf(".") + 1,
      location.hostname.length
    )}`;
    openWindow(w, 450, 120, 200);
  } catch (e) {
    console.error(e);
  }
}

/**
 * 美化 console.log
 *
 * @param title 标题
 * @param msg 信息
 */
export function preLog(title: string, msg: string) {
  console.log(
    `%c${title}%c${msg}`,
    "background: #409eff; color: #fff; border-radius: 3px 0 0 3px; padding: 10px",
    "background: #707070; color: #fff; border-radius: 0 3px 3px 0; padding: 10px"
  );
}

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
