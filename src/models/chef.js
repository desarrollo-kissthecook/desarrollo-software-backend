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
    },
    {}
  );
  chef.associate = models => {
    chef.belongsTo(models.user, { through: 'userId' });
  };
  return chef;
};
