/** @file Portal wrapper for rendering overlays outside the normal DOM layout. */
import { type ReactNode } from "react";
import { createPortal } from "react-dom";

/**
 * @component AppPortal
 * @description Renders children into the document body for overlays and drawers.
 * @prop {ReactNode} children - Content rendered through the portal
 */
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
