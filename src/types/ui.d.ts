import type { ReactNode } from "react";
import type { NameIcon, Post, UpdateUserProfileDto } from "./domain";

export interface AppButtonProps {
  children?: ReactNode; icon?: NameIcon;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg"; fullWidth?: boolean; disabled?: boolean;
  isLoading?: boolean; onClick?: () => void;
  type?: "button" | "submit" | "reset"; className?: string;
}
export interface AppCardProps { children: ReactNode; header?: ReactNode; footer?: ReactNode; hoverable?: boolean; noPadding?: boolean; borderless?: boolean; onClick?: () => void; className?: string; }
export interface AppImageProps { src?: string | null; alt: string; variant?: "circle" | "rounded" | "square"; size?: "xs" | "sm" | "md" | "lg" | "xl" | "full"; className?: string; lazyLoad?: boolean; showRealImage?: boolean; placeholderStyle?: "solid" | "gradient"; }
export interface AppModalProps { isOpen: boolean; onClose: () => void; children: ReactNode; title?: string; footer?: ReactNode; closeOnOutsideClick?: boolean; showCloseButton?: boolean; className?: string; }
export interface ConfirmModalProps { isOpen: boolean; title?: string; description?: string; confirmText?: string; cancelText?: string; onConfirm: () => void; onClose: () => void; isLoading?: boolean; }
export interface FollowListModalProps { isOpen: boolean; onClose: () => void; userId: string; initialTab?: "followers" | "following"; userName?: string; }
export interface FollowListContentProps { userId: string; initialTab: "followers" | "following"; onClose: () => void; }
export interface UserInfoModalProps { isOpen: boolean; initialData?: UpdateUserProfileDto; onSubmit: (data: UpdateUserProfileDto) => void; onClose: () => void; isLoading?: boolean; }
export interface AppNavbarProps { isLoggedIn: boolean; userId?: string; onLogout?: () => void; }
export interface AppPortalProps { children: ReactNode; }
export interface AppSearchProps { className?: string; placeholder?: string; onNavigate?: () => void; }
export interface AppSpinnerProps { size?: number; className?: string; }
export interface AppPageSpinnerProps { message?: string; subMessage?: string; className?: string; }
export interface TabItem { id: string; label: string; icon?: NameIcon; count?: number; }
export interface AppTabProps { tabs: TabItem[]; activeTab: string; onChange: (tabId: string) => void; className?: string; }
export interface PostCardProps { post: Post; currentUserId?: string; className?: string; }
export interface NotificationCardProps { type: "like" | "comment" | "follow"; isRead?: boolean; userId: string; name: string; avatarSrc?: string | null; time: string; postText?: string | null; commentText?: string | null; }
export interface UserRowProps { id: string; username?: string; name: string; avatarSrc: string | null; followers: number; isFollowing: boolean; onToggleFollow: () => void; isFollowLoading?: boolean; }
export interface UserSummaryProps { user: { id: string; imageURL?: string | null; username: string; name: string; followers: number; following: number; location?: string | null; website?: string | null }; className?: string; }
