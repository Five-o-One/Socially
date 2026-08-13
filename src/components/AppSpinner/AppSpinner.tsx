import { LoaderCircle } from "lucide-react";

export default function AppSpinner() {
  return (
    <div>
      <LoaderCircle className="animate-spin text-text" />
    </div>
  );
}
