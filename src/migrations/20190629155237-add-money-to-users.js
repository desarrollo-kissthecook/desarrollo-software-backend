module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('users', 'money', {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'money');
  },
};
