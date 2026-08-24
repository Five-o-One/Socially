import type { AxiosResponse } from "axios";
import type { GetAllPostsResponse } from "../../types/post";
import __BASE__ from "../base";

/** Fetches all posts used by the home feed. */
export const GetAllPosts = async (): Promise<
  AxiosResponse<GetAllPostsResponse>
> => {
  const response = await __BASE__.get<GetAllPostsResponse>("/api/posts");

  return response;
};
