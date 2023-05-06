/**
 * 提供常用工具
 *
 * @author Himmelbleu
 * @date 2022 年 12 月 1 日
 * @url https://www.cnblogs.com/Himmelbleu/#/
 */

export namespace LiteUtils {
  export function getLocalSetting() {
    return useStorage<CustType.ILocalSetting>(`l-${LiteConfig.blogApp}-setting`, getLocalSettingTemp());
  }

  export function getLocalSettingTemp(): CustType.ILocalSetting {
    return {
      theme: { mode: "dark", color: "#409eff", codeFont: "Hack", mainFont: "" },
      toolkits: { pin: true },
      pages: {
        home: {
          padding: { left: 1, right: 1, top: 1, bottom: 1 },
          margin: { left: 0, right: 0, top: 0, bottom: 1 }
        },
        writing: {
          code: { light: { color: "#f2f2f2" }, dark: { color: "#222222" } },
          padding: { left: 1, right: 1, top: 1, bottom: 1 },
          margin: { left: 0, right: 0, top: 0, bottom: 1 }
        },
        markList: {
          padding: { left: 0, right: 0, top: 0, bottom: 0 },
          margin: { left: 0, right: 0, top: 0, bottom: 0 }
        },
        markSort: {
          padding: { left: 1, right: 1, top: 1, bottom: 1 },
          margin: { left: 0, right: 0, top: 0, bottom: 1 }
        },
        gallery: {
          padding: { left: 1, right: 1, top: 1, bottom: 1 },
          margin: { left: 0, right: 0, top: 0, bottom: 0 }
        },
        sort: {
          padding: { left: 1, right: 1, top: 1, bottom: 1 },
          margin: { left: 0, right: 0, top: 0, bottom: 1 }
        }
      },
      font: {
        size: { level1: 1.3, level2: 1.2, level3: 1.1, level4: 1, level5: 0.9, level6: 0.8 },
        light: { color: { level1: "#393939", level2: "#4e4e4e", level3: "#707070" } },
        dark: { color: { level1: "#a7a7a7", level2: "#8d9095", level3: "#878787" } }
      },
      content: {
        width: 50,
        padding: { left: 0, right: 0, top: 0, bottom: 0 },
        margin: { left: 0, right: 0, top: 0, bottom: 0 }
      },
      cabinet: {
        position: { left: 0, right: 0, break: false },
        left: { pin: false, padding: { left: 1, right: 1, top: 1, bottom: 1 }, margin: { left: 0, right: 0, top: 0, bottom: 0 } },
        right: { pin: false, padding: { left: 1, right: 1, top: 1, bottom: 1 }, margin: { left: 0, right: 0, top: 0, bottom: 0 } },
        toggles: {
          我的技术栈: { open: true, show: true },
          博客信息: { open: true, show: true },
          常用链接: { open: true, show: true },
          博客数据: { open: true, show: true },
          推荐书籍: { open: true, show: true }
        },
        width: 17.5
      },
      background: { open: false, filter: 6, src: "" },
      card: {
        color: "rgba(31, 31, 31, 1)",
        open: false,
        radius: 10,
        padding: { left: 1, right: 1, top: 1, bottom: 1 },
        margin: { left: 0, right: 1, top: 0, bottom: 1 }
      },
      other: { github: { position: "left" }, pagation: { pin: true } }
    };
  }

  /**
   * 对一个对象的字段进行裁剪或添加
   *
   * @param source 要被裁剪或添加字段的对象
   * @param template 一个对象，根据该模板（对象）对 source 进行裁剪或添加字段
   */
  export function reloadObjProps(source: any, template: any) {
    if (!source) source = template;
    const sourceKeys = Object.keys(source);
    const templateKeys = Object.keys(template);

    if (sourceKeys.length !== templateKeys.length) {
      if (sourceKeys.length > templateKeys.length) {
        sourceKeys.forEach(sourceKey => {
          const nonentity = templateKeys.find(templateKey => templateKey === sourceKey);
          if (!nonentity) Reflect.deleteProperty(source, sourceKey);
        });
      } else if (sourceKeys.length < templateKeys.length) {
        templateKeys.forEach(templateKey => {
          const nonentity = sourceKeys.find(sourceKey => templateKey === sourceKey);
          if (!nonentity) source[templateKey] = template[templateKey];
          else {
            if (typeof template[templateKey] === "object") {
              reloadObjProps(source[templateKey], template[templateKey]);
            }
          }
        });
      }
    } else {
      templateKeys.forEach(templateKey => {
        if (typeof template[templateKey] === "object") {
          if (typeof source[templateKey] !== "object" || !source[templateKey]) {
            source[templateKey] = template[templateKey];
          }
          reloadObjProps(source[templateKey], template[templateKey]);
        } else if (typeof template[templateKey] !== "object") {
          if (typeof source[templateKey] === "object") source[templateKey] = template[templateKey];
        }
      });
    }
    return source;
  }

