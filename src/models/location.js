module.exports = (sequelize, DataTypes) => {
  const location = sequelize.define(
    'location',
    {
      address: DataTypes.STRING,
      alias: DataTypes.STRING,
    },
    {}
  );
  location.associate = models => {
    location.hasMany(models.dish, { onDelete: 'cascade' });
  };
  return location;
};
