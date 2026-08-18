import { useState } from "react";
import { AppCard } from "@/components/AppCard";
import { AppImage } from "@/components/AppImage";
import { AppButton } from "@/components/AppButton";
import AppIcon from "@/components/AppIcon/AppIcon";

interface UserInfoCardProps {
  user: {
    imageURL?: string | null;
    username: string;
    name: string;
    followers: number;
    following: number;
    isFollow?: boolean;
    location?: string | null;
    website?: string | null;
    joinedDate?: string | null;
    bio?: string | null;
  };
  onFollow?: () => void;
  onUnfollow?: () => void;
  className?: string;
}

export function UserInfoCard({
  user,
  onFollow,
  onUnfollow,
  className = "",
}: UserInfoCardProps) {
  const [isFollowing, setIsFollowing] = useState(Boolean(user.isFollow));
  const [followersCount, setFollowersCount] = useState(user.followers);

  const handleFollowToggle = () => {
    if (isFollowing) {
      setFollowersCount((prev) => Math.max(0, prev - 1));
      onUnfollow?.();
    } else {
      setFollowersCount((prev) => prev + 1);
      onFollow?.();
    }
    setIsFollowing(!isFollowing);
  };

  return (
    <AppCard className={className}>
      <div className="space-y-4">
        {/* Header: Avatar and Name */}
        <div className="flex items-start gap-4">
          <AppImage
            src={user.imageURL || ""}
            alt={user.name || user.username}
            variant="circle"
            size="xl"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-text truncate">
              {user.name}
            </h3>
            <p className="text-text-secondary text-sm">@{user.username}</p>
            <div className="flex items-center gap-4 mt-2 text-sm">
              <span className="text-text-secondary">
                <strong className="text-text">{followersCount}</strong>{" "}
                Followers
              </span>
              <span className="text-text-secondary">
                <strong className="text-text">{user.following}</strong>{" "}
                Following
              </span>
            </div>
          </div>
        </div>

        {/* Bio */}
        {user.bio && (
          <p className="text-text text-sm leading-relaxed">{user.bio}</p>
        )}

        {/* Info Rows */}
        <div className="space-y-2 text-sm text-text-secondary">
          {user.location && (
            <div className="flex items-center gap-2">
              <AppIcon
                nameIcon="Location"
                size={16}
                className="text-text-secondary"
              />
              <span>{user.location}</span>
            </div>
          )}
          {user.website && (
            <div className="flex items-center gap-2">
              <AppIcon
                nameIcon="Link"
                size={16}
                className="text-text-secondary"
              />
              <a
                href={
                  user.website.startsWith("http")
                    ? user.website
                    : `https://${user.website}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand hover:underline truncate"
              >
                {user.website.replace(/^https?:\/\//, "")}
              </a>
            </div>
          )}
          {user.joinedDate && (
            <div className="flex items-center gap-2">
              <AppIcon
                nameIcon="Calendar"
                size={16}
                className="text-text-secondary"
              />
              <span>Joined {user.joinedDate}</span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <AppButton
            variant={isFollowing ? "secondary" : "primary"}
            fullWidth
            onClick={handleFollowToggle}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </AppButton>
        </div>
      </div>
    </AppCard>
  );
}

export default UserInfoCard;
