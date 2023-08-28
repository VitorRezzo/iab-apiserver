import { DataTypes } from "sequelize";
import { DBSqlite } from "../database/DBSqlite";
import { AddressModel } from "./AddressModel";
import { AvatarModel } from "./AvatarModel";
import { StatusModel } from "./StatusModel";

export const CompanionModel: any = DBSqlite.define("Companion", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  fullname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cpf: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  birthdate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  profession: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  wage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  schooling: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  addiction: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bloodtype: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  religion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  civilstatus: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  formsunion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  registerdate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

StatusModel.hasOne(CompanionModel);
CompanionModel.belongsTo(StatusModel, {
  foreignKey: {
    allowNull: false,
  },
});

AddressModel.hasOne(CompanionModel);
CompanionModel.belongsTo(AddressModel, {
  foreignKey: {
    allowNull: false,
  },
});
AvatarModel.hasOne(CompanionModel);
CompanionModel.belongsTo(AvatarModel, {
  foreignKey: {
    allowNull: false,
  },
});
