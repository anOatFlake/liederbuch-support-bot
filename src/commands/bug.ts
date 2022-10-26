import { CommandInteraction, Client } from 'discord.js';
import { Command } from '../models/command';

export const bug: Command = {
  name: 'bug',
  description: 'decribe a new bug in the liederbuch app',
  run: async (client: Client, interaction: CommandInteraction) => {
    const content = 'INSERT BUG REPORT HERE';

    await interaction.followUp({
      ephemeral: true,
      content,
    });
  },
};
