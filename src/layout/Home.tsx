import { AppIcon } from "../components";
import { UserInfoNumber, UserInfoString } from "../components/user-info";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-10 bg-bg">
      <div className="flex gap-8">
        <UserInfoNumber value={0} label="Following" />
        <UserInfoNumber value={1} label="Posts" />
      </div>

      <div className="flex flex-col gap-2">
        <UserInfoString
          icon={<AppIcon nameIcon="Location" size={16} />}
          value="No location"
        />
        <UserInfoString
          icon={<AppIcon nameIcon="Link" size={16} />}
          value="No website"
        />
      </div>
    </div>
  );
}
