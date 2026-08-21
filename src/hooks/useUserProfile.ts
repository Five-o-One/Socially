import { useQuery } from "@tanstack/react-query";
import { GetAllPosts, GetUserById } from "@/api";

export function useUserProfile(username: string) {
  return useQuery({
    queryKey: ["user-profile", username],

    queryFn: async () => {
      const normalizedUsername = username.replace(/^@/, "");

      const postsResponse = await GetAllPosts();

      if (!postsResponse.data.success) {
        throw new Error(postsResponse.data.message);
      }

      const matchingPost = postsResponse.data.data.find((post) => {
        const postUsername =
          post.author.username ??
          post.author.name.toLowerCase().replace(/\s+/g, "");

        return postUsername === normalizedUsername;
      });

      if (!matchingPost) {
        throw new Error("User not found");
      }

      const userResponse = await GetUserById(matchingPost.authorId);

      if (!userResponse.data.success) {
        throw new Error(userResponse.data.message);
      }

      return userResponse.data.data;
    },

    enabled: Boolean(username),
    retry: false,
  });
}
