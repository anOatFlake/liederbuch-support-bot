import {
  ApplicationCommandOption,
  ApplicationCommandOptionType,
  Client,
  CommandInteraction,
} from 'discord.js';
import { Command } from '../models/command';

const issueId: ApplicationCommandOption = {
  type: ApplicationCommandOptionType.String,
  name: 'issue-id',
  description:
    'select the issues id you want to update (you can look it up with the all-issues command)',
  required: true,
};
const additionalInformation: ApplicationCommandOption = {
  type: ApplicationCommandOptionType.String,
  name: 'additional-information',
  description:
    'describe the addditional information you want to add to the issue',
  required: true,
};
const additionalScreeenshotLink: ApplicationCommandOption = {
  type: ApplicationCommandOptionType.String,
  name: 'additional-link-to-screenshot',
  description: 'optional link to a screenshot',
  required: false,
};

export const updateIssue: Command = {
  name: 'update-issue',
  description: 'updates an issue with additional information',
  options: [issueId, additionalInformation, additionalScreeenshotLink],
  run: async (client: Client, interaction: CommandInteraction) => {
    //TODO embed
    const content = 'Issue has been updated';

    await interaction.followUp({
      ephemeral: true,
      content,
    });
  },
};
