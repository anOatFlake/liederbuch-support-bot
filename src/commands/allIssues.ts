import { APIEmbedField, Client, CommandInteraction } from 'discord.js';
import { issueListEmbed } from 'src/components/issueListEmbed';
import { Command } from 'src/models/command';
import { createIssueListEmbedFields } from 'src/util/discordUtils';
import { getIssues } from 'src/util/githubUtils';

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
      embeds: [issueListEmbed.addFields(embedFields)],
      ephemeral: true,
    });
  },
};
