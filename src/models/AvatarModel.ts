import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import { sequelize } from "../config/config";

class AvatarModel extends Model<
  InferAttributes<AvatarModel>,
  InferCreationAttributes<AvatarModel>
> {
  declare id: number;
  declare url: string;
}
AvatarModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Avatares",
    timestamps: false,
  }
);

export default AvatarModel;
