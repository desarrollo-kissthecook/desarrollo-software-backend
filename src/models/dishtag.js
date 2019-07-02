/* eslint-disable func-names */
module.exports = (sequelize, DataTypes) => {
  const dishTag = sequelize.define(
    'dishTag',
    {
      tagId: {
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
    },
    {}
  );
  dishTag.associate = function(models) {
    dishTag.belongsTo(models.tag, { through: 'tagId' });
    dishTag.belongsTo(models.dish, { through: 'dishId' });
  };
  return dishTag;
};
