import { EmbedBuilder } from '@discordjs/builders';

export let issueListEmbed = new EmbedBuilder()
  .setTitle('Liste aller offenen Issues:')
  .setURL('https://github.com/anOatFlake/liederbuch/issues')
  .setTimestamp()
  .setFooter({
    text: 'Brougth to you by your local programmer',
    iconURL: 'https://avatars.githubusercontent.com/u/68395900?s=96&v=4',
  });
