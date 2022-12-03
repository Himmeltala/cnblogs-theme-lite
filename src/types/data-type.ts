export interface Essay {
  postId?: number;
  title?: string;
  content?: string;
  desc?: string;
  date?: string;
  viewCount?: string;
  commCount?: string;
  diggCount?: string;
  cover?: string;
}

export interface Comment {
  contenteditable?: boolean;
  commentId?: number;
  space?: string;
  layer?: string;
  date?: string;
  author?: string;
  digg?: string;
  burry?: string;
  avatar?: string;
  postId?: number;
  body?: string;
  parentCommentId?: number;
  pageIndex?: number;
}

export type VoteType = "Bury" | "Digg";

interface CnBlogRestriction {
  isAbandoned?: boolean;
  postId?: number;
  voteType?: VoteType;
}

export interface CnBlogComment extends CnBlogRestriction {
  commentId?: number;
  body?: string;
  parentId?: number;
  pageIndex?: number;
}

export interface CnBlogEssay extends CnBlogRestriction {}
