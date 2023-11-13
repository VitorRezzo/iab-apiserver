import { Sequelize } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export async function up({ context: queryInterface }) {
  await queryInterface.createTable("MedicalRecords", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    pathology: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    biopsyresult: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    directedhospital: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    socialworker: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    medicalname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    treatmenttype: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    clinicalstate: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    medicalphone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
}
export async function down({ context: queryInterface }) {
  await queryInterface.dropTable("MedicalRecords");
}
