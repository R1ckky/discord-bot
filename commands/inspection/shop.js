const { SlashCommandBuilder, codeBlock } = require('discord.js');
const { CurrencyShop } = require('../../dbObjects');
const { userCreate } = require('../../helperFunctions/userCreate');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('shop')
		.setDescription('Open the shop'),
	async execute(interaction) {
		await userCreate(interaction.user.id);
		const items = await CurrencyShop.findAll();
		return interaction.reply(codeBlock(items.map(i => `${i.name}: ${i.cost}💰 | Stock: ${i.stock > 0 ? i.stock : 'Out of Stock'}`).join('\n')));

	},
};
