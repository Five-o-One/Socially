import { AppModal } from "./AppModal";
import { AppButton } from "@/components/AppButton";

interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onClose: () => void;
  isLoading?: boolean;
}

export function ConfirmModal({
  isOpen,
  title = "Delete Post",
  description = "This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  onClose,
  isLoading = false,
}: ConfirmModalProps) {
  return (
    <AppModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      showCloseButton={false}
      footer={
        <>
          <AppButton variant="secondary" onClick={onClose} disabled={isLoading}>
            {cancelText}
          </AppButton>
          <AppButton variant="danger" onClick={onConfirm} disabled={isLoading}>
            {isLoading ? "Deleting..." : confirmText}
          </AppButton>
        </>
      }
    >
      <p className="text-sm text-text-secondary">{description}</p>
    </AppModal>
  );
}

export default ConfirmModal;
