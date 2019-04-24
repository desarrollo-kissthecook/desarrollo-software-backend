module.exports = (sequelize, DataTypes) => {
  const dish = sequelize.define(
    'dish',
    {
      chefId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {}
  );
  dish.associate = models => {
    dish.belongsTo(models.chef, { through: 'chefId' });
    dish.hasMany(models.reservation, { onDelete: 'cascade' });
  };
  return dish;
};
