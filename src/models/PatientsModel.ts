import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import { sequelize } from "../config/config";
import ResidentsModel from "./ResidentsModel";
import MedicalRecordsModel from "./MedicalRecordsModel";

class PatientsModel extends Model<
  InferAttributes<PatientsModel>,
  InferCreationAttributes<PatientsModel>
> {
  declare id: number;
  declare ResidentId: number;
  declare MedicalRecordId: number;
}
PatientsModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    ResidentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Residents", key: "id" },
    },
    MedicalRecordId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "MedicalRecords", key: "id" },
    },
  },
  {
    sequelize,
    modelName: "Patients",
    timestamps: false,
  }
);
ResidentsModel.hasMany(PatientsModel);
PatientsModel.belongsTo(ResidentsModel);

MedicalRecordsModel.hasOne(PatientsModel);
PatientsModel.belongsTo(MedicalRecordsModel);

export default PatientsModel;
