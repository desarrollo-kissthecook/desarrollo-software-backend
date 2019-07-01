module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('reservations', 'dishId', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'dishes',
          key: 'id',
        },
      }),
    ]);
  },

  down: queryInterface => {
    return Promise.all([queryInterface.removeColumn('reservations', 'dishId')]);
  },
};
