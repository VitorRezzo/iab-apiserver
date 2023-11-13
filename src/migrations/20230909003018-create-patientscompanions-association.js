import { Sequelize } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export async function up({ context: queryInterface }) {
  await queryInterface.createTable("PatientsCompanions", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    kinship: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    PatientId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: "Patients", key: "id" },
    },
    CompanionId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: "Companions", key: "id" },
    },
  });
}
export async function down({ context: queryInterface }) {
  await queryInterface.dropTable("PatientsCompanions");
}
