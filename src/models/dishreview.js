/* eslint-disable func-names */
module.exports = (sequelize, DataTypes) => {
  const dishReview = sequelize.define(
    'dishReview',
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
      ranking: DataTypes.INTEGER,
      comment: DataTypes.STRING,
    },
    {}
  );
  dishReview.associate = function(models) {
    dishReview.belongsTo(models.client, { through: 'clientId' });
    dishReview.belongsTo(models.dish, { through: 'dishId' });
  };
  return dishReview;
};
