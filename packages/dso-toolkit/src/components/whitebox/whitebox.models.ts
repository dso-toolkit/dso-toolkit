import { Icon } from "../icon/icon.models.js";
import { Image } from "../image/image.models.js";

export interface Whitebox {
  title: string;
  label: string;
  description: string;
  image: Image;
  count?: number;
  icon?: Icon;
  iconLabel?: string;
}
