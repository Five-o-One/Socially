import { useState, useMemo } from "react";
import { useParams } from "react-router";
import {
  AppCard,
  AppImage,
  AppButton,
  AppIcon,
  PostCard,
  UserInfoModal,
  AppTab,
} from "@/components";
import type { Post, UpdateUserProfileDto } from "@/types";
import type { TabItem } from "@/components/AppTab/AppTab";

const MOCK_PROFILES: Record<
  string,
  {
    name: string;
    username: string;
    image: string | null;
    bio: string | null;
    location: string | null;
    website: string | null;
    joinedDate: string;
    followers: number;
    following: number;
    postsCount: number;
    isFollowedByMe?: boolean;
  }
> = {
  "samb.1376": {
    name: "Seyed Ali Mousavi",
    username: "samb.1376",
    image: null,
    bio: "Frontend Developer working on Socially project.",
    location: "Mashhad, Iran",
    website: "https://github.com",
    joinedDate: "November 2025",
    followers: 0,
    following: 0,
    postsCount: 1,
  },
  "f.e.h.farshad": {
    name: "Farshad Hosseini",
    username: "f.e.h.farshad",
    image: null,
    bio: null,
    location: null,
    website: null,
    joinedDate: "November 2025",
    followers: 0,
    following: 1,
    postsCount: 1,
    isFollowedByMe: false,
  },
  "mohammadfallah.w": {
    name: "Mohammad Fallah",
    username: "mohammadfallah.w",
    image: null,
    bio: "Frontend Engineer",
    location: "Tehran, Iran",
    website: "https://mohammadfallah.ir",
    joinedDate: "November 2025",
    followers: 1,
    following: 2,
    postsCount: 3,
    isFollowedByMe: true,
  },
};

function ProfileContent({ username }: { username: string }) {
  const currentAuthUsername = "samb.1376";
  const isOwnProfile = username === currentAuthUsername;

  const initialUser = useMemo(() => {
    return (
      MOCK_PROFILES[username] || {
        name: username,
        username: username,
        image: null,
        bio: null,
        location: null,
        website: null,
        joinedDate: "November 2025",
        followers: 0,
        following: 0,
        postsCount: 0,
        isFollowedByMe: false,
      }
    );
  }, [username]);

  const [userData, setUserData] = useState(initialUser);
  const [isFollowing, setIsFollowing] = useState(
    Boolean(initialUser.isFollowedByMe),
  );
  const [activeTab, setActiveTab] = useState("posts");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const profileTabs: TabItem[] = [
    { id: "posts", label: "Posts", icon: "Post" },
    { id: "likes", label: "Likes", icon: "Heart" },
  ];

  const userPosts: Post[] = [
    {
      id: `p-${username}`,
      authorId: username,
      content:
        username === "f.e.h.farshad"
          ? "سوشالی؛ پروژه‌ای برای محک زدن مهارت‌های فرانت‌اند و کار تیمی 🚀\nپیاده‌سازی تمیز دیزاین توییتر با ری‌اکت و تیلویند."
          : `این یک پست تستی در صفحه پروفایل @${username} است.`,
      createdAt: "8 days ago",
      updatedAt: "8 days ago",
      author: {
        id: username,
        name: userData.name,
        username: userData.username,
        image: userData.image,
      },
      likes: [{ userId: "1" }],
      comments: [],
      _count: { likes: 1, comments: 1 },
    },
  ];

  const likedPosts: Post[] = [];

  const handleFollowToggle = () => {
    setIsFollowing((prev) => {
      const next = !prev;
      setUserData((u) => ({
        ...u,
        followers: next ? u.followers + 1 : Math.max(0, u.followers - 1),
      }));
      return next;
    });
  };

  const handleProfileUpdate = (updatedValues: UpdateUserProfileDto) => {
    setUserData((prev) => ({
      ...prev,
      name: updatedValues.name || prev.name,
      bio: updatedValues.bio ?? prev.bio,
      location: updatedValues.location ?? prev.location,
      website: updatedValues.website ?? prev.website,
    }));
    setIsEditModalOpen(false);
  };

  return (
    <div className="space-y-5">
      {/* Profile Header Card */}
      <AppCard>
        <div className="flex flex-col items-center text-center">
          <AppImage
            src={userData.image || ""}
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
                onClick={handleFollowToggle}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </AppButton>
            )}
          </div>

          {/* Additional Info */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-text-secondary">
            {userData.location && (
              <div className="flex items-center gap-1.5">
                <AppIcon nameIcon="Location" size={14} />
                <span>{userData.location}</span>
              </div>
            )}
            {userData.website && (
              <div className="flex items-center gap-1.5">
                <AppIcon nameIcon="Link" size={14} />
                <a
                  href={userData.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand hover:underline truncate"
                >
                  {userData.website.replace(/^https?:\/\//, "")}
                </a>
              </div>
            )}
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
                currentUserId={currentAuthUsername}
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
                  currentUserId={currentAuthUsername}
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
      {isOwnProfile && (
        <UserInfoModal
          isOpen={isEditModalOpen}
          initialData={{
            name: userData.name,
            bio: userData.bio || "",
            location: userData.location || "",
            website: userData.website || "",
          }}
          onSubmit={handleProfileUpdate}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
}

export default function Profile() {
  const { username = "samb.1376" } = useParams();
  return <ProfileContent key={username} username={username} />;
}
