import type { AxiosResponse } from "axios";
import type {
  GetRecommendedUsersResponse,
  GetUserLikedPostsResponse,
  GetUserProfileResponse,
  GetUserResponse,
} from "../../types/Users";
import type { GetAllPostsResponse } from "../../types/post";
import __BASE__ from "../base";

export const GetUserById = async (
  id: string,
): Promise<AxiosResponse<GetUserResponse>> => {
  const response = await __BASE__.get<GetUserResponse>(`/api/users/${id}`);

  return response;
};

export const GetUserByUsername = async (
  username: string,
): Promise<AxiosResponse<GetUserProfileResponse>> => {
  const response = await __BASE__.get<GetUserProfileResponse>(
    `/api/users/${username}/profile`,
  );

  return response;
};

export const GetRecommendedUsers = async (): Promise<
  AxiosResponse<GetRecommendedUsersResponse>
> => {
  const response = await __BASE__.get<GetRecommendedUsersResponse>(
    "/api/users/recommend",
  );

  return response;
};

export const GetUserPosts = async (
  id: string,
): Promise<AxiosResponse<GetAllPostsResponse>> => {
  const response = await __BASE__.get<GetAllPostsResponse>(
    `/api/users/${id}/posts`,
  );

  return response;
};

export const GetUserLikedPosts = async (
  id: string,
): Promise<AxiosResponse<GetUserLikedPostsResponse>> => {
  const response = await __BASE__.get<GetUserLikedPostsResponse>(
    `/api/users/${id}/likes`,
  );

  return response;
};
