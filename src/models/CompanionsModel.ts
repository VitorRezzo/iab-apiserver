import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import { sequelize } from "../config/config";
import ResidentsModel from "./ResidentsModel";

class CompanionsModel extends Model<
  InferAttributes<CompanionsModel>,
  InferCreationAttributes<CompanionsModel>
> {
  declare id: number;
  declare ResidentId: number;
}
CompanionsModel.init(
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
  },
  {
    sequelize,
    modelName: "Companions",
    timestamps: false,
  }
);

ResidentsModel.hasMany(CompanionsModel);
CompanionsModel.belongsTo(ResidentsModel);

export default CompanionsModel;
