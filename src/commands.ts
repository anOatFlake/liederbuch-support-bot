import { Command } from './models/command';
import { Client, CommandInteraction } from 'discord.js';
import { bug } from './commands/bug';
import { feature } from './commands/feature';
import { newSong } from './commands/newSong';
import { allIssues } from './commands/allIssues';
import { updateIssue } from './commands/updateIssue';
import { layoutBug } from './commands/layoutBug';

export const Commands: Command[] = [
  bug,
  feature,
  newSong,
  layoutBug,
  allIssues,
  updateIssue,
];

export const handleSlashCommand = async (
  client: Client,
  interaction: CommandInteraction
): Promise<void> => {
  const slashCommand = Commands.find((c) => c.name === interaction.commandName);
  if (!slashCommand) {
    interaction.followUp({ content: 'An error has occurred' });
    return;
  }

  await interaction.deferReply({ ephemeral: true });
  slashCommand.run(client, interaction);
};
