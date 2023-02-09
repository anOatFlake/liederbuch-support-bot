import {
  Client,
  CommandInteraction,
  ApplicationCommandOption,
  ApplicationCommandOptionType,
} from 'discord.js';
import { issueEmbed } from 'src/components/issueEmbed';
import { Command } from 'src/models/command';
import { getIssue } from 'src/util/githubUtils';

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
    const num: number = interaction.options.getString('issue-number');
    //const issueData = await getIssue(num);

    await interaction.followUp({
      embeds: [],
      ephemeral: true,
    });
  },
};
