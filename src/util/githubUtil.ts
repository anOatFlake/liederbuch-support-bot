import { Octokit } from '@octokit/core';
import { IssueType } from '../models/issueType';

export async function createIssue(
  issueType: IssueType,
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

function createBasicTitle(issueType: IssueType, title: string): string {
  switch (issueType) {
    case IssueType.BUG:
      return 'bug: ' + title;
    case IssueType.FEATURE:
      return 'feat: ' + title;
    case IssueType.NEW_SONG:
      return 'new song:' + title;
    default:
      return title;
  }
}

function createBasicDescription(
  issueType: IssueType,
  description: string
): string {
  let descriptionString = '';
  switch (issueType) {
    case IssueType.BUG:
      description += '### Bugreport: \n' + description;
      break;
    case IssueType.FEATURE:
      description += '### Feature description: \n' + description;
      break;
    case IssueType.NEW_SONG:
      description += '### Link to chords: \n[' + description + '](url)';
      break;
    default:
      break;
  }
  return descriptionString;
}

function createScreenshot(linkToScreenshot?: string): string {
  let screenshotDescription = '### Screenshot:';
  if (linkToScreenshot) {
    screenshotDescription += '![link to screenshot](' + linkToScreenshot + ')';
  } else {
    screenshotDescription += 'No screenshot provided.';
  }
  return screenshotDescription;
}
