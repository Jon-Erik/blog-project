module.exports = function(sequelize, Sequelize) {

	const User = sequelize.define("User", {
		firstname: {
			type: Sequelize.STRING,
			allowNull: false
		},
		lastname: {
			type: Sequelize.STRING,
			allowNull: false
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				isEmail: true
			}
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false
		}
	});

	return User;
}