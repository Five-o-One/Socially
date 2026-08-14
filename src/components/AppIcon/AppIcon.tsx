import Bell from "../../assets/icons/Bell.svg?raw";
import Calendar from "../../assets/icons/Calendar.svg?raw";
import Chat from "../../assets/icons/Chat.svg?raw";
import Edit from "../../assets/icons/Edit.svg?raw";
import Heart from "../../assets/icons/Heart.svg?raw";
import Home from "../../assets/icons/Home.svg?raw";
import Image from "../../assets/icons/Image.svg?raw";
import Light from "../../assets/icons/Light.svg?raw";
import Link from "../../assets/icons/Link.svg?raw";
import Location from "../../assets/icons/Location.svg?raw";
import Moon from "../../assets/icons/Moon.svg?raw";
import Person from "../../assets/icons/Person.svg?raw";
import Post from "../../assets/icons/Post.svg?raw";
import Send from "../../assets/icons/Send.svg?raw";
import Trash from "../../assets/icons/Trash.svg?raw";
import Menu from "../../assets/icons/menu.svg?raw";
import Close from "../../assets/icons/x.svg?raw";
import Loader from "../../assets/icons/Loader.svg?raw";
import type { AppIconProps, NameIcon } from "../../types/AppIcon";

const icons = {
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
} satisfies Record<NameIcon, string>;

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
      dangerouslySetInnerHTML={{ __html: renderedSvg }}
    />
  );
}
