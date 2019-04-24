module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'chefs',
      [
        {
          userId: 1,
          description: 'Soy el mejor chef en completos',
          address: 'Marin 014',
        },
        {
          userId: 2,
          description: 'Amante del sushi',
          address: 'Camino el Alba 9500',
        },
      ],
      {}
    );
  },

  down: queryInterface => queryInterface.bulkDelete('chefs', null, {}),
};
