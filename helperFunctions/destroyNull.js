const { currency, UserItems } = require('../dbObjects');

// This function will handle adding an item to the user's inventory and cleaning up the placeholder
async function removeItemPlaceholder(userId) {
	// Check for and remove the placeholder entry
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

