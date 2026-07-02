import { Octokit } from "@octokit/rest";

const owner = "dso-toolkit";
const repo = "dso-toolkit";

export async function getGithubBranches(githubToken: string) {
  const octokit = new Octokit({ auth: githubToken });

  const results = await octokit.paginate(octokit.repos.listBranches, {
    owner,
    repo,
    per_page: 100,
  });

  return results
    .filter((branch) => branch.name.lastIndexOf("#") === 0)
    .map((branch) => ({
      name: branch.name.replace("#", "_"),
    }));
}
