const { currency } = require('./balance');
const { Users, UserItems } = require('../dbObjects');

async function userCreate(userId) {
	if (typeof userId === 'undefined') {
		throw new Error('userId is undefined');
	}

	const user = currency.get(userId) || await Users.findOne({ where: { user_id: userId } });
	// let userItems = await UserItems.findOne ({ where: { user_id: userId } });
	// let items = await user.getItems();

	if (!user) {
		const newUser = await Users.create({ user_id: userId, balance: 1 });
		currency.set(userId, newUser);

		await UserItems.create({
			user_id: userId,
			item_id: null,
			amount: 0,
		});
		// UserItems.set(id, newUser);
	}

	// if (!items) {
	// 	items = await UserItems.create({
	// 		user_id: null,
	// 		item_id: null,
	// 		amount: null,
	// 	});
	// }
	return user;
}

module.exports = { userCreate };