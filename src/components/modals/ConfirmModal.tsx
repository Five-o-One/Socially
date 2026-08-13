// components/modals/ConfirmModal.tsx
import { CONFIRM_ACTION_CONFIG, type ConfirmActionType } from "../../constants";

interface ConfirmModalProps {
  type: ConfirmActionType;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  type,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const { title, message, confirmText } = CONFIRM_ACTION_CONFIG[type];

  return (
    <div className="w-full max-w-125 rounded-lg bg-card p-6.25 flex flex-col gap-4">
      <h2 className="text-lg font-bold text-text">{title}</h2>
      <p className="text-text-secondary">{message}</p>

      <div className="flex justify-end gap-3">
        {/* TODO: replace with <AppButton variant="secondary" /> */}
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-lg border border-border bg-btn-secondary-bg text-btn-secondary-text hover:bg-btn-secondary-bg-hover hover:text-btn-secondary-text-hover transition"
        >
          Cancel
        </button>

        {/* TODO: replace with <AppButton variant="danger" /> */}
        <button
          onClick={onConfirm}
          className="px-4 py-2 rounded-lg bg-danger text-text-opposite hover:opacity-90 transition"
        >
          {confirmText}
        </button>
      </div>
    </div>
  );
}
