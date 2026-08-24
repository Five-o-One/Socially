/**
 * @file User read operations.
 * @description Loads profiles, recommendations, authored posts, and liked posts.
 */
import type { AxiosResponse } from "axios";
import type {
  GetRecommendedUsersResponse,
  GetUserLikedPostsResponse,
  GetUserProfileResponse,
  GetUserResponse,
} from "../../types/Users";
import type { GetAllPostsResponse } from "../../types/post";
import __BASE__ from "../base";

/** Fetches a user profile by ID. */
export const GetUserById = async (
  id: string,
): Promise<AxiosResponse<GetUserResponse>> => {
  const response = await __BASE__.get<GetUserResponse>(`/api/users/${id}`);

  return response;
};

/** Fetches a user profile by username. */
export const GetUserByUsername = async (
  username: string,
): Promise<AxiosResponse<GetUserProfileResponse>> => {
  const response = await __BASE__.get<GetUserProfileResponse>(
    `/api/users/${username}/profile`,
  );

  return response;
};

/** Fetches users recommended for the current user to follow. */
export const GetRecommendedUsers = async (): Promise<
  AxiosResponse<GetRecommendedUsersResponse>
> => {
  const response = await __BASE__.get<GetRecommendedUsersResponse>(
    "/api/users/recommend",
  );

  return response;
};

/** Fetches posts authored by a user. */
export const GetUserPosts = async (
  id: string,
): Promise<AxiosResponse<GetAllPostsResponse>> => {
  const response = await __BASE__.get<GetAllPostsResponse>(
    `/api/users/${id}/posts`,
  );

  return response;
};

/** Fetches posts liked by a user. */
export const GetUserLikedPosts = async (
  id: string,
): Promise<AxiosResponse<GetUserLikedPostsResponse>> => {
  const response = await __BASE__.get<GetUserLikedPostsResponse>(
    `/api/users/${id}/likes`,
  );

  return response;
};
