import { type ReactNode } from "react";
import type { NameIcon } from "../../types/AppIcon";
import AppIcon from "../AppIcon/AppIcon";

/**
 * @component AppButton
 * @description Reusable button component with multiple variants, sizes, and responsive design
 *
 * @prop {ReactNode} children - Button content (text or elements)
 * @prop {any} [icon] - Icon component from react-icons library
 * @prop {'primary' | 'secondary' | 'danger' | 'ghost'} [variant='primary'] - Button visual style variant
 * @prop {'sm' | 'md' | 'lg'} [size='md'] - Button size preset
 * @prop {boolean} [fullWidth=false] - Whether the button should take full width
 * @prop {boolean} [disabled=false] - Disables button interactions
 * @prop {() => void} [onClick] - Click event handler
 * @prop {string} [className] - Additional CSS classes for customization
 *
 * @example
 * // Primary button for main actions
 * <AppButton variant="primary">Login</AppButton>
 *
 * @example
 * // Ghost button with icon
 * <AppButton variant="ghost" icon={FaSignOutAlt}>Logout</AppButton>
 *
 * @example
 * // Full-width danger button
 * <AppButton variant="danger" fullWidth>Delete Account</AppButton>
 */
interface AppButtonProps {
  children?: ReactNode;
  icon?: NameIcon
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export function AppButton({
  children,
  icon,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  onClick,
  className = "",
}: AppButtonProps) {
  // Base button styles applied to all variants
  const baseClasses = `
    inline-flex items-center justify-center gap-2
    font-medium rounded-md
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-brand/50
    disabled:opacity-50 disabled:cursor-not-allowed
    active:scale-95
  `;

  // Variant-specific styles
  const variantClasses = {
    primary: `
      bg-btn-primary-bg text-btn-primary-text
      hover:bg-btn-primary-bg-hover hover:text-btn-primary-text-hover
    `,
    secondary: `
      bg-btn-secondary-bg text-btn-secondary-text
      hover:bg-btn-secondary-bg-hover hover:text-btn-secondary-text-hover
    `,
    danger: `
      bg-danger text-text-opposite
      hover:bg-danger/90
    `,
    ghost: `
      bg-transparent text-text
      hover:bg-border/50
    `,
  };

  // Size-specific padding and text styles
  const sizeClasses = {
    sm: "px-2 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  // Combine all classes into a single string
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
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {icon && <AppIcon nameIcon={icon} size={16} />}
      {children}
    </button>
  );
}

export default AppButton;
