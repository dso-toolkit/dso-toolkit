import del from "del";

export function cleanDist() {
  return del("dist");
}
