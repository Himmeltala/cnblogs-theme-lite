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

export interface BlogEssay extends BlogRestriction {}

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

export interface BloggerInfo {
  text: string;
  href: string;
}
