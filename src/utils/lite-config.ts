namespace LiteConfig {
  export let __LITE_CONFIG__: CustType.ILite;
  export let blogId = 0;
  export let baseAPI = "";
  export let blogApp = "";
  export let isLogin = true;
  export let isOwner = true;
  export let userGuid = "";
  export let isFollow = false;
  export const pcDevice = LiteUtils.isPcDevice();
  export const eleHtml = document.querySelector("html");

  export const localSettingTemp: CustType.ILocalSetting = {
    theme: {
      mode: "dark",
      color: "#409eff",
      codeFont: "Hack",
      mainFont: "",
      margin: { top: 0, bottom: 0 },
      lightBgColor: "#f9f9f9",
      darkBgColor: "#191919",
      fontSizeRatio: 0.1,
      fontColor: ["#a7a7a7", "#999999", "#7c7c7c"]
    },
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

export default LiteConfig;
