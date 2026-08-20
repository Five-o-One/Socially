import type { AxiosResponse } from "axios";
import type { ApiMessageResponse } from "../../types/api";
import type { ApiResponse } from "../../types/api";
import type { Post } from "../../types/post";
import __BASE__ from "../base";

export interface CreatePostRequest {
  content: string;
}

export const CreatePost = async (
  data: CreatePostRequest,
): Promise<AxiosResponse<ApiResponse<Post>>> => {
  const response = await __BASE__.post<ApiResponse<Post>>("/api/posts", data);

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
