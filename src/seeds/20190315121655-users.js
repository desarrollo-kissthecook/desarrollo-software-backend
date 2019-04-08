module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'users',
      [
        {
          email: 'test@uc.cl',
          password: '123456',
        },
      ],
      {}
    ),

  down: queryInterface => queryInterface.bulkDelete('users', null, {}),
};
