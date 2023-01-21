import {
  CommandInteraction,
  Client,
  ApplicationCommandOptionType,
  ApplicationCommandOption,
} from 'discord.js';
import { IssueLabel } from 'src/models/issueLabel';
import { createIssue } from 'src/util/githubUtils';
import { Command } from '../models/command';

const title: ApplicationCommandOption = {
  type: ApplicationCommandOptionType.String,
  name: 'song-title',
  description: 'songtitle for issue',
  required: true,
};
const link: ApplicationCommandOption = {
  type: ApplicationCommandOptionType.String,
  name: 'link-to-song',
  description: 'link to the song with the right chords',
  required: true,
};

export const newSong: Command = {
  name: 'new-song',
  description: 'Propose a new song via a link',
  options: [title, link],
  run: async (client: Client, interaction: CommandInteraction) => {
    const content = 'new add-song-issue has been created';

    //@ts-ignore
    const title = interaction.options.getString('song-title');
    //@ts-ignore
    const link = interaction.options.getString('link-to-song');

    await createIssue(IssueLabel.NEW_SONG, title, link);

    await interaction.followUp({
      ephemeral: true,
      content,
    });
  },
};
