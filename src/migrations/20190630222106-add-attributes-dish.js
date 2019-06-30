module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('dishes', 'beginDate', {
        type: Sequelize.DATE,
        allowNull: true,
      }),
      queryInterface.addColumn('dishes', 'endDate', {
        type: Sequelize.DATE,
        allowNull: true,
      }),
    ]);
  },

  down: queryInterface => {
    return Promise.all([
      queryInterface.removeColumn('dishes', 'beginDate'),
      queryInterface.removeColumn('dishes', 'endDate'),
    ]);
  },
};
