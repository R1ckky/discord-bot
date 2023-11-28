import { SlashCommandBuilder } from 'discord.js';


module.export = {
	data: SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};