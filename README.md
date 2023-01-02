# 主题说明

Hello，Everyone！这是一个博客园主题皮肤：lite。目的是做到轻巧、快速。

博客园进入一个页面，比如随笔详细页、标签页等，都是整页重新加载的，非常影响体验，又受 C 君 的博客影响，我就起意打造一个基于
Vue3+TS+Vite 的博客园皮肤。

本项目主要是开发博客园的 API，比 C 君 博客皮肤的 API 更加简洁易用，因此对于二次开发的你们来说是非常友好的。

目前，随笔列表、随笔评论等 API 已经开发完成，正在开发其他次要的 API 中。

# 二次开发

1. forke 该项目到你自己的仓库中；
2. clone 到本地仓库；
3.

```bash
npm install
npm run dev
npm build
```

utils、types 文件夹中不要删除，这里提供各自 API 调用。以及 config.ts 文件也不要删除。其余的可以全部剔除。

build 之后，dist 目录有 index.css、index.js，请上传之博客园后台文件中，获取链接，修改 config.ts 文件中的 init 函数，替换链接。

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
