/* eslint-disable func-names */
const bcrypt = require('bcrypt');

async function buildPasswordHash(instance) {
  if (instance.changed('password')) {
    const hash = await bcrypt.hash(instance.password, 10);
    instance.set('password', hash);
  }
}

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {}
  );

  user.beforeUpdate(buildPasswordHash);
  user.beforeCreate(buildPasswordHash);

  user.associate = function() {
    // associations can be defined here
  };

  user.prototype.checkPassword = function(password) {
    return bcrypt.compare(password, this.password);
  };
  return user;
};
