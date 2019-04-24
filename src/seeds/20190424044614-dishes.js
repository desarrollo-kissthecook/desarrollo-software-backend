module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'dishes',
      [
        {
          chefId: 1,
          description: 'Lomo saltado',
        },
      ],
      {}
    );
  },

  down: queryInterface => queryInterface.bulkDelete('dishes', null, {}),
};
