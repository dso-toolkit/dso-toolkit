import concurrently from "concurrently";
import fs from "fs-extra";
import minimist from "minimist";

fs.removeSync("./dist");

const argv = minimist(process.argv.slice(2));

const klapStart = {
  name: "klap",
  command: "klap start",
  prefixColor: "yellow",
};

const klapBuild = {
  name: "klap",
  command: "klap build",
  prefixColor: "yellow",
};

if (argv.start) {
  fs.copy("../dso-toolkit/dist", "dist/dso-toolkit");
  fs.copy("../leaflet/dist/dso-leaflet.css", "dist/leaflet/dso-leaflet.css");
  fs.copy("../leaflet/dist/dso-leaflet.css.map", "dist/leaflet/dso-leaflet.css.map");

  concurrently([klapStart]);
} else if (argv.build) {
  concurrently([klapBuild]);
}
