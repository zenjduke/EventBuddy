// Makes the User Model available for other files (will also create a table)

module.exports = function(sequelize, Sequelize) {
 
  var User = sequelize.define("User", {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },

    firstname: {
        type: Sequelize.STRING,
        notEmpty: true
    },

    lastname: {
        type: Sequelize.STRING,
        notEmpty: true
    },

    username: {
        type: Sequelize.TEXT
    },

    email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true
        }
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false
    },

    last_login: {
        type: Sequelize.DATE
    },

    status: {
        type: Sequelize.ENUM("active", "inactive"),
        defaultValue: "active"
    },

  });
  // Syncs with DB
  User.sync();
  return User;
}
