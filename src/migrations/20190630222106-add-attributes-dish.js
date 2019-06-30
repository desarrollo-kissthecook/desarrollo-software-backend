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
      queryInterface.addColumn('dishes', 'stock', {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
      queryInterface.addColumn('dishes', 'sales', {
        type: Sequelize.INTEGER,
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
