import {
  CommandInteraction,
  Client,
  ApplicationCommandOptionType,
  ApplicationCommandOption,
} from 'discord.js';
import { Command } from '../models/command';

const link: ApplicationCommandOption = {
  type: ApplicationCommandOptionType.String,
  name: 'link-to-song',
  description: 'link to the song with the right chords',
  required: true,
};

export const newSong: Command = {
  name: 'new-song',
  description: 'Propose a new song via a link',
  options: [link],
  run: async (client: Client, interaction: CommandInteraction) => {
    const content = 'new add-song-issue has been created';

    await interaction.followUp({
      ephemeral: true,
      content,
    });
  },
};
