/** @file Registration page and account creation flow. */
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { AppCard, AppButton } from "@/components";
import type { RegisterRequest } from "@/types";
import { Register as RegisterUser } from "@/api/Authentication/POST";
import toast from "react-hot-toast";
import { assertApiSuccess, getErrorMessage } from "@/lib/error";
import { UI_STRINGS } from "@/constants";

/**
 * @component Register
 * @description Creates a new user account through the registration form.
 */
export default function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>();

  const onSubmit = async (data: RegisterRequest) => {
    try {
      setIsLoading(true);

      const response = await RegisterUser(data);

      assertApiSuccess(response.data, UI_STRINGS.auth.registrationError);

      toast.success(UI_STRINGS.auth.accountCreatedToast);
      navigate("/");
    } catch (error: unknown) {
      toast.error(
        getErrorMessage(error, UI_STRINGS.auth.registrationError),
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-bg p-4">
      <div className="w-full max-w-md">
        {/* Header Logo */}
        <div className="mb-6 text-center">
          <Link
            to="/"
            className="text-2xl font-mono font-bold tracking-tight text-text"
          >
            {UI_STRINGS.appName}
          </Link>

          <h1 className="mt-3 text-xl font-bold text-text">
            {UI_STRINGS.auth.createAccount}
          </h1>

          <p className="mt-1 text-sm text-text-secondary">
            {UI_STRINGS.auth.registerSubtitle}
          </p>
        </div>

        {/* Register Card */}
        <AppCard>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-text">{UI_STRINGS.auth.fullName}</label>

              <input
                {...register("name", {
                  required: "Full name is required",
                })}
                type="text"
                placeholder={UI_STRINGS.auth.namePlaceholder}
                className="w-full rounded-lg border border-border bg-transparent px-3.5 py-2 text-sm text-text placeholder:text-text-tertiary focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand transition-colors"
              />

              {errors.name && (
                <p className="text-xs text-danger">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-text">{UI_STRINGS.auth.email}</label>

              <input
                {...register("email", {
                  required: UI_STRINGS.auth.emailRequired,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: UI_STRINGS.auth.invalidEmail,
                  },
                })}
                type="email"
                placeholder={UI_STRINGS.auth.emailPlaceholder}
                className="w-full rounded-lg border border-border bg-transparent px-3.5 py-2 text-sm text-text placeholder:text-text-tertiary focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand transition-colors"
              />

              {errors.email && (
                <p className="text-xs text-danger">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-text">{UI_STRINGS.auth.password}</label>

              <div className="relative">
                <input
                  {...register("password", {
                    required: UI_STRINGS.auth.passwordRequired,
                    minLength: {
                      value: 6,
                      message: UI_STRINGS.auth.passwordMinLength,
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder={UI_STRINGS.auth.passwordPlaceholder}
                  className="w-full rounded-lg border border-border bg-transparent px-3.5 py-2 pr-10 text-sm text-text placeholder:text-text-tertiary focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand transition-colors"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((previous) => !previous)}
                  aria-label={showPassword ? UI_STRINGS.auth.hidePassword : UI_STRINGS.auth.showPassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer p-1 text-text-tertiary hover:text-text"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7 10-7 10-7-3-7-10-7a9.74 9.74 0 0 0-5.39 1.61" />
                      <line x1="2" x2="22" y1="2" y2="22" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="text-xs text-danger">{errors.password.message}</p>
              )}
            </div>

            {/* Submit */}
            <div className="pt-2">
              <AppButton
                type="submit"
                variant="primary"
                fullWidth
                isLoading={isLoading}
              >
                {UI_STRINGS.auth.register}
              </AppButton>
            </div>
          </form>

          {/* Switch to Login */}
          <div className="mt-6 border-t border-border pt-4 text-center text-sm text-text-secondary">
            {UI_STRINGS.auth.loginPrompt}{" "}
            <Link
              to="/login"
              className="font-semibold text-brand hover:underline"
            >
              {UI_STRINGS.auth.logIn}
            </Link>
          </div>
        </AppCard>
      </div>
    </div>
  );
}
