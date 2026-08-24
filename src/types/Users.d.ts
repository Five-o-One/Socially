/** @file User profile, relationship, and user-query data contracts. */
import type { ApiResponse } from "./api";
import type { Post } from "./post";

/** Aggregate counts associated with a user. */
export interface UserCount {
  followers: number;
  following?: number;
  followings?: number;
  posts?: number;
}

/** Minimal follower relationship reference. */
export interface FollowerRef {
  followerId: string;
}

/** User profile model used throughout the application. */
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

/** Editable profile fields accepted by the update endpoint. */
export interface UpdateProfileRequest {
  name?: string;
  bio?: string;
  location?: string;
  website?: string;
}

/** A user's like record with its related post. */
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
