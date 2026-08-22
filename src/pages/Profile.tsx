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
import {
  useCurrentUser,
  useUserProfile,
  useUserPosts,
  useUserLikedPosts,
  useToggleFollow,
  useUpdateProfile,
} from "@/hooks";
import type { UpdateUserProfileDto } from "@/types";
import type { TabItem } from "@/components/AppTab/AppTab";

function ProfileContent({ id }: { id: string }) {
  const [activeTab, setActiveTab] = useState("posts");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { data: currentUser } = useCurrentUser();

  const {
    data: user,
    isLoading: isProfileLoading,
    isError: isProfileError,
    error: profileError,
  } = useUserProfile(id);

  const { data: userPosts = [], isLoading: isPostsLoading } = useUserPosts(
    user?.id ?? "",
  );

  const { data: likedPosts = [], isLoading: isLikedPostsLoading } =
    useUserLikedPosts(user?.id ?? "");

  const toggleFollow = useToggleFollow();
  const updateProfile = useUpdateProfile();

  const isOwnProfile = currentUser?.id === user?.id;
  const isFollowing = user?.isFollowing ?? false;

  const profileTabs: TabItem[] = [
    { id: "posts", label: "Posts", icon: "Post" },
    { id: "likes", label: "Likes", icon: "Heart" },
  ];

  const handleFollowToggle = async () => {
    if (!user || toggleFollow.isPending) return;

    try {
      await toggleFollow.mutateAsync(user.id);
    } catch (error) {
      console.error("Failed to toggle follow:", error);
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
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  if (isProfileLoading) {
    return <AppPageSpinner message="Loading profile..." />;
  }

  if (isProfileError || !user) {
    return (
      <AppCard>
        <p className="text-center text-danger">
          {profileError instanceof Error
            ? profileError.message
            : "Failed to load profile."}
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
      {/* Profile Header */}
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

          {/* Stats */}
          <div className="mt-4 flex items-center gap-8 text-sm">
            <div>
              <span className="font-bold text-text">{followingCount}</span>{" "}
              <span className="text-text-secondary">Following</span>
            </div>

            <div>
              <span className="font-bold text-text">{followersCount}</span>{" "}
              <span className="text-text-secondary">Followers</span>
            </div>

            <div>
              <span className="font-bold text-text">{postsCount}</span>{" "}
              <span className="text-text-secondary">Posts</span>
            </div>
          </div>

          {/* Action */}
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

          {/* Additional Info */}
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

      {/* Tabs */}
      <AppTab
        tabs={profileTabs}
        activeTab={activeTab}
        onChange={(tabId) => setActiveTab(tabId)}
      />

      {/* Posts / Likes */}
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

      {/* Edit Profile */}
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
    </div>
  );
}

export default function Profile() {
  const { id } = useParams();

  return <ProfileContent key={id} id={id ?? ""} />;
}
