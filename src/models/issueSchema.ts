import { number, string, z } from 'zod';

export interface FilteredIssueData {
  id: number;
  number: number;
  title: string;
  body: string;
  html_url: string;
}

/**
 * To filter the github rest result
 */
export const IssueSchema = z.object({
  id: z.number(),
  number: z.number(),
  title: z.string(),
  body: z.string(),
  html_url: z.string(),
});
