import { APIEmbedField } from 'discord.js';
import { FilteredIssueData } from 'src/models/issueSchema';

/**
 * creates all the embed descriptions for filteredIssueData
 * @param data FilteredIssueData[]
 * @returns APIEmbedField[]
 */
export function createIssueListEmbedFields(data: FilteredIssueData[]): APIEmbedField[] {     
  let embedFields: APIEmbedField[] = [];
  data.forEach((issue) => {
    const embedLine: APIEmbedField = {
      name: '[Issue: ' + issue.id + '](' + issue.html_url + ')',
      value: issue.title,
    };
    embedFields.push(embedLine);
  });
  return embedFields;
}
