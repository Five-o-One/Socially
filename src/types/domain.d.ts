/** Shared domain and API contracts. */

export interface ApiSuccess<T> {
  success: true;
  message: string;
  data: T;
}

export interface ApiError {
  success: false;
  message: string;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

export interface ApiMessageResponse {
  success: boolean;
  message: string;
}

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

export interface UserCount {
  followers: number;
  following?: number;
  followings?: number;
  posts?: number;
}

export interface FollowerRef {
  followerId: string;
}

export interface User {
  id: string;
  name: string;
  username?: string;
  email: string;
  emailVerified?: boolean;
  image: string | null;
  bio: string | null;
  location: string | null;
  website: string | null;
  createdAt: string;
  updatedAt?: string;
  count?: UserCount;
  _count?: UserCount;
  followers?: FollowerRef[];
  isFollowing?: boolean;
}

export type UpdateProfileRequest = Pick<User , "name" | "bio" | "location" | "website">

export interface UserLike {
  id: string;
  userId: string;
  postId: string;
  createdAt: string;
  post: Post;
}

export interface SessionData {
  expiresAt: string;
  token: string;
  createdAt: string;
  updatedAt: string;
  ipAddress: string | null;
  userAgent: string | null;
  userId: string;
  id: string;
}

export interface Session {
  message: string;
  success: boolean;
  data: { session: SessionData; user: User };
}

export interface AuthResponse {
  message: string;
  success: boolean;
  data: { redirect?: boolean; token: string; url?: string; user: User };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export type NotificationType = "LIKE" | "COMMENT" | "FOLLOW";

export interface Notification {
  id: string;
  type: NotificationType;
  read: boolean;
  createdAt: string;
  creator: User;
  postId?: string;
}

export interface MarkNotificationsAsReadRequest {
  ids: string[];
}

export type NameIcon =
  | "Bell" | "ArrowUp" | "Calendar" | "Chat" | "Edit" | "Heart" | "Home"
  | "Image" | "Light" | "Link" | "Location" | "Moon" | "Person" | "Post"
  | "Search" | "Send" | "Trash" | "Menu" | "Close" | "Loader" | "LogOut";

export interface AppIconProps {
  nameIcon: NameIcon;
  className?: string;
  size?: number;
  isFilled?: boolean;
}

export type ConfirmActionType = "unfollow" | "block" | "delete";

export type GetAllPostsResponse = ApiResponse<Post[]>;
export type GetNotificationsResponse = ApiResponse<Notification[]>;
export type UpdateUserProfileDto = UpdateProfileRequest;
export type GetUserResponse = ApiResponse<User>;
export type GetUserProfileResponse = ApiResponse<User>;
export type GetRecommendedUsersResponse = ApiResponse<User[]>;
export type GetUserLikedPostsResponse = ApiResponse<UserLike[]>;
export type ToggleFollowResponse = ApiResponse<{ isFollowing: boolean }>;
export type UpdateProfileResponse = ApiResponse<User>;
export type SearchUsersResponse = ApiResponse<User[]>;
export type GetFollowersResponse = ApiResponse<User[]>;
export type GetFollowingsResponse = ApiResponse<User[]>;
export interface CreatePostRequest { content: string }
export interface AddCommentRequest { content: string }
