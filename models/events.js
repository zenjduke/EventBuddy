module.exports = function(sequelize, Sequelize) {

  var Event = sequelize.define("Event", {
    eventID: {
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    toAttend: {
        type: Sequelize.INTEGER,
    },
    attended: {
      type: Sequelize.BOOLEAN,
    //   defaultValue: "false"
    }
    });

    Event.associate = function(models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Event.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
      };

Event.sync();
return Event;
};
