import { deleteAsync } from "del";

export function cleanDist() {
  return deleteAsync("dist");
}
