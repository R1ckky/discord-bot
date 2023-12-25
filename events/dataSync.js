const { Events } = require('discord.js');
const { currency } = require('../helperFunctions/balance');
const { Users } = require('../dbObjects');

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		const storedBalances = await Users.findAll();
		storedBalances.forEach(b => currency.set(b.user_id, b));

		console.log(`dataSync is ready for ${client.user.tag}`);
	},
};