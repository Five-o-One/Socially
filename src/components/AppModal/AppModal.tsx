/** @file Base modal panel with portal rendering and dismissal behavior. */
import { useEffect } from "react";
import type { AppModalProps } from "@/types";
import AppIcon from "@/components/AppIcon/AppIcon";
import AppPortal from "@/components/AppPortal/AppPortal";

/**
 * @component AppModal
 * @description Portal-based modal with escape-key, backdrop, body, and footer behavior.
 * @prop {boolean} isOpen - Controls visibility
 * @prop {() => void} onClose - Closes the modal
 * @prop {ReactNode} children - Modal body content
 * @prop {string} [title] - Optional heading
 * @prop {ReactNode} [footer] - Optional footer actions
 * @prop {boolean} [closeOnOutsideClick=true] - Enables backdrop dismissal
 * @prop {boolean} [showCloseButton=true] - Shows the close button
 * @prop {string} [className] - Additional panel classes
 */


export function AppModal({
  isOpen,
  onClose,
  children,
  title,
  footer,
  closeOnOutsideClick = true,
  showCloseButton = true,
  className = "",
}: AppModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    document.documentElement.classList.add("scroll-locked");
    document.body.classList.add("scroll-locked");

    return () => {
      document.documentElement.classList.remove("scroll-locked");
      document.body.classList.remove("scroll-locked");
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOutsideClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AppPortal>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={handleOutsideClick}
        role="dialog"
        aria-modal="true"
      >
        <div
          className={`
          bg-card rounded-2xl border border-border shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto
          scale-100 transition-all
          ${className}
        `
            .trim()
            .replace(/\s+/g, " ")}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-border">
              {title && (
                <h3 className="text-lg font-bold text-text">{title}</h3>
              )}

              {showCloseButton && (
                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-border/40 hover:text-text"
                  aria-label="Close modal"
                >
                  <AppIcon nameIcon="Close" size={20} />
                </button>
              )}
            </div>
          )}

          {/* Body */}
          <div className="p-4 sm:p-6">{children}</div>

          {/* Footer */}
          {footer && (
            <div className="p-4 sm:p-5 border-t border-border flex flex-wrap justify-end gap-3">
              {footer}
            </div>
          )}
        </div>
      </div>
    </AppPortal>
  );
}

export default AppModal;
