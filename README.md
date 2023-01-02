# 主题说明

Hello，Everyone！博客园主题皮肤：Lite。

背景：打开博客园的随笔详细页、标签页等，都是整页重新加载的，非常影响体验， Vue3 + TS + Vite 的博客园皮肤。

# 二次开发

1. fork 该项目到你自己的仓库中；
2. clone 到本地仓库；
3. 运行项目：

```bash
npm install
npm run dev
npm build
```

build 之后，dist 目录有 index.css、index.js，请上传之博客园后台文件中。获取两个文件的链接。

index.js 插入到博客园首页 HTML 中，以 script 标签引入。

## 目录说明

components 文件夹下全是组件，组件的目的是做到所有 views 都可以灵活运用，可以裁剪、可以增加。目的是解决代码耦合，减少代码里，提升代码质量以及可阅读性等。

views 文件夹下全都是视图，视图是用户可以直接看到的 UI。对 UI 再进行概念细分就有：

1. adapters：通常，views 要包含很多的列表循环，而列表循环内的东西太多，就导致 views 代码混乱，而 adapters 就是拆分 views
   的列表循环的小整体。
   adapters 可能与 components 并没有太大区别，但是 components 的目的是做到通用、灵活，这不是 adapters 该考虑的事情，而是尽可能地与该
   views 绑定。adapters 不是一个专门解决视图耦合的对象。
2. fragments：通常，views 包含的逻辑和界面太多，而需要把 views 中一些可以是整体的拆分出去，有自己的逻辑（请求、函数等）和视图
   那么就可以是 fragments。同样地，fragments 与该 views 有很大关系，所以，和 components 也有很大区别。
3. modules：modules 并没有特别的作用，用户界面根据作用和视图承载意义不同，也有很多不同类别可做区分。

# 其他问题

如果有 Issues 请在仓库中提出，或者博客园私信本人。
