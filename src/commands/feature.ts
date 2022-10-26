import { CommandInteraction, Client } from 'discord.js';
import { Command } from '../models/command';

export const feature: Command = {
  name: 'feature',
  description: 'Describe a new feature proposal for the liederbuch app',
  run: async (client: Client, interaction: CommandInteraction) => {
    const content = 'INSERT FEATURE HERE';

    await interaction.followUp({
      ephemeral: true,
      content,
    });
  },
};
