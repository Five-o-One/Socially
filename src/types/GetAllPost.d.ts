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

export interface Post {
  id: string;
  authorId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: Author;
  likes: Like[];
  comments: Comment[];
  _count: {
    likes: number;
    comments: number;
  };
}

export interface GetAllPostsResponse {
  message: string;
  success: boolean;
  data: Post[];
}

export interface CreatePostDto {
  content: string;
}

export interface CreateCommentDto {
  content: string;
  postId: string;
}
