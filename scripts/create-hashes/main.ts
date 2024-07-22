import minimist from "minimist";
import readline from "node:readline";
import ndjson from "ndjson";

interface Args {
  pkg: string | undefined;
}

interface File {
  location: string;
}

interface Hash {
  file: string;
  sha384: string;
}

const args = minimist<Args>(process.argv.slice(2));

main(args.pkg).catch((error) => {
  console.error(error);

  process.exit(1);
});

async function main(pkg: string | undefined) {
  const stream = ndjson.stringify();
  stream.on("data", function (line) {
    // line is a line of stringified JSON with a newline delimiter at the end
    process.stdout.write(line);
  });

  const rl = readline.createInterface({
    input: process.stdin,
  });

  // process.stdout.write(`[\n`);

  for await (const line of rl) {
    // process a line at a time
    const file: File = JSON.parse(line);

    if (file.location) {
      const hash: Hash = { file: file.location, sha384: "" };
      stream.write(hash);

      // process.stdout.write(`${JSON.stringify(hash)},\n`);
    }
  }

  // process.stdout.write(`]`);
  stream.end();
}
