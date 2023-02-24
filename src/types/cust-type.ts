export interface IEssay {
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

export interface ILite {
  // github
  github?: string;
  // 网站 icon
  icon?: string;
  // 主题配置项
  theme?: {};
  // 侧边栏配置项
  cabinet?: {
    avatar?: string;
    signature?: string;
    navs?: { href: string; text?: string; svg?: string; img?: string }[];
  };
  // 博客设置
  setting?: {};
  // 目录配置项
  catalog?: {
    level?: boolean;
  };
  // 导航栏配置项
  navor?: {};
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
export interface IEssayList {
  pages: number[];
  array: Array<IEssay>;
}

/**
 * 随笔的分类和标签数组
 */
export interface IEssayCateAndTagList {
  tags: { text: string }[];
  cates: { href: string; text: string }[];
}

/**
 * 随笔分类列表，返回页数、分类名、列表数组
 */
export interface ICateList {
  pages: number[];
  label: string;
  array: Array<IEssay>;
}

/**
 * 侧边栏标签和分类数组
 */
export interface ICabinetCateAndTagList {
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
export interface IBlogData extends ICabinetRankList {}

/**
 * 随笔上一篇或下一篇随笔数据类型
 */
type PrevNextType = { text?: string; href?: string };
export interface IPrevNext {
  prev: PrevNextType;
  next: PrevNextType;
}

type ToggleType = Record<
  string,
  {
    open: boolean;
    show: boolean;
  }
>;

/**
 * Lite 主题设置数据类型
 */
export interface ISetting {
  toggles?: ToggleType;
  themeMode?: string;
  themeColor?: string;
  themeCard?: {
    padding?: {
      left: number;
      right: number;
      top: number;
      bottom: number;
    };
    margin?: {
      left: number;
      right: number;
      top: number;
      bottom: number;
    };
    radius?: number;
    color?: string;
    open?: boolean;
  };
  background?: {
    open?: boolean;
    filter?: number;
    src?: string;
  };
  openToolKits?: boolean;
  openPager?: boolean;
  githubPostion?: "left" | "right";
  contentWidth?: number;
  cabinet?: {
    lcabinet?: {
      padding?: IBox;
      margin?: IBox;
    };
    rcabinet?: {
      padding?: IBox;
      margin?: IBox;
    };
    left?: number;
    right?: number;
    width?: number;
    break?: boolean;
    remote?: boolean;
    pinLeft?: boolean;
    pinRight?: boolean;
  };
}

export interface IBox {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
}
