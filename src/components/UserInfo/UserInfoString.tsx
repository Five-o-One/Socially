import type { ReactNode } from "react";

interface UserInfoStringProps {
  icon: ReactNode;
  value: string;
}

export default function UserInfoString({ icon, value }: UserInfoStringProps) {
  return (
    <div className="flex items-center gap-2 text-text-secondary">
      {icon}
      <span className="text-sm">{value}</span>
    </div>
  );
}
