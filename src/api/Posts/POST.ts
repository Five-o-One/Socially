import type { AxiosResponse } from "axios";
import type { ApiMessageResponse } from "../../types/api";
import type { ApiResponse } from "../../types/api";
import type { Post } from "../../types/post";
import __BASE__ from "../base";

/** Request body for creating a post. */
export interface CreatePostRequest {
  content: string;
}

/** Creates a post from the supplied request body. */
export const CreatePost = async (
  data: CreatePostRequest,
): Promise<AxiosResponse<ApiResponse<Post>>> => {
  const response = await __BASE__.post<ApiResponse<Post>>("/api/posts", data);

  return response;
};

/** Request body for adding a comment to a post. */
export interface AddCommentRequest {
  content: string;
}

/** Adds a comment to a post. */
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
