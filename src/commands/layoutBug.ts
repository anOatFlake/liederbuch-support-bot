import {
  CommandInteraction,
  Client,
  ApplicationCommandOptionType,
  ApplicationCommandOption,
} from 'discord.js';
import { createIssue } from '../util/githubUtils';
import { Command } from '../models/command';
import { IssueLabel } from '../models/issueLabel';

const songName: ApplicationCommandOption = {
  type: ApplicationCommandOptionType.String,
  name: 'song-name',
  description: 'which song has a layout bug',
  required: true,
};
const bugDescription: ApplicationCommandOption = {
  type: ApplicationCommandOptionType.String,
  name: 'bug-description',
  description: 'describe here the bug that you encountered',
  required: false,
};
const linkToScreenshot: ApplicationCommandOption = {
  type: ApplicationCommandOptionType.String,
  name: 'link-to-screenshot',
  description: 'optional: include a link to a screenshot of your bug',
  required: false,
};

export const layoutBug: Command = {
  name: 'bug',
  description: 'decribe a new bug in the liederbuch app',
  options: [songName, bugDescription, linkToScreenshot],
  run: async (client: Client, interaction: CommandInteraction) => {
    //@ts-ignore
    const title = interaction.options.getString('song-name');
    //@ts-ignore
    const description = interaction.options.getString('bug-description');
    //@ts-ignore
    const link = interaction.options.getString('link-to-screenshot');
    const content = 'new bug-issue has been created';

    await createIssue(IssueLabel.LAYOUT_BUG, title, description, link);

    await interaction.followUp({
      ephemeral: true,
      content,
    });
  },
};
