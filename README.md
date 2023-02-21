# 主题说明

打开博客园的随笔详细页、标签页等，都是整页重新加载，比较影响体验。Lite 基于 Vue3 + Vite 开发，SPA 应用可以减少整页加载，实现局部刷新。

本人已部署在自己的博客，浏览：[Lite 博客](https://www.cnblogs.com/Himmelbleu/#/)。

[GitHub](https://github.com/Himmelbleu/cnblogs-theme-lite) 或 [Gitee](https://gitee.com/Himmelbleu/cnblogs-theme-lite)，请点个 :star:star 哟~。

# 部署说明

部署非常简单，你只需要在：博客园管理-设置下的 “首页 HTML 代码”和“页脚 HTML 代码”配置即可：

首页 HTML 代码：

```html
<!-- clear unused elems -->
<script>
  $("head > link").remove();
  $("#top_nav").remove();
  $("#footer").remove();
  $(".clear").remove();
</script>
<!-- lite style -->
<link rel="stylesheet" href="https://blog-static.cnblogs.com/files/blogs/666252/index.css" />
<!-- lite loading style -->
<style>
  #home {
    display: none !important;
  }
  @-webkit-keyframes loading {
    0% {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes loading {
    0% {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .dark-loading {
    background: #222;
  }
  .light-loading {
    background: #fff;
  }
  .dark-loading,
  .light-loading {
    font-size: 14px !important;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-weight: 400;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    z-index: 999999;
  }
  .box h2 {
    font-size: 14px !important;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-weight: 400;
    color: #777;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    text-align: center;
  }
  .box span {
    font-size: 14px !important;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-weight: 400;
    display: inline-block;
    vertical-align: middle;
    width: 0.6em;
    height: 0.6em;
    margin: 0.19em;
    background: #007db6;
    border-radius: 0.6em;
    -webkit-animation: loading 1s infinite alternate;
    animation: loading 1s infinite alternate;
  }
  .box span:nth-of-type(2) {
    background: #008fb2;
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
  }
  .box span:nth-of-type(3) {
    background: #009b9e;
    -webkit-animation-delay: 0.4s;
    animation-delay: 0.4s;
  }
  .box span:nth-of-type(4) {
    background: #00a77d;
    -webkit-animation-delay: 0.6s;
    animation-delay: 0.6s;
  }
  .box span:nth-of-type(5) {
    background: #00b247;
    -webkit-animation-delay: 0.8s;
    animation-delay: 0.8s;
  }
  .box span:nth-of-type(6) {
    background: #5ab027;
    -webkit-animation-delay: 1s;
    animation-delay: 1s;
  }
  .box span:nth-of-type(7) {
    background: #a0b61e;
    -webkit-animation-delay: 1.2s;
    animation-delay: 1.2s;
  }
</style>
<!-- lite loading -->
<div class="dark-loading">
  <div class="box">
    <h2>Loading</h2>
    <span></span><span></span><span></span><span></span><span></span><span></span><span></span>
  </div>
</div>
```

页脚 HTML 代码：

```html
<!-- lite config -->
<script>
  window.__LITE_CONFIG__ = {};
</script>
<script type="module" src="https://blog-static.cnblogs.com/files/blogs/666252/index.js"></script>
<!-- run lite -->
<script>
  // 如果访问外网速度本身就很快，建议使用下面的代码。访问速度慢建议删除该 script 标签。
  window.onload = () => {
    window.__LITE_CONFIG__.onLoaded();
  };
</script>
```

在你的博客园后台“选项”中，勾选“启用数学公式支持”和“数学公式渲染引擎”（选择 MathJax3），否则数学公式不生效。

## 启动速度慢

部署说明中展示的启动方式可以减少请求数量，但博客园会带有一个国外的请求，导致速度变慢。

如果遇到长时间停止在 loading 屏幕：

1. 清除缓存；
2. 改用部署说明中的启动方式。

# 配置说明

## GitHub

```js
window.__LITE_CONFIG__ = {
  github: "your github address"
};
```

|  字段  |                  描述                  | 可选值 |
| :----: | :------------------------------------: | :----: |
| github | github 角标，在浏览器左上角，PC 端可见 |        |

## 陈列柜

```js
window.__LITE_CONFIG__ = {
  cabinet: {
    avatar: "url",
    signature: "your text",
    navs: [
      // 可以插入图片、文本、svg
      {
        href: "https://i.cnblogs.com/posts/edit",
        text: "新随笔"
      },
      {
        href: "https://gitee.com/Enziandom",
        svg: `<path d="M512 1024C230.4 1024 0 793.6 0 512S230.4 0 512 0s512 230.4 512 512-230.4 512-512 512z m259.2-569.6H480c-12.8 0-25.6 12.8-25.6 25.6v64c0 12.8 12.8 25.6 25.6 25.6h176c12.8 0 25.6 12.8 25.6 25.6v12.8c0 41.6-35.2 76.8-76.8 76.8h-240c-12.8 0-25.6-12.8-25.6-25.6V416c0-41.6 35.2-76.8 76.8-76.8h355.2c12.8 0 25.6-12.8 25.6-25.6v-64c0-12.8-12.8-25.6-25.6-25.6H416c-105.6 0-188.8 86.4-188.8 188.8V768c0 12.8 12.8 25.6 25.6 25.6h374.4c92.8 0 169.6-76.8 169.6-169.6v-144c0-12.8-12.8-25.6-25.6-25.6z""></path>`
      }
    ]
  }
};
```

cabinet 是陈列柜，点击浏览器左右中间的透明条可以呼出。

|   字段    |      描述      |
| :-------: | :------------: |
|  avatar   |      头像      |
| signature |    个性签名    |
|   navs    | 左陈列柜导航项 |

鼠标悬浮在陈列柜项上时，比如“博客信息”，右边会有一个小的箭头出现，点击之后可以对该项内容进行收起或展开。

## 技能栈

```js
window.__LITE_CONFIG__ = {
  graph: {
    alpha: 0.85,
    sides: 5, // 多少个边
    layer: 5, // 多少层
    lineWidth: 1,
    textSize: 12,
    // 以下四个字段可以不填
    fillColor: "#409eff",
    strokeColor: "#A7A7A7",
    lineColor: "#A7A7A7",
    textColor: "#A7A7A7",
    comment: [
      // 数据，长度必须和 sides 保持一致
      { title: "CSS", star: 4 },
      { title: "Vue", star: 4 },
      { title: "Java", star: 3 },
      { title: "JS/TS", star: 4 },
      { title: "Android", star: 3 }
    ]
  }
};
```

## 推荐链接

```js
window.__LITE_CONFIG__ = {
  links: [
    {
      href: "http://ts.xcatliu.com/index.html",
      text: "TypeScript 入门教程"
    }
  ]
};
```

## 推荐书籍

```js
window.__LITE_CONFIG__ = {
  books: [
    {
      href: "https://baike.baidu.com/item/%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3JavaScript/19848692",
      text: "深入理解 JavaScript",
      img: "http://img3m1.ddimg.cn/85/1/11120396251-1_w_1.jpg",
      author: "[美]罗彻麦尔",
      rate: 4.5
    }
  ]
};
```

# 二次开发

```bash
npm install
npm run dev
npm build
```

二次开发需要把 build 之后的 index.css、index.js 上传到博客园后台“文件”。并获取这两个文件的链接，以替换部署说明中标签的引入链接。

建议多使用 UnoCSS，开发时请把 `.env.development` 中两个字段修改成你自己的，否则获取的数据是我本人博客上的，博客 ID 和博客 App 都可以 F12 查看你博客找到，搜索`currentBlogId` 和`currentBlogApp`。

## 目录说明

components 下面的是组件，目前数量很少，组件在本项目的定义是：通用、可配置。[重新思考 Vue 组件的定义](https://www.cnblogs.com/Enziandom/#/p/17115133)：

1. adapters：views 下渲染列表，其内容在其他视图中也重复使用。adapters 与 components 的区别是 adapters 不需要考虑“通用、可配置”。
2. fragments：views 下有许多业务要处理，但业务与业务之间并不是相关的，所以需要把 views 中一块业务拆分成一个组件，fragments 有自己的逻辑（请求、函数等）和视图。fragments 与该 views 有很大关系。
3. modules：路由组件，即注册到 vue-router 项里面的组件。

# 其他问题

如果有 Issues 请在仓库中提出，或者博客园私信本人。
