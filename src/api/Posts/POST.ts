import type { AxiosResponse } from "axios";
import type { Datum } from "../../types/GetAllPost";
import type { ApiMessageResponse, ApiResponse } from "../../types/Users";
import __BASE__ from "../base";

export interface CreatePostRequest {
  content: string;
}

export const CreatePost = async (
  data: CreatePostRequest,
): Promise<AxiosResponse<ApiResponse<Datum>>> => {
  const response = await __BASE__.post<ApiResponse<Datum>>("/api/posts", data);

  return response;
};

export interface AddCommentRequest {
  content: string;
}

export const AddComment = async (
  postId: string,
  data: AddCommentRequest,
): Promise<AxiosResponse<ApiMessageResponse>> => {
  const response = await __BASE__.post<ApiMessageResponse>(
    `/api/posts/${postId}/comment`,
    data,
  );

  return response;
};
