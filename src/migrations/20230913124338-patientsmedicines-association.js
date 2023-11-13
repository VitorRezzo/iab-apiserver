import { Sequelize } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export async function up({ context: queryInterface }) {
  await queryInterface.createTable("PatientsMedicines", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    PatientId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: "Patients", key: "id" },
    },
    MedicineId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: "Medicines", key: "id" },
    },
  });
}
export async function down({ context: queryInterface }) {
  await queryInterface.dropTable("PatientsMedicines");
}
