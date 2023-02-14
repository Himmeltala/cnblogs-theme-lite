export interface Jotting {
  // 随笔 ID
  id?: number;
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
  isLocked?: boolean;
}

export interface Comment {
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

export interface TagColl {
  text: string;
  array: Array<{
    id: string;
    title: string;
    href: string;
    date: string;
    view: string;
    comm: string;
    digg: string;
  }>;
}

export interface Lite {
  // github
  github?: string;
  // 网站 icon
  icon?: string;
  // 主题配置项
  theme?: {
    mode?: "dark" | "light";
    color?: string;
  };
  // 侧边栏配置项
  cabinet?: {
    avatar?: string;
    signature?: string;
  };
  // 目录配置项
  catalog?: {
    level?: boolean;
  };
  // 导航栏配置项
  navor?: {
    header?: string;
    navs?: { href: string; text?: string; svg?: string; img?: string }[];
  };
  // 技能栈配置项
  graph?: {
    fillColor?: string;
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

export interface Tag {
  count: number;
  href: string;
  text: string;
}

/**
 * 随笔列表，返回列表的页数、列表数组。
 */
export interface JottingList {
  pages: number[];
  array: Array<Jotting>;
}

/**
 * 随笔的分类和标签数组
 */
export interface JottingCateAndTagList {
  tags: { text: string }[];
  cates: { href: string; text: string }[];
}

/**
 * 随笔分类列表，返回页数、分类名、列表数组
 */
export interface CateList {
  pages: number[];
  label: string;
  array: Array<Jotting>;
}

/**
 * 侧边栏标签和分类数组
 */
export interface SideCateAndTagList {
  cates: {
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
export interface SideRankList {
  text: string;
  digg: string;
}

/**
 * 侧边栏阅读排行榜
 */
export interface SideTopList {
  id: string;
  text: string;
}

/**
 * 博主信息，粉丝、昵称、关注、园龄，每一个都有对应的 a 链接，text 是文本信息
 */
export interface Blogger {
  text: string;
  href: string;
}

/**
 * 侧边栏博客信息，随笔数量、文章数量、评论数量、阅读数量
 */
export interface SideBlog extends SideRankList {}

/**
 * 随笔上一篇或下一篇随笔数据类型
 */
type PrevNextType = { text?: string; href?: string };
export interface PrevNext {
  prev: PrevNextType;
  next: PrevNextType;
}
