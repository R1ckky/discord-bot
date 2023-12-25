const { SlashCommandBuilder } = require('discord.js');
const { getBalance, addBalance } = require('../../helperFunctions/balance');
const { userCreate } = require('../../helperFunctions/userCreate');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('transfer')
		.setDescription('Transfer currency')
		.addMentionableOption(option =>
			option.setName('target')
				.setDescription('Choose who to transfer with')
				.setRequired(true))
		.addIntegerOption(option =>
			option.setName('amount')
				.setDescription('How much to transfer')
				.setRequired(true)),
	async execute(interaction) {
		try {
			const transferTarget = interaction.options.getMentionable('target');

			if (!transferTarget || !transferTarget.id) {
				throw new Error('Invalid target. Please select a valid user to transfer to.');
			}

			await userCreate(interaction.user.id);
			await userCreate(transferTarget.id);

			const currentAmount = getBalance(interaction.user.id);
			const transferAmount = interaction.options.getInteger('amount');
			if (transferAmount > currentAmount) {
				throw new Error(`Insufficient funds. You only have ${currentAmount}💰.`);
			}

			if (transferAmount <= 0) {
				throw new Error('Invalid amount. Please enter an amount greater than zero.');
			}

			addBalance(interaction.user.id, -transferAmount);
			addBalance(transferTarget.id, transferAmount);

			return interaction.reply(`Successfully transferred ${transferAmount}💰 to ${transferTarget}. Your current balance is ${getBalance(interaction.user.id)}💰`);
		}
		catch (error) {
			console.log(error.stack);
			return interaction.reply(`Error: ${error.message}`);
		}
	},
};