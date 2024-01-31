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
				.setRequired(true))
		.addIntegerOption(option =>
			option
				.setName('quantity')
				.setDescription('The number of items to buy')
				.setRequired(false)),
	async execute(interaction) {
		await userCreate(interaction.user.id);
		const itemName = interaction.options.getString('item');
		const item = await CurrencyShop.findOne({ where: { name: { [Op.like]: itemName } } });

		if (!item) return interaction.reply('That item doesn\'t exist.');
		// if (item.cost > getBalance(interaction.user.id)) {
		// 	return interaction.reply(`You currenty have ${getBalance(interaction.user.id)}💰, but the ${item.name} costs ${item.cost}!`);
		// }

		const user = await Users.findOne({ where: { user_id: interaction.user.id } });

		const quantity = interaction.options.getInteger('quantity') || 1;

		if (quantity <= 0) {
			return interaction.reply('Didn\'t you want to buy something?');
		}

		if (item.stock === 0) {
			return interaction.reply('That item is out of stock.');
		}

		if (item.stock < quantity) {
			return interaction.reply(`There doesn't seem to be enough ${item.name} for you.`);
		}


		if (item.cost * quantity > getBalance(interaction.user.id)) {
			return interaction.reply(`You can't afford to buy ${quantity} ${item.name}.`);
		}

		addBalance(interaction.user.id, -item.cost * quantity);

		item.stock -= quantity;
		await item.save();

		for (let i = 0; i < quantity; i++) {
			await user.addItem(item);
		}

		await removeItemPlaceholder(interaction.user.id);

		return interaction.reply(`You've bought: ${item.name} x${quantity}.`);
	},
};