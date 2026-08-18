import type { Datum } from "./GetAllPost";

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

export interface UserCount {
  followers: number;
  followings?: number;
  posts?: number;
}

export interface FollowerRef {
  followerId: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  bio: string | null;
  location: string | null;
  website: string | null;
  createdAt: string;
  updatedAt: string;
  count: UserCount;
  followers?: FollowerRef[];
}

export type GetUserResponse = ApiResponse<User>;
export type GetUserProfileResponse = ApiResponse<User>;
export type GetRecommendedUsersResponse = ApiResponse<User[]>;
export type ToggleFollowResponse = ApiMessageResponse;

export interface UpdateProfileRequest {
  name?: string;
  bio?: string;
  location?: string;
  website?: string;
}

export type UpdateProfileResponse = ApiMessageResponse;

export interface LikedPostRecord {
  id: string;
  userId: string;
  postId: string;
  createdAt: string;
  post: Datum;
}

export type GetUserLikedPostsResponse = ApiResponse<LikedPostRecord[]>;
