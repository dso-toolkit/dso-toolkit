import concurrently from "concurrently";
import fs from "fs-extra";
import minimist from "minimist";

fs.removeSync("./dist");

const argv = minimist(process.argv.slice(2));

const sassWatch = {
  name: "sass",
  command: "yarn sass --watch src/dso-leaflet.scss dist/dso-leaflet.css",
  prefixColor: "bgBlue",
};

const sassBuild = {
  name: "sass",
  command: "yarn sass src/dso-leaflet.scss dist/dso-leaflet.css",
  prefixColor: "bgBlue",
};

const klapStart = {
  name: "klap",
  command: "yarn klap start",
  prefixColor: "yellow",
};

const klapWatch = {
  name: "klap",
  command: "yarn klap watch",
  prefixColor: "yellow",
};

const klapBuild = {
  name: "klap",
  command: "yarn klap build",
  prefixColor: "yellow",
};

if (argv.start) {
  fs.copy("../css/dist", "dist/css");

  concurrently([klapStart, sassWatch], {
    killOthers: ["success", "failure"],
  });
} else if (argv.watch) {
  concurrently([klapWatch, sassWatch], {
    killOthers: ["success", "failure"],
  });
} else if (argv.build) {
  concurrently([klapBuild, sassBuild], {
    killOthers: ["failure"],
  });
} else {
  throw new Error("run.js needs --start, --watch or --build");
}
