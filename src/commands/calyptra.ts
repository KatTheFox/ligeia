import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { enigmaAnswers, enigmaEmbed } from "../enigmaAnswers";
export const calyptra = {
  data: new SlashCommandBuilder()
    .setName("calyptra")
    .addStringOption((option) =>
      option
        .setName("answer")
        .setDescription("What you think is the answer.")
        .setRequired(true)
    )
    .setDescription("Check an enigma answer for the Calyptra variant"),
  async execute(interaction: CommandInteraction) {
    let answer = interaction.options
      .get("answer")
      ?.value?.toString()
      .toLocaleLowerCase();
    if (answer == undefined) {
      console.error("no value provided for answer somehow");
      return;
    }

    let response = enigmaAnswers.get(answer);
    if (response != undefined)
      interaction.reply({ embeds: enigmaEmbed(response), ephemeral: true });
    else
      interaction.reply({
        content: "That's not an answer. Keep on looking...",
        ephemeral: true,
      });
  },
};
