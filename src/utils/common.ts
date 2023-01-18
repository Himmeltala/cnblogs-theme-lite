/**
 * 提供常用工具
 *
 * @author Himmelbleu
 * @since 1.0
 * @date 2022 年 12 月 1 日
 * @url https://www.cnblogs.com/Himmelbleu/#/
 */

import $ from "jquery";

/**
 * 关闭 loading 屏
 */
export function closeLoader() {
  $(".light-loading, .dark-loading").fadeOut();
}

/**
 * 打开博客园上传图片的窗口
 *
 * @param w 窗口 url
 * @param t 宽度
 * @param i 高度
 * @param r
 */
function openWindow(w: string, t: number, i: number, r: number) {
  const left = (screen.width - t) / 2 - r;
  const top = (screen.height - i) / 2 - r;
  const hatch = window.open(
    w,
    "_blank",
    `width=${t},height=${i},toolbars=0,resizable=1,left=${left},top=${top}`
  );
  hatch!.focus();
}

/**
 * 打开博客园上传图片的 API，打开一个窗口，上传图片，上传完成之后，图片路径要回显到 textarea 上。
 *
 * @param el textarea 的 id
 * @param afterUpload 上传完成之后，通过该回调函数获取图片路径
 */
export function openImageUploadWindow(el: string, afterUpload: any) {
  try {
    const elem = $(`#${el}`);
    elem.focus(() => {
      let imgUrl: any = elem.val();
      afterUpload ? afterUpload(imgUrl.replace("[img]", "![](").replace("[/img]", ")")) : "";
      elem.val("");
    });
    let w = `${location.protocol}//upload.cnblogs${location.hostname.substring(
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
