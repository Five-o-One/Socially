/** @file Fallback page rendered for unmatched application routes. */
import { Link } from "react-router";
import { AppButton } from "@/components/AppButton";
import { UI_STRINGS } from "@/constants";

/**
 * @component NotFound
 * @description Fallback page rendered when no route matches the current URL.
 */
export default function NotFound() {
  return (
    <div className="grid min-h-[70vh] place-items-center bg-bg px-6 py-12">
      <div className="text-center">
        <p className="text-base font-semibold text-brand">404</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-text sm:text-6xl">
          {UI_STRINGS.notFound.title}
        </h1>
        <p className="mt-4 text-base text-text-secondary">
          {UI_STRINGS.notFound.description}
        </p>
        <div className="mt-8 flex justify-center">
          <Link to="/">
            <AppButton variant="primary" size="md">
              {UI_STRINGS.notFound.goHome}
            </AppButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
