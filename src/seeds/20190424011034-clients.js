module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'clients',
      [
        {
          userId: 3,
          name: 'Germinho',
          age: 15,
        },
      ],
      {}
    );
  },

  down: queryInterface => queryInterface.bulkDelete('clients', null, {}),
};
