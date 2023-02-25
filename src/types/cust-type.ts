export interface IArticle {
  // 随笔 ID
  id?: string;
  // 随笔标题
  text?: string;
  // 随笔内容
  content?: string;
  // 随笔摘要
  desc?: string;
  // 随笔发表日期
  date?: string;
  // 随笔阅读数量
  view?: string;
  // 随笔评论数量
  comm?: string;
  // 随笔点赞数量
  digg?: string;
  // 随笔封面
  surface?: string;
  // 文章是否被密码锁定
  isLocked?: boolean;
  // 是否仅限于自己可见
  isOnlyMe?: boolean;
  // 是否置顶
  isTop?: boolean;
}

export interface IComment {
  // 是否正在编辑
  isEditingUpdate?: boolean;
  // 是否正在回复
  isEditingReplay?: boolean;
  // 评论 ID
  commentId?: number;
  // 个人主页地址
  space?: string;
  // 楼层
  layer?: string;
  // 发表日期
  date?: string;
  // 发表人
  author?: string;
  // 点赞数量
  digg?: string;
  // 反对数量
  bury?: string;
  // 头像地址
  avatar?: string;
  // 随笔 ID
  postId?: number;
  // 评论内容
  content?: string;
  // 回复评论 ID
  parentCommentId?: number;
  // 当前评论所在评论列表的页数
  pageIndex?: number;
}

export interface ITagColl {
  text: string;
  array: Array<{ id: string; title: string; href: string; date: string; view: string; comm: string; digg: string }>;
}

export interface ILite {
  // github
  github?: string;
  // 网站 icon
  icon?: string;
  // 主题配置项
  theme?: {};
  // 侧边栏配置项
  cabinet?: { avatar?: string; signature?: string; navs?: { href: string; text?: string; svg?: string; img?: string }[] };
  // 目录配置项
  catalog?: {
    level?: boolean;
  };
  // 技能栈配置项
  graph?: {
    strokeColor?: string;
    alpha?: number;
    sides?: number;
    layer?: number;
    lineWidth?: number;
    textSize?: number;
    lineColor?: string;
    textColor?: string;
    data?: { title: string; star: number }[];
  };
  // 我的链接配置项
  links?: { href: string; text: string }[];
  // 推荐书籍配置项
  books?: { href?: string; text: string; img: string; author: string; rate: number }[];
}

export interface ITag {
  count: number;
  href: string;
  text: string;
}

/**
 * 随笔列表，返回列表的页数、列表数组。
 */
export interface IArticleList {
  pages: number[];
  array: Array<IArticle>;
}

/**
 * 随笔的分类和标签数组
 */
export interface IArticleProps {
  tags: { text: string }[];
  sorts: { href: string; text: string }[];
}

/**
 * 随笔分类列表，返回页数、分类名、列表数组
 */
export interface ISorts {
  pages: number[];
  label: string;
  array: Array<IArticle>;
}

/**
 * 侧边栏标签和分类数组
 */
export interface ICabinetColumn {
  sorts: {
    id: string;
    text: string;
  }[];
  tags: {
    id: string;
    text: string;
  }[];
}

/**
 * 侧边栏博主排行榜、积分
 */
export interface ICabinetRankList {
  text: string;
  digg: string;
}

/**
 * 侧边栏阅读排行榜
 */
export interface ICabinetTopList {
  id: string;
  text: string;
}

/**
 * 博主信息，粉丝、昵称、关注、园龄，每一个都有对应的 a 链接，text 是文本信息
 */
export interface IAuthor {
  text: string;
  href: string;
}

/**
 * 侧边栏博客信息，随笔数量、文章数量、评论数量、阅读数量
 */
export interface IMasterData extends ICabinetRankList {}

/**
 * 随笔上一篇或下一篇随笔数据类型
 */
type PrevNextType = { text?: string; href?: string };
export interface IPrevNext {
  prev: PrevNextType;
  next: PrevNextType;
}

type ToggleType = Record<string, { open: boolean; show: boolean }>;

/**
 * Lite 主题设置数据类型
 */
export interface ISetting {
  theme?: { color?: string; mode?: string };
  font?: {
    size?: { level1?: number; level2?: number; level3?: number; level4?: number; level5?: number; level6?: number };
    dark?: { color?: { level1?: string; level2?: string; level3?: string } };
    light?: { color?: { level1?: string; level2?: string; level3?: string } };
  };
  card?: { padding?: IBox; margin?: IBox; radius?: number; color?: string; open?: boolean };
  background?: { src?: string; open?: boolean; filter?: number };
  listing?: { padding?: IBox; margin?: IBox };
  article?: { padding?: IBox; margin?: IBox };
  toolkits?: { pin?: boolean };
  openToolKits?: boolean;
  openPager?: boolean;
  githubPostion?: "left" | "right";
  content?: { width?: number; padding?: IBox; margin?: IBox };
  cabinet?: {
    position?: { left?: number; right?: number; break?: boolean };
    left?: { pin?: boolean; padding?: IBox; margin?: IBox };
    right?: { pin?: boolean; padding?: IBox; margin?: IBox };
    toggles?: ToggleType;
    width?: number;
    break?: boolean;
    remote?: boolean;
  };
}

export interface IBox {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
}
