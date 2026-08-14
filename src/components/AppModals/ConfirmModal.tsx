import { CONFIRM_ACTION_CONFIG } from "../../constants";
import type { ConfirmModalProps } from "../../types/Modals";
import { AppButton } from "../AppButton";

/**
 * @component ConfirmModal
 * @description Modal content for confirming an irreversible action (delete,
 * unfollow, block). Fully self-styled (own bg-card, rounded, padding) so
 * it works standalone or nested inside AppModal without a doubled box —
 * pass no `title`/`footer` to AppModal when rendering this as its children.
 *
 * @prop {ConfirmActionType} type - Which action is being confirmed;
 *   determines the title/message/confirmText shown, sourced from
 *   CONFIRM_ACTION_CONFIG in constants
 * @prop {() => void} onConfirm - Called when the confirm button is clicked
 * @prop {() => void} onCancel - Called when Cancel is clicked
 *
 * @example
 * <AppModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
 *   <ConfirmModal
 *     type="delete"
 *     onConfirm={() => deletePost(postId)}
 *     onCancel={() => setIsOpen(false)}
 *   />
 * </AppModal>
 */
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
        <AppButton variant="secondary" onClick={onCancel}>
          Cancel
        </AppButton>

        <AppButton variant="danger" onClick={onConfirm}>
          {confirmText}
        </AppButton>
      </div>
    </div>
  );
}
