module.exports = function(sequelize, Sequelize) {

  var userEvents = sequelize.define("userEvents", {
    userID: {
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    eventshistory: {
        type: Sequelize.STRING,
    },
    eventsattended: {
      type: Sequelize.BOOLEAN,
      // defaultValue: "false"
    }
    });
    userEvents.sync();
    return userEvents;
}