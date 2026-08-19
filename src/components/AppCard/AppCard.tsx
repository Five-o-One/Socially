import { type ReactNode } from "react";

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
  const baseClasses = `
    bg-card rounded-2xl
    transition-all duration-200 ease-in-out
    ${!borderless ? "border border-border" : ""}
    ${hoverable ? "hover:shadow-lg hover:border-brand/30 hover:scale-[1.01] cursor-pointer" : ""}
    ${onClick ? "cursor-pointer" : ""}
  `;

  const paddingClass = noPadding ? "p-0" : "p-4 sm:p-5";

  const combinedClassName = `
    ${baseClasses}
    ${paddingClass}
    ${className}
  `
    .trim()
    .replace(/\s+/g, " ");

  return (
    <div className={combinedClassName} onClick={onClick}>
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

      <div>{children}</div>

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
