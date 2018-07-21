module.exports = function(sequelize, Sequelize) {

  var userEvents = sequelize.define("userEvents", {
    userID: {
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    eventsattended: {
        type: Sequelize.INTEGER
    },
    });
    userEvents.sync();
    return userEvents;
}