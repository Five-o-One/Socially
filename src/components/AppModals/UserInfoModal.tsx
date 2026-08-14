import { useForm } from "react-hook-form";
import type { User, UserInfoModalProps } from "../../types/Modals";
import AppButton from "../AppButton/AppButton";

/**
 * @component UserInfoModal
 * @description Modal content for editing the current user's profile info
 * (name, bio, location, website). Fully self-styled (own bg-card, border,
 * rounded, shadow, padding) so it works standalone or nested inside
 * AppModal without a doubled box — pass no `title`/`footer` to AppModal
 * when rendering this as its children.
 *
 * @prop {Partial<User>} [user] - Existing user values used as form defaults
 * @prop {(data: User) => void} onSubmit - Called with form values on Save Changes
 * @prop {() => void} onCancel - Called when Cancel or the close (X) button is clicked
 *
 * @example
 * <AppModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
 *   <UserInfoModal
 *     user={currentUser}
 *     onSubmit={(values) => updateProfile(values)}
 *     onCancel={() => setIsOpen(false)}
 *   />
 * </AppModal>
 */
export default function UserInfoModal({
  user,
  onSubmit,
  onCancel,
}: UserInfoModalProps) {
  const { register, handleSubmit } = useForm<User>({
    defaultValues: {
      name: user?.name,
      bio: user?.bio,
      location: user?.location,
      website: user?.website,
    },
  });

  return (
    <div className="w-full h-full max-w-125 bg-card border border-border rounded-lg p-6.25 flex flex-col shadow-lg">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4 max-w-125 w-full">
        <h2 className="text-text text-lg font-bold">Edit Profile</h2>
        <AppButton variant="ghost" size="sm" icon="Close" onClick={onCancel} />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col flex-1 min-h-0"
      >
        <div className="flex flex-col gap-4 flex-1 pr-1">
          {/* Name Field */}
          <div className="flex flex-col gap-2">
            <label className="text-text text-sm font-medium">Name</label>
            <input
              {...register("name")}
              type="text"
              className="w-full bg-transparent border border-border rounded-md px-3 py-2.5 text-text focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-all"
              placeholder="Enter your name!"
            />
          </div>

          {/* Bio Field */}
          <div className="flex flex-col gap-2">
            <label className="text-text text-sm font-medium">Bio</label>
            <textarea
              {...register("bio")}
              placeholder="Enter your Bio"
              className="w-full bg-transparent border border-border rounded-md px-3 py-2.5 text-text focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-all resize-none"
              rows={6}
            />
          </div>

          {/*Location*/}
          <div className="flex flex-col gap-2">
            <label className="text-text text-sm font-medium">Location</label>
            <input
              {...register("location")}
              type="text"
              placeholder="Where you are at"
              className="w-full bg-transparent border border-border rounded-md px-3 py-2.5 text-text focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-all"
            />
          </div>

          {/* Website*/}
          <div className="flex flex-col gap-2">
            <label className="text-text text-sm font-medium">Website</label>
            <input
              {...register("website")}
              type="text"
              placeholder="Your personal website"
              className="w-full bg-transparent border border-border rounded-md px-3 py-2.5 text-text focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-all"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-4 mt-auto">
          <AppButton variant="secondary" onClick={onCancel}>
            Cancel
          </AppButton>
          <AppButton variant="primary" onClick={handleSubmit(onSubmit)}>
            Save Changes
          </AppButton>
        </div>
      </form>
    </div>
  );
}
