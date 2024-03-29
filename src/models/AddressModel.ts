import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import { sequelize } from "../config/config";

class AddressModel extends Model<
  InferAttributes<AddressModel>,
  InferCreationAttributes<AddressModel>
> {
  declare id: number;
  declare county: string;
  declare district: string;
  declare street: string;
  declare state: string;
}
AddressModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    county: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    district: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Addresses",
    timestamps: false,
  }
);

export default AddressModel;
