/* eslint-disable func-names */
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {}
  );
  user.associate = function() {
    // associations can be defined here
  };

  user.prototype.checkPassword = function(password) {
    return this.password === password;
  };
  return user;
};
