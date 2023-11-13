import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import { sequelize } from "../config/config";

class MovimentsModel extends Model<
  InferAttributes<MovimentsModel>,
  InferCreationAttributes<MovimentsModel>
> {
  declare id: number;
  declare procedure: string;
  declare description: string;
  declare destiny: string;
  declare date: string;
  declare hour: string;
}
MovimentsModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    procedure: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    destiny: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
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
  },
  {
    sequelize,
    modelName: "Movements",
    timestamps: false,
  }
);

export default MovimentsModel;
