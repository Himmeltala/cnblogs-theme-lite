/**
 * 随笔/文章
 */
export interface IWriting {
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

/**
 * 评论
 */
export interface IComment {
  // 是否正在编辑
  isEditing?: boolean;
  // 是否正在回复
  isAnsling?: boolean;
  // 评论 ID
  commentId?: string;
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
  postId?: string;
  // 评论内容
  content?: string;
  // 回复评论 ID
  parentCommentId?: number;
  // 当前评论所在评论列表的页数
  pageIndex?: number;
}

/**
 * 标签
 */
export interface IMark {
  count: number;
  href: string;
  text: string;
}

/**
 * 随笔列表
 */
export interface IWritingList {
  page?: number;
  data?: IWriting[];
}

/**
 * 随笔列表，用于分类或标签区分的随笔列表
 */
export interface IWritingList2 extends IWritingList {
  // 分类描述
  desc?: string;
  // 子分类描述
  desc2?: string;
  // 分类名称、提示
  hint?: string;
}

/**
 * 随笔的分类和标签数组
 */
export interface IWritingProps {
  tags: { text: string }[];
  sorts: { href: string; text: string }[];
}

/**
 * 分类子分类
 */
export interface IWritingSortChild {
  id: string;
  text: string;
}

/**
 * 侧边栏标签和分类数组
 */
export interface ICabinetColumn {
  essaySort: { id: string; text: string }[];
  essayArchive: { id: string; text: string }[];
  articleSort: { id: string; text: string }[];
  articleArchive: { id: string; text: string }[];
  latestEssayList: { id: string; text: string }[];
  latestComments: { id: string; title: string; content: string; author: string }[];
  rankings: { text: string }[];
  tagList: { id: string; text: string }[];
  albumn: { id: string; text: string }[];
}

/**
 * 第一种：
 * 随笔数量、文章数量、评论数量、阅读数量
 *
 * 第二种：
 * 粉丝、昵称、关注、园龄
 *
 * 第三种：
 * 随笔上一篇或下一篇随笔数据类型
 */
export interface ICabinetItemData {
  // id
  id?: string;
  // 文本描述
  text?: string;
  // 数量
  digg?: string;
  // 链接
  href?: string;
}

/**
 * 侧边栏阅读排行榜
 */
export interface ICabinetTopList {
  topView: ICabinetItemData[];
  topComments: ICabinetItemData[];
  topDigg: ICabinetItemData[];
}

/**
 * 上一篇或下一篇随笔
 */
export interface IPrevNext {
  prev: ICabinetItemData;
  next: ICabinetItemData;
}

export interface AlbumnItem {
  id: string;
  src: string;
}

/**
 * 博客配置项
 */
export interface ILite {
  // github
  github?: string;
  // 网站 icon
  icon?: string;
  // 侧边栏配置项
  cabinet?: { avatar?: string; signature?: string; navs?: { href: string; text?: string; svg?: string; img?: string }[] };
  // 目录配置项
  catalog?: { level?: boolean };
  // 铭牌
  nameplate?: {
    tags?: string[];
    connection?: { name: string; text: string; svg?: string; img?: string }[];
    warehouse?: { url: string; text: string }[];
    experience?: { text: string; date: string }[];
    intro?: string;
    gossip?: string;
    photo?: { disabled: boolean; src?: string[] };
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

type ToggleType = Record<string, { open: boolean; show: boolean }>;
export interface IBox {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
}

/**
 * Lite 主题设置数据类型
 */
export interface ISetting {
  // 主题
  theme?: { color?: string; mode?: string };
  // 字体
  font?: {
    size?: { level1?: number; level2?: number; level3?: number; level4?: number; level5?: number; level6?: number };
    dark?: { color?: { level1?: string; level2?: string; level3?: string } };
    light?: { color?: { level1?: string; level2?: string; level3?: string } };
  };
  // 卡片
  card?: { padding?: IBox; margin?: IBox; radius?: number; color?: string; open?: boolean };
  // 背景
  background?: { src?: string; open?: boolean; filter?: number };
  // pages
  pages?: {
    home?: { padding?: IBox; margin?: IBox };
    writing?: { padding?: IBox; margin?: IBox; code?: { light?: { color?: string }; dark?: { color?: string } } };
    gallery?: { padding?: IBox; margin?: IBox };
    sort?: { padding?: IBox; margin?: IBox };
    tags?: { padding?: IBox; margin?: IBox };
    tagColl?: { padding?: IBox; margin?: IBox };
  };
  listing?: { padding?: IBox; margin?: IBox };
  article?: { padding?: IBox; margin?: IBox };
  // 工具箱
  toolkits?: { pin?: boolean };
  openPager?: boolean;
  githubPostion?: "left" | "right";
  // 中间内容
  content?: { width?: number; padding?: IBox; margin?: IBox };
  // 陈列柜
  cabinet?: {
    position?: { left?: number; right?: number; break?: boolean };
    left?: { pin?: boolean; padding?: IBox; margin?: IBox };
    right?: { pin?: boolean; padding?: IBox; margin?: IBox };
    toggles?: ToggleType;
    width?: number;
    break?: boolean;
    remote?: boolean;
  };
  other?: {
    github?: {
      position?: "left" | "right";
    };
    pagation: {
      pin?: boolean;
    };
  };
}
