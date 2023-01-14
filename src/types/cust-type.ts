export interface Essay {
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
}

export interface Comment {
  // 评论是否可以被编辑，默认是 false
  updateEditable?: boolean;
  // 回复是否可以被编辑，默认是 false
  replayEditable?: boolean;
  // 是否正在编辑
  isEditingUpdate?: boolean;
  // 是否正在回复
  isEditingReplay?: boolean;
  // 临时存储 html 内容
  htmlContent?: string;
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

export interface TagPage {
  text: string;
  list: Array<{ id: string; title: string; href: string; date: string; view: string; comm: string; digg: string }>;
}

export interface LiteConfigType {
  // 当前博客的名称
  currentBlogApp?: string;
  // 当前博客的 ID
  currentBlogId?: number;
  // 访问的用户是否已经登录？
  isLogined?: boolean;
  // 是否为博客持有者？
  isBlogOwner?: boolean;
  // 左侧边栏配置项
  side?: {
    avatar?: string;
    signature?: string;
  };
  catalog?: {
    level?: boolean;
  };
  // 导航栏配置项
  navor?: {
    header?: string;
    search?: boolean;
    navs?: { href: string; text?: string; svg?: string; img?: string }[];
  };
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
  // github 链接
  github?: string;
  links?: { href: string; text: string }[];
  books?: { href?: string; text: string; img: string; author: string; rate: number }[];
}

export interface Tag {
  count: number;
  href: string;
  text: string;
}
