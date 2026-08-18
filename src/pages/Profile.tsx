import { useState } from "react";
import { useParams } from "react-router";
import { AppCard } from "@/components/AppCard";
import { AppImage } from "@/components/AppImage";
import { AppButton } from "@/components/AppButton";
import AppIcon from "@/components/AppIcon/AppIcon";
import { PostCard } from "@/components/PostCard";
import { UserInfoModal } from "@/components/AppModal/UserInfoModal";
import { AppTab, type TabItem } from "@/components/AppTab/AppTab";
import type { Post } from "@/types/GetAllPost";
import type { UpdateUserProfileDto } from "@/types/Modals";

export default function Profile() {
  const { username = "samb.1376" } = useParams();
  const isOwnProfile = username === "samb.1376";

  const [activeTab, setActiveTab] = useState("posts");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const [userData, setUserData] = useState({
    name: "Seyed Ali Mousavi",
    username: "samb.1376",
    bio: "Frontend Developer working on Socially project.",
    location: "Mashhad, Iran",
    website: "https://github.com",
    joinedDate: "November 2025",
    followers: 12,
    following: 5,
    postsCount: 2,
  });

  const profileTabs: TabItem[] = [
    { id: "posts", label: "Posts", icon: "Post" },
    { id: "likes", label: "Likes", icon: "Heart" },
  ];

  const userPosts: Post[] = [
    {
      id: "p-101",
      authorId: "current-user-id",
      content: "اولین پست منتشر شده در صفحه پروفایل شخصی.",
      createdAt: "8 days ago",
      updatedAt: "8 days ago",
      author: {
        id: "current-user-id",
        name: userData.name,
        username: userData.username,
        image: null,
      },
      likes: [{ userId: "current-user-id" }],
      comments: [],
      _count: { likes: 1, comments: 0 },
    },
  ];

  const likedPosts: Post[] = []; // لیست خالی برای تست Empty State فیگما

  const handleProfileUpdate = (updatedValues: UpdateUserProfileDto) => {
    setUserData((prev) => ({
      ...prev,
      name: updatedValues.name,
      bio: updatedValues.bio || prev.bio,
      location: updatedValues.location || prev.location,
      website: updatedValues.website || prev.website,
    }));
    setIsEditModalOpen(false);
  };

  return (
    <div className="space-y-5">
      {/* Profile Header Card */}
      <AppCard>
        <div className="flex flex-col items-center text-center">
          <AppImage
            src=""
            alt={userData.name}
            variant="circle"
            size="xl"
            className="ring-4 ring-border"
          />
          <h2 className="mt-3 text-xl font-bold text-text">{userData.name}</h2>
          <p className="text-sm text-text-secondary">@{userData.username}</p>

          {/* Stats Bar */}
          <div className="mt-4 flex items-center gap-8 text-sm">
            <div>
              <span className="font-bold text-text">{userData.following}</span>{" "}
              <span className="text-text-secondary">Following</span>
            </div>
            <div>
              <span className="font-bold text-text">{userData.followers}</span>{" "}
              <span className="text-text-secondary">Followers</span>
            </div>
            <div>
              <span className="font-bold text-text">{userData.postsCount}</span>{" "}
              <span className="text-text-secondary">Posts</span>
            </div>
          </div>

          {/* Action Button */}
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
                onClick={() => setIsFollowing(!isFollowing)}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </AppButton>
            )}
          </div>

          {/* Additional Info */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-text-secondary">
            <div className="flex items-center gap-1.5">
              <AppIcon nameIcon="Calendar" size={14} />
              <span>Joined {userData.joinedDate}</span>
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

      {/* Tab Content */}
      <section className="space-y-4">
        {activeTab === "posts" && (
          <>
            {userPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                currentUserId="current-user-id"
              />
            ))}
          </>
        )}

        {activeTab === "likes" && (
          <>
            {likedPosts.length > 0 ? (
              likedPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  currentUserId="current-user-id"
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

      {/* Edit Profile Modal */}
      <UserInfoModal
        isOpen={isEditModalOpen}
        initialData={{
          name: userData.name,
          bio: userData.bio,
          location: userData.location,
          website: userData.website,
        }}
        onSubmit={handleProfileUpdate}
        onClose={() => setIsEditModalOpen(false)}
      />
    </div>
  );
}
