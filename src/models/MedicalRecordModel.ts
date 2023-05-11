/* eslint-disable prettier/prettier */
import { DataTypes } from "sequelize";
import { DBSqlite } from "../database/DBSqlite";

export const MedicalRecordModel: any = DBSqlite.define("MedicalRecord", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  pathology: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  biopsyresult: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  directedhospital: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  socialworker: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  medicalname: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  treatmenttype: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  clinicalstate: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  medicalphone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
