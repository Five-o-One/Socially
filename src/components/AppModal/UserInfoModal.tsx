/** @file Profile editing form displayed inside a modal. */
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { AppModal } from "./AppModal";
import { AppButton } from "@/components/AppButton";
import type { UpdateUserProfileDto } from "@/types";

/**
 * @component UserInfoModal
 * @description Form modal for editing the current user's profile.
 * @prop {boolean} isOpen - Controls modal visibility
 * @prop {UpdateUserProfileDto} [initialData] - Initial form values
 * @prop {(data: UpdateUserProfileDto) => void} onSubmit - Receives submitted profile values
 * @prop {() => void} onClose - Closes and resets the form
 * @prop {boolean} [isLoading=false] - Shows the saving state
 */
interface UserInfoModalProps {
  isOpen: boolean;
  initialData?: UpdateUserProfileDto;
  onSubmit: (data: UpdateUserProfileDto) => void;
  onClose: () => void;
  isLoading?: boolean;
}

export function UserInfoModal({
  isOpen,
  initialData,
  onSubmit,
  onClose,
  isLoading = false,
}: UserInfoModalProps) {
  const { register, handleSubmit, reset } = useForm<UpdateUserProfileDto>({
    defaultValues: initialData || {
      name: "",
      bio: "",
      location: "",
      website: "",
    },
  });

  useEffect(() => {
    if (initialData && isOpen) {
      reset(initialData);
    }
  }, [initialData, isOpen, reset]);

  const handleFormSubmit = (data: UpdateUserProfileDto) => {
    onSubmit(data);
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  return (
    <AppModal isOpen={isOpen} onClose={handleCancel} title="Edit Profile">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-text">Name</label>
          <input
            {...register("name", { required: true })}
            type="text"
            className="w-full rounded-lg border border-border bg-transparent px-3.5 py-2 text-sm text-text placeholder:text-text-tertiary focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand transition-colors"
            placeholder="Your full name"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-text">Bio</label>
          <textarea
            {...register("bio")}
            rows={4}
            className="w-full resize-none rounded-lg border border-border bg-transparent px-3.5 py-2 text-sm text-text placeholder:text-text-tertiary focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand transition-colors"
            placeholder="Tell us about yourself..."
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-text">Location</label>
          <input
            {...register("location")}
            type="text"
            className="w-full rounded-lg border border-border bg-transparent px-3.5 py-2 text-sm text-text placeholder:text-text-tertiary focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand transition-colors"
            placeholder="Where you are at"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-text">Website</label>
          <input
            {...register("website")}
            type="text"
            className="w-full rounded-lg border border-border bg-transparent px-3.5 py-2 text-sm text-text placeholder:text-text-tertiary focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand transition-colors"
            placeholder="https://yourwebsite.com"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <AppButton type="button" variant="secondary" onClick={handleCancel}>
            Cancel
          </AppButton>
          <AppButton type="submit" variant="primary" isLoading={isLoading}>
            Save Changes
          </AppButton>
        </div>
      </form>
    </AppModal>
  );
}

export default UserInfoModal;
