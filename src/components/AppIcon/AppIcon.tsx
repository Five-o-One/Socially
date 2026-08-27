/** @file Named SVG icon renderer and raw SVG transformation helpers. */
import Bell from "@/assets/icons/Bell.svg?raw";
import Calendar from "@/assets/icons/Calendar.svg?raw";
import Chat from "@/assets/icons/Chat.svg?raw";
import Edit from "@/assets/icons/Edit.svg?raw";
import Heart from "@/assets/icons/Heart.svg?raw";
import Home from "@/assets/icons/Home.svg?raw";
import Image from "@/assets/icons/Image.svg?raw";
import Light from "@/assets/icons/Light.svg?raw";
import Link from "@/assets/icons/Link.svg?raw";
import Location from "@/assets/icons/Location.svg?raw";
import Moon from "@/assets/icons/Moon.svg?raw";
import Person from "@/assets/icons/Person.svg?raw";
import Post from "@/assets/icons/Post.svg?raw";
import Send from "@/assets/icons/Send.svg?raw";
import Trash from "@/assets/icons/Trash.svg?raw";
import Menu from "@/assets/icons/menu.svg?raw";
import Close from "@/assets/icons/x.svg?raw";
import Loader from "@/assets/icons/Loader.svg?raw";
import LogOut from "@/assets/icons/LogOut.svg?raw";
import type { AppIconProps, NameIcon } from "@/types";
import ArrowUp from "@/assets/icons/ArrowUp.svg?raw";

/** Named raw SVG assets rendered by `AppIcon`. */
const icons = {
  ArrowUp,
  Bell,
  Calendar,
  Chat,
  Edit,
  Heart,
  Home,
  Image,
  Light,
  Link,
  Location,
  Moon,
  Person,
  Post,
  Send,
  Trash,
  Menu,
  Close,
  Loader,
  LogOut,
} satisfies Record<NameIcon, string>;

/** Applies component display properties to a raw SVG string. */
function transformSvg(
  svg: string,
  {
    className,
    size,
    isFilled,
  }: Pick<AppIconProps, "className" | "size" | "isFilled">,
) {
  let result = svg;

  result = result.replace(
    /(<svg\b[^>]*)(>)/i,
    (_, attributes: string, closing: string) => {
      let attrs = attributes;

      attrs = attrs
        .replace(/\swidth="[^"]*"/i, "")
        .replace(/\sheight="[^"]*"/i, "");

      attrs += ` width="${size}" height="${size}"`;

      if (className) {
        const classMatch = attrs.match(/\sclass="([^"]*)"/i);

        if (classMatch) {
          attrs = attrs.replace(
            classMatch[0],
            ` class="${classMatch[1]} ${className}"`,
          );
        } else {
          attrs += ` class="${className}"`;
        }
      }

      return `${attrs}${closing}`;
    },
  );

  result = result
    .replace(/\sfill="(?!none)[^"]*"/gi, ' fill="currentColor"')
    .replace(/\sstroke="(?!none)[^"]*"/gi, ' stroke="currentColor"');

  if (isFilled) {
    result = result.replace(/\sfill="none"/gi, ' fill="currentColor"');
  }

  return result;
}

/**
 * @component AppIcon
 * @description Renders a named SVG icon from the application icon map.
 * @prop {NameIcon} nameIcon - Icon name
 * @prop {string} [className] - Additional icon class
 * @prop {number} [size=24] - Icon width and height
 * @prop {boolean} [isFilled=false] - Renders empty SVG fills with currentColor
 */
export default function AppIcon({
  nameIcon,
  className,
  size = 24,
  isFilled = false,
}: AppIconProps) {
  const svg = icons[nameIcon];

  const renderedSvg = transformSvg(svg, {
    className,
    size,
    isFilled,
  });

  return (
    <span
      aria-hidden="true"
      className="inline-flex items-center justify-center shrink-0"
      dangerouslySetInnerHTML={{ __html: renderedSvg }}
    />
  );
}
