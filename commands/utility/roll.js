const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Rolls a dice')
		.addIntegerOption(option =>
			option.setName('sides')
				.setDescription('Number of sides on the die')
				.setRequired(false)),
	async execute(interaction) {
		const sides = interaction.options.getInteger('sides') || 6;
		if (sides < 1) {
			return interaction.reply({ content: 'The number of sides must be a positive integer.', ephemeral:true });
		}

		const roll = Math.floor(Math.random() * sides) + 1;
		await interaction.reply(`🎲 You rolled a ${roll} on a ${sides}-sided die!`);
	},
};