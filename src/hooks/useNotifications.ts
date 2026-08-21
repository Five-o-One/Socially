import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetNotifications, MarkNotificationsAsRead } from "@/api";
import type { Notification } from "@/types/Notifications";

export function useNotifications() {
  return useQuery<Notification[]>({
    queryKey: ["notifications"],
    queryFn: async () => {
      const response = await GetNotifications();

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data.data;
    },
    retry: false,
  });
}

export function useMarkNotificationsAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ids: string[]) => {
      const response = await MarkNotificationsAsRead({ ids });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    },
  });
}
