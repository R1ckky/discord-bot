const { currency } = require('./balance');
const { Users, UserItems } = require('../dbObjects');

async function userCreate(userId) {
	if (typeof userId === 'undefined') {
		throw new Error('userId is undefined');
	}

	const user = currency.get(userId) || await Users.findOne({ where: { user_id: userId } });

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

	return user;
}

module.exports = { userCreate };