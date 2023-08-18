import { danger, fail } from "danger";

(async function main() {
  const types = ["Added", "Changed", "Deprecated", "Removed", "Fixed", "Docs", "Task"] as const;
  type TypeMap = { [K in (typeof types)[number]]: string };

  const groupMap: TypeMap = {
    Added: "Added",
    Changed: "Changed",
    Deprecated: "Deprecated",
    Docs: "Docs",
    Fixed: "Fixed",
    Removed: "Removed",
    Task: "Tasks",
  };

  const labelMap: TypeMap = {
    Added: "feature",
    Changed: "change",
    Deprecated: "deprecate",
    Docs: "docs",
    Fixed: "bug",
    Removed: "remove",
    Task: "task",
  };

  // Commit message check
  const [firstCommit, ...remainingCommits] = danger.git.commits;
  const firstCommitMessageLine = firstCommit.message.split("\n")[0];
  const firstCommitMessage = parseFirstCommitMessage(firstCommitMessageLine);
  if (!firstCommitMessage) {
    fail(`First commit message fails format: ${firstCommitMessageLine}`);
  }

  // Changelog check
  const hasChangelog = danger.git.modified_files.includes("CHANGELOG.md");
  if (!hasChangelog) {
    fail("Please add a changelog entry for your changes.");
  }

  if (firstCommitMessage) {
    if (firstCommitMessage.scope.split(" ").some((w) => w[0].toLocaleUpperCase() !== w[0])) {
      fail(`First commit message scope is not written in spaced Pascal Case: ${firstCommitMessage.scope}`);
    }

    for (let i = 0; i++; i < remainingCommits.length) {
      const commitMessage = remainingCommits[i];
      const commitMessageLine = commitMessage.message.split("\n")[0];
      if (!commitMessageLine.startsWith(`#${firstCommitMessage.issueId}`)) {
        fail(`Commit ${i + 1} (${commitMessage.sha}) has invalid format: "${commitMessageLine}".`);
      }
    }

    const githubIssue = await getGithubIssue(firstCommitMessage.issueId);
    if (!githubIssue) {
      fail("Unable to fetch GitHub issue data.");
    } else {
      if (firstCommitMessage.issueTitle !== githubIssue.title) {
        fail(
          `First commit message issue title differs from GitHub issue title: "${firstCommitMessage.issueTitle}" vs. "${githubIssue.title}".`
        );
      }

      const githubLabel = labelMap[firstCommitMessage.type];
      if (!githubIssue.labels.some((l) => l.includes(githubLabel))) {
        fail(`GitHub issue does not have proper label "${githubLabel}".`);
      }
    }
  }

  if (hasChangelog) {
    const diff = await danger.git.diffForFile("CHANGELOG.md");
    if (!diff) {
      fail("No diff for CHANGELOG.md");
    } else {
      const changelogEntry = parseChangelogEntry(diff.after, firstCommitMessage.issueId);
      if (!changelogEntry) {
        fail(`CHANGELOG entry does not match format.`);
      } else {
        if (firstCommitMessage.issueId !== changelogEntry.linkIssueId) {
          fail(
            `CHANGELOG entry issue id differs from CHANGELOG entry link issue id: "${firstCommitMessage.issueId}" vs. "${changelogEntry.linkIssueId}".`
          );
        }

        if (firstCommitMessage.summary !== changelogEntry.summary) {
          fail(
            `First commit message summary differs from CHANGELOG entry summary: "${firstCommitMessage.summary}" vs. "${changelogEntry.summary}".`
          );
        }

        if (firstCommitMessage.group !== changelogEntry.group) {
          fail(
            `First commit message group differs from CHANGELOG entry group: "${firstCommitMessage.group}" vs. "${changelogEntry.group}".`
          );
        }

        if (changelogEntry.release !== "Next") {
          fail(`CHANGELOG entry is not added to release "Next" but to "${changelogEntry.release}".`);
        }
      }
    }
  }

  // Lorem check
  [...danger.git.modified_files, ...danger.git.created_files]
    .filter((file) => file !== "dangerfile.ts")
    .forEach((file) =>
      danger.git.diffForFile(file).then((diff) => {
        if (diff?.after.includes("Lorem")) {
          fail(`Please do not use 'Lorem ipsum' as content: ${file}`);
        }
      })
    );

  function parseFirstCommitMessage(commitMessage: string) {
    const commitMessageRegex = new RegExp(
      `^#(?<issueId>\\d+) \\[(?<type>${types.join("|")})\\] (?<scope>[^\\s].+[^\\s]): (?<summary>[^\\s].+[^\\s])`
    );

    const match = commitMessage.match(commitMessageRegex);
    if (!match) {
      return null;
    }

    const issueId = parseInt(match.groups["issueId"], 10);
    const { type, scope, summary } = match.groups;

    if (isNaN(issueId) || typeof type !== "string" || typeof scope !== "string" || typeof summary !== "string") {
      return null;
    }

    return {
      issueId,
      group: groupMap[type] ?? type,
      type,
      scope,
      summary,
      issueTitle: `${scope}: ${summary}`,
    };
  }

  function parseChangelogEntry(changelog: string, issueId: number) {
    const changelogRegex = new RegExp(
      `^\\* (?:\\*\\*(?<breaking>BREAKING)\\*\\* )?(?<scope>[^\\s].+[^\\s]): (?<summary>[^\\s].+[^\\s]) \\(\\[#${issueId}\\]\\(https:\\/\\/github\\.com\\/dso-toolkit\\/dso-toolkit\\/issues\\/(?<linkIssueId>\\d+)\\)\\)$`,
      "m"
    );

    const match = changelog.match(changelogRegex);

    if (!match) {
      return null;
    }

    const isBreaking = match.groups["breaking"] === "BREAKING";
    const linkIssueId = parseInt(match.groups["linkIssueId"], 10);
    const { scope, summary } = match.groups;
    const { index } = match;

    if (isNaN(linkIssueId) || typeof scope !== "string" || typeof summary !== "string" || typeof index !== "number") {
      return null;
    }

    const groupIndex = changelog.lastIndexOf("\n### ", index) + 1;
    if (groupIndex === 0) {
      return null;
    }

    const group = changelog.slice(groupIndex + 4, changelog.indexOf("\n", groupIndex));

    const releaseIndex = changelog.lastIndexOf("\n## ", groupIndex) + 1;
    if (releaseIndex === 0) {
      return null;
    }

    const release = changelog.slice(releaseIndex + 3, changelog.indexOf("\n", releaseIndex));

    return {
      index,
      linkIssueId,
      isBreaking,
      scope,
      summary,
      group,
      release,
    };
  }

  async function getGithubIssue(issueId: number) {
    function isLabel(label: unknown): label is { name: string } {
      return typeof label === "object" && label !== null && "name" in label && typeof label.name === "string";
    }

    const results = await fetch(`https://api.github.com/repos/dso-toolkit/dso-toolkit/issues/${issueId}`, {
      headers:
        typeof process.env.DANGER_GITHUB_API_TOKEN === "string"
          ? {
              Authorization: `Bearer ${process.env.DANGER_GITHUB_API_TOKEN}`,
            }
          : {},
    });

    const data = await results.json();
    if (!data || typeof data.title !== "string" || !Array.isArray(data.labels)) {
      return null;
    }

    const { title, labels } = data;

    return {
      issueId,
      title,
      labels: Array.isArray(labels) ? labels.filter(isLabel).map((l) => l.name) : [],
    };
  }
})();
