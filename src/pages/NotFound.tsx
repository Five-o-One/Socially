import { Link } from "react-router";
import { AppButton } from "@/components/AppButton";

export default function NotFound() {
  return (
    <div className="grid min-h-[70vh] place-items-center bg-bg px-6 py-12">
      <div className="text-center">
        <p className="text-base font-semibold text-brand">404</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-text sm:text-6xl">
          Page not found
        </h1>
        <p className="mt-4 text-base text-text-secondary">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-8 flex justify-center">
          <Link to="/">
            <AppButton variant="primary" size="md">
              Go back home
            </AppButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
