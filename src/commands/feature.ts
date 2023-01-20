import {
  CommandInteraction,
  Client,
  ApplicationCommandOptionType,
  ApplicationCommandOption,
} from 'discord.js';
import { IssueType } from 'src/models/issueType';
import { createIssue } from 'src/util/githubUtils';
import { Command } from '../models/command';

const featureTitle: ApplicationCommandOption = {
  type: ApplicationCommandOptionType.String,
  name: 'feature-title',
  description: 'choose a short title for your feature proposal',
  required: true,
};
const featureDescription: ApplicationCommandOption = {
  type: ApplicationCommandOptionType.String,
  name: 'feature-description',
  description: 'describe here the feature that you want to be included',
  required: true,
};

export const feature: Command = {
  name: 'feature',
  description: 'Describe a new feature proposal for the liederbuch app',
  options: [featureTitle, featureDescription],
  run: async (client: Client, interaction: CommandInteraction) => {
    const content = 'new feature-issue has been created';

    //@ts-ignore
    const title = interaction.options.getString('feature-title');
    //@ts-ignore
    const description = interaction.options.getString('feature-description');

    await createIssue(IssueType.FEATURE, title, description);

    await interaction.followUp({
      ephemeral: true,
      content,
    });
  },
};
