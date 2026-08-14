// constants/confirmModal.ts

export type ConfirmActionType = "unfollow" | "block" | "delete";

export const CONFIRM_ACTION_CONFIG: Record<
  ConfirmActionType,
  { title: string; message: string; confirmText: string }
> = {
  unfollow: {
    title: "Unfollow User",
    message: "You can follow them again later.",
    confirmText: "Unfollow",
  },
  block: {
    title: "Block User",
    message: "They won't be able to see your profile or posts anymore.",
    confirmText: "Block",
  },
  delete: {
    title: "Delete Post",
    message: "This Action Can not be undone",
    confirmText: "Delete",
  },
};
