import $ from "jquery";

function openWindow(n: any, t: any, i: any, r: any) {
  let u = (screen.width - t) / 2 - r,
    f = (screen.height - i) / 2 - r,
    e = window.open(n, "_blank", "width=" + t + ",height=" + i + ",toolbars=0,resizable=1,left=" + u + ",top=" + f);
  e!.focus();
}

export function openImageUploadWindow(afterUpload: any) {
  try {
    let imgLink = $("#comment-img-link");
    imgLink.focus(() => {
      let url: any = imgLink.val();
      afterUpload ? afterUpload(url.replace("[img]", "![](").replace("[/img]", ")")) : "";
      imgLink.val("");
    });
    let n =
      location.protocol +
      "//upload.cnblogs" +
      location.hostname.substring(location.hostname.lastIndexOf(".")) +
      "/imageuploader/upload?host=www.cnblogs.com&editor=0#comment-img-link";
    document.domain = "cnblogs." + location.hostname.substring(location.hostname.lastIndexOf(".") + 1, location.hostname.length);
    openWindow(n, 450, 120, 200);
  } catch (e) {
    console.error(e);
  }
}
