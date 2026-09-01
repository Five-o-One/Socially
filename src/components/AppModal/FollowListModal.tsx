import type { FollowListModalProps, FollowListContentProps, TabItem } from "@/types";
import { useState, useMemo } from "react";
import { AppModal } from "./AppModal";
import { AppTab } from "@/components/AppTab/AppTab";
import AppSpinner from "../AppSpinner/AppSpinner";
import UserRow from "../UserRow/UserRow";
import {
  useFollowers,
  useFollowings,
  useToggleFollow,
  useCurrentUser,
} from "@/hooks";





function FollowListContent({
  userId,
  initialTab,
  onClose,
}: FollowListContentProps) {
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  const { data: currentUser } = useCurrentUser();
  const toggleFollow = useToggleFollow();

  const isMyOwnNetwork = userId === currentUser?.id;

  const { data: myFollowings = [] } = useFollowings(
    currentUser?.id ?? "",
    Boolean(currentUser?.id),
  );

  const myFollowingIds = useMemo(() => {
    return new Set(myFollowings.map((u) => u.id));
  }, [myFollowings]);

  const {
    data: followers = [],
    isLoading: isFollowersLoading,
    isError: isFollowersError,
  } = useFollowers(userId, activeTab === "followers");

  const {
    data: followings = [],
    isLoading: isFollowingsLoading,
    isError: isFollowingsError,
  } = useFollowings(userId, activeTab === "following");

  const tabs: TabItem[] = [
    { id: "followers", label: "Followers", icon: "Person" },
    { id: "following", label: "Following", icon: "Person" },
  ];

  const currentList = activeTab === "followers" ? followers : followings;
  const isLoading =
    activeTab === "followers" ? isFollowersLoading : isFollowingsLoading;
  const isError =
    activeTab === "followers" ? isFollowersError : isFollowingsError;

  return (
    <div className="space-y-4">
      <AppTab
        tabs={tabs}
        activeTab={activeTab}
        onChange={(tabId) => setActiveTab(tabId)}
      />

      <div className="min-h-55 max-h-95 overflow-y-auto pr-1 space-y-3">
        {isLoading ? (
          <div className="flex h-48 items-center justify-center">
            <AppSpinner size={28} />
          </div>
        ) : isError ? (
          <div className="flex h-48 items-center justify-center text-sm text-danger">
            Failed to load users.
          </div>
        ) : currentList.length === 0 ? (
          <div className="flex h-48 items-center justify-center text-sm text-text-secondary">
            {activeTab === "followers"
              ? "No followers yet."
              : "Not following anyone yet."}
          </div>
        ) : (
          currentList.map((user) => {
            const userHandle =
              user.username || user.name.toLowerCase().replace(/\s+/g, "");
            const isMe = user.id === currentUser?.id;

            const isUserFollowed =
              (activeTab === "following" && isMyOwnNetwork) ||
              user.isFollowing === true ||
              (currentUser?.id ? myFollowingIds.has(user.id) : false);

            return (
              <div
                key={user.id}
                onClick={(e) => {
                  if ((e.target as HTMLElement).closest("a")) {
                    onClose();
                  }
                }}
              >
                <UserRow
                  id={user.id}
                  username={userHandle}
                  name={user.name}
                  avatarSrc={user.image}
                  followers={
                    user.count?.followers ?? user._count?.followers ?? 0
                  }
                  isFollowing={isUserFollowed}
                  onToggleFollow={() => {
                    if (!isMe) {
                      toggleFollow.mutate(user.id);
                    }
                  }}
                  isFollowLoading={
                    toggleFollow.isPending && toggleFollow.variables === user.id
                  }
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export function FollowListModal({
  isOpen,
  onClose,
  userId,
  initialTab = "followers",
  userName,
}: FollowListModalProps) {
  return (
    <AppModal
      isOpen={isOpen}
      onClose={onClose}
      title={userName ? `${userName}'s Network` : "User Connections"}
      className="max-w-md"
    >
      {isOpen && (
        <FollowListContent
          key={`${userId}-${initialTab}`}
          userId={userId}
          initialTab={initialTab}
          onClose={onClose}
        />
      )}
    </AppModal>
  );
}

export default FollowListModal;
