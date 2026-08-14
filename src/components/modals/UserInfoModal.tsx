import { useForm } from "react-hook-form";

export interface User {
  name: string;
  bio: string;
  location: string;
  website: string;
}

interface UserInfoModalProps {
  user: User;
  onSubmit: (data: User) => void;
  onCancel: () => void;
}

export default function UserInfoModal({
  user,
  onSubmit,
  onCancel,
}: UserInfoModalProps) {
  const { register, handleSubmit } = useForm<User>({
    defaultValues: {
      name: user.name,
      bio: user.bio,
      location: user.location,
      website: user.website,
    },
  });

  return (
    <div className="w-full h-full max-w-125 bg-card border border-border rounded-lg p-6.25 flex flex-col shadow-lg">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4 max-w-125 w-full">
        <h2 className="text-text text-lg font-bold">Edit Profile</h2>
        {/* TODO: replace with <AppButton variant="pure"> once ready, keep the X icon as its icon prop maybeeee*/}
        <button
          type="button"
          className="text-text-secondary hover:text-text cursor-pointer transition-colors"
          onClick={onCancel}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col flex-1 min-h-0"
      >
        {/* TODO: replace the <input>/<textarea> fields below with <AppInput> / <AppTextarea> once ready maybeeee */}
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
        {/* TODO: replace with <AppButton variant="secondary" /> and <AppButton variant="primary" /> maybeee */}
        <div className="flex justify-end gap-3 pt-4 mt-auto">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 rounded-md text-btn-secondary-text bg-btn-secondary-bg hover:bg-btn-secondary-bg-hover border border-border transition-all font-medium cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-md text-btn-primary-text bg-btn-primary-bg hover:bg-btn-primary-bg-hover transition-all font-medium cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
