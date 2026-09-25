import { Image } from "../image/image.models.js";

export interface Tile {
  anchor: string;
  label: string;
  image: Image;
  variant?: "theme";
}
