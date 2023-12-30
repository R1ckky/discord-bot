const { SlashCommandBuilder } = require('discord.js');
const { Users } = require('../../dbObjects');
const { userCreate } = require('../../helperFunctions/userCreate');

// module.exports = {
// 	data: new SlashCommandBuilder()
// 		.setName('inventory')
// 		.setDescription('Check your inventory'),
// 	async execute(interaction) {
// 		const target = interaction.options.getUser('user') ?? interaction.user;
// 		await userCreate(target.id);
// 		const user = await Users.findOne({ where: { user_id: target.id } });
// 		const items = await user.getItems();

// 		if (!items.length) return interaction.reply(`${target.tag} has nothing!`);

// 		return interaction.reply(`${target.tag} current has ${items.map(i => `${i.amount} ${i.item.name}`).join(', ')}`);
// 	},
// };

module.exports = {
	data: new SlashCommandBuilder()
		.setName('inventory')
		.setDescription('Check your inventory'),
	async execute(interaction) {
		try {
			const target = interaction.options.getUser('user') ?? interaction.user;
			// console.log(target);
			await userCreate(target.id);
			const user = await Users.findOne({ where: { user_id: target.id } });
			// console.log(user);

			if (!user) {
				return interaction.reply('User not found.');
			}

			// Make sure the getItems() is a valid function and is supposed to return the items.
			const items = await user.getItems();

			if (!items.length || items.every(i => i.item_id === null)) return interaction.reply(`${target.globalName} has nothing!`);

			return interaction.reply(`${target.globalName} currently has ${items.map(i => `${i.item_id} x${i.amount} `).join(', ')}`);
		}
		catch (error) {
			console.error('Error accessing inventory:', error.message);
			// Include the stack trace for more detailed debugging information in the console
			console.error(error.stack);
			return interaction.reply('There was an error while retrieving the inventory.');
		}
	},
};
