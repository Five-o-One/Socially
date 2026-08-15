/**
 * @component UserRow
 * @description Single row showing a suggested user to follow — avatar,
 * optional name, username, follower count, and a Follow button. Meant to
 * be repeated (e.g. via .map()) inside a "Who to Follow" list container,
 * which is not part of this component.
 *
 * @prop {string} avatarSrc - Profile image URL, passed to AppImage
 * @prop {string} [name] - Full display name (optional; falls back to
 *   username for the AppImage alt/placeholder letter when not provided)
 * @prop {string} username - Username shown below the name
 * @prop {number} followers - Number of followers this user has
 * @prop {() => void} onFollow - Called when the Follow button is clicked
 *
 * @example
 * <UserRow
 *   avatarSrc="/avatar.jpg"
 *   name="Farshad Hosseini"
 *   username="@f.e.h.farshad"
 *   followers={1}
 *   onFollow={() => followUser(userId)}
 * />
 *
 * @example
 * // name is optional — falls back to username
 * <UserRow
 *   avatarSrc=""
 *   username="@mohammadfallah.w"
 *   followers={1}
 *   onFollow={() => followUser(userId)}
 * />
 */

// TODO: revisit after Kian updates AppButton/AppImage (see feedback sent to Kian).
// - AppButton: "secondary" variant has no border and is nearly invisible on
//   a white card (bg-btn-secondary-bg is white with no border). Figma shows
//   a visible light-gray Follow button. Once Kian adds a proper variant
//   (or fixes "secondary"), swap it in here.
// - AppImage: placeholder color is hardcoded to bg-brand/text-brand (blue).
//   Figma shows a purple-blue gradient avatar for users without a real
//   photo. Once Kian adds per-user color support, remove any manual
//   overrides here and rely on AppImage's default.

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
