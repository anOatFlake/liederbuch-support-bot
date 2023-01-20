import { IssueType } from 'src/models/issueType';

/**
 * creates the title string
 * @param issueType IssueType
 * @param title string
 * @returns string
 */
export function createBasicTitle(issueType: IssueType, title: string): string {
  switch (issueType) {
    case IssueType.BUG:
      return 'bug: ' + title;
    case IssueType.FEATURE:
      return 'feat: ' + title;
    case IssueType.NEW_SONG:
      return 'new song:' + title;
    case IssueType.LAYOUT_BUG:
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
  issueType: IssueType,
  description?: string
): string {
  if (description) {
    let descriptionString = '';
    switch (issueType) {
      case IssueType.BUG:
      case IssueType.LAYOUT_BUG:
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
