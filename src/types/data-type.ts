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
  postId?: number;
  body?: string;
  parentCommentId?: number;
}
