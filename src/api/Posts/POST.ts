/**
 * @file Post and comment creation operations.
 * @description Provides typed request bodies and functions for creating posts and comments.
 */
import type { AxiosResponse } from "axios";
import type { AddCommentRequest, ApiMessageResponse, ApiResponse, CreatePostRequest, Post } from "../../types";
import __BASE__ from "../base";

/** Creates a post from the supplied request body. */
export const CreatePost = async (
  data: CreatePostRequest,
): Promise<AxiosResponse<ApiResponse<Post>>> => {
  const response = await __BASE__.post<ApiResponse<Post>>("/api/posts", data);

  return response;
};

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
