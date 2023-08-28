import { DataTypes } from "sequelize";
import { DBSqlite } from "../database/DBSqlite";

export const PatientsCompanions: any = DBSqlite.define("Patients_Companions", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  kinship: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
