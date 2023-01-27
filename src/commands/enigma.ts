import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { EnigmaAnswers, enigmaEmbed } from "../enigmaAnswers";
export const enigma = {
  data: new SlashCommandBuilder()
    .setName("enigma")
    .addStringOption((option) =>
      option
        .setName("answer")
        .setDescription("What you think is the answer.")
        .setRequired(true)
    )
    .setDescription("Check an enigma answer."),
  async execute(interaction: CommandInteraction) {
    let answer = interaction.options.get("answer")?.value?.toString();
    if (answer == undefined) {
      console.error("no value provided for answer somehow");
      return;
    }

    let response = EnigmaAnswers.get(answer);
    if (response != undefined)
      interaction.reply({ embeds: enigmaEmbed(response), ephemeral: true });
    else
      interaction.reply({
        content: "That's not an answer. Keep on looking...",
        ephemeral: true,
      });
  },
};