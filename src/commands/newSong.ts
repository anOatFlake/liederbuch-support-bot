import { CommandInteraction, Client } from 'discord.js'
import { Command } from '../models/command'

export const newSong: Command = {
    name: 'new-song',
    description: 'Propose a new song via a link',
    run: async (client: Client, interaction: CommandInteraction) => {
        const content = 'INSERT NEW SONG HERE'

        await interaction.followUp({
            ephemeral: true,
            content,
        })
    },
}
