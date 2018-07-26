module.exports = function(sequelize, Sequelize) {

  var Event = sequelize.define("Event", {
    
    eventID: {
        primaryKey: true,
        type: Sequelize.STRING,
    },

    eventTitle: {
      type: Sequelize.STRING,
    },

    eventVenue: {
      type: Sequelize.STRING,
    },

    eventLocation: {
      type: Sequelize.STRING,
    },

    eventTime: {
      type: Sequelize.DATE,
    },

    toAttend: {
        type: Sequelize.BOOLEAN,
    },

    attended: {
      type: Sequelize.BOOLEAN,
    },

    userID: {
      type: Sequelize.INTEGER,
      foreignKey: {
            allowNull: false
          }
    }
    });

    Event.associate = function(models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Event.belongsTo(models.User, {
          foreignKey: {
            allowNull: true
          }
        });
      };

Event.sync();

return Event;
};
