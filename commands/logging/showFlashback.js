const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { Flashbacks } = require('../../dbObjects.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reminisce')
		.setDescription('Displays a flashback.')
		.addStringOption(option =>
			option.setName('title')
				.setDescription('The title of the flashback to display.')
				.setRequired(true)),
	async execute(interaction) {
		const title = interaction.options.getString('title');

		// Fetch the flashback from the database
		const flashback = await Flashbacks.findOne({ where: { title } });
		if (!flashback) {
			return interaction.reply(`Flashback '${title}' not found.`);
		}

		// Create the embed with the flashback data
		const embed = new EmbedBuilder()
			.setTitle(flashback.title)
			.setImage(flashback.image_url)
			.setDescription(flashback.description)
			.addFields(
				{ name: 'Created By', value: flashback.user, inline: true },
				{ name: 'Last Updated', value: flashback.updatedAt.toDateString(), inline: true },
			)
			.setColor('#0099ff')
			.setTimestamp();

		await interaction.reply({ embeds: [embed] });
	},
};
