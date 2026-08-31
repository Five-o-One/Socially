/** @file Notification query and optimistic mark-as-read mutation. */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetNotifications, MarkNotificationsAsRead } from "@/api";
import type { Notification } from "@/types/Notifications";
import { assertApiSuccess } from "@/lib/error";
import type { MarkNotificationsContext } from "@/types";

/** Previous notification state retained for optimistic read updates. */
/**
 * @hook useNotifications
 * @description Loads notifications for the current user.
 * @returns Notifications query result
 */
export function useNotifications(enabled = true) {
  return useQuery<Notification[]>({
    queryKey: ["notifications"],

    queryFn: async () => {
      const response = await GetNotifications();

      assertApiSuccess(response.data, "Failed to fetch notifications");

      return response.data.data;
    },

    retry: false,
    enabled,
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

      assertApiSuccess(response.data, "Failed to mark notifications as read");

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
