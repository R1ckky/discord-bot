const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`ready.js is ready for ${client.user.tag}`);
	},
};