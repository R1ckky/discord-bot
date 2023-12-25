const { SlashCommandBuilder } = require('discord.js');
const { CurrencyShop, Users } = require('../../dbObjects');
const { Op } = require('sequelize');
const { getBalance, addBalance } = require('../../helperFunctions/balance');
const { userCreate } = require('../../helperFunctions/userCreate');
const { removeItemPlaceholder } = require('../../helperFunctions/destroyNull');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('buy')
		.setDescription('Buy an item')
		.addStringOption(option =>
			option
				.setName('item')
				.setDescription('Choose an item from the shop')
				.setRequired(true)),
	async execute(interaction) {
		await userCreate(interaction.user.id);
		const itemName = interaction.options.getString('item');
		const item = await CurrencyShop.findOne({ where: { name: { [Op.like]: itemName } } });

		if (!item) return interaction.reply('That item doesn\'t exist.');
		if (item.cost > getBalance(interaction.user.id)) {
			return interaction.reply(`You currenty have ${getBalance(interaction.user.id)}💰, but the ${item.name} costs ${item.cost}!`);
		}

		const user = await Users.findOne({ where: { user_id:  interaction.user.id } });
		addBalance(interaction.user.id, -item.cost);
		await user.addItem(item);

		await removeItemPlaceholder(interaction.user.id);

		return interaction.reply(`You've bought: ${item.name}.`);
	},
};