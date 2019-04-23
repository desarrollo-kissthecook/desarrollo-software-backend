const bcrypt = require('bcrypt');

module.exports = {
  up: async queryInterface => {
    const password = await bcrypt.hash('123456', 10);
    return queryInterface.bulkInsert(
      'users',
      [
        {
          email: 'test@uc.cl',
          password,
        },
        {
          email: 'prueba@uc.cl',
          password,
        },
        {
          email: 'teste@uc.cl',
          password,
        },
      ],
      {}
    );
  },

  down: queryInterface => queryInterface.bulkDelete('users', null, {}),
};
