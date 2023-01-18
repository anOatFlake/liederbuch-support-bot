import {
  CommandInteraction,
  Client,
  ApplicationCommandOptionType,
  ApplicationCommandOption,
} from 'discord.js';
import { createIssue } from '../util/githubUtil';
import { Command } from '../models/command';
import { IssueType } from '../models/issueType';

const bugTitle: ApplicationCommandOption = {
  type: ApplicationCommandOptionType.String,
  name: 'bug-title',
  description: 'choose a short title for your bug report',
  required: true,
};
const bugDescription: ApplicationCommandOption = {
  type: ApplicationCommandOptionType.String,
  name: 'bug-description',
  description: 'describe here the bug that you encountered',
  required: true,
};
const linkToScreenshot: ApplicationCommandOption = {
  type: ApplicationCommandOptionType.String,
  name: 'link-to-screenshot',
  description: 'optional: include a link to a screenshot of your bug',
  required: false,
};

export const bug: Command = {
  name: 'bug',
  description: 'decribe a new bug in the liederbuch app',
  options: [bugTitle, bugDescription, linkToScreenshot],
  run: async (client: Client, interaction: CommandInteraction) => {
    //@ts-ignore
    const title = interaction.options.getString('bug-title');
    //@ts-ignore
    const description = interaction.options.getString('bug-description');
    //@ts-ignore
    const link = interaction.options.getString('link-to-screenshot');
    const content = 'new bug-issue has been created';

    await createIssue(IssueType.BUG, title, description, link);

    await interaction.followUp({
      ephemeral: true,
      content,
    });
  },
};
