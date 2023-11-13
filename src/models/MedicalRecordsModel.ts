import {
  Model,
  DataTypes,
  InferCreationAttributes,
  InferAttributes,
} from "sequelize";

import { sequelize } from "../config/config";

class MedicalRecordsModel extends Model<
  InferAttributes<MedicalRecordsModel>,
  InferCreationAttributes<MedicalRecordsModel>
> {
  declare id: number;
  declare pathology: string;
  declare biopsyresult: string;
  declare directedhospital: string;
  declare socialworker: string;
  declare medicalname: string;
  declare treatmenttype: string;
  declare clinicalstate: string;
  declare medicalphone: string;
  declare totalpathology?: string;
}
MedicalRecordsModel.init(
  {
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
      allowNull: false,
    },
    socialworker: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    medicalname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    treatmenttype: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    clinicalstate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    medicalphone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "MedicalRecords",
    timestamps: false,
  }
);

export default MedicalRecordsModel;
