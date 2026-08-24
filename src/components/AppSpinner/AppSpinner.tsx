import AppIcon from "@/components/AppIcon/AppIcon";

/**
 * @component AppSpinner
 * @description Compact loading indicator.
 * @prop {number} [size=24] - Spinner size in pixels
 * @prop {string} [className='text-brand'] - Additional CSS classes
 */
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
