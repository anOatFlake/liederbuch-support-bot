import { IssueLabel } from 'src/models/issueLabel';

/**
 * creates the title string
 * @param issueType IssueType
 * @param title string
 * @returns string
 */
export function createBasicTitle(issueType: IssueLabel, title: string): string {
  switch (issueType) {
    case IssueLabel.BUG:
      return 'bug: ' + title;
    case IssueLabel.FEATURE:
      return 'feat: ' + title;
    case IssueLabel.NEW_SONG:
      return 'new song:' + title;
    case IssueLabel.LAYOUT_BUG:
      return 'layout: ' + title;
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
export function createBasicDescription(
  issueType: IssueLabel,
  description?: string
): string {
  if (description) {
    let descriptionString = '';
    switch (issueType) {
      case IssueLabel.BUG:
      case IssueLabel.LAYOUT_BUG:
        description += '### Bugreport: \n' + description;
        break;
      case IssueLabel.FEATURE:
        description += '### Feature description: \n' + description;
        break;
      case IssueLabel.NEW_SONG:
        description += '### Link to chords: \n[' + description + '](url)';
        break;
      default:
        break;
    }
    return descriptionString;
  }
  return '';
}

/**
 * creates the screenshot link
 * @param linkToScreenshot string | undefined
 * @returns string
 */
export function createScreenshot(linkToScreenshot: string | undefined): string {
  let screenshotDescription = '### Screenshot:';
  if (linkToScreenshot) {
    screenshotDescription += '![link to screenshot](' + linkToScreenshot + ')';
  } else {
    screenshotDescription += 'No screenshot provided.';
  }
  return screenshotDescription;
}
