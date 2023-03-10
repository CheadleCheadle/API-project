'use strict';

const membership = require('../models/membership');

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
 options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
   up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   options.tableName = "Memberships";
    await queryInterface.bulkInsert(options, [
      {
        userId: 1,
        groupId: 1,
        status: 'host'
      },
      {
        userId: 2,
        groupId: 2,
        status: "host"
      },
      {
        userId: 3,
        groupId: 3,
        status: 'host'
      },
      {
        userId: 4,
        groupId: 4,
        status: 'host'
      },

    ], {})
  },

   down: async (queryInterface, Sequelize) =>  {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = "Memberships";
    await queryInterface.bulkDelete(options, null, {});

  }
};
