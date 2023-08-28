import { DataTypes } from "sequelize";
import { DBSqlite } from "../database/DBSqlite";

export const StatusModel: any = DBSqlite.define("Status", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  activity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
