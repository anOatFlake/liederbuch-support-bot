import {
  Client,
  CommandInteraction,
  ApplicationCommandOption,
  ApplicationCommandOptionType,
} from 'discord.js';
import { issueEmbed } from '../components/issueEmbed';
import { Command } from '../models/command';
import { getIssue } from '../util/githubUtils';

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
    const issueData = await getIssue(parseInt(num)); //todo

    await interaction.followUp({
      embeds: [],
      ephemeral: true,
    });
  },
};
