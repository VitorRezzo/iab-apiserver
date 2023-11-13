import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import { sequelize } from "../config/config";
import ResidentsModel from "./ResidentsModel";
import MovimentsModel from "./MovimentsModel";
import ExpenseModel from "./ExpenseModel";

class ResidentsMovementsModel extends Model<
  InferAttributes<ResidentsMovementsModel>,
  InferCreationAttributes<ResidentsMovementsModel>
> {
  declare id: number;
  declare ResidentId: number;
  declare MovementId: number;
  declare ExpenseId: number;
}
ResidentsMovementsModel.init(
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
    MovementId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Movements", key: "id" },
    },
    ExpenseId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "Expenses", key: "id" },
    },
  },
  {
    sequelize,
    modelName: "ResidentsMovements",
    timestamps: false,
  }
);
ResidentsModel.hasMany(ResidentsMovementsModel);
ResidentsMovementsModel.belongsTo(ResidentsModel);

MovimentsModel.hasMany(ResidentsMovementsModel);
ResidentsMovementsModel.belongsTo(MovimentsModel);

ExpenseModel.hasMany(ResidentsMovementsModel);
ResidentsMovementsModel.belongsTo(ExpenseModel);

export default ResidentsMovementsModel;
