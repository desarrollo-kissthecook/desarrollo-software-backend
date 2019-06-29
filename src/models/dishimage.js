/* eslint-disable func-names */
module.exports = (sequelize, DataTypes) => {
  const dishImage = sequelize.define(
    'dishImage',
    {
      url: {
        type: DataTypes.STRING,
      },
      dishId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {}
  );
  dishImage.associate = function(models) {
    dishImage.belongsTo(models.dish, { through: 'dishId' });
  };
  return dishImage;
};
