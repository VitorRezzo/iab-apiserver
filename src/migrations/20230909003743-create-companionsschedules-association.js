import { Sequelize } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export async function up({ context: queryInterface }) {
  await queryInterface.createTable("SchedulesCompanions", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    ScheduleId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: "Schedules", key: "id" },
    },
    CompanionId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: "Companions", key: "id" },
    },
  });
}
export async function down({ context: queryInterface }) {
  await queryInterface.dropTable("SchedulesCompanions");
}
