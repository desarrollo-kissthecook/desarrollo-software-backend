module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('reservations', 'delivered', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      }),
    ]);
  },

  down: queryInterface => {
    return queryInterface.removeColumn('reservations', 'delivered');
  },
};
