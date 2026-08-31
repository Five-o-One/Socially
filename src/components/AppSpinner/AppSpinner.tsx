import type { AppSpinnerProps } from "@/types";
/** @file Compact loading spinner based on the shared icon component. */
import AppIcon from "@/components/AppIcon/AppIcon";

/**
 * @component AppSpinner
 * @description Compact loading indicator.
 * @prop {number} [size=24] - Spinner size in pixels
 * @prop {string} [className='text-brand'] - Additional CSS classes
 */


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
