export interface User {
  name: string | null;
  bio: string | null;
  location: string | null;
  website: string | null;
}
export interface UserInfoModalProps {
  user: User;
  onSubmit: (data: User) => void;
  onCancel: () => void;
}
export type ConfirmActionType = "unfollow" | "block" | "delete";

export interface ConfirmModalProps {
  type: ConfirmActionType;
  onConfirm: () => void;
  onCancel: () => void;
}
