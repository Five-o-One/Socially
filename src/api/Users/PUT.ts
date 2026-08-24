import type { AxiosResponse } from "axios";
import type {
  UpdateProfileRequest,
  UpdateProfileResponse,
} from "../../types/Users";
import __BASE__ from "../base";

/** Updates editable profile fields for the current user. */
export const UpdateProfile = async (
  id: string,
  data: UpdateProfileRequest,
): Promise<AxiosResponse<UpdateProfileResponse>> => {
  const response = await __BASE__.put<UpdateProfileResponse>(
    `/api/users/${id}`,
    data,
  );

  return response;
};