  export function endLoading() {
    const lightLoding = document.querySelector<HTMLElement>(".light-loading");
    const darkLoding = document.querySelector<HTMLElement>(".dark-loading");
    if (lightLoding) {
      lightLoding.classList.toggle("fade-in-out");
      lightLoding.style.display = "none";
    } else {
      darkLoding.classList.toggle("fade-in-out");
      darkLoding.style.display = "none";
    }

    document.getElementById("l-content").classList.toggle("fade-in-out");

    const eleTrack = document.querySelector("#l-progress > .track");
    eleTrack.classList.remove("track-active");
    eleTrack.classList.add("track-static");

    const eleBar = document.querySelector("#l-progress > .track > .bar");
    eleBar.classList.remove("bar-active");
    eleBar.classList.add("bar-static");
  }

  export function startLoading() {
    document.getElementById("l-content").classList.toggle("fade-in-out");

    const eleTrack = document.querySelector("#l-progress > .track");
    eleTrack.classList.remove("track-static");
    eleTrack.classList.add("track-active");

    const eleBar = document.querySelector("#l-progress > .track > .bar");
    eleBar.classList.remove("bar-static");
    eleBar.classList.add("bar-active");
  }

  function openWindow(w: string, t: number, i: number, r: number) {
    const left = (screen.width - t) / 2 - r;
    const top = (screen.height - i) / 2 - r;
    const hatch = window.open(w, "_blank", `width=${t},height=${i},toolbars=0,resizable=1,left=${left},top=${top}`);
    hatch.focus();
  }

