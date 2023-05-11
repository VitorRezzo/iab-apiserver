/* eslint-disable prettier/prettier */
import { DataTypes } from "sequelize";
import { DBSqlite } from "../database/DBSqlite";

export const MovementsCompanion: any = DBSqlite.define("Movements_Companion", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
});
