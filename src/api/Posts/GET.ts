import type { AxiosResponse } from "axios";
import type { GetAllPostsResponse } from "../../types/GetAllPost";
import __BASE__ from "../base";

export const GetAllPosts = async (): Promise<
  AxiosResponse<GetAllPostsResponse>
> => {
  const response = await __BASE__.get<GetAllPostsResponse>("/api/posts");

  return response;
};
