module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('users', 'image', {
        type: Sequelize.STRING,
        defaultValue:
          'https://github.com/desarrollo-kissthecook/frontend/blob/develop/assets/imgs/default.png',
      }),
    ]);
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'image');
  },
};
