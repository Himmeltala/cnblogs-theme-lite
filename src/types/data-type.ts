export interface Essay {
  // 随笔 ID
  postId?: number;
  // 随笔标题
  title?: string;
  // 随笔内容
  content?: string;
  // 随笔摘要
  desc?: string;
  // 随笔发表日期
  date?: string;
  // 随笔阅读数量
  viewCount?: string;
  // 随笔评论数量
  commCount?: string;
  // 随笔点赞数量
  diggCount?: string;
  // 随笔封面
  cover?: string;
}

export interface Comment {
  // 评论是否可以被编辑，默认是 false
  updateEditable?: boolean;
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
  body?: string;
  // 回复评论 ID
  parentCommentId?: number;
  // 当前评论所在评论列表的页数
  pageIndex?: number;
}

export type VoteType = "Bury" | "Digg";

/**
 * 博客园评论和随笔的基础字段，一般是调用接口之后返回过来的字段
 */
interface CnBlogRestriction {
  isAbandoned?: boolean;
  postId?: number;
  voteType?: VoteType;
}

/**
 * 博客园评论实体，区别于上面定义的评论实体，这个实体是根据博客园的数据库字段而来
 */
export interface CnBlogComment extends CnBlogRestriction {
  commentId?: number;
  body?: string;
  parentId?: number;
  pageIndex?: number;
  parentCommentId?: number;
}

export interface CnBlogEssay extends CnBlogRestriction {
}

export interface CnBlogEssayVote {
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
  title: string;
  list: Array<{ id: string; title: string; href: string; date: string; viewCount: string; commCount: string; diggCount: string }>;
}