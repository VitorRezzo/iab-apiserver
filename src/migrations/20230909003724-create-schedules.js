import { Sequelize } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export async function up({ context: queryInterface }) {
  await queryInterface.createTable("Schedules", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    origin: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    destiny: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    transport: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    procedure: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    date: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    hour: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    PatientId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: "Patients", key: "id" },
    },
  });
}
export async function down({ context: queryInterface }) {
  await queryInterface.dropTable("Schedules");
}
