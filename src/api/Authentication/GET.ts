import type { AxiosResponse } from "axios";
import type { Session } from "../../types/Authentication";
import __BASE__ from "../base";

/** Fetches the currently authenticated session and user. */
export const GetSession = async (): Promise<AxiosResponse<Session>> => {
  const response = await __BASE__.get<Session>("/api/authentication/session");

  return response;
};
