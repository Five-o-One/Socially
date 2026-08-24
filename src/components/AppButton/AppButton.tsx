/** @file Reusable button component and its visual interaction states. */
import { type ReactNode } from "react";
import type { NameIcon } from "@/types";
import AppIcon from "@/components/AppIcon/AppIcon";

/**
 * @component AppButton
 * @description Reusable button component with multiple variants, sizes, and responsive design
 *
 * @prop {ReactNode} children - Button content (text or elements)
 * @prop {NameIcon} [icon] - Icon name from internal AppIcon system
 * @prop {'primary' | 'secondary' | 'danger' | 'ghost'} [variant='primary'] - Button visual style variant
 * @prop {'sm' | 'md' | 'lg'} [size='md'] - Button size preset
 * @prop {boolean} [fullWidth=false] - Whether the button should take full width
 * @prop {boolean} [disabled=false] - Disables button interactions
 * @prop {boolean} [isLoading=false] - Shows loading spinner and disables button
 * @prop {() => void} [onClick] - Click event handler
 * @prop {'button' | 'submit' | 'reset'} [type='button'] - Button HTML type
 * @prop {string} [className] - Additional CSS classes for customization
 */
interface AppButtonProps {
  children?: ReactNode;
  icon?: NameIcon;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export function AppButton({
  children,
  icon,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  isLoading = false,
  onClick,
  type = "button",
  className = "",
}: AppButtonProps) {
  const baseClasses = `
    inline-flex items-center justify-center gap-2
    font-medium rounded-md
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-brand/50
    disabled:opacity-50 disabled:cursor-not-allowed
    active:scale-95 cursor-pointer
  `;

  const variantClasses = {
    primary: `
      bg-btn-primary-bg text-btn-primary-text
      border border-transparent
      hover:bg-btn-primary-bg-hover hover:text-btn-primary-text-hover
    `,
    secondary: `
      bg-btn-secondary-bg text-btn-secondary-text
      border border-border
      hover:bg-btn-secondary-bg-hover hover:text-btn-secondary-text-hover
    `,
    danger: `
      bg-danger text-text-opposite
      border border-transparent
      hover:bg-danger/90
    `,
    ghost: `
      bg-transparent text-text
      border border-transparent
      hover:bg-border/50
    `,
  };

  const sizeClasses = {
    sm: "px-2.5 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const combinedClassName = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${fullWidth ? "w-full" : ""}
    ${className}
  `
    .trim()
    .replace(/\s+/g, " ");

  return (
    <button
      className={combinedClassName}
      disabled={disabled || isLoading}
      onClick={onClick}
      type={type}
    >
      {isLoading ? (
        <AppIcon nameIcon="Loader" size={16} className="animate-spin" />
      ) : (
        icon && <AppIcon nameIcon={icon} size={16} />
      )}
      {children}
    </button>
  );
}

export default AppButton;
