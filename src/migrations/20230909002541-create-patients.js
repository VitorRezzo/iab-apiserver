import { Sequelize } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export async function up({ context: queryInterface }) {
  await queryInterface.createTable("Patients", {
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
    MedicalRecordId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: "MedicalRecords", key: "id" },
    },
  });
}
export async function down({ context: queryInterface }) {
  await queryInterface.dropTable("Patients");
}
