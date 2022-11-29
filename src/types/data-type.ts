export interface Essay {
  postId?: number;
  title?: string;
  content?: string;
  desc?: string;
  date?: string;
  viewCount?: string;
  commCount?: string;
  diggCount?: string;
}

export interface Comment {
  layer?: string;
  date?: string;
  author?: string;
  digg?: string;
  burry?: string;
  avatar?: string;
  postId?: number;
  body?: string;
  parentCommentId?: number;
}
