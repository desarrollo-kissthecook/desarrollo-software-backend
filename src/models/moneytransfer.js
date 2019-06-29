/* eslint-disable func-names */
module.exports = (sequelize, DataTypes) => {
  const moneyTransfer = sequelize.define(
    'moneyTransfer',
    {
      toId: DataTypes.INTEGER,
      fromId: DataTypes.INTEGER,
      amount: DataTypes.INTEGER,
    },
    {}
  );
  moneyTransfer.associate = function(models) {
    moneyTransfer.belongsTo(models.user, { as: 'to' });
    moneyTransfer.belongsTo(models.user, { as: 'from' });
  };
  return moneyTransfer;
};
