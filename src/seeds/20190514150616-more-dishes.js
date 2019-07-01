module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'dishes',
      [
        {
          chefId: 1,
          description: 'El mejor ceviche de salmon',
          name: 'Ceviche',
          price: 5000,
        },
        {
          chefId: 2,
          description: 'Lomo Saltado a la peruana con carne de soja',
          name: 'Lomo Saltado Vegetariano',
          price: 4000,
        },
      ],
      {}
    );
  },

  down: queryInterface => queryInterface.bulkDelete('dishes', null, {}),
};
