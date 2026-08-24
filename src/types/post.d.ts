import type { ApiResponse } from "./api";

/** API response containing the feed posts. */
export type GetAllPostsResponse = ApiResponse<Post[]>;

/** Public author information attached to a post or comment. */
export interface Author {
  id?: string;
  name: string;
  email?: string;
  username?: string;
  image: string | null;
}

/** Comment content and its author. */
export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  author: Author;
}

/** Reference to a user who liked a post. */
export interface Like {
  userId: string;
}

/** Aggregate counts displayed on a post. */
export interface PostCount {
  likes: number;
  comments: number;
}

/** Complete post model used by feed and profile views. */
export interface Post {
  id: string;
  authorId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: Author;
  likes: Like[];
  comments: Comment[];
  _count?: PostCount;
  count?: PostCount;
}

/** Client payload for creating a post. */
export interface CreatePostDto {
  content: string;
}

/** Client payload for creating a comment. */
export interface CreateCommentDto {
  content: string;
  postId?: string;
}

/** Record connecting a user like to its post. */
export interface LikedPostRecord {
  id: string;
  userId: string;
  postId: string;
  createdAt: string;
  post: Post;
}
