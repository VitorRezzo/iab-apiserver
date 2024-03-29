import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import { sequelize } from "../config/config";

class StatusModel extends Model<
  InferAttributes<StatusModel>,
  InferCreationAttributes<StatusModel>
> {
  declare id: number;
  declare status: string;
  declare activity: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}
StatusModel.init(
  {
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
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Statuses",
  }
);

export default StatusModel;
