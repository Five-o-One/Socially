import { useForm } from "react-hook-form";
import { AppModal } from "./AppModal";
import { AppButton } from "@/components/AppButton";
import type { UpdateUserProfileDto } from "@/types/Modals";

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
            className="w-full rounded-lg border border-border bg-transparent px-3.5 py-2 text-sm text-text placeholder:text-text-tertiary focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            placeholder="Your full name"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-text">Bio</label>
          <textarea
            {...register("bio")}
            rows={4}
            className="w-full resize-none rounded-lg border border-border bg-transparent px-3.5 py-2 text-sm text-text placeholder:text-text-tertiary focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            placeholder="Tell us about yourself..."
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-text">Location</label>
          <input
            {...register("location")}
            type="text"
            className="w-full rounded-lg border border-border bg-transparent px-3.5 py-2 text-sm text-text placeholder:text-text-tertiary focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            placeholder="Where you are at"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-text">Website</label>
          <input
            {...register("website")}
            type="text"
            className="w-full rounded-lg border border-border bg-transparent px-3.5 py-2 text-sm text-text placeholder:text-text-tertiary focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            placeholder="https://yourwebsite.com"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <AppButton type="button" variant="secondary" onClick={handleCancel}>
            Cancel
          </AppButton>
          <AppButton type="submit" variant="primary" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </AppButton>
        </div>
      </form>
    </AppModal>
  );
}

export default UserInfoModal;
