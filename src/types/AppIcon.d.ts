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
  |"Loader";

export interface AppIconProps {
  nameIcon: NameIcon;
  className?: string;
  size?: number;
  isFilled?: boolean;
}