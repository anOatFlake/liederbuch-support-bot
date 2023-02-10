import {
  Client,
  CommandInteraction,
  ApplicationCommandOption,
  ApplicationCommandOptionType,
} from 'discord.js';
import { basicEmbed } from '../components/basicEmbed';
import { Command } from '../models/command';
import { getComments, getIssue } from '../util/githubUtils';
import { createCommentEmbedFields } from '../util/discordUtils';

const issueNumber: ApplicationCommandOption = {
  type: ApplicationCommandOptionType.Integer,
  name: 'issue-number',
  description: 'select the issue number you want to display',
  required: true,
};

export const issueDetails: Command = {
  name: 'get-issue',
  description: 'list the issue with the selected number',
  options: [issueNumber],
  run: async (client: Client, interaction: CommandInteraction) => {
    //@ts-ignore
    const num = interaction.options.getInteger('issue-number');

    const issueData = await getIssue(num);
    const commentData = await getComments(num);

    const embedFields = createCommentEmbedFields(commentData);

    await interaction.followUp({
      embeds: [
        basicEmbed
          .setTitle(issueData.title)
          .setURL(issueData.html_url)
          .setDescription(issueData.body ?? '')
          .setFields(embedFields),
      ],
      ephemeral: true,
    });
  },
};
