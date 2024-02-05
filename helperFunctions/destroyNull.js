const { currency, UserItems } = require('../dbObjects');

async function removeItemPlaceholder(userId) {
	const placeholderEntry = await UserItems.findOne({
		where: {
			user_id: userId,
			item_id: null,
		},
	});

	if (placeholderEntry) {
		await placeholderEntry.destroy();
	}
}

module.exports = { currency, removeItemPlaceholder };

