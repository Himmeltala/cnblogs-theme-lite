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

export type VoteType = "Bury" | "Digg";

/**
 * 博客园评论和随笔的基础字段，一般是调用接口之后返回过来的字段
 */
interface BlogRestriction {
  isAbandoned?: boolean;
  postId?: number;
  voteType?: VoteType;
}

/**
 * 博客园评论实体，区别于上面定义的评论实体，这个实体是根据博客园的数据库字段而来
 */
export interface BlogComment extends BlogRestriction {
  // 评论 ID
  commentId?: number;
  // 评论内容
  body?: string;
  // 回复的评论 ID
  parentId?: number;
  // 当前页面的 index
  pageIndex?: number;
  // 回复评论的 ID
  parentCommentId?: number;
}

export interface BlogEssay extends BlogRestriction {
}

export interface BlogEssayVote {
  // 反对数量
  buryCount?: number;
  // 点赞数量
  diggCount?: number;
  feedbackCount?: number;
  // 随笔 ID
  postId?: number;
  // 阅读数量
  viewCount?: number;
}

export interface TagPage {
  text: string;
  list: Array<{ id: string; title: string; href: string; date: string; view: string; comm: string; digg: string }>;
}

/**
 * 侧边栏部分，随笔分类
 */
export interface SideColumn {
  id: string;
  text: string;
}

export interface BlogerInfo {
  text: string;
  href: string;
}

export interface LiteConfigType {
  blogName?: string;
  blogId?: number;
  isLogined?: boolean;
  isBlogOwner?: boolean;
  leftSide?: {
    avatar?: string;
    signature?: string;
  },
  board?: {
    color?: string;
    height?: string;
    display?: boolean; signature?: string;
    bg?: string; blur?: string;
    avatar?: string;
    tag?: {
      text?: string;
      color?: string;
      type?: "success" | "info" | "warning" | "danger",
      round?: boolean;
    };
    floating?: { label?: string; text?: string; }[];
  },
  navor?: { header?: string; displaySearch?: boolean; navs?: { href: string; text: string; svg?: string; img?: string; }[] }
  github?: string;
}