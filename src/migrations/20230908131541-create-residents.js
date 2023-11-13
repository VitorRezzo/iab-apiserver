import { Sequelize } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export async function up({ context: queryInterface }) {
  await queryInterface.createTable("Residents", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    fullname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    cpf: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    birthdate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    age: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    profession: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    wage: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    schooling: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    addiction: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    bloodtype: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    gender: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    religion: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    contact: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    civilstatus: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    formsunion: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    registerdate: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    StatusId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: "Statuses", key: "id" },
    },
    AvatareId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: "Avatares", key: "id" },
    },
    AddressId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: "Addresses", key: "id" },
    },
  });
}
export async function down({ context: queryInterface }) {
  await queryInterface.dropTable("Residents");
}