  /**
   * 打开博客园上传图片的 API，上传完成之后，图片路径要回显到 textarea 上。
   *
   * @param el 图片上传成功之后返回的链接赋值给 textarea 元素。
   * @param onUploaded 选择符合规则的本地图片之后，小窗关闭返回一个图片连接到 el textarea 元素中，获取 focus 得到图片链接该回调函数可向上传递该链接。
   */
  export function openImageUploadWindow(el: string, onUploaded: (img: string) => void) {
    try {
      // @ts-ignore
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

  export function setTitle(title?: string) {
    const prefix = title ? title + " - " : "";
    document.getElementsByTagName("title")[0].innerText = `${prefix}${LiteConfig.blogApp} - 博客园`;
  }

  export function scrollIntoView(selector: string) {
    document.querySelector(selector).scrollIntoView();
  }

  export namespace Random {
    function select(min: number, max: number) {
      let sum = max - min + 1;
      return Math.floor(Math.random() * sum + min);
    }

    export function get(src: string[], max: number) {
      let a = [];

      if (src.length < max) {
        for (let i = 0; i < max; i++) {
          let d = Math.floor(Math.random() * src.length);
          a[i] = d;
        }
      } else if (src.length >= max) {
        for (let i = 0; i < src.length; i++) {
          a[i] = select(0, src.length - 1);
          for (let z = 0; z < i; z++) {
            if (a[i] == a[z]) {
              i--;
              break;
            }
          }
        }
      }

      return a;
    }
  }

  export namespace Log {
    export function primary(title: string, msg: string) {
      console.log(
        `%c${title}%c${msg}`,
        "background: #409eff; color: #fff; border-radius: 3px 0 0 3px; padding: 10px",
        "margin-left: 10px;"
      );
    }

    export function warning(title: string, msg: string) {
      console.log(
        `%c${title}%c${msg}`,
        "background: #ea5d5e; color: #fff; border-radius: 3px 0 0 3px; padding: 10px",
        "margin-left: 10px;"
      );
    }
  }

  export namespace Parser {
    function fixed(trimed: string, suffix?: string, uint?: number, fix?: number) {
      const result = (Number(trimed) / uint || 1000).toFixed(fix || 2);
      return `${result}${suffix || ""}`;
    }

    /**
     * 把一串数字转换为“xx万”的形式
     *
     * @param num 被格式化的数字
     */
    export function unit(num: string): string {
      const trimed = num.trim();
      if (trimed.length < 5) {
        return fixed(trimed);
      } else if (trimed.length >= 5 && trimed.length <= 7) {
        return fixed(trimed, "万", 10000);
      }
    }
  }

  export namespace Text {
    /**
     * 替换字符串，默认替换 ""。传递 regExps，一个正则表达式数组。
     *
     * @param source 被修剪的字符串
     * @param regExps 正则表达式，找到匹配的字符串，然后替换掉
     * @param replacement 不传递，默认被替换的字符串是 ""。传递的数组等于 regExps 的长度，就一一对应进行替换。如果传递的
     * 数组小于 regExps，就与前几个进行对应替换，其余的用默认 "" 替换。
     */
    export function replace(source: string, regExps: RegExp[], replacement?: string[]) {
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
     * 循环分割字符串，得到最后结果
     *
     * @param str 源字符串
     * @param regex 从字符串中匹配想要的再进行切割
     * @param keys 对每一次 match 得到的子串进行索引，即取值
     * @param values 每一次 match 得到的子串
     * @returns 从 str 经过多次 split 得到的子串
     */
    export function split(str: string, regex: RegExp, keys: number[], values: string[]) {
      let matched;
      if (keys.length !== values.length) return "";
      if (str.match(regex)) {
        matched = str.match(regex)[0];
        for (let i = 0; i < keys.length; i++) {
          matched = matched.split(values[i])[keys[i]];
        }
      }
      return matched;
    }
  }

  export namespace Router {
    export function go(params: { path: string; router?: Router }) {
      if (params.path === "back") {
        params.router.go(-1);
      } else {
        if (params.router) params.router.push(params.path);
        else window.open(params.path, "_blank");
      }
    }
  }
}

export namespace LiteConfig {
  export let __LITE_CONFIG__: CustType.ILite;
  export let blogId = 0;
  export let baseAPI = "";
  export let blogApp = "";
  export let isLogin = true;
  export let isOwner = true;
  export let userGuid = "";
  export let isFollow = false;
  export const pcDevice = isPcDevice();
  export let localSetting: CustType.ILocalSetting;
  export const localSettingTemp = LiteUtils.getLocalSettingTemp();
  export const eleHtml = document.querySelector("html");
  /**
   * 判断设备是否是 PC 端
   */
  function isPcDevice() {
    return !/iPhone|iPad|iPod|Android|IEMobile/.test(navigator.userAgent);
  }

  /**
   * 初始化博客重要变量，这些变量不能通过 head script 获取，在一些元素属性上。
   */
  function getUserGuid() {
    const eleA = document.querySelector("#p_b_follow > a");
    if (eleA) {
      const attr = eleA.getAttribute("onclick");
      return attr?.split("(")[1]?.split(")")[0]?.replaceAll("'", "") ?? "";
    } else return "";
  }

  /**
   * 初始化博客重要变量，这些变量不能通过 head script 获取，在一些元素属性上。
   */
  function getIsFollow() {
    const eleText = document.querySelector("#p_b_follow > a");
    if (eleText) {
      return eleText.innerText === "-取消关注" || false;
    } else return false;
  }

  function loadedLite() {
    localSetting = LiteUtils.getLocalSetting().value;
    localStorage.setItem(`l-${blogApp}-setting`, JSON.stringify(LiteUtils.reloadObjProps(localSetting, localSettingTemp)));

    eleHtml.setAttribute("class", localSetting.theme.mode);
    eleHtml.style.setProperty("--l-font-family", localSetting.theme.mainFont || `var(--el-font-family)`);
    eleHtml.style.setProperty("--l-theme-color", localSetting.theme.color);
    eleHtml.style.setProperty("--cabinet-width", `${localSetting.cabinet.width}rem`);
    eleHtml.style.setProperty("--content-width", `${localSetting.content.width}vw`);
    eleHtml.style.setProperty("--l-bg-filter", `${localSetting.background.filter}px`);
  }

  function beforeUseLite() {
    const eleApp = document.createElement("div");
    eleApp.setAttribute("id", "app");
    document.body.append(eleApp);

    window.oncontextmenu = () => false;
  }

  function afterUseLite() {
    const eleIconLink = document.createElement("link");
    eleIconLink.rel = "shortcut icon";
    eleIconLink.href = __LITE_CONFIG__.icon;
    document.head.append(eleIconLink);
  }

  /**
   * 初始化 lite，所有工作准备完成之后，走回调函数，挂载 app。
   * @param dev 开发模式下直接挂载 app
   * @param pro 生产模式下，打包部署之后，给 window 注册一个函数，等待博客园资源加载完成之后再挂载 app。
   */
  export function useLite(dev?: Function, pro?: Function) {
    beforeUseLite();

    if (import.meta.env.PROD) {
      blogId = currentBlogId;
      blogApp = currentBlogApp;
      isLogin = isLogined;
      isOwner = isBlogOwner;
      baseAPI = `https://www.cnblogs.com/${blogApp}`;
      userGuid = getUserGuid();
      isFollow = getIsFollow();
      // @ts-ignore
      __LITE_CONFIG__ = window["__LITE_CONFIG__"];
      loadedLite();
      pro && pro();
    } else if (import.meta.env.DEV) {
      blogId = import.meta.env.VITE_BLOG_ID;
      blogApp = import.meta.env.VITE_BLOG_APP;
      baseAPI = "/api";
      __LITE_CONFIG__ = {
        links: [
          {
            href: "https://ts.xcatliu.com/index.html",
            text: "TypeScript 入门教程"
          },
          { href: "https://zh.javascript.info/", text: "现代 JavaScript 教程" },
          { href: "https://ts.yayujs.com/", text: "TypeScript 中文文档" },
          {
            href: "https://niceboybao.github.io/2019/03/05/others/books/",
            text: "前端免费高清电子书"
          },
          { href: "https://zhongguose.com/", text: "Chinese Colors" },
          {
            href: "https://www.webfx.com/tools/emoji-cheat-sheet/",
            text: "Emoji Cheat Sheet"
          }
        ],
        books: [
          {
            href: "https://wangdoc.com/es6/",
            text: "ECMAScript 6 教程",
            img: "https://t15.baidu.com/it/u=2492671040,2684713126&fm=224&app=112&f=JPEG?w=500&h=500",
            author: "阮一峰",
            rate: 5
          },
          {
            href: "https://baike.baidu.com/item/%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3JavaScript/19848692",
            text: "深入理解 JavaScript",
            img: "https://img3m1.ddimg.cn/85/1/11120396251-1_w_1.jpg",
            author: "[美]罗彻麦尔",
            rate: 4.5
          },
          {
            href: "https://baike.baidu.com/item/JavaScript%E6%9D%83%E5%A8%81%E6%8C%87%E5%8D%97%EF%BC%88%E5%8E%9F%E4%B9%A6%E7%AC%AC7%E7%89%88%EF%BC%89/57640300",
            text: "JavaScript 权威指南",
            img: "https://img3m0.ddimg.cn/13/17/22722790-1_w_33.jpg",
            author: "[美]弗兰纳根",
            rate: 4
          }
        ],
        nameplate: {
          tags: ["Web 前端", "二次元", "简约", "拖延症", "吸猫"],
          connection: [
            {
              name: "Email",
              text: "zhengrenfu@outllok.com",
              img: "https://images.cnblogs.com/cnblogs_com/blogs/666252/galleries/2281365/o_230306161009_wechat.png"
            }
          ],
          intro: "平时喜欢逛 B站，刷短视频、看 Vtuber（DD），如果有喜欢的电视剧就会狂刷。",
          warehouse: [{ text: "cnblogs-theme-lite", url: "http://www.gitee.com/cnblogs-theme-lite" }],
          experience: [{ text: "基于 Vue3 的回收平台", date: "22.03.10" }],
          gossip: "抽到水神！",
          photo: {
            disabled: true,
            src: ["https://img2.baidu.com/it/u=803568479,1965819057&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281"]
          }
        }
      };
      loadedLite();
      dev && dev();
    }

    afterUseLite();
    LiteUtils.Log.primary("GitHub", "https://github.com/Himmelbleu/cnblogs-theme-lite");
    LiteUtils.Log.primary("v1.5.0", "The Theme was Created By Himmelbleu, and Powered By Vue3 & Vite.");
  }
}
