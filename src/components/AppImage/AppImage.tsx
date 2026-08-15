import { useState } from "react";

/**
 * @component AppImage
 * @description Smart image component with first-letter placeholder support and multiple size variants
 *
 * @prop {string} src - Image source URL (currently unused, kept for compatibility)
 * @prop {string} alt - Alternative text (first letter is used for placeholder)
 * @prop {'circle' | 'rounded' | 'square'} [variant='rounded'] - Image shape variant
 * @prop {'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'} [size='md'] - Image size variant
 * @prop {string} [className] - Additional CSS classes for customization
 * @prop {boolean} [showRealImage=false] - Whether to display the real image (default: false)
 *
 * @example
 * // Always shows the first letter as placeholder
 * <AppImage src="/avatar.jpg" alt="Farshad" variant="circle" size="lg" />
 * // Output: Letter "F" inside a blue circle
 */
interface AppImageProps {
  src: string;
  alt: string;
  variant?: "circle" | "rounded" | "square";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
  lazyLoad?: boolean;
  showRealImage?: boolean;
}

export function AppImage({
  src,
  alt,
  variant = "rounded",
  size = "md",
  className = "",
  lazyLoad = true,
  showRealImage = false, // Default: real image is not displayed
}: AppImageProps) {
  // CSS classes for different shape variants
  const variantClasses = {
    circle: "rounded-full",
    rounded: "rounded-2xl",
    square: "rounded-none",
  };

  // CSS classes for different size variants
  const sizeClasses = {
    xs: "w-8 h-8 text-xs",
    sm: "w-10 h-10 text-sm",
    md: "w-12 h-12 text-base",
    lg: "w-16 h-16 text-lg",
    xl: "w-24 h-24 text-xl",
    full: "w-full h-auto",
  };

  const sizeClass = size === "full" ? "w-full h-auto" : sizeClasses[size];

  // Extract first letter from alt text for placeholder
  const firstLetter = alt ? alt.charAt(0).toUpperCase() : "?";

  // Placeholder CSS classes
  const placeholderClasses = `
    flex items-center justify-center
    bg-brand/10 text-brand font-bold
    ${variantClasses[variant]}
    ${sizeClass}
    ${className}
  `
    .trim()
    .replace(/\s+/g, " ");

  // Always show placeholder by default (until showRealImage is enabled)
  // If showRealImage is true, attempt to load the real image
  if (showRealImage) {
    const [hasError, setHasError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const baseClasses = `
      object-cover bg-border/30
      transition-opacity duration-300
      ${isLoaded ? "opacity-100" : "opacity-0"}
      ${variantClasses[variant]}
    `;

    const combinedClassName = `
      ${baseClasses}
      ${sizeClass}
      ${className}
    `
      .trim()
      .replace(/\s+/g, " ");

    if (hasError) {
      return (
        <div className={placeholderClasses}>
          <span>{firstLetter}</span>
        </div>
      );
    }

    return (
      <img
        src={src}
        alt={alt}
        className={combinedClassName}
        loading={lazyLoad ? "lazy" : "eager"}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />
    );
  }

  // Always show placeholder
  return (
    <div className={placeholderClasses}>
      <span>{firstLetter}</span>
    </div>
  );
}

export default AppImage;
