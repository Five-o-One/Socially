import { useState } from "react";
import { useParams } from "react-router";
import {
  AppCard,
  AppImage,
  AppButton,
  AppIcon,
  PostCard,
  UserInfoModal,
  AppTab,
  AppPageSpinner,
  AppSpinner,
} from "@/components";
import { FollowListModal } from "@/components/AppModal/FollowListModal";
import {
  useCurrentUser,
  useUserProfile,
  useUserPosts,
  useUserLikedPosts,
  useToggleFollow,
  useUpdateProfile,
  useFollowings,
} from "@/hooks";
import { getErrorMessage } from "@/lib/error";
import type { UpdateUserProfileDto } from "@/types";
import type { TabItem } from "@/components/AppTab/AppTab";

function ProfileContent({ id, username }: { id?: string; username?: string }) {
  const [activeTab, setActiveTab] = useState("posts");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isFollowModalOpen, setIsFollowModalOpen] = useState(false);
  const [followModalTab, setFollowModalTab] = useState<
    "followers" | "following"
  >("followers");

  const { data: currentUser } = useCurrentUser();

  const {
    data: user,
    isLoading: isProfileLoading,
    isError: isProfileError,
    error: profileError,
  } = useUserProfile({
    id,
    username,
  });

  const { data: currentUserFollowings = [] } = useFollowings(
    currentUser?.id ?? "",
    Boolean(currentUser?.id && user?.id && currentUser.id !== user.id),
  );

  const { data: userPosts = [], isLoading: isPostsLoading } = useUserPosts(
    user?.id ?? "",
  );

  const { data: likedPosts = [], isLoading: isLikedPostsLoading } =
    useUserLikedPosts(user?.id ?? "");

  const toggleFollow = useToggleFollow();
  const updateProfile = useUpdateProfile();

  const isOwnProfile = currentUser?.id === user?.id;

  const isFollowing = currentUserFollowings.some(
    (followingUser) => followingUser.id === user?.id,
  );
  const profileTabs: TabItem[] = [
    { id: "posts", label: "Posts", icon: "Post" },
    { id: "likes", label: "Likes", icon: "Heart" },
  ];

  const handleOpenFollowModal = (tab: "followers" | "following") => {
    setFollowModalTab(tab);
    setIsFollowModalOpen(true);
  };

  const handleFollowToggle = async () => {
    if (!user || toggleFollow.isPending) return;

    try {
      await toggleFollow.mutateAsync(user.id);
    } catch {
      // useToggleFollow handles and displays the error.
    }
  };

  const handleProfileUpdate = async (updatedValues: UpdateUserProfileDto) => {
    if (!user || updateProfile.isPending) return;

    try {
      await updateProfile.mutateAsync({
        userId: user.id,
        data: updatedValues,
      });

      setIsEditModalOpen(false);
    } catch {
      // useUpdateProfile handles and displays the error.
    }
  };

  if (isProfileLoading) {
    return <AppPageSpinner message="Loading profile..." />;
  }

  if (isProfileError || !user) {
    return (
      <AppCard>
        <p className="text-center text-danger">
          {getErrorMessage(profileError, "Failed to load profile.")}
        </p>
      </AppCard>
    );
  }

  const followersCount = user._count?.followers ?? user.count?.followers ?? 0;

  const followingCount =
    user._count?.following ??
    user._count?.followings ??
    user.count?.following ??
    user.count?.followings ??
    0;

  const postsCount =
    user._count?.posts ?? user.count?.posts ?? userPosts.length;

  const displayUsername =
    user.username ?? user.name.toLowerCase().replace(/\s+/g, "");

  return (
    <div className="space-y-5">
      <AppCard>
        <div className="flex flex-col items-center text-center">
          <AppImage
            src={user.image || ""}
            alt={user.name}
            variant="circle"
            size="xl"
            className="ring-4 ring-border"
          />

          <h2 className="mt-3 text-xl font-bold text-text">{user.name}</h2>

          <p className="text-sm text-text-secondary">
            @{displayUsername.replace(/^@/, "")}
          </p>

          <div className="mt-4 flex items-center gap-8 text-sm">
            <button
              type="button"
              onClick={() => handleOpenFollowModal("following")}
              className="cursor-pointer transition-transform active:scale-95 group"
            >
              <span className="font-bold text-text group-hover:underline">
                {followingCount}
              </span>{" "}
              <span className="text-text-secondary group-hover:underline">
                Following
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleOpenFollowModal("followers")}
              className="cursor-pointer transition-transform active:scale-95 group"
            >
              <span className="font-bold text-text group-hover:underline">
                {followersCount}
              </span>{" "}
              <span className="text-text-secondary group-hover:underline">
                Followers
              </span>
            </button>

            <div>
              <span className="font-bold text-text">{postsCount}</span>{" "}
              <span className="text-text-secondary">Posts</span>
            </div>
          </div>

          <div className="mt-5 w-full max-w-xs">
            {isOwnProfile ? (
              <AppButton
                variant="primary"
                fullWidth
                icon="Edit"
                onClick={() => setIsEditModalOpen(true)}
              >
                Edit Profile
              </AppButton>
            ) : (
              <AppButton
                variant={isFollowing ? "secondary" : "primary"}
                fullWidth
                onClick={handleFollowToggle}
                isLoading={toggleFollow.isPending}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </AppButton>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-text-secondary">
            {user.bio && (
              <p className="w-full max-w-md text-sm text-text">{user.bio}</p>
            )}

            {user.location && (
              <div className="flex items-center gap-1.5">
                <AppIcon nameIcon="Location" size={14} />
                <span>{user.location}</span>
              </div>
            )}

            {user.website && (
              <div className="flex items-center gap-1.5">
                <AppIcon nameIcon="Link" size={14} />
                <a
                  href={
                    user.website.startsWith("http")
                      ? user.website
                      : `https://${user.website}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate text-brand hover:underline"
                >
                  {user.website.replace(/^https?:\/\//, "")}
                </a>
              </div>
            )}

            <div className="flex items-center gap-1.5">
              <AppIcon nameIcon="Calendar" size={14} />
              <span>
                Joined{" "}
                {new Date(user.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </AppCard>

      <AppTab
        tabs={profileTabs}
        activeTab={activeTab}
        onChange={(tabId) => setActiveTab(tabId)}
      />

      <section className="space-y-4">
        {activeTab === "posts" && (
          <>
            {isPostsLoading ? (
              <div className="flex justify-center py-12">
                <AppSpinner size={28} />
              </div>
            ) : userPosts.length > 0 ? (
              userPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  currentUserId={currentUser?.id}
                />
              ))
            ) : (
              <div className="py-12 text-center text-sm font-medium text-text-secondary">
                No Posts to Show
              </div>
            )}
          </>
        )}

        {activeTab === "likes" && (
          <>
            {isLikedPostsLoading ? (
              <div className="flex justify-center py-12">
                <AppSpinner size={28} />
              </div>
            ) : likedPosts.length > 0 ? (
              likedPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  currentUserId={currentUser?.id}
                />
              ))
            ) : (
              <div className="py-12 text-center text-sm font-medium text-text-secondary">
                No Liked Posts to Show
              </div>
            )}
          </>
        )}
      </section>

      {isOwnProfile && (
        <UserInfoModal
          isOpen={isEditModalOpen}
          initialData={{
            name: user.name,
            bio: user.bio || "",
            location: user.location || "",
            website: user.website || "",
          }}
          onSubmit={handleProfileUpdate}
          onClose={() => setIsEditModalOpen(false)}
          isLoading={updateProfile.isPending}
        />
      )}

      <FollowListModal
        isOpen={isFollowModalOpen}
        onClose={() => setIsFollowModalOpen(false)}
        userId={user.id}
        userName={user.name}
        initialTab={followModalTab}
      />
    </div>
  );
}

export default function Profile() {
  const { id, username } = useParams();

  return <ProfileContent key={id ?? username} id={id} username={username} />;
}
