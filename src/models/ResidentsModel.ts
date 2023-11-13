import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import { sequelize } from "../config/config";
import AddressModel from "./AddressModel";
import AvatarModel from "./AvatarModel";
import StatusModel from "./StatusModel";

class ResidentsModel extends Model<
  InferAttributes<ResidentsModel>,
  InferCreationAttributes<ResidentsModel>
> {
  declare id: number;
  declare fullname: string;
  declare cpf: string;
  declare birthdate: string;
  declare age: string;
  declare profession: string;
  declare wage: string;
  declare schooling: string;
  declare formsunion: string;
  declare civilstatus: string;
  declare addiction: string;
  declare gender: string;
  declare bloodtype: string;
  declare religion: string;
  declare contact: string;
  declare registerdate: string;
  declare StatusId: number;
  declare AvatareId: number;
  declare AddressId: number;
}
ResidentsModel.init(
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
    cpf: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    birthdate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    profession: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    wage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    schooling: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    addiction: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bloodtype: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    religion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    civilstatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    formsunion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    registerdate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    StatusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Statuses", key: "id" },
    },
    AvatareId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Avatares", key: "id" },
    },
    AddressId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Addresses", key: "id" },
    },
  },
  {
    sequelize,
    modelName: "Residents",
    timestamps: false,
  }
);

StatusModel.hasOne(ResidentsModel);
ResidentsModel.belongsTo(StatusModel);

AvatarModel.hasOne(ResidentsModel);
ResidentsModel.belongsTo(AvatarModel);

AddressModel.hasOne(ResidentsModel);
ResidentsModel.belongsTo(AddressModel);

export default ResidentsModel;
