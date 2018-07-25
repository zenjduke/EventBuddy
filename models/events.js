module.exports = function(sequelize, Sequelize) {

  var UserEvents = sequelize.define("userEvents", {
    userID: {
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    eventsHistory: {
        type: Sequelize.INTEGER,
    },
    attended: {
      type: Sequelize.BOOLEAN,
    //   defaultValue: "false"
    }
    });

    UserEvents.associate = function(models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        UserEvents.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
    };

UserEvents.sync();
return UserEvents;

};
