import { Link } from "react-router";
import { AppCard } from "@/components/AppCard";
import { AppImage } from "@/components/AppImage";
import AppIcon from "@/components/AppIcon/AppIcon";

/**
 * @component UserInfoCard
 * @description Compact user profile summary with counts and profile links.
 * @prop {object} user - User summary to display
 * @prop {string} user.id - User ID used for the profile link
 * @prop {string} user.username - User handle
 * @prop {string} user.name - Display name
 * @prop {string | null} [user.imageURL] - Avatar image URL
 * @prop {number} user.followers - Follower count
 * @prop {number} user.following - Following count
 * @prop {string | null} [user.location] - User location
 * @prop {string | null} [user.website] - User website URL
 * @prop {string} [className] - Additional CSS classes
 */
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
  const cleanUsername = user.username.replace(/^@/, "");

  return (
    <AppCard className={className}>
      <Link
        to={`/profile/id/${user.id}`}
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

      <div className="mt-4 flex items-center justify-around border-t border-border pt-4">
        <div className="flex flex-col items-center">
          <span className="text-base font-bold text-text">
            {user.following}
          </span>
          <span className="text-xs text-text-secondary">Following</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-base font-bold text-text">
            {user.followers}
          </span>
          <span className="text-xs text-text-secondary">Followers</span>
        </div>
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
  );
}

export default UserInfoCard;
