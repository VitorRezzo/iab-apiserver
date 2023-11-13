import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import { sequelize } from "../config/config";

class SchendulesModel extends Model<
  InferAttributes<SchendulesModel>,
  InferCreationAttributes<SchendulesModel>
> {
  declare id: number;
  declare origin: string;
  declare destiny: string;
  declare transport: string;
  declare procedure: string;
  declare date: string;
  declare hour: string;
  declare PatientId: number;
}
SchendulesModel.init(
  {
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
    PatientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Patients", key: "id" },
    },
  },
  {
    sequelize,
    modelName: "Schendules",
    timestamps: false,
  }
);

export default SchendulesModel;
