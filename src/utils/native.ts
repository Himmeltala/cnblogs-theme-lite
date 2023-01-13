import $ from "jquery";

function openWindow(n: string, t: number, i: number, r: number) {
  let u = (screen.width - t) / 2 - r,
    f = (screen.height - i) / 2 - r,
    e = window.open(n, "_blank", `width=${t},height=${i},toolbars=0,resizable=1,left=${u},top=${f}`);
  e!.focus();
}

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
