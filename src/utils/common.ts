/**
 * 提供常用工具
 *
 * @author Himmelbleu
 * @date 2022 年 12 月 1 日
 * @url https://www.cnblogs.com/Himmelbleu/#/
 */

import $ from "jquery";
import { useStorage } from "@vueuse/core";
import { CustType } from "@/types/data-type";
import { __LITE_CONFIG__, blogApp } from "@/lite.config";

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
 * 打印普通消息 log
 *
 * @param title 标题
 * @param msg 信息
 */
export function preLog(title: string, msg: string) {
  console.log(`%c${title}%c${msg}`, "background: #409eff; color: #fff; border-radius: 3px 0 0 3px; padding: 10px", "margin-left: 10px;");
}

/**
 * 打印警告 log
 *
 * @param title 标题
 * @param msg 信息
 */
export function preWarningLog(title: string, msg: string) {
  console.log(`%c${title}%c${msg}`, "background: #ea5d5e; color: #fff; border-radius: 3px 0 0 3px; padding: 10px", "margin-left: 10px;");
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
export function replaceText(source: string, regExps: RegExp[], replacement?: string[]) {
  let substitute = "";
  for (let i = 0; i < regExps.length; i++) {
    if (!replacement) substitute = "";
    else {
      if (!replacement[i]) substitute = "";
      else substitute = replacement[i];
    }
    source = source.replace(regExps[i], substitute);
  }
  return source;
}

/**
 * Lite 主题设置模板对象
 */
export const settingTempl: CustType.ISetting = {
  theme: { mode: "dark", color: "#409eff" },
  openToolKits: true,
  githubPostion: "left",
  openPager: false,
  font: {
    size: { level1: 1.3, level2: 1.2, level3: 1.1, level4: 1, level5: 0.9, level6: 0.8 },
    light: { color: { level1: "#393939", level2: "#4e4e4e", level3: "#707070" } },
    dark: { color: { level1: "#a7a7a7", level2: "#8d9095", level3: "#878787" } }
  },
  content: { width: 50, padding: { left: 0, right: 0, top: 0, bottom: 0 }, margin: { left: 0, right: 0, top: 0, bottom: 0 } },
  listing: { padding: { left: 1, right: 1, top: 0, bottom: 1.5 }, margin: { left: 0, right: 0, top: 0, bottom: 1 } },
  article: { padding: { left: 1, right: 1, top: 1, bottom: 1 }, margin: { left: 0, right: 0, top: 0, bottom: 0 } },
  cabinet: {
    position: { left: 0, right: 0, break: false },
    left: { pin: false, padding: { left: 1, right: 1, top: 0, bottom: 0 }, margin: { left: 0, right: 0, top: 0, bottom: 0 } },
    right: { pin: false, padding: { left: 1, right: 1, top: 0, bottom: 0 }, margin: { left: 0, right: 0, top: 0, bottom: 0 } },
    toggles: {
      我的技术栈: { open: true, show: true },
      博客信息: { open: true, show: true },
      常用链接: { open: true, show: true },
      博客数据: { open: true, show: true },
      推荐书籍: { open: true, show: true }
    },
    width: 17.5,
    remote: true
  },
  background: { open: false, filter: 6, src: "" },
  card: {
    color: "rgba(31, 31, 31, 1)",
    open: false,
    radius: 10,
    padding: { left: 1, right: 1, top: 1, bottom: 1 },
    margin: { left: 0, right: 1, top: 0, bottom: 1 }
  }
};

/**
 * 对一个对象的字段进行裁剪或添加
 *
 * @param source 要被裁剪或添加字段的对象
 * @param objectTemplate 一个对象，根据该模板（对象）对 source 进行裁剪或添加字段
 * @returns
 */
export function refactorObjectProperties(source: any, objectTemplate: any) {
  if (!source) source = objectTemplate;
  const sourceKeys = Object.keys(source);
  const templateKeys = Object.keys(objectTemplate);

  if (sourceKeys.length !== templateKeys.length) {
    if (sourceKeys.length > templateKeys.length) {
      sourceKeys.forEach(sourceKey => {
        const nonentity = templateKeys.find(templateKey => templateKey === sourceKey);
        if (!nonentity) Reflect.deleteProperty(source, sourceKey);
      });
    } else if (sourceKeys.length < templateKeys.length) {
      templateKeys.forEach(templateKey => {
        const nonentity = sourceKeys.find(sourceKey => templateKey === sourceKey);
        if (!nonentity) source[templateKey] = objectTemplate[templateKey];
        else {
          if (typeof objectTemplate[templateKey] === "object") {
            refactorObjectProperties(source[templateKey], objectTemplate[templateKey]);
          }
        }
      });
    }
  } else {
    templateKeys.forEach(templateKey => {
      if (typeof objectTemplate[templateKey] === "object") {
        if (typeof source[templateKey] !== "object" || !source[templateKey]) {
          source[templateKey] = objectTemplate[templateKey];
        }
        refactorObjectProperties(source[templateKey], objectTemplate[templateKey]);
      } else if (typeof objectTemplate[templateKey] !== "object") {
        if (typeof source[templateKey] === "object") source[templateKey] = objectTemplate[templateKey];
      }
    });
  }
  return source;
}

export function getSetting() {
  return useStorage<CustType.ISetting>(`l-${blogApp}-setting`, {});
}
