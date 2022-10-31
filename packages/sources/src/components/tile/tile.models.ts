import { Image } from "../image/image.models";

export interface Tile {
  anchor: string;
  label: string;
  image: Image;
  variant?: "theme";
}
