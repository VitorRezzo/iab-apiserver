import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import { sequelize } from "../config/config";

class MedicinesModel extends Model<
  InferAttributes<MedicinesModel>,
  InferCreationAttributes<MedicinesModel>
> {
  declare id: number;
  declare remedy: string;
  declare description: string;
}
MedicinesModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    remedy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Medicines",
    timestamps: false,
  }
);

export default MedicinesModel;
