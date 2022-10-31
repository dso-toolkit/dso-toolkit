import { Icon } from "../icon/icon.models";
import { Image } from "../image/image.models";

export interface Whitebox {
  title: string;
  label: string;
  description: string;
  image: Image;
  count?: number;
  icon?: Icon;
  iconLabel?: string;
}
