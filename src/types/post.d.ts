export interface Author {
  id?: string;
  name: string;
  email?: string;
  username?: string;
  image: string | null;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  author: Author;
}

export interface Like {
  userId: string;
}

export interface PostCount {
  likes: number;
  comments: number;
}

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

export interface CreatePostDto {
  content: string;
}

export interface CreateCommentDto {
  content: string;
  postId?: string;
}

export interface LikedPostRecord {
  id: string;
  userId: string;
  postId: string;
  createdAt: string;
  post: Post;
}
