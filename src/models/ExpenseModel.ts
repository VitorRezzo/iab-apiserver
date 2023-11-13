import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import { sequelize } from "../config/config";

class ExpenseModel extends Model<
  InferAttributes<ExpenseModel>,
  InferCreationAttributes<ExpenseModel>
> {
  declare id: number;
  declare subject: string;
  declare description: string;
  declare typepayment: string;
  declare price: string;
}
ExpenseModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    typepayment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Expenses",
    timestamps: false,
  }
);

export default ExpenseModel;
