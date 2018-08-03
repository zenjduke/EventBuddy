// Makes the User Model available for other files (will also create a table)

module.exports = function(sequelize, Sequelize) {
 
  var User = sequelize.define("User", {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },

    fname: {
        type: Sequelize.STRING,
        notEmpty: true
    },

    lname: {
        type: Sequelize.STRING,
        notEmpty: true
    },

    username: {
        type: Sequelize.TEXT,
        allowNull: false
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false
    },

    email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true
        }
    },

    phone: {
        type: Sequelize.STRING,
    },

    profilepic: {
        type: Sequelize.STRING,
    },

    twitter: {
        type: Sequelize.STRING,
    },

    facebook: {
        type: Sequelize.STRING,
    },

    gplus: {
        type: Sequelize.STRING,
    },

    venue: {
        type: Sequelize.STRING,
    },

    groupsize: {
        type: Sequelize.STRING,
    },

    // sports: {
    //     type: Sequelize.BOOLEAN,
    //     defaultValue: false,
    // },

    last_login: {
        type: Sequelize.DATE
    },

    status: {
        type: Sequelize.ENUM("active", "inactive"),
        defaultValue: "active"
    },

  });

  User.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    User.hasMany(models.Event, {
      onDelete: "cascade"
    });
  };

  // Syncs with DB
  User.sync();
  return User;
}
