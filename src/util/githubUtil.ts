import { Octokit } from '@octokit/core';
import { IssueType } from '../models/issueType';

/**
 * creates the discord issue depending on the inputs and env vars
 * @param issueType IssueType
 * @param title string
 * @param description string
 * @param linkToScreenshot string | undefined
 */
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

/**
 * creates the title string
 * @param issueType IssueType
 * @param title string
 * @returns string
 */
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

/**
 * creates the description string
 * @param issueType IssueType
 * @param description string
 * @returns string
 */
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

/**
 * creates the screenshot link
 * @param linkToScreenshot string | undefined
 * @returns string
 */
function createScreenshot(linkToScreenshot: string | undefined): string {
  let screenshotDescription = '### Screenshot:';
  if (linkToScreenshot) {
    screenshotDescription += '![link to screenshot](' + linkToScreenshot + ')';
  } else {
    screenshotDescription += 'No screenshot provided.';
  }
  return screenshotDescription;
}
