import { Client, CommandInteraction } from 'discord.js';
import { Command } from 'src/models/command';

export const allIssues: Command = {
  name: 'all-issues',
  description: 'lists all open issues in the liederbuch app',
  run: async (client: Client, interaction: CommandInteraction) => {
    //TODO
  },
};
