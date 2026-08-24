/** @file Page-level loading state with primary and secondary messages. */
import AppSpinner from "./AppSpinner";

/**
 * @component AppPageSpinner
 * @description Centered page-level loading state.
 * @prop {string} [message='Loading...'] - Main message displayed below the spinner
 * @prop {string} [subMessage='Please wait'] - Secondary loading message
 * @prop {string} [className] - Additional wrapper classes
 */
interface AppPageSpinnerProps {
  message?: string;
  subMessage?: string;
  className?: string;
}

export default function AppPageSpinner({
  message = "Loading...",
  subMessage = "Please wait",
  className = "",
}: AppPageSpinnerProps) {
  return (
    <div
      className={`flex min-h-[50vh] w-full flex-col items-center justify-center gap-3 p-6 text-center ${className}`}
    >
      <AppSpinner size={32} />
      <h4 className="text-base font-semibold text-text">{message}</h4>
      <p className="text-xs text-text-secondary">{subMessage}</p>
    </div>
  );
}
