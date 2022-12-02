# 主题 lite

Hello，Everyone！这是一个博客园主题皮肤：lite。目的是做到轻巧、快速。

博客园进入一个页面，比如随笔详细页、标签页等，都是整页重新加载的，非常影响体验，又受 C 君 的博客影响，我就起意打造一个基于 Vue3+TS+Vite 的博客园皮肤。

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

# 其他问题

如果有 Issues 请在仓库中提出，或者博客园私信本人。
