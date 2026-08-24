/** @file Icon names and props shared by icon-producing components. */

/** Names supported by the shared icon component. */
export type NameIcon =
  | "Bell"
  | "Calendar"
  | "Chat"
  | "Edit"
  | "Heart"
  | "Home"
  | "Image"
  | "Light"
  | "Link"
  | "Location"
  | "Moon"
  | "Person"
  | "Post"
  | "Send"
  | "Trash"
  | "Menu"
  | "Close"
  | "Loader"
  | "LogOut";

/** Props accepted by the shared icon component. */
export interface AppIconProps {
  nameIcon: NameIcon;
  className?: string;
  size?: number;
  isFilled?: boolean;
}
