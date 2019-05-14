module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('dishes', 'price', {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
      queryInterface.addColumn('dishes', 'name', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
    ]);
  },

  down: queryInterface => {
    return Promise.all([
      queryInterface.removeColumn('dishes', 'price'),
      queryInterface.removeColumn('dishes', 'name'),
    ]);
  },
};
