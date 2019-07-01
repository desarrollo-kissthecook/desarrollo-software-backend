module.exports = (sequelize, DataTypes) => {
  const client = sequelize.define(
    'client',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {}
  );
  client.associate = models => {
    client.belongsTo(models.user, { through: 'userId' });
    client.hasMany(models.reservation, { onDelete: 'cascade' });
    client.hasMany(models.dishReview, { onDelete: 'cascade' });
  };
  return client;
};
