import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import { sequelize } from "../config/config";
import ResidentsModel from "./ResidentsModel";
import ExpenseModel from "./ExpenseModel";
import SchendulesModel from "./SchendulesModel";

class ResidentsExpensesModel extends Model<
  InferAttributes<ResidentsExpensesModel>,
  InferCreationAttributes<ResidentsExpensesModel>
> {
  declare id: number;
  declare ResidentId: number;
  declare ExpenseId: number;
  declare ScheduleId: number;
}
ResidentsExpensesModel.init(
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
    ExpenseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Expenses", key: "id" },
    },
    ScheduleId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "Schedules", key: "id" },
    },
  },
  {
    sequelize,
    modelName: "ResidentsExpenses",
    timestamps: false,
  }
);

ResidentsModel.hasMany(ResidentsExpensesModel);
ResidentsExpensesModel.belongsTo(ExpenseModel);

ExpenseModel.hasMany(ResidentsExpensesModel);
ResidentsExpensesModel.belongsTo(ExpenseModel);

SchendulesModel.hasMany(ResidentsExpensesModel);
ResidentsExpensesModel.belongsTo(SchendulesModel);

export default ResidentsExpensesModel;
