const { SlashCommandBuilder } = require('discord.js');
const { Flashbacks } = require('../../dbObjects.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('createflashback')
		.setDescription('Create a new flashback entry')
		.addStringOption(option =>
			option.setName('title')
				.setDescription('A unique title for the flashback')
				.setRequired(true))
		.addAttachmentOption(option =>
			option.setName('image')
				.setDescription('The image for the flashback')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('description')
				.setDescription('The description for the flashback')
				.setRequired(true)),
	async execute(interaction) {
		const title = interaction.options.getString('title');
		const imageAttachment = interaction.options.getAttachment('image');
		const description = interaction.options.getString('description');
		const existingFlashback = await Flashbacks.findOne({ where: { title: title } });
		if (existingFlashback) {
			return interaction.reply('A flashback with this title already exists.');
		}

		try {
			await Flashbacks.create({
				title: title,
				image_url: imageAttachment.url,
				description: description,
				user: interaction.user.globalName,
			});

			await interaction.reply(`Flashback "${title}" created successfully`);
		}
		catch (error) {
			console.error('Error creating flashback:', error);
			await interaction.reply('There was an error while creating the flashback.');
		}
	},
};