export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  bio?: string | null;
  image?: string | null;
  location?: string | null;
  website?: string | null;
  createdAt: string;
  _count?: {
    followers: number;
    following: number;
    posts: number;
  };
}

export interface UpdateUserProfileDto {
  name: string;
  bio?: string;
  location?: string;
  website?: string;
}

export interface UserInfoModalProps {
  user: User;
  onSubmit: (data: UpdateUserProfileDto) => void;
  onCancel: () => void;
}
export type ConfirmActionType = "unfollow" | "block" | "delete";

export interface ConfirmModalProps {
  type: ConfirmActionType;
  onConfirm: () => void;
  onCancel: () => void;
}
