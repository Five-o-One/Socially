import { Link } from "react-router";
import { AppButton } from "@/components/AppButton";
import { AppImage } from "@/components/AppImage";

interface UserRowProps {
  id: string;
  username: string;
  name: string;
  avatarSrc: string | null;
  followers: number;
  isFollowing: boolean;
  onToggleFollow: () => void;
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
        className="group flex min-w-0 cursor-pointer items-center gap-2.5"
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
        isLoading={isFollowLoading}
      >
        {isFollowing ? "Following" : "Follow"}
      </AppButton>
    </div>
  );
}

export default UserRow;
