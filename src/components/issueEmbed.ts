import { EmbedBuilder } from '@discordjs/builders';

export let issueEmbed = new EmbedBuilder()
  .setTitle('Issue Infos:')
  .setTimestamp()
  .setFooter({
    text: 'Brougth to you by your local programmer',
    iconURL: 'https://avatars.githubusercontent.com/u/68395900?s=96&v=4',
  });
