import { useState } from "react";
import { FaMapMarkerAlt, FaLink, FaCalendarAlt } from "react-icons/fa";
import { AppCard } from "../AppCard";
import { AppImage } from "../AppImage";
import { AppButton } from "../AppButton";

/**
 * @component UserInfoCard
 * @description User profile card with follow functionality
 *
 * @prop {Object} user - User information
 * @prop {string} user.imageURL - Profile image URL
 * @prop {string} user.username - Username
 * @prop {string} user.name - Full name
 * @prop {number} user.followers - Number of followers
 * @prop {number} user.following - Number of following
 * @prop {boolean} user.isFollow - Follow status
 * @prop {string} [user.location] - Location (optional)
 * @prop {string} [user.website] - Website URL (optional)
 * @prop {string} [user.joinedDate] - Join date (optional)
 * @prop {string} [user.bio] - User bio (optional)
 * @prop {() => void} [onFollow] - Follow handler
 * @prop {() => void} [onUnfollow] - Unfollow handler
 * @prop {string} [className] - Additional CSS classes
 *
 * @example
 * <UserInfoCard
 *   user={{
 *     imageURL: '/avatar.jpg',
 *     username: 'ali',
 *     name: 'Ali Mohammadi',
 *     followers: 1200,
 *     following: 350,
 *     isFollow: false,
 *     location: 'Tehran',
 *     website: 'https://example.com',
 *     joinedDate: 'November 2025',
 *     bio: 'React Developer'
 *   }}
 * />
 */
interface UserInfoCardProps {
  user: {
    imageURL: string;
    username: string;
    name: string;
    followers: number;
    following: number;
    isFollow: boolean;
    location?: string;
    website?: string;
    joinedDate?: string;
    bio?: string;
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
  const [isFollowing, setIsFollowing] = useState(user.isFollow);
  const [followersCount, setFollowersCount] = useState(user.followers);

  const handleFollowToggle = () => {
    if (isFollowing) {
      setFollowersCount(followersCount - 1);
      onUnfollow?.();
    } else {
      setFollowersCount(followersCount + 1);
      onFollow?.();
    }
    setIsFollowing(!isFollowing);
  };

  return (
    <AppCard className={className}>
      <div className="space-y-4">
        {/* Header: Avatar and name */}
        <div className="flex items-start gap-4">
          <AppImage
            src={user.imageURL}
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

        {/* Additional info */}
        <div className="space-y-1.5 text-sm text-text-secondary">
          {user.location && (
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-sm" />
              <span>{user.location}</span>
            </div>
          )}
          {user.website && (
            <div className="flex items-center gap-2">
              <FaLink className="text-sm" />
              <a
                href={user.website}
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
              <FaCalendarAlt className="text-sm" />
              <span>Joined {user.joinedDate}</span>
            </div>
          )}
        </div>

        {/* Follow button */}
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
