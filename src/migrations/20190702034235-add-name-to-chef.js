module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('chefs', 'name', {
        type: Sequelize.STRING,
        default: '',
      }),
    ]);
  },

  down: queryInterface => {
    return Promise.all([queryInterface.removeColumn('chefs', 'name')]);
  },
};
