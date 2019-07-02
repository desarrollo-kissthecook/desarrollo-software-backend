/* eslint-disable func-names */
module.exports = (sequelize, DataTypes) => {
  const tag = sequelize.define(
    'tag',
    {
      title: DataTypes.STRING,
      color: DataTypes.STRING,
    },
    {}
  );
  tag.associate = function(models) {
    tag.hasMany(models.dishTag, { onDelete: 'cascade' });
    tag.belongsToMany(models.dish, { through: 'dishTag' });
  };
  return tag;
};
