module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'clients',
      [
        {
          userId: 3,
          name: 'Germán Contreras',
          age: 15,
        },
      ],
      {}
    );
  },

  down: queryInterface => queryInterface.bulkDelete('clients', null, {}),
};
