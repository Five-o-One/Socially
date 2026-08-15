import { AppButton } from "../AppButton";
import { AppImage } from "../AppImage";

interface UserRowProps {
  avatarSrc: string;
  name?: string;
  username: string;
  followers: number;
  onFollow: () => void;
}

export default function UserRow({
  avatarSrc,
  name,
  username,
  followers,
  onFollow,
}: UserRowProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <AppImage
          src={avatarSrc}
          alt={name ?? username}
          variant="circle"
          size="md"
        />
        <div className="min-w-0">
          {name && <p className="text-text font-medium truncate">{name}</p>}
          <p className="text-text-secondary text-sm truncate">{username}</p>
          <p className="text-text-tertiary text-sm">{followers} followers</p>
        </div>
      </div>

      <AppButton variant="secondary" size="sm" onClick={onFollow}>
        Follow
      </AppButton>
    </div>
  );
}
