"use strict";

/** @type {import('sequelize-cli').Migration} */
export async function up({ context: queryInterface }) {
  await queryInterface.bulkInsert("Users", [
    {
      fullname: "Administrador",
      username: "admin",
      password: "admin",
      active: true,
    },
  ]);
}
export async function down({ context: queryInterface }) {
  await queryInterface.bulkDelete("Users", null, {});
}
