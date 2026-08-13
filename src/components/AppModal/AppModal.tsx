import { type ReactNode, useEffect } from "react";
import { IoClose } from "react-icons/io5";

/**
 * @component AppModal
 * @description Reusable modal component with animations, close button, and responsive design
 *
 * @prop {boolean} isOpen - Controls modal visibility state
 * @prop {() => void} onClose - Callback function to close the modal
 * @prop {ReactNode} children - Content to be displayed inside the modal
 * @prop {string} [title] - Modal title text (optional)
 * @prop {ReactNode} [footer] - Custom footer content (optional)
 * @prop {boolean} [closeOnOutsideClick=true] - Close modal when clicking outside
 * @prop {boolean} [showCloseButton=true] - Show/hide the close button
 * @prop {string} [className] - Additional CSS classes for customization
 *
 * @example
 * // Basic modal with title
 * <AppModal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Modal Title">
 *   <p>Modal content goes here</p>
 * </AppModal>
 *
 * @example
 * // Modal with custom footer
 * <AppModal
 *   isOpen={isOpen}
 *   onClose={onClose}
 *   title="Confirm Action"
 *   footer={<AppButton variant="danger">Delete</AppButton>}
 * >
 *   <p>Are you sure you want to delete this item?</p>
 * </AppModal>
 */
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
  // Prevent body scroll when modal is open
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

  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Close modal when clicking outside
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOutsideClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleOutsideClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      <div
        className={`
          bg-card rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto
          animate-in fade-in slide-in-from-bottom-4 duration-300 ease-out
          ${className}
        `
          .trim()
          .replace(/\s+/g, " ")}
      >
        {/* Modal Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-4 border-b border-border">
            {title && (
              <h3 id="modal-title" className="text-lg font-bold text-text">
                {title}
              </h3>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-border/50 transition-colors"
                aria-label="Close modal"
              >
                <IoClose className="w-6 h-6 text-text-secondary" />
              </button>
            )}
          </div>
        )}

        {/* Modal Content */}
        <div className="p-4 sm:p-6">{children}</div>

        {/* Modal Footer */}
        {footer && (
          <div className="p-4 border-t border-border flex flex-wrap justify-end gap-2">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export default AppModal;
