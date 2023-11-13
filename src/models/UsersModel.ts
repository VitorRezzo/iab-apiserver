import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import { sequelize } from "../config/config";

class UsersModel extends Model<
  InferAttributes<UsersModel>,
  InferCreationAttributes<UsersModel>
> {
  declare id: number;
  declare fullname: string;
  declare username: string;
  declare password: string;
  declare active: boolean;
}
UsersModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Users",
    timestamps: false,
  }
);

export default UsersModel;
