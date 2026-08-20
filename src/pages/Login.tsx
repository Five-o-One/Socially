import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { AppCard, AppButton } from "@/components";
import type { LoginRequest } from "@/types/Authentication";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();

  const onSubmit = async (data: LoginRequest) => {
    setIsLoading(true);
    console.log("Login submitted:", data);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/");
    }, 800);
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
            Socially
          </Link>
          <h1 className="mt-3 text-xl font-bold text-text">Welcome back</h1>
          <p className="mt-1 text-sm text-text-secondary">
            Enter your credentials to access your account
          </p>
        </div>

        {/* Login Card */}
        <AppCard>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-text">Email</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                placeholder="name@example.com"
                className="w-full rounded-lg border border-border bg-transparent px-3.5 py-2.5 text-sm text-text placeholder:text-text-tertiary focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand transition-colors"
              />
              {errors.email && (
                <p className="text-xs text-danger">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-text">Password</label>
              <div className="relative">
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-border bg-transparent px-3.5 py-2.5 pr-10 text-sm text-text placeholder:text-text-tertiary focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text cursor-pointer p-1"
                >
                  {showPassword ? (
                    /* Eye Off Icon */
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
                      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                      <line x1="2" x2="22" y1="2" y2="22" />
                    </svg>
                  ) : (
                    /* Eye Icon */
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

            {/* Submit Button */}
            <div className="pt-2">
              <AppButton
                type="submit"
                variant="primary"
                fullWidth
                isLoading={isLoading}
              >
                Sign In
              </AppButton>
            </div>
          </form>

          {/* Switch to Signup */}
          <div className="mt-6 border-t border-border pt-4 text-center text-sm text-text-secondary">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-brand hover:underline"
            >
              Sign up
            </Link>
          </div>
        </AppCard>
      </div>
    </div>
  );
}
