module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {}
  );
  User.associate = function() {
    // associations can be defined here
  };
  return User;
};
