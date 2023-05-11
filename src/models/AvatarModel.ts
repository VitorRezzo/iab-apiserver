/* eslint-disable prettier/prettier */
import { DataTypes } from "sequelize";
import { DBSqlite } from "../database/DBSqlite";

export const AvatarModel: any = DBSqlite.define("Avatar", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
