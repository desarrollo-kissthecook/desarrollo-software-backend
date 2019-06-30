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
      price: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: true,
        },
      },
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      locationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      beginDate: {
        type: DataTypes.DATE,
        validate: {
          notEmpty: true,
        },
      },
      endDate: {
        type: DataTypes.DATE,
        validate: {
          notEmpty: true,
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: true,
        },
      },
      sales: {
        type: DataTypes.INTEGER,
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
    dish.hasMany(models.dishImage, { onDelete: 'cascade' });
    dish.hasMany(models.dishReview, { onDelete: 'cascade' });
    dish.belongsTo(models.location, { through: 'locationId' });
  };
  return dish;
};
