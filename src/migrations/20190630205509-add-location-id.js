module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('dishes', 'locationId', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'locations',
          key: 'id',
        },
      }),
    ]);
  },

  down: queryInterface => {
    return queryInterface.removeColumn('dishes', 'locationId');
  },
};
