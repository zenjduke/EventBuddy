module.exports = function(sequelize, Sequelize) {

  var Event = sequelize.define("Event", {
    
    eventID: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
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
            allowNull: true
          }
    }

  });


Event.sync();

return Event;
};
