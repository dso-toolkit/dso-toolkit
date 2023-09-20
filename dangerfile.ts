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
    fail(`The first commit message does not have the required format: ${firstCommitMessageLine}. Please check the [Change management notatie](https://www.dso-toolkit.nl/58.2.0/voor-maintainers/change-management-notatie) for examples and documentation.`);
  }

  // Changelog check
  const hasChangelog = danger.git.modified_files.includes("CHANGELOG.md");
  if (!hasChangelog) {
    fail(`It looks like you haven't added an entry to the CHANGELOG. Please read the [Change management notatie](https://www.dso-toolkit.nl/58.2.0/voor-maintainers/change-management-notatie) to find out how and why to add one.`);
  }

  if (firstCommitMessage) {
    if (firstCommitMessage.scope.split(" ").some((w) => w[0].toLocaleUpperCase() !== w[0])) {
      fail(`First commit message scope is not written in spaced Pascal Case: "${firstCommitMessage.scope}". All words in the scope should be capitalized.`);
    }

    for (let i = 0; i++; i < remainingCommits.length) {
      const commitMessage = remainingCommits[i];
      const commitMessageLine = commitMessage.message.split("\n")[0];
      if (!commitMessageLine.startsWith(`#${firstCommitMessage.issueId}`)) {
        fail(`Commit ${i + 1} (${commitMessage.sha}) has invalid format: "${commitMessageLine}". Please start every commit message with the related issue number.`);
      }
    }

    const githubIssue = await getGithubIssue(firstCommitMessage.issueId);
    if (!githubIssue) {
      fail(
          `I can't find GitHub issue "${firstCommitMessage.issueId}". Please check that the issue number is correct and that the issue exists. I could just be unable to fetch GitHub issue data.`
      );
    } else {
      if (firstCommitMessage.issueTitle !== githubIssue.title) {
        fail(
            `The scope and summary in your first commit message should match the GitHub issue title, but they currently don't: "${firstCommitMessage.issueTitle}" versus "${githubIssue.title}".`
        );
      }

      const githubLabel = labelMap[firstCommitMessage.type];
      if (!githubIssue.labels.some((l) => l.includes(githubLabel))) {
        fail(
            `The related GitHub issue is missing the proper label "${githubLabel}". Can you please add it?`
        );
      }
    }
  }

  if (hasChangelog) {
    const diff = await danger.git.diffForFile("CHANGELOG.md");
    if (!diff) {
      fail(`No diff for CHANGELOG.md`);
    } else {
      const changelogEntry = parseChangelogEntry(diff.after, firstCommitMessage.issueId);
      if (!changelogEntry) {
        fail(`The CHANGELOG entry does not match the expected format. A CHANGELOG entry should follow the following format: "#issue [changelog entry group] scope: summary". For example: "#2241 [Task] Packages: Dependency updates". For more information and troubleshooting, check [Change management notatie](https://www.dso-toolkit.nl/58.2.0/voor-maintainers/change-management-notatie).`);
      } else {
        if (firstCommitMessage?.issueId !== changelogEntry.linkIssueId) {
          fail(
            `The issue number used in your first commit is different from the issue number you've linked in your CHANGELOG entry: "${firstCommitMessage.issueId}" vs. "${changelogEntry.linkIssueId}". Please make sure they're the same.`
          );
        }

        if (firstCommitMessage?.summary !== changelogEntry.summary) {
          fail(
            `There is a difference in the summary of the work you've done between your first commit message and the CHANGELOG entry: "${firstCommitMessage.summary}" versus "${changelogEntry.summary}". Please make sure they're exactly the same.`
          );
        }

        if (firstCommitMessage?.scope !== changelogEntry.scope) {
          fail(
            `The first commit message scope is different from the CHANGELOG scope: "${firstCommitMessage.scope}" versus "${changelogEntry.scope}". Adding the correct scope makes it easier to see what changes have been made to a specific aspect of the codebase by looking through the CHANGELOG later. For more information, check [Change management notatie](https://www.dso-toolkit.nl/58.2.0/voor-maintainers/change-management-notatie).`
          );
        }

        if (firstCommitMessage?.group !== changelogEntry.group) {
          fail(
            `First commit message group differs from CHANGELOG entry group: "${firstCommitMessage.group}" versus "${changelogEntry.group}". With group we mean the type of changes made. This has to be one of the following keywords: Added, Changed, Deprecated, Docs, Fixed, Removed or Tasks, and be used in the commit message like in this example: "#2241 [Task] Packages: Dependency updates". In the CHANGELOG, each of these keywords is a subheader within the "Next" release so all the changes in the resulting release are easy to see.`
          );
        }

        if (changelogEntry.release !== "Next") {
          fail(`Your CHANGELOG entry is not added to release "Next" but to "${changelogEntry.release}". Please move it to the right location so that when your pull-request is merged, the CHANGELOG history correctly reflects your work in the right release.`);
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
