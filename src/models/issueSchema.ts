import { z } from 'zod';

/**
 * type of IssueSchema
 */
export type FilteredIssueData = z.infer<typeof IssueSchema>;

/**
 * To filter the github rest result
 */
export const IssueSchema = z.object({
  id: z.number(),
  number: z.number(),
  title: z.string(),
  body: z.string().optional(),
  html_url: z.string(),
});
