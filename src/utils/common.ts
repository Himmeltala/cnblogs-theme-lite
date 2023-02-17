/**
 * 提供常用工具
 *
 * @author Himmelbleu
 * @date 2022 年 12 月 1 日
 * @url https://www.cnblogs.com/Himmelbleu/#/
 */

import $ from "jquery";
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
    document.domain = `cnblogs.${location.hostname.substring(location.hostname.lastIndexOf(".") + 1, location.hostname.length)}`;
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

/**
 * 把一串数字转换为“xx万”的形式
 *
 * @param num 被格式化的数字
 */
export function parseUnit(num: string): string {
  num = num.trim();
  if (num.length < 5) {
    return (Number(num) / 1000).toFixed(2);
  } else if (num.length >= 5 && num.length <= 7) {
    return (Number(num) / 10000).toFixed(2) + "万";
  }
}

/**
 * 替换字符串，默认替换 ""。传递 regExps，一个正则表达式数组。
 *
 * @param source 被修剪的字符串
 * @param regExps 正则表达式，找到匹配的字符串，然后替换掉
 * @param replacement 不传递，默认被替换的字符串是 ""。传递的数组等于 regExps 的长度，就一一对应进行替换。如果传递的
 * 数组小于 regExps，就与前几个进行对应替换，其余的用默认 "" 替换。
 */
export function regTrim(source: string, regExps: RegExp[], replacement?: string[]) {
  let replaced = source;
  let substitute = "";
  for (let i = 0; i < regExps.length; i++) {
    if (!replacement) substitute = "";
    else {
      if (!replacement[i]) substitute = "";
      else substitute = replacement[i];
    }
    replaced = replaced.replace(regExps[i], substitute);
  }
  return replaced;
}
