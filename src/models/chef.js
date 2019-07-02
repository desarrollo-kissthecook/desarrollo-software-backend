module.exports = (sequelize, DataTypes) => {
  const chef = sequelize.define(
    'chef',
    {
      userId: {
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
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    {}
  );
  chef.associate = models => {
    chef.belongsTo(models.user, { through: 'userId' });
    chef.hasMany(models.dish, { onDelete: 'cascade' });
  };
  return chef;
};
