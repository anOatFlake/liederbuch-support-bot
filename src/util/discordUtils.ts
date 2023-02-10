import { APIEmbedField } from 'discord.js';
import { CommentData, FilteredIssueData } from 'src/models/issueSchema';

/**
 * creates all the embed descriptions for filteredIssueData
 * @param data FilteredIssueData[]
 * @returns APIEmbedField[]
 */
export function createIssueListEmbedFields(
  data: FilteredIssueData[]
): APIEmbedField[] {
  let embedFields: APIEmbedField[] = [];
  data.forEach((issue) => {
    const embedLine: APIEmbedField = {
      name: issue.title,
      value: '[Issue Number: ' + issue.number + '](' + issue.html_url + ')',
    };
    embedFields.push(embedLine);
  });
  return embedFields;
}

/**
 * creates all the embed descriptions for commentData
 * @param data CommentData[]
 * @returns APIEmbedField[]
 */
export function createCommentEmbedFields(data: CommentData[]): APIEmbedField[] {
  let embedFields: APIEmbedField[] = [];
  data.forEach((comment) => {
    const embedLine: APIEmbedField = {
      name: comment.created_at.toLocaleString(),
      value: comment.body,
    };
    embedFields.push(embedLine);
  });
  return embedFields;
}
