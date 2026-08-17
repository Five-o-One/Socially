import { type ReactNode } from "react";

/**
 * @component AppCard
 * @description Container card component with optional header, footer, and interactive states
 *
 * @prop {ReactNode} children - Main content of the card
 * @prop {ReactNode} [header] - Optional header section content
 * @prop {ReactNode} [footer] - Optional footer section content
 * @prop {boolean} [hoverable=false] - Whether the card has hover effects (shadow and scale)
 * @prop {boolean} [noPadding=false] - Removes internal padding from the card
 * @prop {boolean} [borderless=false] - Removes the card border
 * @prop {() => void} [onClick] - Click handler for the entire card
 * @prop {string} [className] - Additional Tailwind CSS classes
 *
 * @example
 * // Basic card with default padding and border
 * <AppCard>
 *   <p>Card content</p>
 * </AppCard>
 *
 * @example
 * // Card with header, footer, and hover effect
 * <AppCard
 *   header={<h3>Title</h3>}
 *   footer={<button>Read More</button>}
 *   hoverable
 * >
 *   <p>Card content goes here</p>
 * </AppCard>
 *
 * @example
 * // Card without padding and border
 * <AppCard noPadding borderless>
 *   <div className="p-4">Custom content with internal padding</div>
 * </AppCard>
 */
interface AppCardProps {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  hoverable?: boolean;
  noPadding?: boolean;
  borderless?: boolean;
  onClick?: () => void;
  className?: string;
}

export function AppCard({
  children,
  header,
  footer,
  hoverable = false,
  noPadding = false,
  borderless = false,
  onClick,
  className = "",
}: AppCardProps) {
  // Base card styles
  const baseClasses = `
    bg-card rounded-2xl
    transition-all duration-200 ease-in-out
    ${!borderless ? "border border-border" : ""}
    ${hoverable ? "hover:shadow-lg hover:border-brand/30 hover:scale-[1.01] cursor-pointer" : ""}
    ${onClick ? "cursor-pointer" : ""}
  `;

  // Padding class - removed when noPadding is true
  const paddingClass = noPadding ? "p-0" : "p-4 sm:p-5";

  // Combine all classes
  const combinedClassName = `
    ${baseClasses}
    ${paddingClass}
    ${className}
  `
    .trim()
    .replace(/\s+/g, " ");

  return (
    <div className={combinedClassName} onClick={onClick}>
      {/* Card Header - displayed if provided */}
      {header && (
        <div
          className={`
          border-b border-border pb-3 mb-3
          ${noPadding ? "px-4 pt-4 sm:px-5 sm:pt-5" : ""}
        `}
        >
          {header}
        </div>
      )}

      {/* Card Main Content */}
      <div>{children}</div>

      {/* Card Footer - displayed if provided */}
      {footer && (
        <div
          className={`
          border-t border-border pt-3 mt-3
          ${noPadding ? "px-4 pb-4 sm:px-5 sm:pb-5" : ""}
        `}
        >
          {footer}
        </div>
      )}
    </div>
  );
}

export default AppCard;
