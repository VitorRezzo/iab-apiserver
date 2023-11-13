import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import { sequelize } from "../config/config";
import CompanionsModel from "./CompanionsModel";
import PatientsModel from "./PatientsModel";

class PatientsCompanionsModel extends Model<
  InferAttributes<PatientsCompanionsModel>,
  InferCreationAttributes<PatientsCompanionsModel>
> {
  declare id: number;
  declare kinship: string;
  declare PatientId: number;
  declare CompanionId: number;
}
PatientsCompanionsModel.init(
  {
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
    PatientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Patients", key: "id" },
    },
    CompanionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Companions", key: "id" },
    },
  },
  {
    sequelize,
    modelName: "PatientsCompanions",
    timestamps: false,
  }
);

PatientsModel.hasMany(PatientsCompanionsModel);
PatientsCompanionsModel.belongsTo(PatientsModel);

CompanionsModel.hasMany(PatientsCompanionsModel);
PatientsCompanionsModel.belongsTo(CompanionsModel);

export default PatientsCompanionsModel;
