import {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
} from '@discordjs/builders';

const titleActionRow = new ActionRowBuilder().addComponents(
  new TextInputBuilder()
);
const descriptionActionRow = new ActionRowBuilder().addComponents(
  new TextInputBuilder()
);
const linkActionRow = new ActionRowBuilder().addComponents(
  new TextInputBuilder()
);

//TODO: Modalbuilder
export let bugModal = new ModalBuilder().setTitle('Bugreport').addComponents();

export let layoutBugModal = new ModalBuilder()
  .setTitle('Layoutbugreport')
  .addComponents();

export let featureModal = new ModalBuilder()
  .setTitle('Feature Request')
  .addComponents();

export let newSongModal = new ModalBuilder()
  .setTitle('Liedvorschlag')
  .addComponents();

export let updateIssueModal = new ModalBuilder()
  .setTitle('Issue Update')
  .addComponents();
