import { Client, Interaction } from 'discord.js';
import { Commands, handleSlashCommand } from './commands';

console.log('Bot is starting...');

const client = new Client({
  intents: ['Guilds'],
});

client.on('ready', async () => {
  if (!client.user || !client.application) {
    return;
  }

  await client.application.commands.set(Commands);

  console.log(`${client.user.username} is online`);
});

client.on('interactionCreate', async (interaction: Interaction) => {
  if (interaction.isCommand()) {
    await handleSlashCommand(client, interaction);
  }
});

client.login(process.env.TOKEN);
