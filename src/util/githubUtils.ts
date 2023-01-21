import { Octokit } from '@octokit/core';
import { IssueLabel } from '../models/issueLabel';
import {
  createBasicDescription,
  createBasicTitle,
  createScreenshot,
} from './stringUtils';
import { FilteredIssueData, IssueSchema } from 'src/models/issueSchema';

/**
 * creates the discord issue depending on the inputs and env vars
 * @param issueType IssueType
 * @param title string
 * @param description string
 * @param linkToScreenshot string | undefined
 */
export async function createIssue(
  issueType: IssueLabel,
  title: string,
  description: string,
  linkToScreenshot?: string
) {
  const octokit = new Octokit({
    auth: process.env.GITHUB_LIEDERBUCH_BOT_TOKEN,
  });

  await octokit.request('POST /repos/{owner}/{repo}/issues', {
    owner: process.env.GITHUB_OWNER!,
    repo: process.env.GITHUB_LIEDERBUCH_BOT_REPO!,
    title: createBasicTitle(issueType, title),
    body:
      createBasicDescription(issueType, description) +
      createScreenshot(linkToScreenshot),
    assignees: [process.env.GITHUB_OWNER!],
    labels: [issueType],
  });
}

/**
 * fetches the discord issue list from repo
 */
export async function getIssues() {
  const octokit = new Octokit({
    auth: process.env.GITHUB_LIEDERBUCH_BOT_TOKEN,
  });

  const response = await octokit.request('GET /repos/{owner}/{repo}/issues', {
    owner: process.env.GITHUB_OWNER!,
    repo: process.env.GITHUB_LIEDERBUCH_BOT_REPO!,
  });

  let issues: FilteredIssueData[] = [];
  response.data.forEach((issueResponse) => {
    issues.push(IssueSchema.parse(issueResponse));
  });

  return issues;
}
