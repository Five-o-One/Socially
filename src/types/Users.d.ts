import type { ApiResponse } from "./api";
import type { Post } from "./post";

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

export interface UpdateProfileRequest {
  name?: string;
  bio?: string;
  location?: string;
  website?: string;
}

export interface UserLike {
  id: string;
  userId: string;
  postId: string;
  createdAt: string;
  post: Post;
}

export type UpdateUserProfileDto = UpdateProfileRequest;

export type GetUserResponse = ApiResponse<User>;

export type GetUserProfileResponse = ApiResponse<User>;

export type GetRecommendedUsersResponse = ApiResponse<User[]>;

export type GetUserLikedPostsResponse = ApiResponse<UserLike[]>;

export type ToggleFollowResponse = ApiResponse<{
  isFollowing: boolean;
}>;

export type UpdateProfileResponse = ApiResponse<User>;
