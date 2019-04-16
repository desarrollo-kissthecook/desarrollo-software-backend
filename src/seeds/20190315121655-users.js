module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'users',
      [
        {
          email: 'test@uc.cl',
          password: '123456',
        },
        {
          email: 'prueba@uc.cl',
          password: '123456',
        },
        {
          email: 'teste@uc.cl',
          password: '123456',
        },
      ],
      {}
    ),

  down: queryInterface => queryInterface.bulkDelete('users', null, {}),
};
