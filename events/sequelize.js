// const Sequelize = require('sequelize');
// const { Events } = require('discord.js');

// // require('dotenv').config({ path: '../.env' });

// // const client = new Client({ intents: [GatewayIntentBits.Guilds] });


// const sequelize = new Sequelize('database', 'user', 'password', {
// 	host: 'localhost',
// 	dialect: 'sqlite',
// 	logging: false,
// 	storage: 'database.sqlite',
// });

// const Tags = sequelize.define('tags', {
// 	name: {
// 		type: Sequelize.STRING,
// 		unique: true,
// 	},
// 	description: Sequelize.TEXT,
// 	username: Sequelize.STRING,
// 	usage_count: {
// 		type: Sequelize.INTEGER,
// 		defaultValue: 0,
// 		allowNull: false,
// 	},
// });

// module.exports = {
// 	name: Events.ClientReady,
// 	once: true,
// 	execute(client) {
// 		Tags.sync();

// 		console.log(`Tags are synced for ${client.user.tag}`);
// 	},
// };

// // client.once(Events.ClientReady, readyClient => {
// // 	Tags.sync();

// // 	console.log(`Tags are synced for ${readyClient.user.tag}`);
// // });

// // client.on(Events.InteractionCreate, async interaction => {
// // 	if (!interaction.isChatInputCommand()) return;

// // 	const { commandName } = interaction;

// // 	if (commandName === 'addtag') {
// // 		const tagName = interaction.options.getString('name');
// // 		const tagDescription = interaction.options.getString('description');

// // 		try {
// // 			const tag = await Tags.create({
// // 				name: tagName,
// // 				description: tagDescription,
// // 				username: interaction.user.username,
// // 			});

// // 			return interaction.reply(`Tag ${tag.name} added.`);
// // 		}
// // 		catch (error) {
// // 			if (error.name === 'SequelizeUniqueConstraintError') {
// // 				return interaction.reply('That tag already exists.');
// // 			}

// // 			return interaction.reply('Something went wrong with adding a tag.');
// // 		}
// // 	}
// // 	else if (commandName === 'tag') {
// // 		const tagName = interaction.options.getString('name');

// // 		const tag = await Tags.findOne({ where: { name:tagName } });

// // 		if (tag) {
// // 			tag.increment('usage_count');

// // 			return interaction.reply(tag.get('description'));
// // 		}

// // 		return interaction.reply(`Could not find tag: ${tagName}`);
// // 	}
// // 	else if (commandName === 'edittag') {
// // 		const tagName = interaction.options.getString('name');
// // 		const tagDescription = interaction.options.getString('description');

// // 		const affectedRows = await Tags.update({ description: tagDescription }, { where: { name: tagName } });

// // 		if (affectedRows > 0) {
// // 			return interaction.reply(`Tag ${tagName} was edited.`);
// // 		}

// // 		return interaction.reply(`Could not find a tag with name ${tagName}.`);
// // 	}
// // 	else if (commandName === 'taginfo') {
// // 		const tagName = interaction.options.getString('name');

// // 		const tag = await Tags.findOne({ where: { name: tagName } });

// // 		if (tag) {
// // 			return interaction.reply(`${tagName} was created by ${tag.username} at ${tag.createdAt} and has been used ${tag.usage_count}`);
// // 		}

// // 		return interaction.reply(`Could not find tag: ${tagName}`);
// // 	}
// // 	else if (commandName === 'showtags') {
// // 		const tagList = await Tags.findAll({ attributes: ['name'] });
// // 		const tagString = tagList.map(t => t.name).join(', ') || 'No tags set.';

// // 		return interaction.reply(`List of tags: ${tagString}`);
// // 	}
// // 	else if (commandName === 'deletetag') {
// // 		const tagName = interaction.options.getString('name');
// // 		const rowCount = await Tags.destroy ({ where: { name : tagName } });

// // 		if (!rowCount) return interaction.reply('That tag doesn\'t exist.');

// // 		return interaction.reply('Tag deleted.');
// // 	}
// // });

// // client.login(process.env.token);