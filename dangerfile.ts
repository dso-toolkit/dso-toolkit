import { danger, fail } from "danger";

(async function main() {
  const resolutions = ["Added", "Changed", "Deprecated", "Docs", "Fixed", "Removed", "Task"] as const;
  type ResolutionMap = { [K in (typeof resolutions)[number]]: string };

  const resolutionMap: ResolutionMap = {
    Added: "Feature",
    Changed: "Change",
    Deprecated: "Deprecate",
    Docs: "Docs",
    Fixed: "Bug",
    Removed: "Remove",
    Task: "Task",
  };

  // Commit message check
  const [firstCommit, ...remainingCommits] = danger.git.commits;
  const firstCommitMessageLine = firstCommit.message.split("\n")[0];
  const firstCommitMessage = parseFirstCommitMessage(firstCommitMessageLine);
  if (!firstCommitMessage) {
    fail(
      `De eerste commit ('${firstCommitMessageLine}') volgt niet de vereiste formule. Lees de [Change management notatie](https://www.dso-toolkit.nl/master/voor-maintainers/change-management-notatie) voor voorbeelden van wat het moet zijn, en uitleg waarom.`,
    );

    return;
  }

  const githubIssue = await getGithubIssue(firstCommitMessage.issueId);

  // Changelog check
  const hasChangelog = danger.git.modified_files.includes("CHANGELOG.md");
  if (!hasChangelog) {
    fail(
      `Het lijkt erop dat je geen aantekening hebt toegevoegd aan het CHANGELOG. Lees de [Change management notatie](https://www.dso-toolkit.nl/master/voor-maintainers/change-management-notatie) om te lezen wat dit inhoudt en hoe je dit op de juiste manier doet.`,
    );
  }

  if (firstCommitMessage) {
    if (firstCommitMessage.scope.split(" ").some((w) => w[0].toLocaleUpperCase() !== w[0])) {
      fail(
        `Het scopegedeelte van het eerste commit-bericht ('${firstCommitMessage.scope}') is niet geschreven in gespatieerde Pascal-casing. Alle woorden in de scope moeten met een hoofdletter beginnen.`,
      );
    }

    for (let i = 0; i < remainingCommits.length, i++; ) {
      const commitMessage = remainingCommits[i];
      const commitMessageLine = commitMessage.message.split("\n")[0];
      if (!commitMessageLine.startsWith(`#${firstCommitMessage.issueId}`)) {
        fail(
          `Commit ${i + 1} (${
            commitMessage.sha
          }) met commit-bericht '${commitMessageLine}' moet beginnen met het nummer van de GitHub issue waar je aan gewerkt hebt.`,
        );
      }
    }

    if (!githubIssue) {
      fail(
        `Ik kan GitHub issue '${firstCommitMessage.issueId}' niet vinden. Controleer of het issuenummer klopt en of de issue bestaat.`,
      );
    } else {
      if (firstCommitMessage.issueTitle !== githubIssue.title) {
        fail(
          `Het scopegedeelte en de samenvatting in je eerste commit-bericht moeten overeenkomen met de titel van het GitHub-issue, maar dat doen ze momenteel niet: Vergelijk '${firstCommitMessage.issueTitle}' met de titel van het issue: '${githubIssue.title}'.`,
        );
      }

      const githubLabel = resolutionMap[firstCommitMessage.resolution];
      if (!githubIssue.labels.some((l) => l.includes(githubLabel))) {
        fail(
          `Het gerelateerde GitHub-issue mist het juiste label. Ik denk dat dat '${githubLabel}' moet zijn. Kun je deze alsjeblieft toevoegen?`,
        );
      }
    }
  }

  if (hasChangelog) {
    const diff = await danger.git.diffForFile("CHANGELOG.md");
    if (!diff) {
      fail(`Ik heb geen wijzigingen aan de CHANGELOG.md aangetroffen.`);
    } else {
      const changelogEntry = parseChangelogEntry(diff.after, firstCommitMessage.issueId);
      if (!changelogEntry) {
        fail(
          `De CHANGELOG-aantekening volgt niet de juiste formule. Een CHANGELOG-aantekening moet de volgende formule volgen: "scope: samenvatting ([#issue](https://github.com/dso-toolkit/dso-toolkit/issues/issue))". Bijvoorbeeld: \`* Packages: Dependency updates ([#9999](https://github.com/dso-toolkit/dso-toolkit/issues/9999))\`. Raadpleeg voor meer informatie en probleemoplossing de documentatie: [Change management notatie](https://www.dso-toolkit.nl/master/voor-maintainers/change-management-notatie).`,
        );
      } else {
        if (firstCommitMessage?.issueId !== changelogEntry.linkIssueId) {
          fail(
            `Het issuenummer dat is gebruikt in je eerste commit-bericht verschilt van het issuenummer waarnaar je hebt verwezen in je CHANGELOG-aantekening: vergelijk '${firstCommitMessage.issueId}' met '${changelogEntry.linkIssueId}'. Zorg ervoor dat deze twee hetzelfde zijn.`,
          );
        }

        if (firstCommitMessage?.summary !== changelogEntry.summary) {
          fail(
            `Er is een verschil in de samenvatting (van het werk dat je hebt gedaan) zoals beschreven in je eerste commit-bericht ('${firstCommitMessage.summary}'), en de CHANGELOG-aantekening ('${changelogEntry.summary}'). Zorg ervoor dat ze exact hetzelfde zijn.`,
          );
        }

        if (firstCommitMessage?.scope !== changelogEntry.scope) {
          fail(
            `Het scopegedeelte van je eerste commit-bericht ('${firstCommitMessage.scope}') verschilt van de scope in het CHANGELOG ('${changelogEntry.scope}'). Het toevoegen van het juiste scopegedeelte maakt het gemakkelijker om later in het CHANGELOG te zien welke wijzigingen er zijn aangebracht aan een specifiek aspect van de codebase. Voor meer informatie, raadpleeg de [Change management-notatie](https://www.dso-toolkit.nl/master/voor-maintainers/change-management-notatie).`,
          );
        }

        if (firstCommitMessage?.resolution !== changelogEntry.group) {
          fail(
            `Het groupgedeelte in het eerste commit-bericht ('${firstCommitMessage.resolution}') verschilt van de group in de CHANGELOG-aantekening ('${changelogEntry.group}'). Met 'group' bedoelen we het type wijziging dat is aangebracht. Dit moet een van de volgende trefwoorden zijn: ${resolutions.join(", ")}. In het CHANGELOG zijn deze trefwoorden subkoppen binnen de 'Next' release, zodat alle wijzigingen in de resulterende release gemakkelijk te zien zijn gegroepeerd op resolution.`,
          );
        }

        if (changelogEntry.release !== "Next") {
          fail(
            `Je CHANGELOG-aantekening staat niet onder het kopje van de eerstvolgende release ('Next'), maar onder '${changelogEntry.release}'. Verplaats deze naar de juiste locatie, zodat wanneer je pull-verzoek wordt samengevoegd, de CHANGELOG-geschiedenis correct je werk weergeeft in de juiste release.`,
          );
        }

        if (githubIssue?.labels.some((l) => l.includes("BREAKING")) && !changelogEntry.isBreaking) {
          fail(
            `Het label \`**BREAKING**\` ontbreekt aan het begin van je CHANGELOG-aantekening. Het gerelateerde GitHub-issue ${githubIssue.title} (#${githubIssue.issueId}) is evenwel wel gemarkeerd met het label "💥 BREAKING". Wil je deze toevoegen aan het begin van je CHANGELOG-aantekening? Zorg dat deze er als volgt uitziet:\n\n\`* **BREAKING** ${githubIssue.title} ([#${githubIssue.issueId}](https://github.com/dso-toolkit/dso-toolkit/issues/${githubIssue.issueId}))\``,
          );
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
          fail(
            `Gebruik alsjeblieft geen 'Lorem ipsum' als content. Het lijkt er op dat je dat hebt gedaan in het volgende bestand: ${file}`,
          );
        }
      }),
    );

  function parseFirstCommitMessage(commitMessage: string) {
    const commitMessageRegex = new RegExp(
      `^#(?<issueId>\\d+) \\[(?<resolution>${resolutions.join("|")})\\] (?<scope>[^\\s].*?[^\\s]): (?<summary>[^\\s].+[^\\s])`,
    );

    const match = commitMessage.match(commitMessageRegex);
    if (!match) {
      return null;
    }

    const issueId = parseInt(match.groups["issueId"], 10);
    const { resolution, scope, summary } = match.groups;

    if (isNaN(issueId) || typeof resolution !== "string" || typeof scope !== "string" || typeof summary !== "string") {
      return null;
    }

    return {
      issueId,
      resolution,
      scope,
      summary,
      issueTitle: `${scope}: ${summary}`,
    };
  }

  function parseChangelogEntry(changelog: string, issueId: number) {
    const changelogRegex = new RegExp(
      `^\\* (?:\\*\\*(?<breaking>BREAKING)\\*\\* )?(?<scope>[^\\s].*?[^\\s]): (?<summary>[^\\s].+[^\\s]) \\(\\[#${issueId}\\]\\(https:\\/\\/github\\.com\\/dso-toolkit\\/dso-toolkit\\/issues\\/(?<linkIssueId>\\d+)\\)\\)$`,
      "m",
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
