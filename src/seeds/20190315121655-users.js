const bcrypt = require('bcrypt');

module.exports = {
  up: async queryInterface => {
    const password = await bcrypt.hash('123456', 10);
    return queryInterface.bulkInsert(
      'users',
      [
        {
          email: 'chef_marco_lopez@gmail.com',
          password,
        },
        {
          email: 'comidas_de_america@gmail.com',
          password,
        },
        {
          email: 'german_contreras@me.com',
          password,
        },
      ],
      {}
    );
  },

  down: queryInterface => queryInterface.bulkDelete('users', null, {}),
};
