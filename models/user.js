module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    avatarURL: DataTypes.STRING,
    password: DataTypes.STRING
  });
  return User;
};