import { type ReactNode, useEffect } from "react";
import AppIcon from "@/components/AppIcon/AppIcon";

interface AppModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  footer?: ReactNode;
  closeOnOutsideClick?: boolean;
  showCloseButton?: boolean;
  className?: string;
}

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
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
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
            {title && <h3 className="text-lg font-bold text-text">{title}</h3>}
            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-border/40 text-text-secondary hover:text-text transition-colors"
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
  );
}

export default AppModal;
