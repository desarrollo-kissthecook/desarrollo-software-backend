module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('dishes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      chefId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'chefs',
          key: 'id',
        },
      },
      description: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable('dishes');
  },
};
