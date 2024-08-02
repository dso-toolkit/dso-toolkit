export interface Release {
  version: string;
}

export interface Master {
  version: "master";
  branch: "master";
}

export interface Topic {
  version: string;
  branch: "topic";
  label: string;
}

export type Version = Release | Master | Topic;

let cache: Version[] | undefined;

function hasShape<T>(keys: Array<keyof T>, obj: unknown): obj is T {
  return (
    obj !== null &&
    obj !== undefined &&
    typeof obj === "object" &&
    keys.length === Object.keys(obj).length &&
    keys.every((k) => k in obj)
  );
}

export function getVersion() {
  return window.location.hostname === "localhost"
    ? "local"
    : (document.location.pathname.split("/")[1] ?? "unable-to-determine-version");
}

export function isSelectedVersion({ version }: Version) {
  return getVersion() === version;
}

export function isReleaseVersion(obj: unknown): obj is Release {
  return hasShape<Release>(["version"], obj) && typeof obj.version === "string";
}

export function isMasterVersion(obj: unknown): obj is Master {
  return (
    hasShape<Master>(["branch", "version"], obj) &&
    typeof obj.branch === "string" &&
    obj.branch === "master" &&
    typeof obj.version === "string" &&
    obj.version === "master"
  );
}

export function isTopicVersion(obj: unknown): obj is Topic {
  return (
    hasShape<Topic>(["branch", "version", "label"], obj) &&
    typeof obj["branch"] === "string" &&
    obj["branch"] === "topic" &&
    typeof obj["version"] === "string" &&
    typeof obj["label"] === "string"
  );
}

export function isVersion(version: unknown): version is Version {
  return isTopicVersion(version) || isMasterVersion(version) || isReleaseVersion(version);
}

export async function getAllVersions(): Promise<Version[]> {
  if (cache) {
    return Promise.resolve(cache);
  }

  const result = await fetch("https://www.dso-toolkit.nl/versions.json?t=" + new Date().getTime());

  const { versions } = await result.json();

  if (!Array.isArray(versions)) {
    throw new Error("versions is not an array");
  }

  return versions.reduce<Version[]>((total, version) => {
    if (isVersion(version)) {
      total.push(version);
    }

    return total;
  }, []);
}
