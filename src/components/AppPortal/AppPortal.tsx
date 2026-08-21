import { type ReactNode } from "react";
import { createPortal } from "react-dom";

interface AppPortalProps {
  children: ReactNode;
}

export function AppPortal({ children }: AppPortalProps) {
  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(children, document.body);
}

export default AppPortal;
