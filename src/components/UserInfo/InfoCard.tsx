import { AppImage } from "../AppImage";
import AppIcon from "../AppIcon/AppIcon";
import { UserInfoNumber } from "./UserInfoNumber";
import { UserInfoString } from "./UserInfoString";

/**
 * @component InfoCard
 * @description Compact profile summary card showing avatar, name, username,
 * following/followers counts, and location/website. Used on Home,
 * Notification, and Profile pages inside an AppCard wrapper.
 *
 * @prop {string} avatarSrc - Profile image URL, passed to AppImage
 * @prop {string} name - Full display name
 * @prop {string} username - Username shown below the name
 * @prop {number} following - Number of accounts this user follows
 * @prop {number} followers - Number of followers this user has
 * @prop {string} location - Location text (e.g. "No location" as fallback)
 * @prop {string} website - Website text (e.g. "No website" as fallback)
 *
 * @example
 * <AppCard>
 *   <InfoCard
 *     avatarSrc="/avatar.jpg"
 *     name="Seyed Ali Mousavi"
 *     username="samb.1376"
 *     following={0}
 *     followers={0}
 *     location="No location"
 *     website="No website"
 *   />
 * </AppCard>
 */
interface InfoCardProps {
  avatarSrc: string;
  name: string;
  username: string;
  following: number;
  followers: number;
  location: string;
  website: string;
}

export default function InfoCard({
  avatarSrc,
  name,
  username,
  following,
  followers,
  location,
  website,
}: InfoCardProps) {
  return (
    <div className="flex flex-col gap-4 w-full min-w-73.5 min-h-87">
      <div className="flex flex-col items-center gap-1">
        <AppImage src={avatarSrc} alt={name} variant="circle" size="xl" />
        <h3 className="mt-2 text-lg font-bold text-text">{name}</h3>
        <p className="text-sm text-text-secondary">{username}</p>
      </div>

      <div className="flex items-center justify-between border-t border-border pt-4">
        <UserInfoNumber value={following} label="Following" />
        <UserInfoNumber value={followers} label="Followers" />
      </div>

      <div className="flex flex-col gap-2 border-t border-border pt-4">
        <UserInfoString
          icon={<AppIcon nameIcon="Location" size={16} />}
          value={location}
        />
        <UserInfoString
          icon={<AppIcon nameIcon="Link" size={16} />}
          value={website}
        />
      </div>
    </div>
  );
}
