import { z } from 'zod';

/**
 * types for the defined schemas
 */
export type FilteredIssueData = z.infer<typeof IssueSchema>;
export type CommentData = z.infer<typeof CommentSchema>;

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

export const CommentSchema = z.object({
  body: z.string(),
  created_at: z.coerce.date(),
});
