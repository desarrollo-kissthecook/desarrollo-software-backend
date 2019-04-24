module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'reservations',
      [
        {
          clientId: 1,
          dishId: 1,
          comment: 'Quiero la carne cruda',
        },
      ],
      {}
    );
  },

  down: queryInterface => queryInterface.bulkDelete('reservations', null, {}),
};
