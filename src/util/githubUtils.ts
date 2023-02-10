import { Octokit } from '@octokit/core';
import { IssueLabel } from '../models/issueLabel';
import {
  createBasicDescription,
  createBasicTitle,
  createScreenshot,
} from './stringUtils';
import {
  CommentData,
  CommentSchema,
  FilteredIssueData,
  IssueSchema,
} from '../models/issueSchema';

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
    auth: process.env.GITHUB_LIEDERBUCH_TOKEN,
  });

  await octokit.request('POST /repos/{owner}/{repo}/issues', {
    owner: process.env.GITHUB_OWNER!,
    repo: process.env.GITHUB_LIEDERBUCH_REPO!,
    title: createBasicTitle(issueType, title),
    body:
      createBasicDescription(issueType, description) +
      createScreenshot(linkToScreenshot),
    assignees: [process.env.GITHUB_OWNER!],
    labels: [issueType],
  });
}

/**
 * fetches the github issue list from repo
 * @returns FilteredIssueData[]
 */
export async function getIssues() {
  const octokit = new Octokit({
    auth: process.env.GITHUB_LIEDERBUCH_TOKEN,
  });

  const response = await octokit.request('GET /repos/{owner}/{repo}/issues', {
    owner: process.env.GITHUB_OWNER!,
    repo: process.env.GITHUB_LIEDERBUCH_REPO!,
  });

  let issues: FilteredIssueData[] = [];
  response.data.forEach((issueResponse) => {
    issues.push(IssueSchema.parse(issueResponse));
  });

  return issues;
}

/**
 * fetches the issue with the selected issue number from the repo
 * @param number number
 * @returns FilteredIssueSchema
 */
export async function getIssue(num: number) {
  const octokit = new Octokit({
    auth: process.env.GITHUB_LIEDERBUCH_TOKEN,
  });

  const response = await octokit.request(
    'GET /repos/{owner}/{repo}/issues/{issue_number}',
    {
      owner: process.env.GITHUB_OWNER!,
      repo: process.env.GITHUB_LIEDERBUCH_REPO!,
      issue_number: num,
    }
  );

  return IssueSchema.parse(response.data);
}

/**
 * the comments from one issue
 * @param number number
 * @returns CommentData[]
 */
export async function getComments(number: number) {
  const octokit = new Octokit({
    auth: process.env.GITHUB_LIEDERBUCH_TOKEN,
  });

  const response = await octokit.request(
    'GET /repos/{owner}/{repo}/issues/{issue_number}/comments',
    {
      owner: process.env.GITHUB_OWNER!,
      repo: process.env.GITHUB_LIEDERBUCH_REPO!,
      issue_number: number,
    }
  );

  let comments: CommentData[] = [];
  response.data.forEach((commentResponse) => {
    comments.push(CommentSchema.parse(commentResponse));
  });

  return comments;
}
