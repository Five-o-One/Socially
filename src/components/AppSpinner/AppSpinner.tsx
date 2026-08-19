import AppIcon from "@/components/AppIcon/AppIcon";

interface AppSpinnerProps {
  size?: number;
  className?: string;
}

export default function AppSpinner({
  size = 24,
  className = "text-brand",
}: AppSpinnerProps) {
  return (
    <AppIcon
      nameIcon="Loader"
      size={size}
      className={`animate-spin ${className}`}
    />
  );
}
