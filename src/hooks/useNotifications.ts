/** @file Notification query and optimistic mark-as-read mutation. */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetNotifications, MarkNotificationsAsRead } from "@/api";
import type { Notification } from "@/types/Notifications";

/** Previous notification state retained for optimistic read updates. */
interface MarkNotificationsContext {
  previousNotifications: Notification[] | undefined;
}

/**
 * @hook useNotifications
 * @description Loads notifications for the current user.
 * @returns Notifications query result
 */
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

/**
 * @hook useMarkNotificationsAsRead
 * @description Marks notifications as read and refreshes notification data.
 * @returns Mark-as-read mutation result
 */
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

    onMutate: async (ids): Promise<MarkNotificationsContext> => {
      await queryClient.cancelQueries({
        queryKey: ["notifications"],
      });

      const previousNotifications = queryClient.getQueryData<Notification[]>([
        "notifications",
      ]);

      queryClient.setQueryData<Notification[]>(
        ["notifications"],
        (notifications) => {
          if (!notifications) return notifications;

          const idsSet = new Set(ids);

          return notifications.map((notification) =>
            idsSet.has(notification.id)
              ? {
                  ...notification,
                  read: true,
                }
              : notification,
          );
        },
      );

      return {
        previousNotifications,
      };
    },

    onError: (_error, _ids, context) => {
      if (!context) return;

      queryClient.setQueryData(
        ["notifications"],
        context.previousNotifications,
      );
    },
  });
}
