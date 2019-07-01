module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'chefs',
      [
        {
          userId: 1,
          description: 'Chef peruano listo para preparar los mejores platos de mi país',
          address: 'Av. Vicuña Mackenna 4860, Macul, Región Metropolitana',
        },
        {
          userId: 2,
          description: 'Amante de la cocina colombiana y chilena',
          address: 'Camino el Alba 9500, Las Condes, Región Metropolitana',
        },
      ],
      {}
    );
  },

  down: queryInterface => queryInterface.bulkDelete('chefs', null, {}),
};
