import { Link } from "react-router";
import { AppButton } from "@/components/AppButton";
import { AppImage } from "@/components/AppImage";

interface UserRowProps {
  avatarSrc?: string | null;
  name?: string;
  username: string;
  followers: number;
  isFollowing?: boolean;
  onToggleFollow?: () => void;
  isFollowLoading?: boolean;
}

export function UserRow({
  avatarSrc,
  name,
  username,
  followers,
  isFollowing = false,
  onToggleFollow,
  isFollowLoading = false,
}: UserRowProps) {
  const cleanUsername = username.replace(/^@/, "");

  return (
    <div className="flex items-center justify-between gap-3">
      <Link
        to={`/profile/${cleanUsername}`}
        className="flex items-center gap-2.5 min-w-0 group cursor-pointer"
      >
        <AppImage
          src={avatarSrc || ""}
          alt={name || username}
          variant="circle"
          size="md"
        />

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-text group-hover:underline">
            {name || `@${cleanUsername}`}
          </p>

          <p className="truncate text-xs text-text-secondary">
            {followers} followers
          </p>
        </div>
      </Link>

      <AppButton
        variant={isFollowing ? "primary" : "secondary"}
        size="sm"
        onClick={onToggleFollow}
        disabled={isFollowLoading}
      >
        {isFollowing ? "Following" : "Follow"}
      </AppButton>
    </div>
  );
}

export default UserRow;
