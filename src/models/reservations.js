module.exports = (sequelize, DataTypes) => {
  const reservation = sequelize.define(
    'reservation',
    {
      clientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      dishId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      comment: {
        type: DataTypes.STRING,
      },
      delivered: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {}
  );

  reservation.associate = models => {
    reservation.belongsTo(models.client, { through: 'clientId' });
    reservation.belongsTo(models.dish, { through: 'dishId' });
  };
  return reservation;
};
