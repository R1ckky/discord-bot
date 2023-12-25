const { SlashCommandBuilder } = require('discord.js');
const { getBalance } = require('../../helperFunctions/balance');
const { userCreate } = require('../../helperFunctions/userCreate');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('balance')
		.setDescription('Check your balance')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('The user to check the balance of')
				.setRequired(false)),
	async execute(interaction) {
		const target = interaction.options.getUser('user') ?? interaction.user;

		await userCreate(target.id);

		return interaction.reply(`${target.tag} has ${getBalance(target.id)}💰`);
	},
};