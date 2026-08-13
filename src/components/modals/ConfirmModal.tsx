// components/modals/ConfirmModal.tsx
import { useState } from "react";
import { CONFIRM_ACTION_CONFIG, type ConfirmActionType } from "../../constants";

/**
 * ConfirmModal — generic confirmation modal for irreversible actions.
 * Currently supports 3 use cases: unfollow, block, delete.
 * See constants/confrimmodal.ts for the title/message/confirmText per type.
 *
 * isOpen is only used to set the initial value of internal state
 * (`visible`) on mount. Cancel is handled internally — clicking it
 * just sets `visible` to false, no onCancel prop needed.
 *
 * NOTE: since there's no effect syncing `visible` with `isOpen`,
 * toggling `isOpen` from the parent after mount won't reopen the
 * modal. The parent currently needs to unmount/remount this
 * component (e.g. conditional render) to open it again.
 *
 * Standalone for now: AppModal (Kian) isn't ready yet, so this handles
 * its own positioning/centering and has no backdrop. Once AppModal is
 * ready, check if it already centers children — if so, drop the outer
 * fixed/flex wrapper here and keep just the inner card.
 *
 * AppButton isn't ready either — Cancel/Confirm are plain <button>
 * elements styled to match the design tokens for now.
 *
 * Sizing (max-w-125, p-6.25, gap-4) comes from Figma. Height was left
 * content-driven on purpose instead of hardcoded.
 */

// TODO: AppButton is not finished by Kian yet.
// Once AppButton is ready, replace the two <button> elements below with
// <AppButton variant="secondary" onClick={handleCancel}> and
// <AppButton variant="danger" onClick={onConfirm}>.(maybeee)

// NOTE on positioning/z-index:
// This assumes AppModal (Kian's component) renders a backdrop around z-40
// and passes children through untouched. ConfirmModal therefore positions
// itself (fixed, centered) so it still works correctly on its own for now.
// Once AppModal is finished, double check the z-index here still sits above
// AppModal's backdrop, and remove this positioning wrapper if AppModal
// already centers its children itself.

interface ConfirmModalProps {
  type: ConfirmActionType;
  isOpen: boolean;
  onConfirm: () => void;
}

export default function ConfirmModal({
  type,
  isOpen,
  onConfirm,
}: ConfirmModalProps) {
  const [visible, setVisible] = useState(isOpen);
  const { title, message, confirmText } = CONFIRM_ACTION_CONFIG[type];

  const handleCancel = () => {
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="w-full max-w-125 rounded-lg bg-card p-6.25 flex flex-col gap-4">
        <h2 className="text-lg font-bold text-text">{title}</h2>
        <p className="text-text-secondary">{message}</p>

        <div className="flex justify-end gap-3">
          {/* TODO: replace with <AppButton variant="secondary" /> */}
          <button
            onClick={handleCancel}
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
    </div>
  );
}
