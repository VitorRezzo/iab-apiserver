import { DataTypes } from "sequelize";
import { DBSqlite } from "../database/DBSqlite";
import { CompanionModel } from "./CompanionModel";
import { PatientModel } from "./PatientModel";
import { MovementsCompanion } from "./MovementsCompanion";
export const MovementModel: any = DBSqlite.define("Movements", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  origin: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  destiny: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  transport: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  procedure: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hour: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

PatientModel.hasMany(MovementModel);
MovementModel.belongsTo(PatientModel);
MovementModel.belongsToMany(CompanionModel, { through: MovementsCompanion });
