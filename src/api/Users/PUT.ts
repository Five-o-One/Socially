import type { AxiosResponse } from "axios";
import type { UpdateProfileRequest } from "../../types/Users";
import __BASE__ from "../base";

export const UpdateProfile = async (
  id: string,
  data: UpdateProfileRequest,
): Promise<AxiosResponse<UpdateProfileRequest>> => {
  const response = __BASE__(`/api/users/${id}`, { method: "PUT", data });
  return response;
};
