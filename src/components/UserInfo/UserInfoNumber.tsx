interface UserInfoNumberProps {
  value: number;
  label: string;
}

export function UserInfoNumber({ value, label }: UserInfoNumberProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <span className="text-base font-semibold leading-6 text-text">
        {value}
      </span>
      <span className="text-sm leading-4 text-text-secondary">{label}</span>
    </div>
  );
}
