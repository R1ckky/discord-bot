module.exports = (sequelize, DataTypes) => {
	return sequelize.define('flashbacks', {
		title: {
			type: DataTypes.TEXT,
			allowNull: false,
			primaryKey: true,
		},
		image_url: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		user: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	);
};