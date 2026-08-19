import { useState } from "react";

interface AppImageProps {
  src?: string | null;
  alt: string;
  variant?: "circle" | "rounded" | "square";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
  lazyLoad?: boolean;
  showRealImage?: boolean;
  placeholderStyle?: "solid" | "gradient";
}

const placeholderColors = [
  "bg-emerald-100 text-emerald-700",
  "bg-blue-100 text-blue-700",
  "bg-purple-100 text-purple-700",
  "bg-orange-100 text-orange-700",
  "bg-pink-100 text-pink-700",
  "bg-cyan-100 text-cyan-700",
];

const placeholderGradients = [
  "bg-gradient-to-br from-purple-400 to-blue-500 text-white",
  "bg-gradient-to-br from-pink-400 to-purple-500 text-white",
  "bg-gradient-to-br from-blue-400 to-cyan-500 text-white",
  "bg-gradient-to-br from-emerald-400 to-teal-500 text-white",
  "bg-gradient-to-br from-orange-400 to-pink-500 text-white",
];

function getColorIndex(value: string, colorsLength: number) {
  let hash = 0;
  for (let index = 0; index < value.length; index++) {
    hash = value.charCodeAt(index) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % colorsLength;
}

export function AppImage({
  src,
  alt,
  variant = "rounded",
  size = "md",
  className = "",
  lazyLoad = true,
  showRealImage = true,
  placeholderStyle = "gradient",
}: AppImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const variantClasses = {
    circle: "rounded-full",
    rounded: "rounded-2xl",
    square: "rounded-none",
  };

  const sizeClasses = {
    xs: "w-8 h-8 text-xs",
    sm: "w-10 h-10 text-sm",
    md: "w-12 h-12 text-base",
    lg: "w-16 h-16 text-lg",
    xl: "w-24 h-24 text-xl",
    full: "w-full h-auto",
  };

  const sizeClass = size === "full" ? "w-full h-auto" : sizeClasses[size];
  const firstLetter = alt ? alt.trim().charAt(0).toUpperCase() : "?";

  const colorIndex = getColorIndex(alt || "user", placeholderColors.length);
  const gradientIndex = getColorIndex(
    alt || "user",
    placeholderGradients.length,
  );

  const placeholderColor =
    placeholderStyle === "gradient"
      ? placeholderGradients[gradientIndex]
      : placeholderColors[colorIndex];

  const placeholderClasses = `
    flex items-center justify-center flex-shrink-0
    font-bold select-none
    ${placeholderColor}
    ${variantClasses[variant]}
    ${sizeClass}
    ${className}
  `
    .trim()
    .replace(/\s+/g, " ");

  if (!showRealImage || !src || hasError) {
    return (
      <div className={placeholderClasses}>
        <span>{firstLetter}</span>
      </div>
    );
  }

  const imageClasses = `
    object-cover flex-shrink-0
    bg-border/30
    transition-opacity duration-300
    ${isLoaded ? "opacity-100" : "opacity-0"}
    ${variantClasses[variant]}
    ${sizeClass}
    ${className}
  `
    .trim()
    .replace(/\s+/g, " ");

  return (
    <img
      src={src}
      alt={alt}
      className={imageClasses}
      loading={lazyLoad ? "lazy" : "eager"}
      onLoad={() => setIsLoaded(true)}
      onError={() => setHasError(true)}
    />
  );
}

export default AppImage;
