"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Orders",
      [
        {
          isActive: true,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          isActive: false,
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          isActive: true,
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Orders", null, {});
  },
};
