import { APIEmbedField, Client, CommandInteraction } from 'discord.js';
import { issueListEmbed } from '../components/issueListEmbed';
import { Command } from '../models/command';
import { createIssueListEmbedFields } from '../util/discordUtils';
import { getIssues } from '../util/githubUtils';

export const allIssues: Command = {
  name: 'all-issues',
  description: 'lists all open issues in the liederbuch app',
  run: async (client: Client, interaction: CommandInteraction) => {
    const issueData = await getIssues();
    const embedFields: APIEmbedField[] = createIssueListEmbedFields(issueData);

    if (embedFields.length == 0) {
      embedFields.push({
        name: 'Keine offenen Issues vorhanden',
        value: 'Keine offenen Issues vorhanden',
      });
    }

    await interaction.followUp({
      embeds: [issueListEmbed.setFields(embedFields)],
      ephemeral: true,
    });
  },
};
