import { Sequelize } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export async function up({ context: queryInterface }) {
  await queryInterface.createTable("ResidentsExpenses", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    ResidentId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: "Residents", key: "id" },
    },
    ExpenseId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: { model: "Expenses", key: "id" },
    },
    ScheduleId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: { model: "Schedules", key: "id" },
    },
  });
}
export async function down({ context: queryInterface }) {
  await queryInterface.dropTable("ResidentsExpenses");
}
