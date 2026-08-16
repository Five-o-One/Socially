import type { AxiosResponse } from "axios";
import type { GetAllPostsResponse } from "../../types/GetAllPost";
import __BASE__ from "../base";

//TODO: data is unknown. must create a type for CreatePost Response and Create Post Request
export const CreatePost = async (data : unknown) : Promise<AxiosResponse<GetAllPostsResponse>>=>{
    const response = await __BASE__('' , {
        method:"POST",
        data: data
    })
    return response
}