import type { Notification, Post, User } from "./domain";
export interface CreatePostMutationContext { previousPosts: Post[] | undefined; }
export interface DeletePostMutationContext { previousQueries: Array<[readonly unknown[], Post[] | undefined]>; }
export interface MarkNotificationsContext { previousNotifications: Notification[] | undefined; }
export interface LikeMutationContext { previousPosts?: Post[]; previousUserPosts: Array<[readonly unknown[], Post[] | undefined]>; previousLikedPosts: Array<[readonly unknown[], Post[] | undefined]>; }
export interface FollowMutationContext { previousRecommendedUsers?: User[]; previousProfiles: Array<[readonly unknown[], User | undefined]>; previousCurrentUser?: User; }
export interface AddCommentVariables { postId: string; content: string; }
export interface UseUserProfileOptions { id?: string; username?: string; }
export interface CachedSession { user?: User; }
