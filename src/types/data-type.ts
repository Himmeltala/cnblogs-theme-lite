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
}
