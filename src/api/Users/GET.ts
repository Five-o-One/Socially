import type { AxiosResponse } from "axios";
import type {
  GetRecommendedUsersResponse,
  GetUserLikedPostsResponse,
  GetUserProfileResponse,
  GetUserResponse,
} from "../../types/Users";
import __BASE__ from "../base";
import type { GetAllPostsResponse } from "../../types/GetAllPost";

export const GetUserById = async (
  id: string,
): Promise<AxiosResponse<GetUserResponse>> => {
  const response = __BASE__(`/api/users/${id}`, { method: "GET" });
  return response;
};

export const GetUserByUsername = async (
  username: string,
): Promise<AxiosResponse<GetUserProfileResponse>> => {
  const response = __BASE__(`/api/users/${username}/profile`, {
    method: "GET",
  });
  return response;
};

export const GetRecommendedUsers = async (): Promise<
  AxiosResponse<GetRecommendedUsersResponse>
> => {
  const response = __BASE__(`/api/users/recommend`, { method: "GET" });
  return response;
};

export const GetUserPosts = async (
  id: string,
): Promise<AxiosResponse<GetAllPostsResponse>> => {
  const response = __BASE__(`/api/users/${id}/posts`, { method: "GET" });
  return response;
};

export const GetUserByPost = async (
  id: string,
): Promise<AxiosResponse<GetUserLikedPostsResponse>> => {
  const response = __BASE__(`api/users/${id}/likes`, { method: "GET" });
  return response;
};
