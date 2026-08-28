import { useState } from "react";
import { Link } from "react-router";
import { AppCard } from "@/components/AppCard";
import { AppImage } from "@/components/AppImage";
import AppIcon from "@/components/AppIcon/AppIcon";
import FollowListModal from "../AppModal/FollowListModal";

interface UserSummaryProps {
  user: {
    id: string;
    imageURL?: string | null;
    username: string;
    name: string;
    followers: number;
    following: number;
    location?: string | null;
    website?: string | null;
  };
  className?: string;
}

export function UserInfoCard({ user, className = "" }: UserSummaryProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<"followers" | "following">(
    "followers",
  );

  const cleanUsername = user.username.replace(/^@/, "");

  const handleOpenModal = (tab: "followers" | "following") => {
    setModalTab(tab);
    setIsModalOpen(true);
  };

  return (
    <>
      <AppCard className={className}>
        <Link
          to={`/profile/${cleanUsername}`}
          className="flex flex-col items-center gap-1 text-center group cursor-pointer"
        >
          <AppImage
            src={user.imageURL || ""}
            alt={user.name || user.username}
            variant="circle"
            size="xl"
          />
          <h3 className="mt-2 text-lg font-bold text-text truncate max-w-full group-hover:underline">
            {user.name}
          </h3>
          <p className="text-sm text-text-secondary truncate max-w-full">
            @{cleanUsername}
          </p>
        </Link>

        {/* Following / Followers Clickable Stats */}
        <div className="mt-4 flex items-center justify-around border-t border-border pt-4">
          <button
            type="button"
            onClick={() => handleOpenModal("following")}
            className="flex flex-col items-center cursor-pointer transition-transform active:scale-95 hover:opacity-80"
          >
            <span className="text-base font-bold text-text">
              {user.following}
            </span>
            <span className="text-xs text-text-secondary hover:underline">
              Following
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleOpenModal("followers")}
            className="flex flex-col items-center cursor-pointer transition-transform active:scale-95 hover:opacity-80"
          >
            <span className="text-base font-bold text-text">
              {user.followers}
            </span>
            <span className="text-xs text-text-secondary hover:underline">
              Followers
            </span>
          </button>
        </div>

        <div className="mt-4 space-y-2 border-t border-border pt-4 text-xs text-text-secondary">
          <div className="flex items-center gap-2">
            <AppIcon
              nameIcon="Location"
              size={14}
              className="text-text-tertiary"
            />
            <span>{user.location || "No location"}</span>
          </div>
          <div className="flex items-center gap-2">
            <AppIcon nameIcon="Link" size={14} className="text-text-tertiary" />
            {user.website ? (
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
            ) : (
              <span>No website</span>
            )}
          </div>
        </div>
      </AppCard>

      {/* Network Modal */}
      <FollowListModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userId={user.id}
        userName={user.name}
        initialTab={modalTab}
      />
    </>
  );
}

export default UserInfoCard;
