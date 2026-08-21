import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateProfile } from "@/api";
import type { UpdateProfileRequest } from "@/types";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      data,
    }: {
      userId: string;
      data: UpdateProfileRequest;
    }) => {
      const response = await UpdateProfile(userId, data);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data.data;
    },

    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({
        queryKey: ["user-profile"],
      });

      queryClient.invalidateQueries({
        queryKey: ["session"],
      });

      queryClient.invalidateQueries({
        queryKey: ["user-posts", userId],
      });
    },
  });
}
